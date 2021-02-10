import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Match } from "./Match";
import { Player } from "./Player";

export enum CompetitorTypeEnum {
  SinglePlayer,
  Team,
}

@Entity()
export class Competitor {
  @PrimaryGeneratedColumn()
  uid: number;

  @ManyToMany(() => Player, (player) => player.uid)
  players: Player[];

  @Column({ nullable: true })
  teamUid: number;

  @Column()
  competitorType: CompetitorTypeEnum;
}
