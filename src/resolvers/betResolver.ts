import { IResolvers } from "graphql-tools";
import { Bet } from "../entity/Bet";
import { UserBet } from "../entity/UserBet";
import { IContext } from "../model/types";

export const betResolver: IResolvers = {
  Query: {
    getByMatch(parent: Record<string, any>, args: Record<string, any>, context: IContext): Promise<Bet[]> {
      const { matchUid } = args;
      return context.betService.getByMatch(matchUid);
    },

    getUserBets(parent: Record<string, any>, args: Record<string, any>, context: IContext): Promise<Bet[]> {
      const { userUid } = args;
      return context.betService.getUserBets(userUid);
    },
  },
  Bet: {
    userBet(parent, args, context: IContext): Promise<UserBet[] | undefined> {
      const { uid } = parent;
      return context.userService.getBets(uid);
    },
    // match(parent): Promise<Match>{
    //   const {uid} = parent;
    //   return new MatchService().
    // }
  },
  Mutation: {
    setSystemBet(parent: Record<string, any>, args: Record<string, any>, context: IContext): Promise<Bet[]> {
      const { systemBet, matchUid } = args;
      return context.betService.setSystemBet(systemBet, matchUid);
    },
    setUserBet(parent: Record<string, any>, args: Record<string, any>, context: IContext): Promise<boolean> {
      const { userBet, betUid } = args;
      return context.betService.setUserbet(userBet, betUid);
    },
  },
};
