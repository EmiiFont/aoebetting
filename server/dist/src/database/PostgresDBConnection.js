"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresDBConnection = void 0;
const BaseDbConnection_1 = require("./BaseDbConnection");
const Bet_1 = require("../entity/Bet");
const User_1 = require("../entity/User");
const BetType_1 = require("../entity/BetType");
const db_config_1 = __importDefault(require("../config/db.config"));
const Competitor_1 = require("../entity/Competitor");
const Match_1 = require("../entity/Match");
const UserBet_1 = require("../entity/UserBet");
const MatchInformation_1 = require("../entity/MatchInformation");
const Player_1 = require("../entity/Player");
class PostgresDBConnection extends BaseDbConnection_1.BaseDbConnection {
    constructor() {
        var _a;
        const postgresDBConnOptions = {
            "type": "postgres",
            "host": db_config_1.default.host,
            "port": db_config_1.default.port,
            "username": db_config_1.default.username,
            "password": process.env.DB_PASS,
            "database": db_config_1.default.database,
            "synchronize": true,
            "logging": ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) == "dev",
            "entities": [
                Bet_1.Bet,
                BetType_1.BetType,
                User_1.User,
                Match_1.Match,
                MatchInformation_1.MatchInformation,
                Competitor_1.Competitor,
                UserBet_1.UserBet,
                Player_1.Player
            ]
        };
        super(postgresDBConnOptions);
    }
}
exports.PostgresDBConnection = PostgresDBConnection;
