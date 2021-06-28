import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Match } from "./Match";
import { Team } from "./team";

@Entity()
export class MatchCompetitor {
  @PrimaryGeneratedColumn()
  uid: number;

  @RelationId((match: MatchCompetitor) => match.match)
  @Column({ name: "match_uid" })
  matchUid: number;

  @RelationId((team: MatchCompetitor) => team.team)
  @Column({ name: "team_uid" })
  teamUid: number;

  @ManyToOne(() => Match, (match) => match.matchCompetitor)
  match: Match;

  @ManyToOne(() => Team, (team) => team.matchCompetitor)
  team: Team;
}
