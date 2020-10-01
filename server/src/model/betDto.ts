import { UserDTO } from "./userDto";

export interface BetDTO{
    betId?: number;
    betType?: BetTypeEnum;
    eventId?: number;
    stake: number;
    odd: number;
    created?: Date;
    user?: UserDTO;
    profit?: number;
    total?: number;
}

export interface Winnings{
    playerBet: BetDTO;
    profit: number;
}

export enum BetTypeEnum {
    MoneyLine,
    OverUnder,
    Spread,
    Parimutuel
}

export interface EventsOdd{
    eventId: number;
    odd: number;
}

export interface Event{
  eventId: number;
  eventOwnerId: number;
  eventOwnerType: EventOwnerType;
}

export enum EventOwnerType{
    Player,
    Team,
    MatchSpread
}