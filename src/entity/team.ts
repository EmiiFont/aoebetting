import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MatchCompetitor } from "./matchCompetitor";
import { TeamPlayer } from "./teamPlayer";

//
@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column()
  searchable: boolean;

  @Column({ default: new Date() })
  lastUpdate: Date;

  @OneToMany(() => MatchCompetitor, (comp) => comp.team)
  matchCompetitor: MatchCompetitor[];

  @OneToMany(() => TeamPlayer, (tempL) => tempL.team)
  teamPlayer: TeamPlayer[];
}
