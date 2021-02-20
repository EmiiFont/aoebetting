import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Match } from "./Match";

@Entity()
export class MatchInformation {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ nullable: true })
  @Column({ name: "match_id_from_api" })
  matchIdFromApi: string;

  @Column({ nullable: true })
  started: Date;

  @Column({ nullable: true })
  finished: Date;

  @Column({ default: new Date() })
  @Column({ name: "last_update" })
  lastUpdate: Date;

  @Column({ nullable: true })
  @Column({ name: "winner_uid" })
  winnerUid: number;

  @ManyToOne(() => Match, (match) => match.matchInformation)
  match: Match;

  @RelationId((matchInfo: MatchInformation) => matchInfo.match)
  @Column({ name: "match_uid" })
  matchUid: number;
}
