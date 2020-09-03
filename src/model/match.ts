import { PlayerOdd } from "./player";

export class Match{
    constructor(
        private matchId: string,
        private map: string,
        private openedDate: number,
        private startedDate: number,
        private finishedDate: number) {
    }
    
    public get getMatchId() : string {
        return this.matchId;
    }
    
    public get getMap() : string {
        return this.map;
    }
    
    public get getOpenedDate() : number {
        return this.openedDate;
    }
    
    public get getStartedDate() : number {
        return this.startedDate;
    }

    public get getFinishedDate() : number {
        return this.finishedDate;
    }
}

