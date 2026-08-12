import { ApiPlayer, Description, ApiContent, ApiPlayerMatch, Match } from "../model/apiInterfaces";
import { aoe2net } from "../config/apiUrl";
import { HttpWrapper } from "../helpers/httpWrapper";

export interface IApiPlayerService {
  getPlayers(count: number): Promise<Array<ApiPlayer>>;
  getPlayerMatchHistory(profileId: number, numberOfMatches: number): Promise<Array<Match>>;
  getApiMaps(): Promise<Array<Description>>;
  getPlayerLastMatch(profileID: number): Promise<Match>;
  getCurrentMatchByPlayers(player1ProfileId: number, player2ProfileId: number): Promise<Match>;
}

export class ApiPlayerService implements IApiPlayerService {
  private http: HttpWrapper;
  /**
   *
   */
  constructor() {
    this.http = new HttpWrapper(aoe2net);
  }

  /**
   * Get the available list of maps played in the game
   */
  async getApiMaps(): Promise<Description[]> {
    const apiParams = "strings?game=aoe2de&language=en";

    const content = <ApiContent>await this.http.get(apiParams);

    return content.mapType;
  }

  /**
   * Returns the games played by a player.
   *
   * @param profileId - the profile id from aoe2.net of the player
   * @param numberOfMatches - number of games to retrieve max is 1000
   * @returns Match[] object containing the list of games
   *
   */
  async getPlayerMatchHistory(profileId: number, numberOfMatches: number): Promise<Match[]> {
    const apiParams = `player/matches?game=aoe2de&profile_id=${profileId}&count=${numberOfMatches}`;

    const matches = await this.http.get(apiParams);

    return <Match[]>matches;
  }

  /**
   * Returns the players sorted descending by their highest elo
   *
   * @param count - number of players to retrieve max is 10000
   * @returns ApiPlayer[] object containing the list of players
   *
   */
  async getPlayers(count: number): Promise<ApiPlayer[]> {
    const apiParams = `leaderboard?game=aoe2de&leaderboard_id=3&start=1&count=${count}`;

    const play = await this.http.get(apiParams);

    return <ApiPlayer[]>play.leaderboard;
  }

  /**
   * Returns the match information by player profile id
   *
   * @param profileId - player profile id from aoe2.net
   * @returns Match[] object containing the match information
   *
   */
  async getPlayerLastMatch(profileId: number): Promise<Match> {
    const apiParams = `player/lastmatch?game=aoe2de&profile_id=${profileId}`;

    const match = <ApiPlayerMatch>await this.http.get(apiParams);
    let lastMatch: Match = match.last_match;

    //for some reason aoe2 api doesn't bring who won the match, but that information is available in the
    //match history of the player;
    if (lastMatch.finished != null && lastMatch.finished != undefined) {
      const apiParam2s = `player/matches?game=aoe2de&profile_id=${match.profile_id}&count=${2}`;
      const matches = <Match[]>await this.http.get(apiParam2s);
      const lastMatchFull = matches.find((v) => v.match_id == lastMatch.match_id);

      lastMatch = lastMatchFull != undefined ? lastMatchFull : lastMatch;
    }

    return <Match>lastMatch;
  }

  /**
   * Returns the current match information, useful to see if a match has completed to
   * automatically set the winners
   *
   * @param player1ProfileId - first player profile id from aoe2.net
   * @param player2ProfileId - second player profile id from aoe2.net
   * @returns Match object containing the match information
   *
   */
  async getCurrentMatchByPlayers(player1ProfileId: number, player2ProfileId: number): Promise<Match> {
    const apiParams = `player/lastmatch?game=aoe2de&profile_id=${player1ProfileId}`;
    const apiParams2 = `player/lastmatch?game=aoe2de&profile_id=${player2ProfileId}`;

    const player1Match = <ApiPlayerMatch>await this.http.get(apiParams);
    const player2Match = <ApiPlayerMatch>await this.http.get(apiParams2);

    if (player1Match.last_match.match_id == player2Match.last_match.match_id) {
      let lastMatch: Match = player1Match.last_match;
      //for some reason aoe2 api doesn't bring who won the match, but that information is available in the
      //match history of the player;
      if (lastMatch.finished != null && lastMatch.finished != undefined) {
        const apiParam2s = `player/matches?game=aoe2de&profile_id=${player1Match.profile_id}&count=${2}`;
        const matches = <Match[]>await this.http.get(apiParam2s);
        const lastMatchFull = matches.find((v) => v.match_id == lastMatch.match_id);

        lastMatch = lastMatchFull != undefined ? lastMatchFull : lastMatch;
      }

      return <Match>lastMatch;
    }

    return <Match>{};
  }
}
