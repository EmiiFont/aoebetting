import { getRepository } from "typeorm";
import { Competitor } from "../entity/Competitor";
import { Player } from "../entity/Player";
import { ApiPlayer } from "../model/apiInterfaces";
import { PlayerDto } from "../model/playerDto";
import { ApiPlayerService, IApiPlayerService } from "./aoe2ApiService";
import { ITournamentEloService, TournamentEloService } from "./tournamentEloApiService";

export interface IPlayerService{
    addPlayer(playerDto: PlayerDto): Promise<Player>;
    autoAddPlayers(top: number): Promise<Player[]>
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
   

    async autoAddPlayers(top: number): Promise<Player[]> {
        let aoePlayers: ApiPlayer[] = await this._aoeApiService.getPlayers(top);
        let tournamentEloPlayers = await this._tournamentElo.getPlayers();
        

        aoePlayers.forEach(c => {
        let tourEloPlayer = tournamentEloPlayers.find(v => v.name.indexOf(c.name))
        let tournamentElo;
        if(tourEloPlayer){
           tournamentElo = tourEloPlayer.elo;
        }
         


            // this._playerRepository.create({
            //     name: c.name,
            //     elo: c.rating,
            //     gamesPlayed: c.games,
            //     country: c.country,
            //     winStreak: c.streak
            // })
        })
       return <Player[]>[];
    }

    addPlayer(playerDto: PlayerDto): Promise<Player> {
        throw new Error("d");
    }
}