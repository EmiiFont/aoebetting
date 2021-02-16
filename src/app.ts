import express, { Application } from "express";
import { ApolloServer } from 'apollo-server-express'
import { addResolversToSchema, loadSchemaSync, GraphQLFileLoader } from 'graphql-tools'
import { join } from 'path';
import * as _ from 'lodash';
import matchResolver from './resolvers/matchResolver'
import playerResolver from './resolvers/playerResolver'

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
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
     const resolvers = {
       Query: { books: () => books },
     };
     const schema = loadSchemaSync( join(__dirname, "./schemas/schema.graphql"), {
       loaders: [
         new GraphQLFileLoader()
       ]
     });
     const schemaWithResolvers = addResolversToSchema({ schema, resolvers: _.merge(matchResolver,
         resolvers, playerResolver)});

     const server = new ApolloServer({ schema: schemaWithResolvers });
     server.applyMiddleware({ app: this.app });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}/graphql to run queries!`);
    });
  }
}

export default App;
