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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetController = void 0;
const express = __importStar(require("express"));
const betService_1 = require("../services/betService");
class BetController {
    constructor() {
        this.path = '/bet';
        this.router = express.Router();
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send({ error: 'Nothing implemented' });
        });
        this.createUserBet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userBet = req.body;
        });
        this.createSystemBet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const bet = req.body;
            //TODO: get matchUid from body;
            const matchUid = 2;
            const betRes = yield this._betService.setSystemBet(bet, 2);
            res.send(betRes);
        });
        this.getByMatch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const matchuid = +req.params.id;
            //TODO: get matchUid from body;
            const matchUid = 2;
            const betRes = yield this._betService.getByMatch(matchUid);
            res.send(betRes);
        });
        this.initRoutes();
        this._betService = new betService_1.BetService();
    }
    initRoutes() {
        this.router.get(this.path, this.index);
        this.router.get(this.path + '/:id', this.getByMatch);
        this.router.post(this.path, this.createSystemBet);
    }
}
exports.BetController = BetController;
