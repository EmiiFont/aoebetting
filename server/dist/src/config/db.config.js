"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'postgres',
    host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : "localhost",
    port: parseInt((_b = process.env.DBPORT) !== null && _b !== void 0 ? _b : "5432"),
    username: (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : "postgres",
    password: process.env.DB_PASS,
    database: 'aoebetting',
    synchronize: true,
    logging: (_d = process.env) !== null && _d !== void 0 ? _d : true,
};
