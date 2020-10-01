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
exports.ApiPlayerService = void 0;
const apiUrl_1 = require("../config/apiUrl");
const httpWrapper_1 = require("../helpers/httpWrapper");
class ApiPlayerService {
    /**
     *
     */
    constructor() {
        this.http = new httpWrapper_1.HttpWrapper(apiUrl_1.aoe2net);
    }
    /**
    * Get the available list of maps played in the game
    */
    getApiMaps() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiParams = `strings?game=aoe2de&language=en`;
            let content = yield this.http.get(apiParams);
            return content.mapType;
        });
    }
    /**
    * Returns the games played by a player.
    *
    * @param profileId - the profile id from aoe2.net of the player
    * @param numberOfMatches - number of games to retrieve max is 1000
    * @returns Match[] object containing the list of games
    *
    */
    getPlayerMatchHistory(profileId, numberOfMatches) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiParams = `player/matches?game=aoe2de&profile_id=${profileId}&count=${numberOfMatches}`;
            let matches = yield this.http.get(apiParams);
            return matches;
        });
    }
    /**
     * Returns the players sorted descending by their highest elo
     *
     * @param count - number of players to retrieve max is 10000
     * @returns ApiPlayer[] object containing the list of players
     *
     */
    getPlayers(count) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiParams = `leaderboard?game=aoe2de&leaderboard_id=3&start=1&count=${count}`;
            let play = yield this.http.get(apiParams);
            return play;
        });
    }
    /**
    * Returns the match information by player profile id
    *
    * @param profileId - player profile id from aoe2.net
    * @returns Match[] object containing the match information
    *
    */
    getPlayerLastMatch(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiParams = `player/lastmatch?game=aoe2de&profile_id=${profileId}`;
            let match = yield this.http.get(apiParams);
            let lastMatch = match.last_match;
            //for some reason aoe2 api doesn't bring who won the match, but that information is available in the 
            //match history of the player;
            if (lastMatch.finished != null && lastMatch.finished != undefined) {
                const apiParam2s = `player/matches?game=aoe2de&profile_id=${match.profile_id}&count=${2}`;
                let matches = yield this.http.get(apiParam2s);
                let lastMatchFull = matches.find(v => v.match_id == lastMatch.match_id);
                lastMatch = lastMatchFull != undefined ? lastMatchFull : lastMatch;
            }
            return lastMatch;
        });
    }
    /**
    * Returns the current match information, useful to see if a match has completed to
    * automatically set the winners
    *
    * @param player1ProfileId - first player profile id from aoe2.net
    * @param player2ProfileId - second player profile id from aoe2.net
    * @returns Match object containing the match information
    *
    */
    getCurrentMatchByPlayers(player1ProfileId, player2ProfileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiParams = `player/lastmatch?game=aoe2de&profile_id=${player1ProfileId}`;
            const apiParams2 = `player/lastmatch?game=aoe2de&profile_id=${player2ProfileId}`;
            let player1Match = yield this.http.get(apiParams);
            let player2Match = yield this.http.get(apiParams2);
            if (player1Match.last_match.match_id == player2Match.last_match.match_id) {
                let lastMatch = player1Match.last_match;
                //for some reason aoe2 api doesn't bring who won the match, but that information is available in the 
                //match history of the player;
                if (lastMatch.finished != null && lastMatch.finished != undefined) {
                    const apiParam2s = `player/matches?game=aoe2de&profile_id=${player1Match.profile_id}&count=${2}`;
                    let matches = yield this.http.get(apiParam2s);
                    let lastMatchFull = matches.find(v => v.match_id == lastMatch.match_id);
                    lastMatch = lastMatchFull != undefined ? lastMatchFull : lastMatch;
                }
                return lastMatch;
            }
            return {};
        });
    }
}
exports.ApiPlayerService = ApiPlayerService;
