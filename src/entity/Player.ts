import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, Double, OneToMany } from "typeorm";

import { TeamPlayer } from "./teamPlayer";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  steamId: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: true,
  })
  steamName: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  country: string;

  @Column({
    type: "varchar",
    nullable: true,
    length: 50,
  })
  clan: string;

  @Column({
    type: "numeric",
    nullable: true,
  })
  aoe2NetRating: number;

  @Column({
    type: "numeric",
    nullable: true,
  })
  aoeEloComRating: number;

  @Column({
    type: "numeric",
  })
  rating: number;

  @Column({
    type: "numeric",
  })
  averageRating: number;

  @Column({
    type: "numeric",
  })
  gamesPlayed: number;

  @Column({
    type: "numeric",
  })
  gamesWon: number;

  @Column({
    type: "numeric",
  })
  gamesDropped: number;

  @Column({
    type: "numeric",
  })
  winStreak: number;

  @OneToMany(() => TeamPlayer, (tempL) => tempL.team)
  teamPlayer: TeamPlayer[];

  @Column({ default: new Date() })
  lastUpdate: Date;
}
