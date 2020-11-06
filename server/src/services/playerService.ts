import { getRepository, Like } from "typeorm";
import { Competitor } from "../entity/Competitor";
import { Player } from "../entity/Player";
import { Team } from "../entity/team";
import { Pagination } from "../helpers/pagination";
import { ApiPlayer } from "../model/apiInterfaces";
import { PlayerDto } from "../model/playerDto";
import { ApiPlayerService, IApiPlayerService } from "./aoe2ApiService";
import { ITournamentEloService, TournamentEloService } from "./tournamentEloApiService";

export interface IPlayerService{
    updatePlayer(playerDto: PlayerDto): Promise<Player>;
    autoAddPlayers(top: number): Promise<Player[]>;
    getPlayer(id: number): Promise<Player | undefined>;
    getPlayes(page: number, count: number, search: string): Promise<Pagination<Player>>;
    searchPlayer(name: string): Promise<Player[]>;
}

export class PlayerService implements IPlayerService{
    
    private _teamRepository = getRepository(Team);
    private _playerRepository = getRepository(Player);
    private _aoeApiService: IApiPlayerService;
    private _tournamentElo: ITournamentEloService;
    
    constructor() {
       this._aoeApiService = new ApiPlayerService(); 
       this._tournamentElo = new TournamentEloService(); 
    }

    async getPlayes(page: number, count: number, search: string): Promise<Pagination<Player>> {
        const take = count || 10;
        let skip = page || 0;
      
        if(search.length > 0){
           skip = 0;
        }
        const [result, total] = await this._playerRepository.findAndCount(
         {
            where: { name: Like('%' + search + '%') }, order: { name: "DESC" },
            take: take,
            skip: skip
          }
        );
   
        return {
            page: page,
            data: result,
            totalCount: total,
            limit: take
        };
    }
    
    async searchPlayer(name: string): Promise<Player[]> {
        //TODO: use parameterized queries.
        return await this._playerRepository.find({where: `name ILIKE '%${name}%'`, });
    }
    
    async getPlayer(id: number): Promise<Player | undefined> {
        return await this._playerRepository.findOne({uid: id});
    }

    async autoAddPlayers(top: number): Promise<Player[]> {
        let aoePlayers: ApiPlayer[] = await this._aoeApiService.getPlayers(top);
        let tournamentEloPlayers = await this._tournamentElo.getPlayers();
        let addedPlayers: Player[] = [];
        
        console.log("here");

        try {
       
         tournamentEloPlayers.forEach(async tourEloPlayer => {
             let aoe2EloPlayer = aoePlayers.filter(v => v.name.toLocaleLowerCase().indexOf(tourEloPlayer.name.toLocaleLowerCase()) >= 0);
             
             if(aoe2EloPlayer.length > 0){
            
            let aoeEloFullPlayer = await this._tournamentElo.getPlayerInfo(tourEloPlayer.id);
            
            const [first] = aoe2EloPlayer;
            let playerToSave: Player | undefined;

            //TODO: player has multiple accounts, we need to handle this on the database or no? 
            if(aoe2EloPlayer.length > 1){
                aoe2EloPlayer.forEach(multipleAccounts => {
                    if(multipleAccounts != undefined){
                       
                    }
                })
            }
            let steamId = aoe2EloPlayer.find(c => c.steam_id ==  aoeEloFullPlayer.steam_id);
            if(steamId != undefined){
                let tournamentElo = tourEloPlayer.elo;
                
                let averagedElo = (first.rating + tournamentElo) / 2;

                //player exist update
                playerToSave = await this._playerRepository.findOne({steamName: first.name});

                if(playerToSave != undefined){
                    //player is retired what to do?
                    if(aoeEloFullPlayer.retired){

                    }else{
                         playerToSave.averageRating = averagedElo;
                         playerToSave.aoe2NetRating = first.rating;
                         playerToSave.aoeEloComRating =  tournamentElo;
                         playerToSave.rating = 0
                         playerToSave.gamesPlayed = first.games;
                         playerToSave.gamesWon = first.wins;
                    }
                }else{
                    playerToSave = this._playerRepository.create({
                        steamId:  first.steam_id,
                        name: tourEloPlayer.name,
                        steamName: first.name,
                        aoe2NetRating: first.rating,
                        averageRating: averagedElo,
                        aoeEloComRating: tournamentElo,
                        rating: 0,
                        gamesPlayed: first.games,
                        country: first.country,
                        winStreak: first.streak,
                        gamesWon: first.wins,
                        gamesDropped: 0,
                        clan: "",
                    });
                }
               addedPlayers.push(await this._playerRepository.save(playerToSave));
               await this._teamRepository.save({name: playerToSave.name, searchable: false});
             }
           }
        })
       return addedPlayers;
    } catch (error) {
            //log error
            console.log(error);
      }

      return addedPlayers;
    }

    updatePlayer(playerDto: PlayerDto): Promise<Player> {
        throw new Error("Implement this method");
    }
}