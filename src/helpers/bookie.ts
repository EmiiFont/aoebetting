import { OddsConverter } from './oddsConverter';
import {Bet} from '../model/bet'
import { Odd } from '../model/odd';
import {MatchOdd} from '../model/match'
import {BetSide} from '../model/bet'

export class Bookie {
   
    private _oddsConverter: OddsConverter;
    private VIGORISH: number = 0.15;
    private INITIAL_PROB_WEIGHT: number = 50;
   
    constructor() {
        this._oddsConverter = new OddsConverter();
    }
    
    public async setOdds(bets: Array<Bet>, calculatedProbs: MatchOdd): Promise<Array<Bet>>
    {
        if (calculatedProbs !== undefined)
        {
            let player1Prob = calculatedProbs.firstPlayerOdd.odd.getImpliedProbability;
            let player2Prob = calculatedProbs.secondPlayerOdd.odd.getImpliedProbability;

            let player1Amount = (player1Prob / 100) * this.INITIAL_PROB_WEIGHT;
            let player2Amount = (player2Prob / 100) * this.INITIAL_PROB_WEIGHT;
            
            let stubBets: Bet[] = [];

            if(player1Prob > player2Prob){
                stubBets.push({betSide: BetSide.Over, amount: player1Amount});
                stubBets.push({betSide: BetSide.Under, amount: player2Amount});
            }else{
                stubBets.push({betSide: BetSide.Over, amount: player2Amount});
                stubBets.push({betSide: BetSide.Under, amount: player1Amount});
            }
            
            bets = stubBets.concat(bets);
        }

        let probs = await this.balanceProbFromBets(bets);

        let impliedOdds: Array<Bet>=[];
        let numOutcomes = 2; //only two possible outcomes (over and under)
        

        for (let k in probs)
        {
            let p = probs[k].amount + this.VIGORISH / numOutcomes;

            impliedOdds.push({betSide:  probs[k].betSide, amount: (await this._oddsConverter.fromProbability(p)).getAmerican});
        }

        return impliedOdds;
    }

    public async balanceProbFromBets(bets: Array<Bet>): Promise<Array<Bet>>
    {
        let total = 0; 
        let outcomeTotals: Array<Bet> = [];

        bets.forEach(function(betTuple)
        {
            let outcome = betTuple.betSide;
            let amount = betTuple.amount;
            
            // increment total bet and outcome specific amount
            total += amount;
            
            let existingOutcome = outcomeTotals.find(v => v.betSide == outcome);
           
            if( existingOutcome != undefined){
                existingOutcome.amount = existingOutcome.amount + amount || amount;
            }else{
                outcomeTotals.push({betSide: outcome, amount: amount});
            }

        });
        
        //stabilize amounts based on the average of bets amount
        outcomeTotals.forEach(b => { 
            b.amount /= total;
        })

        return outcomeTotals;
    }

    public async getBetEarnings(bets: Array<Bet>, outcomeWinner: Bet): Promise<void>
    {
        bets.forEach(b => {
            
            let profit = 0;

            if(b.betSide == outcomeWinner.betSide){
                if(outcomeWinner.amount < 0){
                  profit = b.amount / (outcomeWinner.amount/100);
                }else{
                  profit = b.amount * (outcomeWinner.amount/100);
              }

             let stakePlusProfit = b.amount + profit;
           }
        })

    }
}