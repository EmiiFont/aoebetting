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
import { MatchCompetitor } from "./matchCompetitor";

export enum CompetitorTypeEnum {
  OneVsOne,
  TwoVsTwo,
  ThreeVsThree,
  FourVsFour,
  FreeForAll,
}

//
@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({
    type: "varchar",
    length: 150,
  })
  title: string;

  @Column()
  competitorType: CompetitorTypeEnum;

  @Column({ default: 1 })
  bestOf: number;

  @Column({ nullable: true })
  Started: Date;

  @Column({ nullable: true })
  finished: Date;

  @Column({ default: new Date() })
  lastUpdate: Date;

  @OneToMany(() => Bet, (bet) => bet.match)
  bets: Bet[];

  @OneToMany(() => MatchCompetitor, (matchInfo) => matchInfo.match)
  matchCompetitor: MatchCompetitor[];

  @OneToMany(() => MatchInformation, (matchInfo) => matchInfo.match)
  matchInformation: MatchInformation[];
}
