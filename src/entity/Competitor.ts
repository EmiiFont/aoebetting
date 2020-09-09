import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Match } from "./Match";

export enum CompetitorTypeEnum{
    Player,
    Team
}


@Entity()
export class Competitor {
   
    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    playerUid: number;

    @Column()
    teamUid: number;

    @Column()
    competitorType: CompetitorTypeEnum;

    @OneToMany(() => Match, match => match.competitorOne)
    competitorOneMatch: Match[];

    @OneToMany(() => Match, match => match.competitorTwo)
    competitorTwoMatch: Match[];
}