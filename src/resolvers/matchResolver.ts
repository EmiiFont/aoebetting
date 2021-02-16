import { IResolvers } from 'graphql-tools';
import { MatchService } from '../services/matchService'
import { Match } from '../entity/Match'

const matchResolver: IResolvers = {
  Query: {
    matches(parent, args): Promise<Match[]> {
      const {perPage, page} = args;
      return new MatchService().getMatches(perPage, page);
    },
    match(parent, args): Promise<Match | undefined> {
      const {id} = args;
      return new MatchService().getMatchById(id);
    },
  },
  Mutation:{
     addMatch: async () : Promise<boolean> => {
        //new MatchService().
        return true;
     }
  }
};
export default matchResolver;