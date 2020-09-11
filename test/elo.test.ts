import { Elo, EloResult } from "../src/helpers/elo";
import { AdvancedConsoleLogger } from "typeorm";

test('ELO should be greater than starting elo when winning a match', async () => {

    const playerAElo = 1100;
    const playerBElo = 1121;

    let elo = new Elo(playerAElo, playerBElo, EloResult.WIN, EloResult.LOOSE);
    
    let results = elo.GetNewRatings();
   
    expect(results[0]).toBeGreaterThan(playerAElo);
  });


  test('ELO should be lower than starting elo when losing a match', async () => {

    const playerAElo = 1100;
    const playerBElo = 1121;

    let elo = new Elo(playerAElo, playerBElo, EloResult.LOOSE, EloResult.WIN);
    
    let results = elo.GetNewRatings();
   
    expect(results[0]).toBeLessThan(playerAElo);
  });


  test('predicted win should be greater for greater elo', async () => {

    const playerAElo = 2243;
    const playerBElo = 2234;

    let predicted = Elo.predictResult(playerAElo, playerBElo);
    
    console.log(predicted);
    expect(predicted[0] > predicted[1]).toBeTruthy();
  });

