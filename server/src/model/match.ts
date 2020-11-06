import { PlayerOdd } from "./player";
import { CompetitorTypeEnum } from "../entity/Match";

export interface MatchDto{
    uid: number;
    title: string;
    bestOf: number;
    competitorOneUid: number;
    competitorTwoUid: number;
    competitorType: CompetitorTypeEnum;
}

