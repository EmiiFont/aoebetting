import { Bookie } from "../src/helpers/bookie";
import { BetType, PlayerBet, EventsOdd } from "../src/model/betDto";

test('bookie should return correct odd with no bets', async () => {

    let bookie = new Bookie();
    let bets: Array<PlayerBet> = [];
    let matchOdds: Array<EventsOdd> = [];

    //starting match odds from our calculations
    matchOdds.push({eventId: 1, odd: 51});
    matchOdds.push({eventId: 2, odd: 49});

    //bets from users
    bets.push({eventId: 1, stake: 0, odd: 51, created: new Date(), betType: BetType.MoneyLine, userId: 5});
    bets.push({eventId: 2, stake: 0, odd: 49, created: new Date(), betType: BetType.MoneyLine, userId: 5555});

    let balancedOdds = await  bookie.setOdds(bets, matchOdds);
    
    expect(balancedOdds[0].odd).toBe(-140.96385542168673);
  });

  test('should return more juicy odds for one sided bets', async () => {

    let bookie = new Bookie();
    let bets: Array<PlayerBet> = [];
    let matchOdds: Array<EventsOdd> = [];

    matchOdds.push({eventId: 1, odd: 51});
    matchOdds.push({eventId: 2, odd: 49});

    bets.push({eventId: 1, stake: 100, odd: 51, created: new Date(), betType: BetType.MoneyLine, userId: 51});
    bets.push({eventId: 2, stake: 10, odd: 49, created: new Date(), betType: BetType.MoneyLine, userId: 52});
    bets.push({eventId: 2, stake: 30, odd: 49, created: new Date(), betType: BetType.MoneyLine, userId: 53});
    bets.push({eventId: 2, stake: 50, odd: 49, created: new Date(), betType: BetType.MoneyLine, userId: 54});
    bets.push({eventId: 2, stake: 80, odd: 49, created: new Date(), betType: BetType.MoneyLine, userId: 55});
    bets.push({eventId: 2, stake: 100, odd: 49, created: new Date(), betType: BetType.MoneyLine, userId: 56});
    bets.push({eventId: 2, stake: 15, odd: 49, created: new Date(), betType: BetType.MoneyLine, userId: 57});
    bets.push({eventId: 2, stake: 5, odd: 49, created: new Date(), betType: BetType.MoneyLine, userId: 58});

    let balancedOdds = await  bookie.setOdds(bets, matchOdds);
    let sided = <EventsOdd>balancedOdds.find(v => v.eventId == 1);

    expect(sided.odd).toBe(177.602523659306);
  });

  test('should return the correct earnings of the winners', async () => {

    let bookie = new Bookie();
    let bets: Array<PlayerBet> = [];
    let matchOdds: Array<EventsOdd> = [];

    matchOdds.push({eventId: 1, odd: 51});
    matchOdds.push({eventId: 2, odd: 49});

    bets.push({eventId: 1, stake: 100, odd: -140, created: new Date(), betType: BetType.MoneyLine, userId: 51});
   
    for (let index = 1; index < 8; index++) {
      let balancedOdds = await  bookie.setOdds(bets, matchOdds);
      
      let waggeredEvent = balancedOdds.find(v => v.eventId == 2);
      let bet = <PlayerBet>{eventId: 2, stake: 12*index, odd: waggeredEvent?.odd, created: new Date(), betType: BetType.MoneyLine, userId: 5+index};
      bets.push(bet);
    }

    let winner = await bookie.getBetEarnings(bets[0], 1);
   
    expect(winner.profit).toBe(71.42857142857144);
  });