import { BetDTO, EventsOdd, BetTypeEnum } from "../model/betDto";
import { Bookie } from "../helpers/bookie";
import { getRepository } from "typeorm";
import { Bet } from "../entity/Bet";
import { User } from "../entity/User";
import { BetType } from "../entity/BetType";


export interface IBetService {
    setBet(userBet: BetDTO, matchId: number): Promise<Boolean>;
}

export class BetService implements IBetService{

    private _bookie: Bookie;
    private _betRepository = getRepository(Bet);
    private _userRepository = getRepository(User);
    private _betTypeRepository  = getRepository(BetType);

    constructor() {
      this._bookie = new Bookie();    
    }
   
    async setBet(userBet: BetDTO, eventId: number): Promise<Boolean> {
       
        //TODO: validate bet
        
        //first let get the current odd for the player bet
        let currentBets: Array<BetDTO> = [];
        
        //second we get the eventOdd for both sides e.g player1 vs player2
        let eventOdd: Array<EventsOdd> = [];
        
        let balancedOdds = await this._bookie.setOdds(currentBets, eventOdd);
        
        let oddForPickedSide = balancedOdds.find(v => v.eventId == eventId);
       
        if(oddForPickedSide != undefined){

            //let user = await this._userRepository.findOne({ uid: userBet.user?.uid});
            let betTypeName = BetTypeEnum[userBet.betType ?? BetTypeEnum.MoneyLine];
            let betType = await this._betTypeRepository.findOne({name: betTypeName});

            userBet.odd = oddForPickedSide?.odd;
        
            //TODO: update new balanced odds for the events
            const newBet = this._betRepository.create({
                stake: userBet.stake,
                bettor: userBet.user,
                datePlaced: new Date(),
                type: betType
            });

            await this._betRepository.save(newBet);
            
            return true;
        }

        //log problem
        return false;
    }

    async getUserBets(userUid: number): Promise<Array<BetDTO>>{

        let userBets = await this._betRepository.find({ uid: userUid});
        
        //TODO: get the event id of each bets
        // let btod = userBets.map(v => <BetDTO>{
        //     user: v.bettor,
        //     stake: v.stake,
        //     betType: BetTypeEnum.MoneyLine,
        //     eventId: 1,
        //     created: new Date(),
        //     odd: 1.90
        // });

        return [];
    }
}