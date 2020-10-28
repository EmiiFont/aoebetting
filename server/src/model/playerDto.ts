import { Competitor } from "../entity/Competitor";

export class PlayerDto {
    competedAs: Competitor[];
    steamId: number;
	name: string;
	steamName: string;
	country: string;
    clan: string;
	aoe2NetRating: number;
	aoeEloComRating: number;
	rating: number;
	averageRating: number;
    gamesPlayed: number;
    gamesWon: number;
	gamesDropped: number;
    winStreak: number;
}