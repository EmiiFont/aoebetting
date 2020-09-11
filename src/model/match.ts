import { PlayerOdd } from "./player";
import { CompetitorTypeEnum } from "../entity/Match";

export interface MatchDto{
    title: string;
    competitorOneUid: number;
    competitorTwoUid: number;
    competitorType: CompetitorTypeEnum;
}

