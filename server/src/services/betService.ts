import { BetDTO, EventsOdd, BetTypeEnum } from "../model/betDto";
import { Bookie } from "../helpers/bookie";
import { getRepository } from "typeorm";
import { Bet } from "../entity/Bet";
import { User } from "../entity/User";
import { BetType } from "../entity/BetType";
import { UserBet } from "../entity/UserBet";
import { Match, CompetitorTypeEnum } from "../entity/Match";
import { Elo } from "../helpers/elo";


export interface IBetService {
    setUserbet(userBet: BetDTO, betUid: number): Promise<Boolean>;
    setSystemBet(bet: BetDTO, matchId: number): Promise<Array<Bet>>;
    getByMatch(matchUid: number): Promise<Array<Bet>>;
}

export class BetService implements IBetService{

    private _bookie: Bookie;
    private _userBetRepository = getRepository(UserBet);
    private _betTypeRepository = getRepository(BetType);
    private _betRepository  = getRepository(Bet);
    private _matchRepository  = getRepository(Match);

    constructor() {
      this._bookie = new Bookie();    
    }
   

    async setSystemBet(bet: BetDTO, matchUid: number): Promise<Array<Bet>> {
      
        const match = await this._matchRepository.findOne({uid: matchUid});
        
        const firstPlayerElo = 2234;
        const secondPlayerElo = 2243;
        // if(match?.competitorType == CompetitorTypeEnum.Player){
        //     //TODO: get player from player table
        // }else{
        //      //TODO: get team from team table
        // }
        
        //TODO: this is where we can use our stimation or elo calculation for specific cases.
        const probFromElo = Elo.predictResult(firstPlayerElo, secondPlayerElo);
        
        const matchOdds: Array<EventsOdd> = [];
       
        //TODO: try get starting odds without specifying eventId
        // including the vigorish
        matchOdds.push({eventId: 1, odd: probFromElo[0]});
        matchOdds.push({eventId: 2, odd: probFromElo[1]});

        const eventStartingOdds = await this._bookie.setOdds([], matchOdds);
        
        const systemBets: Array<Bet> = [];

        const betEnum = BetTypeEnum[bet.betType ?? BetTypeEnum.MoneyLine];

        const betType = await this._betTypeRepository.findOne({name: betEnum});

        eventStartingOdds.forEach(d => {
            let systemBet = this._betRepository.create({
                type: betType,
                datePlaced: new Date(),
                systemOdd: d.odd,
                match: match,
            });
            
            this._betRepository.save(systemBet);
           
            systemBets.push(systemBet); 
        });

       return systemBets;
    }
   
    async setUserbet(userBet: BetDTO, betUid: number): Promise<Boolean> {
       
        //TODO: validate bet
        
        //first let get the current odd for the player bet
        let currentBets: Array<BetDTO> = [];
        
        //second we get the eventOdd for both sides e.g player1 vs player2
        let eventOdd: Array<EventsOdd> = [];
        
        let balancedOdds = await this._bookie.setOdds(currentBets, eventOdd);
        
        let oddForPickedSide = balancedOdds.find(v => v.eventId == betUid);
       
        if(oddForPickedSide != undefined){

            //let user = await this._userRepository.findOne({ uid: userBet.user?.uid});
            let betTypeName = BetTypeEnum[userBet.betType ?? BetTypeEnum.MoneyLine];
            let bet = await this._betRepository.findOne({uid: betUid});

            userBet.odd = oddForPickedSide?.odd;
        
            //TODO: update new balanced odds for the events
            const newBet = this._userBetRepository.create({
                stake: userBet.stake,
                bettor: userBet.user,
                datePlaced: new Date(),
                odd: userBet.odd,
                bet: bet
            });

            await this._userBetRepository.save(newBet);
            
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

    async getByMatch(matchUid: number): Promise<Bet[]> {

        const match = await this._matchRepository.findOne(matchUid);
        console.log(match);
        let matchBets = await this._betRepository.find({ match: match});

        return matchBets;
    }
}