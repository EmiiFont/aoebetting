import { IResolvers } from "graphql-tools";
import { Player } from "../entity/Player";
import { IContext } from "../model/types";

const playerResolver: IResolvers = {
  Query: {
    async players(parent, args, context: IContext): Promise<Player[]> {
      const { playersFilter } = args;
      console.log(playersFilter);
      const res = await context.playerService.getPlayers(
        playersFilter.page,
        playersFilter.perPage,
        playersFilter.name || "",
        playersFilter.sortBy,
      );
      return res.data;
    },
    player(parent, args, context: IContext): Promise<Player | undefined> {
      const { id } = args;
      return context.playerService.getPlayer(id);
    },
    autoAdd(parent, args, context: IContext): Promise<Player[]> {
      const { top } = args;
      return context.playerService.autoAddPlayers(top);
    },
  },
  Mutation: {
    updatePlayer: async (): Promise<boolean> => {
      //new PlayerService().updatePlayer();
      return true;
    },
  },
};
export default playerResolver;
