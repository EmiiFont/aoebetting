import { Bookie } from "../src/helpers/bookie";
import { BetTypeEnum, BetDTO, EventsOdd } from "../src/model/betDto";
import { UserDTO } from "../src/model/userDto";

test('bookie should return correct odd with no bets', async () => {

    let bookie = new Bookie();
    let bets: Array<BetDTO> = [];
    let matchOdds: Array<EventsOdd> = [];

    //starting match odds from our calculations
    matchOdds.push({eventId: 1, odd: 51});
    matchOdds.push({eventId: 2, odd: 49});

    let user1 = new UserDTO();
    user1.uid = 1;
    let user2 = new UserDTO();
    user2.uid = 5555;
    //bets from users
    bets.push({eventId: 1, stake: 0, odd: 51, created: new Date(), betType: BetTypeEnum.MoneyLine, user: user1});
    bets.push({eventId: 2, stake: 0, odd: 49, created: new Date(), betType: BetTypeEnum.MoneyLine, user: user2});

    let balancedOdds = await  bookie.setOdds(bets, matchOdds);
    
    expect(balancedOdds[0].odd).toBe(-140.96385542168673);
  });

  test('should return more juicy odds for one sided bets', async () => {

    let bookie = new Bookie();
    let bets: Array<BetDTO> = [];
    let matchOdds: Array<EventsOdd> = [];

    matchOdds.push({eventId: 1, odd: 51});
    matchOdds.push({eventId: 2, odd: 49});

    let testUser = new UserDTO();
    testUser.uid = 50;

    bets.push({eventId: 1, stake: 100, odd: 51, created: new Date(), betType: BetTypeEnum.MoneyLine, user: testUser});
    bets.push({eventId: 2, stake: 10, odd: 49, created: new Date(), betType: BetTypeEnum.MoneyLine, user: testUser});
    bets.push({eventId: 2, stake: 30, odd: 49, created: new Date(), betType: BetTypeEnum.MoneyLine, user: testUser});
    bets.push({eventId: 2, stake: 50, odd: 49, created: new Date(), betType: BetTypeEnum.MoneyLine, user: testUser});
    bets.push({eventId: 2, stake: 80, odd: 49, created: new Date(), betType: BetTypeEnum.MoneyLine, user: testUser});
    bets.push({eventId: 2, stake: 100, odd: 49, created: new Date(), betType: BetTypeEnum.MoneyLine, user: testUser});
    bets.push({eventId: 2, stake: 15, odd: 49, created: new Date(), betType: BetTypeEnum.MoneyLine, user: testUser});
    bets.push({eventId: 2, stake: 5, odd: 49, created: new Date(), betType: BetTypeEnum.MoneyLine, user: testUser});

    let balancedOdds = await  bookie.setOdds(bets, matchOdds);
    let sided = <EventsOdd>balancedOdds.find(v => v.eventId == 1);

    expect(sided.odd).toBe(177.602523659306);
  });

  test('should return the correct earnings of the winners', async () => {

    let bookie = new Bookie();
    let bets: Array<BetDTO> = [];
    let matchOdds: Array<EventsOdd> = [];

    matchOdds.push({eventId: 1, odd: 51});
    matchOdds.push({eventId: 2, odd: 49});

    let system = new UserDTO();
    system.uid = 200;

    bets.push({eventId: 1, stake: 100, odd: -140, created: new Date(), betType: BetTypeEnum.MoneyLine, user: system});
   
    for (let index = 1; index < 8; index++) {
      let balancedOdds = await  bookie.setOdds(bets, matchOdds);
      let user = new UserDTO();
       user.uid = 5+index;

      let waggeredEvent = balancedOdds.find(v => v.eventId == 2);
      let bet = <BetDTO>{eventId: 2, stake: 12*index, odd: waggeredEvent?.odd, 
        created: new Date(), betType: BetTypeEnum.MoneyLine, user: user};
      bets.push(bet);
    }

    let winner = await bookie.getBetEarnings(bets[0], 1);
   
    expect(winner.profit).toBe(71.42857142857144);
  });
