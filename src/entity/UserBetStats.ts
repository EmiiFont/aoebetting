import { Entity, Column, PrimaryColumn, OneToOne, RelationId } from "typeorm";

import { UserBet } from "./UserBet";

@Entity()
export class UserBetStat {
  @PrimaryColumn()
  uid: number;

  @Column({
    type: "decimal",
  })
  loss: number;

  @Column({
    type: "decimal",
  })
  earn: number;

  @Column({ type: "date" })
  date: Date;

  @RelationId((bet: UserBetStat) => bet.userBet)
  userBetUid: number;

  @OneToOne(() => UserBet, (bet) => bet.bettor)
  userBet: UserBet;
}
