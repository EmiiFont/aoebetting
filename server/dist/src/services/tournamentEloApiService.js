"use strict";
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
exports.TournamentEloService = void 0;
const apiUrl_1 = require("../config/apiUrl");
const httpWrapper_1 = require("../helpers/httpWrapper");
class TournamentEloService {
    /**
     *
     */
    constructor() {
        this.http = new httpWrapper_1.HttpWrapper(apiUrl_1.tournamentElo);
    }
    getTournaments() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiParams = `?request=tournaments`;
            let play = yield this.http.get(apiParams);
            return play;
        });
    }
    getPlayerInfo(profileID) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiParams = `?request=player&id=${profileID}`;
            let play = yield this.http.get(apiParams);
            return play;
        });
    }
    /**
     * Returns the players sorted descending by their highest elo
     *
     * @returns ApiPlayer[] object containing the list of players
     *
     */
    getPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiParams = `?request=players`;
            let play = yield this.http.get(apiParams);
            return play;
        });
    }
}
exports.TournamentEloService = TournamentEloService;
