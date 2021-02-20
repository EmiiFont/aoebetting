import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import { BetType } from './BetType'
import { Match } from './Match'
import { UserBet } from './UserBet'

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
