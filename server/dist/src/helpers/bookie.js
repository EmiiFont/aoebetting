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
exports.Bookie = void 0;
const oddsConverter_1 = require("./oddsConverter");
const betDto_1 = require("../model/betDto");
class Bookie {
    constructor() {
        //the fee charged by the bookmaker
        this.VIGORISH = 0.15;
        //initial amount for the starting probabilities 
        this.INITIAL_PROB_WEIGHT = 50;
    }
    setOdds(bets, eventOdds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (eventOdds !== undefined) {
                let event1 = eventOdds[0].odd;
                let event2 = eventOdds[1].odd;
                let event1HouseStake = (event1 / 100) * this.INITIAL_PROB_WEIGHT;
                let event2HouseStake = (event2 / 100) * this.INITIAL_PROB_WEIGHT;
                let stubBets = [];
                stubBets.push({ eventId: 1, stake: event1HouseStake, odd: event1, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine });
                stubBets.push({ eventId: 2, stake: event2HouseStake, odd: event2, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine });
                bets = stubBets.concat(bets);
            }
            let probs = yield this.balanceProbFromBets(bets);
            let impliedOdds = [];
            let numOutcomes = probs.length;
            for (let k in probs) {
                let p = probs[k].odd + this.VIGORISH / numOutcomes;
                impliedOdds.push({ eventId: probs[k].eventId, odd: oddsConverter_1.OddsConverter.fromProbability(p).americanOdds });
            }
            return impliedOdds;
        });
    }
    balanceProbFromBets(bets) {
        return __awaiter(this, void 0, void 0, function* () {
            //todo: this can be improved saving the last calculated value in cache or database
            let total = 0;
            let outcomeTotals = [];
            bets.forEach(function (betTuple) {
                let outcome = betTuple.eventId;
                let amount = betTuple.stake;
                // increment total bet and outcome specific amount
                total += amount;
                let existingOutcome = outcomeTotals.find(v => v.eventId == outcome);
                if (existingOutcome != undefined) {
                    existingOutcome.odd = existingOutcome.odd + amount || amount;
                }
                else {
                    outcomeTotals.push({ eventId: outcome !== null && outcome !== void 0 ? outcome : 0, odd: amount });
                }
            });
            //stabilize amounts based on the average of bets amount
            outcomeTotals.forEach(b => {
                b.odd /= total;
            });
            return outcomeTotals;
        });
    }
    getBetEarnings(bet, eventIdWinner) {
        var _a;
        if (bet.eventId == eventIdWinner) {
            bet.profit = (bet.stake * oddsConverter_1.OddsConverter.fromAmerican((_a = bet.odd) !== null && _a !== void 0 ? _a : 0).decimalOdds) - bet.stake;
            bet.total = bet.stake + bet.profit;
        }
        return bet;
    }
}
exports.Bookie = Bookie;
