import { Competitor } from "../entity/Competitor";

export class PlayerDto {
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