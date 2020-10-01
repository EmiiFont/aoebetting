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
const oddsConverter_1 = require("../src/helpers/oddsConverter");
test('from probability greater than 50 decimal should be less than 2', () => __awaiter(void 0, void 0, void 0, function* () {
    let odd = oddsConverter_1.OddsConverter.fromProbability(51);
    expect(odd.decimalOdds).toBeLessThan(2);
}));
test('from american should return correct probability', () => __awaiter(void 0, void 0, void 0, function* () {
    let odd = oddsConverter_1.OddsConverter.fromAmerican(-140);
    expect(odd.impliedProbability.toFixed(2)).toBe("0.58");
}));
test('from american should not fail when passing 0', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(() => { oddsConverter_1.OddsConverter.fromAmerican(0); }).toThrowError('US Odds value of 0 is invalid');
}));
test('from decimal should not fail when passing 0', () => __awaiter(void 0, void 0, void 0, function* () {
    let odd = new oddsConverter_1.OddsConverter(0);
    expect(() => { odd.impliedProbability; }).toThrowError("Decimal odds value of 0 is invalid");
}));
test('from probability should not fail when passing 0', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(() => { oddsConverter_1.OddsConverter.fromProbability(0); }).toThrowError("Implied probability value of 0 is invalid");
}));
test('from probability should not fail  passing values less than 0', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(() => { oddsConverter_1.OddsConverter.fromProbability(-1); }).toThrowError("Implied probability value of -1 is invalid");
}));
test('from american should not fail  passing values less than 100', () => __awaiter(void 0, void 0, void 0, function* () {
    expect(() => { oddsConverter_1.OddsConverter.fromAmerican(99); }).toThrowError('US Odds value of 99 is invalid');
}));
test('from decimal should throw an error when passing values less than 0', () => __awaiter(void 0, void 0, void 0, function* () {
    let odd = new oddsConverter_1.OddsConverter(-1);
    expect(() => { odd.impliedProbability; }).toThrowError('Decimal odds value of -1 is invalid');
}));
test('should create an object from US odds', () => {
    let odds = oddsConverter_1.OddsConverter.fromAmerican(137.5);
    expect(odds.decimalOdds).toBe(2.375);
    odds = oddsConverter_1.OddsConverter.fromAmerican(137.5);
    expect(odds.decimalOdds).toBe(2.375);
    odds = oddsConverter_1.OddsConverter.fromAmerican(-450);
    expect(parseFloat(odds.decimalOdds.toFixed(2))).toBe(1.22);
    odds = oddsConverter_1.OddsConverter.fromAmerican(-450);
    expect(parseFloat(odds.decimalOdds.toFixed(2))).toBe(1.22);
});
test('should convert to US odds', () => {
    const expectations = [
        [2.25, 125],
        [1.25, -400],
        [1001, 100000],
        [10, 900],
    ];
    for (let e of expectations) {
        let odds = new oddsConverter_1.OddsConverter(e[0]);
        expect(odds.americanOdds).toBe(e[1]);
    }
});
