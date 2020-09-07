import { OddsConverter } from './oddsConverter';
import {IBet, BetType, PlayerBet, EventsOdd} from '../model/betDto'

export class Bookie {
   
    //the fee charged by the bookmaker
    private VIGORISH: number = 0.15;
    //initial amount for the starting probabilities 
    private INITIAL_PROB_WEIGHT: number = 50;
   
    constructor() {
    }
    
    public async setOdds(bets: Array<PlayerBet>, eventOdds: Array<EventsOdd>): Promise<Array<EventsOdd>>
    {
        if (eventOdds !== undefined)
        {
            let event1 = eventOdds[0].odd;
            let event2 = eventOdds[1].odd;

            let event1HouseStake = (event1 / 100) * this.INITIAL_PROB_WEIGHT;
            let event2HouseStake = (event2 / 100) * this.INITIAL_PROB_WEIGHT;
            
            let stubBets: IBet[] = [];

            stubBets.push({eventId: 1, stake: event1HouseStake, odd: event1, created: new Date(), betType: BetType.MoneyLine});
            stubBets.push({eventId: 2, stake: event2HouseStake, odd: event2, created: new Date(), betType: BetType.MoneyLine});
            
            bets = stubBets.concat(bets);
        }

        let probs = await this.balanceProbFromBets(bets);

        let impliedOdds: Array<EventsOdd>=[];
        let numOutcomes = probs.length;

        for (let k in probs)
        {
            let p = probs[k].odd + this.VIGORISH / numOutcomes;

            impliedOdds.push({eventId:  probs[k].eventId, odd: OddsConverter.fromProbability(p).americanOdds});
        }

        return impliedOdds;
    }

    public async balanceProbFromBets(bets: Array<PlayerBet>): Promise<Array<EventsOdd>>
    {
        //todo: this can be improved saving the last calculated value in cache or database
        
        let total = 0; 
        let outcomeTotals: Array<EventsOdd> = [];

        bets.forEach(function(betTuple)
        {
            let outcome = betTuple.eventId;
            let amount = betTuple.stake;
            
            // increment total bet and outcome specific amount
            total += amount;
            
            let existingOutcome = outcomeTotals.find(v => v.eventId == outcome);
           
            if( existingOutcome != undefined){
                existingOutcome.odd = existingOutcome.odd + amount || amount;
            }else{
                outcomeTotals.push({eventId: outcome, odd: amount });
            }

        });
        
        //stabilize amounts based on the average of bets amount
        outcomeTotals.forEach(b => { 
            b.odd /= total;
        })

        return outcomeTotals;
    }

    public getBetEarnings(bet: PlayerBet, eventIdWinner: number): PlayerBet
    {
           if(bet.eventId == eventIdWinner) {
                bet.profit = (bet.stake * OddsConverter.fromAmerican(bet.odd).decimalOdds) - bet.stake;
                bet.total = bet.stake + bet.profit;
             }
        return bet;
    }
}