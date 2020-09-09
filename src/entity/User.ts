import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Bet } from './Bet';
import { UserBet } from './UserBet';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column({ 
        type: "varchar",
        length: 100 })
    firstName: string;

    @Column({ 
        type: "varchar",
        length: 100 })
    lastName: string;

    @Column({ 
        type: "varchar",
        length: 50 })
    userName: string;

    @Column({ 
        type: "varchar",
        length: 50 })
    email: string;

    @Column("boolean")
    email_verified: boolean;

    @Column({type: "date"})
    dateCreated: Date;

    @OneToMany(() => UserBet, bet => bet.bettor)
    bets: UserBet[];

    @Column({type: "date"})
    lastLogin: Date;

}
