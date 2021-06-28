import { PlayerOdd } from "./player";
import { CompetitorTypeEnum } from "../entity/Match";

export interface MatchDto {
  uid?: number;
  title?: string;
  bestOf?: number;
  searchByTeam: boolean;
  teamOne: number[];
  teamTwo: number[];
  competitorType: CompetitorTypeEnum;
}
