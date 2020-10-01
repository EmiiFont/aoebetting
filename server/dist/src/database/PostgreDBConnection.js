"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreDBConnection = void 0;
const BaseDbConnection_1 = require("./BaseDbConnection");
const Bet_1 = require("../entity/Bet");
const User_1 = require("../entity/User");
const BetType_1 = require("../entity/BetType");
const db_config_1 = __importDefault(require("../config/db.config"));
class PostgreDBConnection extends BaseDbConnection_1.BaseDbConnection {
    constructor() {
        var _a;
        const postgreDBConnOptions = {
            "type": "postgres",
            "host": db_config_1.default.host,
            "port": db_config_1.default.port,
            "username": 'postgres',
            "password": '',
            "database": 'aoebetting',
            "synchronize": true,
            "logging": ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.trim()) == "dev",
            "entities": [
                Bet_1.Bet,
                BetType_1.BetType,
                User_1.User,
            ]
        };
        super(postgreDBConnOptions);
    }
}
exports.PostgreDBConnection = PostgreDBConnection;
