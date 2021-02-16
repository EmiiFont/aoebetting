import { IResolvers } from 'graphql-tools';
import { PlayerService } from '../services/playerService'
import { Player } from '../entity/Player'

const matchResolver: IResolvers = {
  Query: {
    async players(parent, args): Promise<Player[]> {
      const { perPage, page, name } = args;
      const res = await new PlayerService().getPlayes(page, perPage, name)
      return res.data;
    },
    player(parent, args): Promise<Player | undefined> {
      const {id} = args;
      return new PlayerService().getPlayer(id);
    },
  },
  Mutation:{
    updatePlayer: async () : Promise<boolean> => {
      //new PlayerService().updatePlayer();
      return true;
    }
  }
};
export default matchResolver;