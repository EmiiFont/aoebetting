import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import { Competitor } from './Competitor';

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