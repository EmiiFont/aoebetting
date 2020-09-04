import { IBet, PlayerBet, EventsOdd } from "../model/bet";
import { Bookie } from "../helpers/bookie";


export interface IBetService {
    setBet(userBet: PlayerBet, matchId: number): Promise<Array<any>>;
}

export class BetService implements IBetService{

    private _bookie: Bookie;

    constructor() {
      this._bookie = new Bookie();    
    }
   
    setBet(userBet: PlayerBet, eventId: number): Promise<any[]> {
       
        //TODO: validate bet
        
        //first let get the current odd for the player bet
        let currentBets: Array<PlayerBet> = [];
        
        //second we get the eventOdd 
        let eventOdd: EventsOdd ;
        
        //this._bookie.setOdds(currentBets,)
          
        throw new Error("Method not implemented.");
    }
}