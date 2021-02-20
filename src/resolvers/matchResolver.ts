import { IResolvers } from "graphql-tools";
import { Bet } from "../entity/Bet";
import { Match } from "../entity/Match";
import { MatchCompetitor } from "../entity/matchCompetitor";
import { MatchInformation } from "../entity/MatchInformation";
import { MatchDto } from "../model/match";
import { IContext } from "../model/types";
import { ILiquipediMatchhList, LiquipediaService } from "../services/liquipediaService";

const matchResolver: IResolvers = {
  Query: {
    matches(parent, args, context: IContext): Promise<Match[]> {
      const { perPage, page } = args;
      return context.matchService.getMatches(perPage, page);
    },
    match(parent, args, context: IContext): Promise<Match | undefined> {
      const { id } = args;
      return context.matchService.getMatchById(id);
    },
    getLiquidpediaMatch(parent, args, context: IContext): Promise<ILiquipediMatchhList> {
      return new LiquipediaService().getMatchList();
    },
  },
  Match: {
    bets(parent, args, context: IContext): Promise<Bet[]> {
      const { uid } = parent;
      return context.betService.getByMatch(uid);
    },
    matchInformation(parent, args, context: IContext): Promise<MatchInformation[] | undefined> {
      const { uid } = parent;
      return context.matchService.getMatchInformationByMatch(uid);
    },
    matchCompetitor(parent, args, context: IContext): Promise<MatchCompetitor[] | undefined> {
      const { uid } = parent;
      return context.matchService.getMatchCompetitorByMatch(uid);
    },
  },
  Mutation: {
    addMatch: async (parent, args, context: IContext): Promise<Match> => {
      const { matchInput } = args;
      return context.matchService.addMatch(matchInput as MatchDto);
    },
  },
};
export default matchResolver;
