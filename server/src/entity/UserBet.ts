import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, RelationId } from 'typeorm';

import { User } from './User';
import { Bet } from './Bet';

/*
* Components of sports betting:
* - Selection: What the bettor is choosing to bet on (should be a separate entity )
* - Stake: How much the bettor is choosing to bet
* - Odds: Likelyhood of the waged upon outcome to occur (should be a separate entity )
* Source: https://tinyurl.com/y4cfsuwn
*/ 

@Entity()
export class UserBet {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column({ 
        type: "money" })
    stake: number;
    
    @Column({ 
        type: "decimal" })
    odd: number;

    @Column({type: "date"})
    datePlaced: Date;

    @RelationId((userBet: UserBet) => userBet.bet)
    betUid: number;

    @ManyToOne(() => Bet, bet => bet.userBet)
    bet: Bet;

    @ManyToOne(() => User, user => user.bets)
    bettor: User;
}
