import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Double } from 'typeorm';
import { User } from './User';
import {BetType} from './BetType';

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

    @ManyToOne(() => User)
    @JoinColumn()
    bettor: number;

    @OneToOne(() => BetType)
    @JoinColumn()
    type: string;

    @Column({ 
        type: "money",
        length: 100 })
    stake: number;

    @Column({ 
        type: "varchar",
        length: 50 })
    email: string;

    @Column({type: "date"})
    datePlaced: Date;

}
