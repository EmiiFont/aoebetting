import App from './app';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { PORT } from './config/constants';

import * as bodyParser from 'body-parser';
import {HomeController, MatchController, BetController} from './controllers/';
import { PostgresDBConnection } from './database/PostgresDBConnection';
import dotenv from 'dotenv';


dotenv.config();
const dbConn: PostgresDBConnection = new PostgresDBConnection();

dbConn.setUpConnection().then( () => {
    const app = new App({
      port: PORT,
      controllers: [
          new HomeController(),
          new MatchController(),
          new BetController()
      ],
      middleWares: [
          bodyParser.json(),
          bodyParser.urlencoded({ extended: true }),
          expressWinston.logger({
                  transports: [
                    new winston.transports.Console()
                  ]
                })
      ]
  });

app.listen();
});
