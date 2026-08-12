import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Bet } from "./Bet";

/* These can be:
 * - Win Bet/Moneyline Wager
 * - Point Spreads
 * - Handicap
 * - Over-Unders
 * - Prop/Specials
 * - Parlays/Accumulators
 * Source: https://tinyurl.com/y2l4r9po
 * */

@Entity()
export class BetType {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({ type: "varchar" })
  rules: string;

  @OneToMany(() => Bet, (bet) => bet.type)
  bets: Bet[];
}
