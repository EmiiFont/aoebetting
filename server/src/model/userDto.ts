import { BetDTO } from "./betDto";

export class UserDTO {
    uid: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    email_verified: boolean;
    dateCreated: Date;
    bets: BetDTO[];
    lastLogin: Date;
}