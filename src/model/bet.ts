export interface IBet{
    betId?: number;
    betType: BetType;
    eventId: number;
    stake: number;
    odd: number;
    created: Date;
}

export interface PlayerBet extends IBet{
    userId?: number;
    profit?: number;
    total?: number;
}

export interface Winnings{
    playerBet: PlayerBet;
    profit: number;
}

export enum BetType {
    MoneyLine,
    OverUnder,
    Spread,
    Parimutuel
}

export interface EventsOdd{
    eventId: number;
    odd: number;
}