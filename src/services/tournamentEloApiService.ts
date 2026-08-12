import { ApiPlayer, TournameEloPlayer, Tournament } from "../model/apiInterfaces";
import { tournamentElo } from "../config/apiUrl";
import { HttpWrapper } from "../helpers/httpWrapper";

export interface ITournamentEloService {
  getPlayers(): Promise<Array<TournameEloPlayer>>;
  getTournaments(): Promise<Array<Tournament>>;
  getPlayerInfo(profileID: number): Promise<TournameEloPlayer>;
}

export class TournamentEloService implements ITournamentEloService {
  private http: HttpWrapper;
  /**
   *
   */
  constructor() {
    this.http = new HttpWrapper(tournamentElo);
  }

  async getTournaments(): Promise<Tournament[]> {
    const apiParams = "?request=tournaments";

    const play = await this.http.get(apiParams);

    return <Tournament[]>play;
  }

  async getPlayerInfo(profileID: number): Promise<TournameEloPlayer> {
    const apiParams = `?request=player&id=${profileID}`;

    const play = await this.http.get(apiParams);

    return <TournameEloPlayer>play;
  }

  /**
   * Returns the players sorted descending by their highest elo
   *
   * @returns ApiPlayer[] object containing the list of players
   *
   */
  async getPlayers(): Promise<TournameEloPlayer[]> {
    const apiParams = "?request=players";

    const play = await this.http.get(apiParams);

    const players = <TournameEloPlayer[]>play;
    return players.sort((a, b) => b.elo - a.elo);
  }
}
