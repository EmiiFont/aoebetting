import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  RelationId,
  OneToMany,
} from "typeorm";
import { Player } from "./Player";
import { Team } from "./team";

//
@Entity()
export class TeamPlayer {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  teamUid: number;

  @Column()
  playerUid: number;

  @ManyToOne(() => Team, (team) => team.teamPlayer)
  team: Team[];

  @ManyToOne(() => Player, (player) => player.teamPlayer)
  player: Player[];
}
