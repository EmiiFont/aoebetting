"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const typeorm_1 = require("typeorm");
const Competitor_1 = require("./Competitor");
let Player = class Player {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Player.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50
    }),
    __metadata("design:type", String)
], Player.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50
    }),
    __metadata("design:type", String)
], Player.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50
    }),
    __metadata("design:type", String)
], Player.prototype, "clan", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], Player.prototype, "elo", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], Player.prototype, "averagedElo", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], Player.prototype, "calculatedElo", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], Player.prototype, "gamesPlayed", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], Player.prototype, "gamesWon", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], Player.prototype, "winStreak", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Competitor_1.Competitor, competitor => competitor.uid),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Player.prototype, "competedAs", void 0);
Player = __decorate([
    typeorm_1.Entity()
], Player);
exports.Player = Player;
