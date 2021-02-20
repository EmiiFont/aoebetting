import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { addResolversToSchema, loadSchemaSync, GraphQLFileLoader } from "graphql-tools";
import { join } from "path";
import * as _ from "lodash";
import { container, IContextProvider } from "./container";
import { TYPES } from "./model/types";
import { betResolver } from "./resolvers/betResolver";
import matchResolver from "./resolvers/matchResolver";
import playerResolver from "./resolvers/playerResolver";
import * as serviceAccount from "../firebase-config.json";
import * as admin from "firebase-admin";

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
      }),
    });
    this.initGraphql();
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  initGraphql() {
    const schema = loadSchemaSync(join(__dirname, "./schemas/schema.graphql"), {
      loaders: [new GraphQLFileLoader()],
    });
    const schemaWithResolvers = addResolversToSchema({
      schema,
      resolvers: _.merge(matchResolver, playerResolver),
    });

    const server = new ApolloServer({
      schema: schemaWithResolvers,
      context: async ({ req }) => {
        const info = container.get<IContextProvider>(TYPES.ContextProvider);

        // get the user token from the headers
        const token = req.headers.authorization || "";
        if (!token) throw new Error("you must be logged in");

        // try to retrieve a user with the token
        const userId = await this.checkAuth(token);
        if (!userId) throw new Error("you must be logged in");
        return Object.assign(info, { userId: userId });
      },
    });

    server.applyMiddleware({ app: this.app });
  }

  async checkAuth(token: string): Promise<string> {
    const result = await admin.auth().verifyIdToken(token);
    return result.uid;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}/graphql to run queries!`);
    });
  }
}

export default App;
