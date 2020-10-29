import { getRepository, Like } from "typeorm";
import { isThisTypeNode } from "typescript";
import { tournamentElo } from "../config/apiUrl";
import { Competitor } from "../entity/Competitor";
import { Player } from "../entity/Player";
import { ApiPlayer } from "../model/apiInterfaces";
import { PlayerDto } from "../model/playerDto";
import { ApiPlayerService, IApiPlayerService } from "./aoe2ApiService";
import { ITournamentEloService, TournamentEloService } from "./tournamentEloApiService";

export interface IPlayerService{
    addPlayer(playerDto: PlayerDto): Promise<Player>;
    autoAddPlayers(top: number): Promise<Player[]>;
    getPlayer(id: number): Promise<Player | undefined>;
    searchPlayer(name: string): Promise<Player[]>;
}

export class PlayerService implements IPlayerService{
    
    private _competitorRepository = getRepository(Competitor);
    private _playerRepository = getRepository(Player);
    private _aoeApiService: IApiPlayerService;
    private _tournamentElo: ITournamentEloService;
    
    constructor() {
       this._aoeApiService = new ApiPlayerService(); 
       this._tournamentElo = new TournamentEloService(); 
    }
    
    async searchPlayer(name: string): Promise<Player[]> {
        //TODO: use parameterized queries.
        return await this._playerRepository.find({ where: `name ILIKE '%${name}%'`, });
    }
    
    async getPlayer(id: number): Promise<Player | undefined> {
        return await this._playerRepository.findOne({uid: id});
    }

    async autoAddPlayers(top: number): Promise<Player[]> {
        let aoePlayers: ApiPlayer[] = await this._aoeApiService.getPlayers(top);
        let tournamentEloPlayers = await this._tournamentElo.getPlayers();
        
        let exist: any = [];
        tournamentEloPlayers.forEach(async tourEloPlayer => {
            let aoe2EloPlayer = aoePlayers.filter(v => v.name.toLocaleLowerCase().indexOf(tourEloPlayer.name.toLocaleLowerCase()) >= 0);
            
            const [first] = aoe2EloPlayer;
            let playerToSave: Player | undefined;

            //TODO: player has multiple accounts, we need to handle this on the database or no? 
            if(aoe2EloPlayer.length > 1){
                aoe2EloPlayer.forEach(multipleAccounts => {
                    if(multipleAccounts != undefined){
                       
                    }
                })
            }

            if(first != undefined){
                let tournamentElo = tourEloPlayer.elo;
                
                let averagedElo = (first.rating + tournamentElo) / 2;
                
                //player exist update
                playerToSave = await this._playerRepository.findOne({name: first.name});

                if(playerToSave != undefined){
                    let tournamentPlayerInfo = await this._tournamentElo.getPlayerInfo(tourEloPlayer.id);
                 
                    //player is retired what to do?
                    if(tournamentPlayerInfo.retired){

                    }else{
                         playerToSave.averagedElo = averagedElo;
                         playerToSave.elo = first.rating;
                         playerToSave.gamesPlayed = first.games;
                         playerToSave.gamesWon = first.wins;
                         playerToSave.calculatedElo =  tournamentElo;
                    }

                }else{
                    playerToSave = this._playerRepository.create({
                        name: first.name,
                        elo: first.rating,
                        gamesPlayed: first.games,
                        country: first.country,
                        winStreak: first.streak,
                        averagedElo: averagedElo,
                        calculatedElo: tournamentElo,
                        gamesWon: first.wins
                    });
                }
                this._playerRepository.save(playerToSave);
            }
        })
       return <Player[]>[];
    }


    addPlayer(playerDto: PlayerDto): Promise<Player> {
        throw new Error("d");
    }
}