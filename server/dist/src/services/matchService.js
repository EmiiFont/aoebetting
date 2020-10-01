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
exports.MatchService = void 0;
const Match_1 = require("../entity/Match");
const typeorm_1 = require("typeorm");
const aoe2ApiService_1 = require("./aoe2ApiService");
const MatchInformation_1 = require("../entity/MatchInformation");
const Competitor_1 = require("../entity/Competitor");
class MatchService {
    constructor() {
        this._matchRepository = typeorm_1.getRepository(Match_1.Match);
        this._matchInformationRepository = typeorm_1.getRepository(MatchInformation_1.MatchInformation);
        this._competitorRepository = typeorm_1.getRepository(Competitor_1.Competitor);
        this._aoeApiService = new aoe2ApiService_1.ApiPlayerService();
    }
    getMatches(perPage, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (perPage * page) - perPage;
            let matchQuery = this._matchRepository.createQueryBuilder('match');
            matchQuery = matchQuery.skip(skip);
            matchQuery = matchQuery.take(perPage);
            const { entities, raw } = yield matchQuery.getRawAndEntities();
            return entities;
        });
    }
    setMatchStarted(matchUid, tryGetApi) {
        return __awaiter(this, void 0, void 0, function* () {
            let match = yield this._matchRepository.findOneOrFail({ uid: matchUid });
            match.Started = new Date();
            if (tryGetApi) {
                //TODO: get player profile id based on the players in this match
                let playerProfileId = 12312;
                let player2ProfileId = 12312;
                let thisMatch = yield this._aoeApiService.getCurrentMatchByPlayers(playerProfileId, player2ProfileId);
                if (thisMatch.match_id !== undefined) {
                    //  match.MatchIdFromApi = thisMatch.match_id;
                }
            }
            this._matchRepository.save(match);
            return match;
        });
    }
    setMatchFinished(matchUid, tryGetApi) {
        return __awaiter(this, void 0, void 0, function* () {
            let match = yield this._matchRepository.findOneOrFail({ uid: matchUid });
            if (tryGetApi) {
                //TODO: get player profile id based on the players in this match
                let playerProfileId = 12312;
                let player2ProfileId = 12312;
                let thisMatch = yield this._aoeApiService.getCurrentMatchByPlayers(playerProfileId, player2ProfileId);
                //     if(thisMatch.match_id == match.MatchIdFromApi){
                //         match.finished = new Date(thisMatch.finished);
                //     }
                // }else{
                //     match.finished = new Date();
                // }
            }
            this._matchRepository.save(match);
            //TODO: calculate winners after match is finished.
            return match;
        });
    }
    addMatch(matchDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchinformation = [];
            const minimumMatchesToPlay = Math.trunc(matchDto.bestOf / 2) + 1;
            let match = this._matchRepository.create({
                title: matchDto.title,
                competitorOneUid: matchDto.competitorOneUid,
                competitorTwoUid: matchDto.competitorTwoUid,
                competitorType: matchDto.competitorType,
                lastUpdate: new Date(),
                bestOf: matchDto.bestOf,
                matchInformation: matchinformation
            });
            const matchSaved = yield this._matchRepository.save(match);
            for (let i = 1; i <= minimumMatchesToPlay; i++) {
                let matchinfo = this._matchInformationRepository.create({
                    lastUpdate: new Date(),
                    match: matchSaved,
                    winnerUid: 2
                });
                matchinformation.push(yield this._matchInformationRepository.save(matchinfo));
            }
            matchSaved.matchInformation = matchinformation;
            yield this.setMatchInformationWinner(match.uid);
            return matchSaved;
        });
    }
    setMatchInformationWinner(matchUid) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield this._matchRepository.findOne(matchUid, { relations: ['matchInformation'] });
            const competitor = yield this._competitorRepository.findOne(1);
            console.log(competitor);
            if (competitor != undefined) {
                const matchInfo = match === null || match === void 0 ? void 0 : match.matchInformation.find(c => c.Started == null && c.finished == null);
                if (matchInfo != undefined) {
                    console.log("no match INFO");
                    matchInfo.competitor = competitor;
                    this._matchInformationRepository.save(matchInfo);
                }
            }
        });
    }
    getMatchById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(uid);
            let match = yield this._matchRepository.findOne(uid, { relations: ['matchInformation'] });
            return match;
        });
    }
}
exports.MatchService = MatchService;
