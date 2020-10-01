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
exports.BetService = void 0;
const betDto_1 = require("../model/betDto");
const bookie_1 = require("../helpers/bookie");
const typeorm_1 = require("typeorm");
const Bet_1 = require("../entity/Bet");
const BetType_1 = require("../entity/BetType");
const UserBet_1 = require("../entity/UserBet");
const Match_1 = require("../entity/Match");
const elo_1 = require("../helpers/elo");
class BetService {
    constructor() {
        this._userBetRepository = typeorm_1.getRepository(UserBet_1.UserBet);
        this._betTypeRepository = typeorm_1.getRepository(BetType_1.BetType);
        this._betRepository = typeorm_1.getRepository(Bet_1.Bet);
        this._matchRepository = typeorm_1.getRepository(Match_1.Match);
        this._bookie = new bookie_1.Bookie();
    }
    setSystemBet(bet, matchUid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield this._matchRepository.findOne({ uid: matchUid });
            const firstPlayerElo = 2234;
            const secondPlayerElo = 2243;
            if ((match === null || match === void 0 ? void 0 : match.competitorType) == Match_1.CompetitorTypeEnum.Player) {
                //TODO: get player from player table
            }
            else {
                //TODO: get team from team table
            }
            //TODO: this is where we can use our stimation or elo calculation for specific cases.
            const probFromElo = elo_1.Elo.predictResult(firstPlayerElo, secondPlayerElo);
            const matchOdds = [];
            //TODO: try get starting odds without specifying eventId
            // including the vigorish
            matchOdds.push({ eventId: 1, odd: probFromElo[0] });
            matchOdds.push({ eventId: 2, odd: probFromElo[1] });
            const eventStartingOdds = yield this._bookie.setOdds([], matchOdds);
            const systemBets = [];
            const betEnum = betDto_1.BetTypeEnum[(_a = bet.betType) !== null && _a !== void 0 ? _a : betDto_1.BetTypeEnum.MoneyLine];
            const betType = yield this._betTypeRepository.findOne({ name: betEnum });
            eventStartingOdds.forEach(d => {
                let systemBet = this._betRepository.create({
                    type: betType,
                    datePlaced: new Date(),
                    systemOdd: d.odd,
                    match: match,
                });
                this._betRepository.save(systemBet);
                systemBets.push(systemBet);
            });
            return systemBets;
        });
    }
    setUserbet(userBet, betUid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //TODO: validate bet
            //first let get the current odd for the player bet
            let currentBets = [];
            //second we get the eventOdd for both sides e.g player1 vs player2
            let eventOdd = [];
            let balancedOdds = yield this._bookie.setOdds(currentBets, eventOdd);
            let oddForPickedSide = balancedOdds.find(v => v.eventId == betUid);
            if (oddForPickedSide != undefined) {
                //let user = await this._userRepository.findOne({ uid: userBet.user?.uid});
                let betTypeName = betDto_1.BetTypeEnum[(_a = userBet.betType) !== null && _a !== void 0 ? _a : betDto_1.BetTypeEnum.MoneyLine];
                let bet = yield this._betRepository.findOne({ uid: betUid });
                userBet.odd = oddForPickedSide === null || oddForPickedSide === void 0 ? void 0 : oddForPickedSide.odd;
                //TODO: update new balanced odds for the events
                const newBet = this._userBetRepository.create({
                    stake: userBet.stake,
                    bettor: userBet.user,
                    datePlaced: new Date(),
                    odd: userBet.odd,
                    bet: bet
                });
                yield this._userBetRepository.save(newBet);
                return true;
            }
            //log problem
            return false;
        });
    }
    getUserBets(userUid) {
        return __awaiter(this, void 0, void 0, function* () {
            let userBets = yield this._betRepository.find({ uid: userUid });
            //TODO: get the event id of each bets
            // let btod = userBets.map(v => <BetDTO>{
            //     user: v.bettor,
            //     stake: v.stake,
            //     betType: BetTypeEnum.MoneyLine,
            //     eventId: 1,
            //     created: new Date(),
            //     odd: 1.90
            // });
            return [];
        });
    }
    getByMatch(matchUid) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield this._matchRepository.findOne(matchUid);
            console.log(match);
            let matchBets = yield this._betRepository.find({ match: match });
            return matchBets;
        });
    }
}
exports.BetService = BetService;
