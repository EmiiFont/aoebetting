import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  RelationId,
} from "typeorm";

import { User } from "./User";
import { BetType } from "./BetType";
import { UserBet } from "./UserBet";
import { Match } from "./Match";

@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({
    type: "decimal",
  })
  systemOdd: number;

  @Column({ type: "date" })
  datePlaced: Date;

  @RelationId((bet: Bet) => bet.type)
  typeUid: number;

  @ManyToOne(() => BetType, (bettype) => bettype.bets)
  @JoinColumn()
  type: BetType;

  @OneToMany(() => UserBet, (user) => user.bet)
  userBet: UserBet[];

  @ManyToOne(() => Match, (match) => match.bets)
  match: Match;
}
