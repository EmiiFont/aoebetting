import { IBetService } from "../services/betService";
import { IliquipediaService, LiquipediaService } from "../services/liquipediaService";
import { IMatchService } from "../services/matchService";
import { IPlayerService } from "../services/playerService";
import { IUserService } from "../services/userService";

const TYPES = {
  MatchService: Symbol.for("MatchService"),
  PlayerService: Symbol.for("PlayerService"),
  BetService: Symbol.for("BetService"),
  UserService: Symbol.for("UserService"),
  ContextProvider: Symbol.for("ContextProvider"),
  LiquipediaService: Symbol.for("LiquipediaService"),
};

export interface IContext {
  userService: IUserService;
  playerService: IPlayerService;
  matchService: IMatchService;
  betService: IBetService;
  liquipediaService: IliquipediaService;
  headers: { authorization?: string };
  userId?: string;
}

export { TYPES };
