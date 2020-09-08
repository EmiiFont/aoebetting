import { IBet, PlayerBet, EventsOdd } from "../model/bet";
import { Bookie } from "../helpers/bookie";


export interface IBetService {
    setBet(userBet: PlayerBet, matchId: number): Promise<Boolean>;
}

export class BetService implements IBetService{

    private _bookie: Bookie;

    constructor() {
      this._bookie = new Bookie();    
    }
   
    async setBet(userBet: PlayerBet, eventId: number): Promise<Boolean> {
       
        //TODO: validate bet
        
        //first let get the current odd for the player bet
        let currentBets: Array<PlayerBet> = [];
        
        //second we get the eventOdd for both sides e.g player1 vs player2
        let eventOdd: Array<EventsOdd> = [];
        
        let balancedOdds = await this._bookie.setOdds(currentBets, eventOdd);
        
        let oddForPickedSide = balancedOdds.find(v => v.eventId == eventId);
       
        if(oddForPickedSide != undefined){
            userBet.odd = oddForPickedSide?.odd;
        
            //TODO: update new balanced odds for the events
            return true;
        }

        //log problem
        return false;
    }
}