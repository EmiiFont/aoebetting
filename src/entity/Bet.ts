import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { User } from './User';
import { BetType } from './BetType';

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

    @ManyToOne(() => User, user => user.bets)
    bettor: User;

    @OneToOne(() => BetType)
    @JoinColumn()
    type: BetType;

    @Column({ 
        type: "money" })
    stake: number;

    @Column({ 
        type: "varchar",
        length: 50 })
    email: string;

    @Column({type: "date"})
    datePlaced: Date;

}
