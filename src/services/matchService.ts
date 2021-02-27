import { injectable } from "inversify";
import { CompetitorTypeEnum, Match } from "../entity/Match";
import * as _ from "lodash";

import { getRepository } from "typeorm";
import { Player } from "../entity/Player";
import { MatchDto } from "../model/match";
import { ApiPlayerService } from "./aoe2ApiService";
import { MatchInformation } from "../entity/MatchInformation";
import { MatchCompetitor } from "../entity/matchCompetitor";
import { Team } from "../entity/team";
import { TeamPlayer } from "../entity/teamPlayer";
import { IliquipediaService, LiquipediaService } from "./liquipediaService";

export interface IMatchService {
  addMatch(matchDto: MatchDto): Promise<Match>;
  getMatchById(uid: number): Promise<Match | undefined>;
  getMatches(perPage: number, page: number): Promise<Array<Match>>;
  setMatchStarted(matchUid: number, tryGetApi: boolean): Promise<Match>;
  setMatchFinished(matchUid: number, tryGetApi: boolean): Promise<Match>;
  getMatchInformationByMatch(matchUid: number): Promise<MatchInformation[] | undefined>;
  getMatchCompetitorByMatch(uid: number): Promise<MatchCompetitor[] | undefined>;
  addMatchesFromLiquipedia(): Promise<Match[]>;
}

@injectable()
export class MatchService implements IMatchService {
  private _matchRepository = getRepository(Match);
  private _matchInformationRepository = getRepository(MatchInformation);
  private _teamRepository = getRepository(Team);
  private _teamPlayerRepository = getRepository(TeamPlayer);
  private _playerRepository = getRepository(Player);
  private _matchCompetitor = getRepository(MatchCompetitor);
  private _aoeApiService: ApiPlayerService;
  private _liquidpediaService: IliquipediaService;

  constructor() {
    this._aoeApiService = new ApiPlayerService();
    this._liquidpediaService = new LiquipediaService();
  }

  async getMatches(perPage: number, page: number): Promise<Match[]> {
    const skip = perPage * page - perPage;

    let matchQuery = this._matchRepository.createQueryBuilder("match");
    matchQuery = matchQuery.skip(skip);
    matchQuery = matchQuery.take(perPage);

    const { entities, raw } = await matchQuery.getRawAndEntities();

    return entities;
  }

  async setMatchStarted(matchUid: number, tryGetApi: boolean): Promise<Match> {
    const match = await this._matchRepository.findOneOrFail({ uid: matchUid });
    match.startDate = new Date();

    if (tryGetApi) {
      //TODO: get player profile id based on the players in this match
      const playerProfileId = 12312;
      const player2ProfileId = 12312;

      const thisMatch = await this._aoeApiService.getCurrentMatchByPlayers(playerProfileId, player2ProfileId);
      if (thisMatch.match_id !== undefined) {
        //  match.MatchIdFromApi = thisMatch.match_id;
      }
    }

    await this._matchRepository.save(match);

    return match;
  }

  async setMatchFinished(matchUid: number, tryGetApi: boolean): Promise<Match> {
    const match = await this._matchRepository.findOneOrFail({ uid: matchUid });

    if (tryGetApi) {
      //TODO: get player profile id based on the players in this match
      const playerProfileId = 12312;
      const player2ProfileId = 12312;

      const thisMatch = await this._aoeApiService.getCurrentMatchByPlayers(playerProfileId, player2ProfileId);

      //     if(thisMatch.match_id == match.MatchIdFromApi){
      //         match.finished = new Date(thisMatch.finished);
      //     }
      // }else{
      //     match.finished = new Date();
      // }
    }
    await this._matchRepository.save(match);
    //TODO: calculate winners after match is finished.

    return match;
  }

  async addMatch(matchDto: MatchDto): Promise<Match> {
    const matchInformation: Array<MatchInformation> = [];

    const minimumMatchesToPlay = Math.trunc(matchDto.bestOf || 0 / 2) + 1;
    let matchSaved;

    if (matchDto.uid) {
      matchSaved = await this._matchRepository.findOne(matchDto.uid, { relations: ["matchInformation"] });
    }
    if (matchSaved) {
      matchSaved.title = matchDto.title || "";
      matchSaved.competitorType = matchDto.competitorType;
      matchSaved.lastUpdate = new Date();
      matchSaved.bestOf = matchDto.bestOf || 0;
      matchSaved = await this._matchRepository.save(matchSaved);
    } else {
      matchSaved = this._matchRepository.create({
        title: matchDto.title,
        competitorType: matchDto.competitorType,
        lastUpdate: new Date(),
        bestOf: matchDto.bestOf,
        matchInformation: matchInformation,
      });

      matchSaved = await this._matchRepository.save(matchSaved);
      for (let i = 1; i <= minimumMatchesToPlay; i++) {
        const matchinfo = this._matchInformationRepository.create({
          lastUpdate: new Date(),
          match: matchSaved,
          winnerUid: 2,
        });
        matchInformation.push(await this._matchInformationRepository.save(matchinfo));
        matchSaved.matchInformation = matchInformation;
      }
    }
    await this.setMatchCompetitor(matchDto, matchSaved);
    //await this.setMatchInformationWinner(matchexist.uid);

    return matchSaved;
  }

