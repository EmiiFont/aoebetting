import { Bookie } from "../src/helpers/bookie";
import { MatchOdd } from "../src/model/match";
import { Odd } from "../src/model/odd";
import { PlayerOdd } from "../src/model/player";
import { Bet, BetSide } from "../src/model/bet";

test('bookie should return probabilities', async () => {

    let bookie = new Bookie();
    let bets: Array<Bet> = [];

    bets.push({betSide: BetSide.Over, amount: 10});
    bets.push({betSide: BetSide.Under, amount: 0});
    // bets.push({betSide: BetSide.Under, amount: 20});
    // bets.push({betSide: BetSide.Over, amount: 15});
    // bets.push({betSide: BetSide.Over, amount: 10});
    
    let firstPlayerOdd = new Odd(0, 0, 0, 51);
    
    //second player is under
    let secondPlayerOdd = new Odd(0, 0, 0, 49);

    let firstPlayer = <PlayerOdd>{playerId: 1, odd: firstPlayerOdd};
    let secondPlayer = <PlayerOdd>{playerId: 2, odd: secondPlayerOdd};
    
    let matchOdd = <MatchOdd>{matchId: 1, firstPlayerOdd: firstPlayer, secondPlayerOdd: secondPlayer};

    let balancedOdds = await  bookie.setOdds(bets, matchOdd)
    
    console.log(balancedOdds);
    expect(balancedOdds.length).toBeGreaterThanOrEqual(2);
  });