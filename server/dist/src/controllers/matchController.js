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
exports.MatchController = void 0;
const express = __importStar(require("express"));
const matchService_1 = require("../services/matchService");
class MatchController {
    constructor() {
        this.path = '/match';
        this.router = express.Router();
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this._matchService.getMatches(100, 1);
            res.send(result);
        });
        this.getMatch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            console.log(id);
            let result = yield this._matchService.getMatchById(id);
            if (!result) {
                res.status(404).send({
                    'error': 'Match not found'
                });
            }
            res.send(result);
        });
        this.createMatch = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const match = req.body;
            match.bestOf = 5;
            let result = yield this._matchService.addMatch(match);
            res.send(result);
        });
        this.setMatchStarted = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id;
            let result = yield this._matchService.setMatchStarted(id, false);
            res.send(result);
        });
        this.initRoutes();
        this._matchService = new matchService_1.MatchService();
    }
    initRoutes() {
        this.router.get(this.path, this.index);
        this.router.get(this.path + '/:id', this.getMatch);
        this.router.get(this.path, this.setMatchStarted);
        this.router.post(this.path, this.createMatch);
    }
}
exports.MatchController = MatchController;
