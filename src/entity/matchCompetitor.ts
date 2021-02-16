import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  RelationId,
  OneToMany,
} from "typeorm";
import { Competitor } from "./Competitor";
import { Bet } from "./Bet";
import { MatchInformation } from "./MatchInformation";
import { Match } from "./Match";
import { Team } from "./team";

//
@Entity()
export class MatchCompetitor {
  @PrimaryGeneratedColumn()
  uid: number;

  @RelationId((match: MatchCompetitor) => match.match)
  matchUid: number;

  @RelationId((team: MatchCompetitor) => team.team)
  teamUid: number;

  @ManyToOne(() => Match, (match) => match.matchCompetitor)
  match: Match;

  @ManyToOne(() => Team, (team) => team.matchCompetitor)
  team: Team;
}
