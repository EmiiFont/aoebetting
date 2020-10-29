import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

import { Competitor } from './Competitor';

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column({
        type: "varchar",
        length: 50})
        name: string;

    @Column({
        type: "varchar",
        length: 50})
    country: string;

    @Column({
        type: "varchar",
        nullable: true,
        length: 50})
    clan: string;
    
    @Column({ 
        type: "decimal" })
    elo: number;

    @Column({ 
        type: "decimal" })
    averagedElo: number;

    @Column({ 
        type: "decimal" })
    calculatedElo: number;

    @Column({ 
        type: "decimal" })
    gamesPlayed: number;

    @Column({ 
        type: "decimal" })
    gamesWon: number;

    @Column({ 
        type: "decimal" })
    winStreak: number;

    @ManyToMany(() => Competitor, competitor => competitor.uid)
    @JoinTable()
    competedAs: Competitor[];

}