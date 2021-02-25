import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";

import { UserBet } from "./UserBet";

@Entity()
export class User {
  @PrimaryColumn()
  uid: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  firstName: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  lastName: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  userName: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  email: string;

  @Column("boolean")
  email_verified: boolean;

  @Column({ type: "date" })
  dateCreated: Date;

  @Column({ type: "decimal" })
  amount: number;

  @OneToMany(() => UserBet, (bet) => bet.bettor)
  bets: UserBet[];

  @Column({ type: "date" })
  lastLogin: Date;
}
