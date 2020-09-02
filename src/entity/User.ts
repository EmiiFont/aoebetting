import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({type: "date"})
    lastLogin: Date;
}
