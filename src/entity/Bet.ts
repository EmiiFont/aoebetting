import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';

import { User } from './User';
import { BetType } from './BetType';
import { UserBet } from './UserBet';

/*
* Components of sports betting:
* - Selection: What the bettor is choosing to bet on (should be a separate entity )
* - Stake: How much the bettor is choosing to bet
* - Odds: Likelyhood of the waged upon outcome to occur (should be a separate entity )
* Source: https://tinyurl.com/y4cfsuwn
*/ 

@Entity()
export class Bet {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column({ 
        type: "decimal" })
    systemOdd: number;

    @Column({type: "date"})
    datePlaced: Date;

    @ManyToOne(() => User, user => user.bets)
    bettor: User;
    
    @OneToOne(() => BetType)
    @JoinColumn()
    type: BetType;

    @OneToMany(() => UserBet, user => user.bet)
    userBet: UserBet[];

}
