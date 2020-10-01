import { Competitor } from "../entity/Competitor";


export class PlayerDTO {
    uid: number;
    name: string;
    country: string;
    clan: string;
    elo: number;
    averagedElo: number;
    calculatedElo: number;
    gamesPlayed: number;
    gamesWon: number;
    winStreak: number;
    competedAs: Competitor[];
}