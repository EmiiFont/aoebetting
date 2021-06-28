import App from "./app";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import { PORT } from "./config/constants";
import * as bodyParser from "body-parser";
import { HomeController, MatchController, BetController } from "./controllers/";
import { PostgresDBConnection } from "./database/PostgresDBConnection";
import dotenv from "dotenv";
import cors from "cors";
import { PlayerController } from "./controllers/playerController";

dotenv.config();

const dbConn: PostgresDBConnection = new PostgresDBConnection();

dbConn.setUpConnection().then(() => {
  const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: process.env.CLIENT_URL,
    preflightContinue: false,
  };

  const app = new App({
    port: PORT,
    controllers: [],
    middleWares: [
      cors(options),
      bodyParser.json(),
      bodyParser.urlencoded({ extended: true }),
      expressWinston.logger({
        transports: [new winston.transports.Console()],
      }),
    ],
  });
  app.listen();
});
