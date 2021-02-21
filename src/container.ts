import { Container, inject, injectable } from "inversify";
import { TYPES } from "./model/types";
import { BetService, IBetService } from "./services/betService";
import { IMatchService, MatchService } from "./services/matchService";
import { IPlayerService, PlayerService } from "./services/playerService";
import { IUserService, UserService } from "./services/userService";
import { IliquipediaService, LiquipediaService } from "./services/liquipediaService";

export interface IContextProvider {
  userService: IUserService;
  playerService: IPlayerService;
  matchService: IMatchService;
}

@injectable()
class ContextProvider implements IContextProvider {
  @inject(TYPES.PlayerService)
  public playerService: IPlayerService;

  @inject(TYPES.UserService)
  public userService: IUserService;
  @inject(TYPES.MatchService)
  public matchService: IMatchService;
}

const container = new Container();
container.bind<IMatchService>(TYPES.MatchService).to(MatchService);
container.bind<IPlayerService>(TYPES.PlayerService).to(PlayerService);
container.bind<IBetService>(TYPES.BetService).to(BetService);
container.bind<IliquipediaService>(TYPES.LiquipediaService).to(LiquipediaService);
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IContextProvider>(TYPES.ContextProvider).to(ContextProvider).inRequestScope();

export { container };
