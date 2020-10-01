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
const bookie_1 = require("../src/helpers/bookie");
const betDto_1 = require("../src/model/betDto");
const userDto_1 = require("../src/model/userDto");
test('bookie should return correct odd with no bets', () => __awaiter(void 0, void 0, void 0, function* () {
    let bookie = new bookie_1.Bookie();
    let bets = [];
    let matchOdds = [];
    //starting match odds from our calculations
    matchOdds.push({ eventId: 1, odd: 51 });
    matchOdds.push({ eventId: 2, odd: 49 });
    let user1 = new userDto_1.UserDTO();
    user1.uid = 1;
    let user2 = new userDto_1.UserDTO();
    user2.uid = 5555;
    //bets from users
    bets.push({ eventId: 1, stake: 0, odd: 51, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: user1 });
    bets.push({ eventId: 2, stake: 0, odd: 49, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: user2 });
    let balancedOdds = yield bookie.setOdds(bets, matchOdds);
    expect(balancedOdds[0].odd).toBe(-140.96385542168673);
}));
test('should return more juicy odds for one sided bets', () => __awaiter(void 0, void 0, void 0, function* () {
    let bookie = new bookie_1.Bookie();
    let bets = [];
    let matchOdds = [];
    matchOdds.push({ eventId: 1, odd: 51 });
    matchOdds.push({ eventId: 2, odd: 49 });
    let testUser = new userDto_1.UserDTO();
    testUser.uid = 50;
    bets.push({ eventId: 1, stake: 100, odd: 51, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: testUser });
    bets.push({ eventId: 2, stake: 10, odd: 49, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: testUser });
    bets.push({ eventId: 2, stake: 30, odd: 49, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: testUser });
    bets.push({ eventId: 2, stake: 50, odd: 49, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: testUser });
    bets.push({ eventId: 2, stake: 80, odd: 49, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: testUser });
    bets.push({ eventId: 2, stake: 100, odd: 49, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: testUser });
    bets.push({ eventId: 2, stake: 15, odd: 49, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: testUser });
    bets.push({ eventId: 2, stake: 5, odd: 49, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: testUser });
    let balancedOdds = yield bookie.setOdds(bets, matchOdds);
    let sided = balancedOdds.find(v => v.eventId == 1);
    expect(sided.odd).toBe(177.602523659306);
}));
test('should return the correct earnings of the winners', () => __awaiter(void 0, void 0, void 0, function* () {
    let bookie = new bookie_1.Bookie();
    let bets = [];
    let matchOdds = [];
    matchOdds.push({ eventId: 1, odd: 51 });
    matchOdds.push({ eventId: 2, odd: 49 });
    let system = new userDto_1.UserDTO();
    system.uid = 200;
    bets.push({ eventId: 1, stake: 100, odd: -140, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: system });
    for (let index = 1; index < 8; index++) {
        let balancedOdds = yield bookie.setOdds(bets, matchOdds);
        let user = new userDto_1.UserDTO();
        user.uid = 5 + index;
        let waggeredEvent = balancedOdds.find(v => v.eventId == 2);
        let bet = { eventId: 2, stake: 12 * index, odd: waggeredEvent === null || waggeredEvent === void 0 ? void 0 : waggeredEvent.odd, created: new Date(), betType: betDto_1.BetTypeEnum.MoneyLine, user: user };
        bets.push(bet);
    }
    let winner = yield bookie.getBetEarnings(bets[0], 1);
    expect(winner.profit).toBe(71.42857142857144);
}));
