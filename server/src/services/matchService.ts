import { Match } from "../entity/Match"

import { getRepository, DeleteDateColumn, Connection, getConnection } from "typeorm";
import { MatchDto } from "../model/match";
import { ApiPlayerService } from "./aoe2ApiService";
import { ExceptionHandler } from "winston";
import { MatchInformation } from "../entity/MatchInformation";
import { Competitor } from "../entity/Competitor";

export interface IMatchService{
    addMatch(matchDto: MatchDto): Promise<Match>;
    getMatchById(uid: number): Promise<Match | undefined>;
    getMatches(perPage: number, page: number): Promise<Array<Match>>;
    setMatchStarted(matchUid: number, tryGetApi: Boolean): Promise<Match>;
    setMatchFinished(matchUid: number, tryGetApi: Boolean ): Promise<Match>;
}

export class MatchService implements IMatchService {

    private _matchRepository = getRepository(Match);
    private _matchInformationRepository = getRepository(MatchInformation);
    private _competitorRepository = getRepository(Competitor);
    private _aoeApiService: ApiPlayerService;
    
    constructor() {
       this._aoeApiService = new ApiPlayerService(); 
    }
   
    
    async getMatches(perPage: number, page: number): Promise<Match[]> {
       
        const skip = (perPage * page) - perPage;

        let matchQuery = this._matchRepository.createQueryBuilder('match');
        matchQuery = matchQuery.skip(skip);
        matchQuery = matchQuery.take(perPage);

        const { entities, raw } = await matchQuery.getRawAndEntities();

        return entities;
    }

    async setMatchStarted(matchUid: number, tryGetApi: Boolean): Promise<Match> {
        let match = await this._matchRepository.findOneOrFail({uid: matchUid});
        match.Started = new Date();
        
        if(tryGetApi){
            //TODO: get player profile id based on the players in this match
            let playerProfileId= 12312;
            let player2ProfileId= 12312;

            let thisMatch = await this._aoeApiService.getCurrentMatchByPlayers(playerProfileId, player2ProfileId);
            if(thisMatch.match_id !== undefined){
              //  match.MatchIdFromApi = thisMatch.match_id;
            }
        }

        this._matchRepository.save(match);

        return match;
    }

    async setMatchFinished(matchUid: number, tryGetApi: Boolean): Promise<Match> {
        
        let match = await this._matchRepository.findOneOrFail({uid: matchUid});
       
        if(tryGetApi){
            //TODO: get player profile id based on the players in this match
            let playerProfileId= 12312;
            let player2ProfileId= 12312;

            let thisMatch = await this._aoeApiService.getCurrentMatchByPlayers(playerProfileId, player2ProfileId);
            
        //     if(thisMatch.match_id == match.MatchIdFromApi){
        //         match.finished = new Date(thisMatch.finished);
        //     }
        // }else{
        //     match.finished = new Date();
        // }
        }
        this._matchRepository.save(match);
        //TODO: calculate winners after match is finished.

        return match;
    }
    
    async addMatch(matchDto: MatchDto): Promise<Match> {

        const matchinformation: Array<MatchInformation> = [];
        
        const minimumMatchesToPlay = Math.trunc(matchDto.bestOf / 2) + 1;

        let match = this._matchRepository.create({
            title: matchDto.title,
            competitorOneUid: matchDto.competitorOneUid,
            competitorTwoUid: matchDto.competitorTwoUid,
            competitorType: matchDto.competitorType,
            lastUpdate: new Date(),
            bestOf: matchDto.bestOf,
            matchInformation: matchinformation
        });
        
        const matchSaved = await this._matchRepository.save(match);
       
        for(let i=1; i<= minimumMatchesToPlay; i++){
            let matchinfo = this._matchInformationRepository.create({
                lastUpdate: new Date(),
                match: matchSaved,
                winnerUid: 2
            });
          
        matchinformation.push(await this._matchInformationRepository.save(matchinfo));
        }

        matchSaved.matchInformation = matchinformation;

        await this.setMatchInformationWinner(match.uid);

        return matchSaved;
    }

    async setMatchInformationWinner(matchUid: number){
        const match = await this._matchRepository.findOne(matchUid, {relations: ['matchInformation']});

        const competitor = await this._competitorRepository.findOne(1);
        console.log(competitor);
        if(competitor != undefined){
            
            const matchInfo = match?.matchInformation.find(c => c.Started == null && c.finished == null);
            
            if(matchInfo != undefined){
               console.log("no match INFO")
                matchInfo.competitor = competitor
                this._matchInformationRepository.save(matchInfo);
            }
        }
       
    }

    async getMatchById(uid: number): Promise<Match | undefined> {
        console.log(uid);
        let match = await this._matchRepository.findOne(uid, {relations: ['matchInformation']});
        return match;
    }

}