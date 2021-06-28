import { Elo, EloResult } from "../src/helpers/elo";

test("ELO should be greater than starting elo when winning a match", async () => {
  const playerAElo = 1100;
  const playerBElo = 1122;

  const elo = new Elo(playerAElo, playerBElo, EloResult.WIN, EloResult.LOOSE);

  const results = elo.GetNewRatings();

  expect(results[0]).toBeGreaterThan(playerAElo);
});

test("ELO should be lower than starting elo when losing a match", async () => {
  const playerAElo = 0;
  const playerBElo = 1121;

  const elo = new Elo(playerAElo, playerBElo, EloResult.LOOSE, EloResult.WIN);

  const results = elo.GetNewRatings();

  expect(results[0]).toBeLessThan(playerAElo);
});

test("predicted win should be greater for greater elo", async () => {
  const playerAElo = 2243;
  const playerBElo = 2234;

  const predicted = Elo.predictResult(playerAElo, playerBElo);

  console.log(predicted);
  expect(predicted[0] > predicted[1]).toBeTruthy();
});
