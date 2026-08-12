import { IResolvers } from "graphql-tools";
import { Player } from "../entity/Player";
import { IContext } from "../model/types";

const matchCompetitorResolver: IResolvers = {
  MatchCompetitor: {
    async competitor(parent, args, context: IContext): Promise<Player | undefined> {
      const { teamUid } = parent;
      console.log(parent);
      return await context.playerService.getPlayerByTeamUid(teamUid);
    },
  },
};
export default matchCompetitorResolver;
