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
exports.Bet = void 0;
const typeorm_1 = require("typeorm");
const BetType_1 = require("./BetType");
const UserBet_1 = require("./UserBet");
const Match_1 = require("./Match");
let Bet = class Bet {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Bet.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], Bet.prototype, "systemOdd", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", Date)
], Bet.prototype, "datePlaced", void 0);
__decorate([
    typeorm_1.RelationId((bet) => bet.type),
    __metadata("design:type", Number)
], Bet.prototype, "typeUid", void 0);
__decorate([
    typeorm_1.ManyToOne(() => BetType_1.BetType, bettype => bettype.bets),
    typeorm_1.JoinColumn(),
    __metadata("design:type", BetType_1.BetType)
], Bet.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserBet_1.UserBet, user => user.bet),
    __metadata("design:type", Array)
], Bet.prototype, "userBet", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Match_1.Match, match => match.bets),
    __metadata("design:type", Match_1.Match)
], Bet.prototype, "match", void 0);
Bet = __decorate([
    typeorm_1.Entity()
], Bet);
exports.Bet = Bet;
