import { User } from './User';
import { BetType } from './BetType';

export class Bet {
    uid: number;
    bettor: User;
    type: BetType;
    stake: number;
    email: string;
    datePlaced: Date;
}