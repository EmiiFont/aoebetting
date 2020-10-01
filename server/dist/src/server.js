"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const constants_1 = require("./config/constants");
const bodyParser = __importStar(require("body-parser"));
const controllers_1 = require("./controllers/");
const PostgresDBConnection_1 = require("./database/PostgresDBConnection");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const dbConn = new PostgresDBConnection_1.PostgresDBConnection();
dbConn.setUpConnection().then(() => {
    const options = {
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Accept',
            'X-Access-Token',
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        origin: process.env.CLIENT_URL,
        preflightContinue: false,
    };
    const app = new app_1.default({
        port: constants_1.PORT,
        controllers: [
            new controllers_1.HomeController(),
            new controllers_1.MatchController(),
            new controllers_1.BetController()
        ],
        middleWares: [
            cors_1.default(options),
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
