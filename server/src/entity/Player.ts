import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Double } from 'typeorm';

import { Competitor } from './Competitor';

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column({
        type: "varchar",
        length: 20})
        steamId: string;
    
    @Column({
        type: "varchar",
        length: 50})
        name: string;

    @Column({
        type: "varchar",
        length: 50})
        steamName: string;

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
        type: "numeric" })
    aoe2NetRating: number;

    @Column({ 
        type: "numeric" })
    aoeEloComRating: number;

    @Column({ 
        type: "numeric" })
    rating: number;

    @Column({ 
        type: "numeric" })
    averageRating: number;

    @Column({ 
        type: "numeric" })
    gamesPlayed: number;

    @Column({ 
        type: "numeric" })
    gamesWon: number;

    @Column({ 
        type: "numeric" })
    gamesDropped: number;

    @Column({ 
        type: "numeric" })
    winStreak: number;

    @ManyToMany(() => Competitor, competitor => competitor.uid)
    @JoinTable()
    competedAs: Competitor[];

}