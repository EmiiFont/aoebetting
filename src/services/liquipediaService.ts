import axios, { AxiosInstance } from "axios";
import * as cheerio from "cheerio";

export interface ILiquipediMatchhList {
  liveGames: ILiquipediMatch[];
  upcomingGames: ILiquipediMatch[];
  concludedGames: ILiquipediMatch[];
}

export interface ILiquipediMatch {
  team1: string;
  team1Score?: number;
  team2: string;
  team2Score?: number;
  startTime?: string;
  tournament: string;
  tournamentURL: string;
}

export interface IliquipediaService {
  getMatchList(): Promise<ILiquipediMatchhList>;
}

export class LiquipediaService implements IliquipediaService {
  private _httpClient: AxiosInstance;

  /**
   *
   */
  constructor() {
    this._httpClient = axios.create({
      headers: {
        "Accept-Encoding": "gzip",
        "User-Agent": "liquipedia/AoEWrapper",
      },
    });
  }

  /**
   * Fetches a list of upcoming and concluded matches.
   * Start times listed in ISO
   *
   * @returns {Promise<ILiquipediMatchhList>}
   */
  async getMatchList(): Promise<ILiquipediMatchhList> {
    const matchesURL =
      "https://liquipedia.net/ageofempires/api.php?action=parse&origin=*&format=json&page=Liquipedia:Upcoming_and_ongoing_matches";
    const response = await this._httpClient.get(matchesURL);

    this._parseMatchList(response.data.parse.text["*"]);

    return this._parseMatchList(response.data.parse.text["*"]);
  }

  private _parseMatchList(matchesHtml: string): ILiquipediMatchhList {
    const $ = cheerio.load(matchesHtml);
    const matchBox = $(".panel-box");
    const matchList: ILiquipediMatchhList = {
      liveGames: [],
      upcomingGames: [],
      concludedGames: [],
    };

    const matchBoxDivs = matchBox.children("div");
    const matchBoxHeaders = matchBoxDivs.eq(0).find(".panel-box-heading > span");
    const tables = matchBoxDivs.eq(1).children("div");

    for (let i = 0, len = matchBoxHeaders.length; i < len; i++) {
      if (matchBoxHeaders.eq(i).text().indexOf("Upcoming") !== -1) {
        const matchBox = tables.eq(i);
        matchList.upcomingGames = this._parseMatch(matchBox, false);
      } else {
        const matchBox = tables.eq(i);
        matchList.concludedGames = this._parseMatch(matchBox, false);
      }
    }
    return matchList;
  }

  private _parseMatch(matchSet: cheerio.Cheerio, isLive = false): ILiquipediMatch[] {
    const matches = matchSet.find(".infobox_matches_content");
    const matchArray: ILiquipediMatch[] = [];

    for (let i = 0, len = matches.length; i < len; i++) {
      const match = matches.eq(i);
      const matchObj: ILiquipediMatch = {
        startTime: isLive
          ? undefined
          : this.parseTime(match.find(".match-filler").find(".match-countdown").find("span > span").text().trim()),
        team1: this.parseTeamSides(match, true),
        team1Score: isLive
          ? this.parseScore(match.find(".versus").eq(0).text())
          : this.parseScore(match.find(".versus").eq(0).text()),
        team2: this.parseTeamSides(match, false),
        team2Score: isLive
          ? this.parseScore(match.find(".versus").eq(0).text(), true)
          : this.parseScore(match.find(".versus").eq(0).text(), true),
        tournament: match.find(".match-filler").find(".match-countdown + div > div > a").eq(0).attr("title") || "",
        tournamentURL: `https://liquipedia.net/ageofempires/${match
          .find(".match-filler")
          .find(".match-countdown + div > div > a")
          .eq(0)
          .attr("href")}`,
      };
      matchArray.push(matchObj);
    }

    return matchArray;
  }

  parseScore(scoreString: string, returnTeam2 = false): number {
    console.log(scoreString);
    const scoreSplit = scoreString.split(":");
    const scoreIndex = returnTeam2 ? 1 : 0; // Team 2 value will always be the "right" side number
    return parseInt(scoreSplit[scoreIndex], 10);
  }

  parseTime(date: string): string {
    console.log(date);
    const monthToNumberMap: any = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

    /**
     *  Normalizes day & hours values to have leading zeros if they are single-digits
     *
     * @param {string} datePropValue Hours and/or day value in numbers
     * @returns {string}
     */
    const normalizeSingles = (datePropValue: string): string => {
      if (datePropValue.length === 1) {
        return `0${datePropValue}`;
      }

      return datePropValue;
    };

    const MONTH_GROUP = 1;
    const DAYS_GROUP = 2;
    const YEAR_GROUP = 3;
    const HOURS_GROUP = 4;
    const MINUTES_GROUP = 5;
    const dateMatch = date.match(/(\w+) (\d{1,2}), (\d{4}) - (\d{1,2}):(\d{2}) UTC/) || [];
    const reassembledDate = `${dateMatch[YEAR_GROUP]}-${monthToNumberMap[dateMatch[MONTH_GROUP]]}-${normalizeSingles(
      dateMatch[DAYS_GROUP],
    )}T${normalizeSingles(dateMatch[HOURS_GROUP])}:${dateMatch[MINUTES_GROUP]}:00.000Z`;

    return new Date(reassembledDate).toISOString();
  }

  private parseTeamSides(match: cheerio.Cheerio, isLeft: boolean): string {
    if (isLeft) {
      const teamName = match.find(".team-left .team-template-text").find("a").eq(0).attr("title") || "";
      return this.trimTeam(teamName === "" ? match.find(".team-left").find("a").eq(0).attr("title") || "" : teamName);
    } else {
      let teamName = match.find(".team-right .team-template-text").find("a").eq(0).attr("title") || "";
      if (teamName === "") {
        const alink = match.find(".team-right").find("a");
        teamName = alink.length > 1 ? alink.eq(1).attr("title") || "" : alink.eq(0).attr("title") || "";
      }
      return this.trimTeam(teamName);
    }
  }
  trimTeam(teamName: string): string {
    return teamName.split("(page does not exist)")[0].trim();
  }
}
