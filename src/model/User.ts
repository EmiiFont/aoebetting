import { Bet } from './Bet';

export class User {
    uid: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    email_verified: boolean;
    dateCreated: Date;
    bets: Bet[];
    lastLogin: Date;
}