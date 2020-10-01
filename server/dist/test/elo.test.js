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
const elo_1 = require("../src/helpers/elo");
test('ELO should be greater than starting elo when winning a match', () => __awaiter(void 0, void 0, void 0, function* () {
    const playerAElo = 1100;
    const playerBElo = 1121;
    let elo = new elo_1.Elo(playerAElo, playerBElo, elo_1.EloResult.WIN, elo_1.EloResult.LOOSE);
    let results = elo.GetNewRatings();
    expect(results[0]).toBeGreaterThan(playerAElo);
}));
test('ELO should be lower than starting elo when losing a match', () => __awaiter(void 0, void 0, void 0, function* () {
    const playerAElo = 1100;
    const playerBElo = 1121;
    let elo = new elo_1.Elo(playerAElo, playerBElo, elo_1.EloResult.LOOSE, elo_1.EloResult.WIN);
    let results = elo.GetNewRatings();
    expect(results[0]).toBeLessThan(playerAElo);
}));
test('predicted win should be greater for greater elo', () => __awaiter(void 0, void 0, void 0, function* () {
    const playerAElo = 2243;
    const playerBElo = 2234;
    let predicted = elo_1.Elo.predictResult(playerAElo, playerBElo);
    console.log(predicted);
    expect(predicted[0] > predicted[1]).toBeTruthy();
}));
