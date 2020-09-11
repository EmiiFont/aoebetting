import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, RelationId, OneToMany } from 'typeorm';
import { Competitor } from './Competitor';
import { Bet } from './Bet';

export enum CompetitorTypeEnum{
    Player,
    Team
}


@Entity()
export class Match {
   
    @PrimaryGeneratedColumn()
    uid: number;

    @Column({ 
        type: "varchar",
        length: 150 })
    title: string;

    @Column()
    competitorType: CompetitorTypeEnum;

    @Column({ nullable: true })
    MatchIdFromApi: string;

    @Column({ nullable: true })
    Started: Date;

    @Column({ nullable: true })
    finished: Date;

    @Column()
    lastUpdate: Date;

    @OneToMany(() => Bet, bet => bet.match)
    bets: Bet[];

    @ManyToOne(() => Competitor, competitor => competitor.competitorOneMatch)
    competitorOne: Competitor;

    @ManyToOne(() => Competitor, competitor => competitor.competitorTwoMatch)
    competitorTwo: Competitor;

    @RelationId((competitor: Match) => competitor.competitorOne)
    competitorOneUid: number;

    @RelationId((competitor: Match) => competitor.competitorTwo)
    competitorTwoUid: number;

   @Column()
    competitorType: CompetitorTypeEnum;

    @Column()
    lastUpdate: Date;

}