  /**
   * Set the players/teams for the match.
   *
   * @param MatchDto the match dto information
   * @param number matchUid of the match to set up
   * @param double scoreA Score of A
   * @param double scoreB Score of B
   * @returns {Elo}
   */
  async setMatchCompetitor(matchDto: MatchDto, match: Match) {
    //this means the competitors belong to an already created team
    if (matchDto.searchByTeam) {
      await this._matchCompetitor.save({ teamUid: matchDto.teamOne[0], matchUid: match.uid });
      await this._matchCompetitor.save({ teamUid: matchDto.teamOne[0], matchUid: match.uid });
    } else {
      const firstTeam = await this._teamRepository.save({
        name: new Date().getTime().toString(),
        searchable: false,
      });
      const secondTeam = await this._teamRepository.save({
        name: new Date().getTime().toString(),
        searchable: false,
      });

      switch (matchDto.competitorType) {
        case CompetitorTypeEnum.OneVsOne:
        case CompetitorTypeEnum.TwoVsTwo:
        case CompetitorTypeEnum.ThreeVsThree:
        case CompetitorTypeEnum.FourVsFour:
        case CompetitorTypeEnum.FreeForAll: {
          //create teams to group the players, this teams are only visible by the system.
          //TODO: search for existing player teams to avoid creating another team with the same player(s)

          //add the players selected from the client to the corresponding team. either team is fine
          //we just need a teamId
          for (const playerUid of matchDto.teamOne) {
            await this._teamPlayerRepository.save({ teamUid: firstTeam.uid, playerUid: playerUid });
          }

          for (const playerUid of matchDto.teamTwo) {
            await this._teamPlayerRepository.save({ teamUid: secondTeam.uid, playerUid: playerUid });
          }

          //save the match competitors
          await this._matchCompetitor.save({ team: firstTeam, match: match });
          await this._matchCompetitor.save({ team: secondTeam, match: match });
          break;
        }
      }
      //create teams for the players id
    }
  }

  async setMatchInformationWinner(matchUid: number) {
    // const match = await this._matchRepository.findOne(matchUid, {relations: ['matchInformation']});
    // const competitor = await this._competitorRepository.findOne(1);
    // if(competitor != undefined){
    //     const matchInfo = match?.matchInformation.find(c => c.Started == null && c.finished == null);
    //     if(matchInfo != undefined){
    //         matchInfo.competitor = competitor
    //         this._matchInformationRepository.save(matchInfo);
    //     }
    // }
  }

  async getMatchById(uid: number): Promise<Match | undefined> {
    return await this._matchRepository.findOne(uid, { relations: ["matchInformation", "matchCompetitor"] });
  }
  async getMatchInformationByMatch(uid: number): Promise<MatchInformation[] | undefined> {
    return await this._matchInformationRepository.find({ matchUid: uid });
  }
  async getMatchCompetitorByMatch(uid: number): Promise<MatchCompetitor[] | undefined> {
    return await this._matchCompetitor.find({ matchUid: uid });
  }

  async addMatchesFromLiquipedia(): Promise<Match[]> {
    const liquiMatches = await this._liquidpediaService.getMatchList();
    const result = [];
    for (const curMatch of liquiMatches.upcomingGames) {
      if (_.isEmpty(curMatch.team1) && _.isEmpty(curMatch.team2)) {
        continue;
      }
      const player1 = await this._playerRepository.findOne({ where: `"name" ILIKE '${curMatch.team1}'` });
      const player2 = await this._playerRepository.findOne({ where: `"name" ILIKE '${curMatch.team2}'` });

      if (player1 != undefined && player2 != undefined) {
        const matchTitle = `${curMatch.team1} vs ${curMatch.team2}`;
        const matchTournament = curMatch.tournament;

        //const matchCompetitor = await this._matchCompetitor.save({});
        const matchExist = await this._matchRepository.findOne({ title: matchTitle, tournament: matchTournament });
        if (!matchExist) {
          const match = await this._matchRepository.save({
            bestOf: curMatch.bestOf,
            title: matchTitle,
            startDate: curMatch.startTime,
            tournament: matchTournament,
            competitorType: CompetitorTypeEnum.OneVsOne,
          });
          result.push(match);
          const matchDto: MatchDto = {
            teamOne: [player1.uid],
            teamTwo: [player2.uid],
            competitorType: match.competitorType,
            searchByTeam: false,
          };
          await this.setMatchCompetitor(matchDto, match);
        }
      }
    }
    return result;
  }
}