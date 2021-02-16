export class Player {
  constructor(private username: string, private elo: number, private country: string, private id?: string) {}

  get getUsername(): string {
    return this.username;
  }

  get getElo(): number {
    return this.elo;
  }

  get getCountry(): string {
    return this.country;
  }

  get getId(): string | undefined {
    return this.id;
  }
}

export interface PlayerOdd {
  playerId: number;
  odd: number;
}
