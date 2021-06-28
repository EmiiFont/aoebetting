import express, { Application } from "express";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import { addResolversToSchema, loadSchemaSync, GraphQLFileLoader } from "graphql-tools";
import { join } from "path";
import * as _ from "lodash";
import { container, IContextProvider } from "./container";
import { TYPES } from "./model/types";
import matchCompetitorResolver from "./resolvers/matchCompetitorResolver";
import matchResolver from "./resolvers/matchResolver";
import playerResolver from "./resolvers/playerResolver";
import * as admin from "firebase-admin";

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
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
        projectId: process.env.PROJECT_ID,
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

  initGraphql(): void {
    const schema = loadSchemaSync(join(__dirname, "./schemas/**/*.graphql"), {
      loaders: [new GraphQLFileLoader()],
    });
    const schemaWithResolvers = addResolversToSchema({
      schema,
      resolvers: _.merge(matchResolver, playerResolver, matchCompetitorResolver),
    });

    const server = new ApolloServer({
      schema: schemaWithResolvers,
      context: async ({ req }) => {
        const context = container.get<IContextProvider>(TYPES.ContextProvider);
        // get the user token from the headers
        const token = req.headers.authorization || "";
        const userId = await this.checkAuth(token);
        if (userId === "") throw new AuthenticationError("you must be logged in");
        return Object.assign(context, { userId: userId });
      },
    });

    server.applyMiddleware({ app: this.app });
  }

  async checkAuth(token: string): Promise<string> {
    try {
      const result = await admin.auth().verifyIdToken(token);
      return result.uid;
    } catch (err) {
      console.log("Failed to verify: ", JSON.stringify(err));
    }
    return "";
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}/graphql to run queries!`);
    });
  }
}

export default App;
