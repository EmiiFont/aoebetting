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
import { Match } from "./Match";

//
@Entity()
export class MatchInformation {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ nullable: true })
  MatchIdFromApi: string;

  @Column({ nullable: true })
  Started: Date;

  @Column({ nullable: true })
  finished: Date;

  @Column({ default: new Date() })
  lastUpdate: Date;

  @Column({ nullable: true })
  winnerUid: number;

  @ManyToOne(() => Match, (match) => match.matchInformation)
  match: Match;

  @RelationId((matchInfo: MatchInformation) => matchInfo.match)
  matchUid: number;
}
