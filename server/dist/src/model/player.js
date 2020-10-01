"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(username, elo, country, id) {
        this.username = username;
        this.elo = elo;
        this.country = country;
        this.id = id;
    }
    get getUsername() {
        return this.username;
    }
    get getElo() {
        return this.elo;
    }
    get getCountry() {
        return this.country;
    }
    get getId() {
        return this.id;
    }
}
exports.Player = Player;
