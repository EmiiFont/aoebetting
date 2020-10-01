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
exports.UserBet = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Bet_1 = require("./Bet");
/*
* Components of sports betting:
* - Selection: What the bettor is choosing to bet on (should be a separate entity )
* - Stake: How much the bettor is choosing to bet
* - Odds: Likelyhood of the waged upon outcome to occur (should be a separate entity )
* Source: https://tinyurl.com/y4cfsuwn
*/
let UserBet = class UserBet {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserBet.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({
        type: "money"
    }),
    __metadata("design:type", Number)
], UserBet.prototype, "stake", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal"
    }),
    __metadata("design:type", Number)
], UserBet.prototype, "odd", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", Date)
], UserBet.prototype, "datePlaced", void 0);
__decorate([
    typeorm_1.RelationId((userBet) => userBet.bet),
    __metadata("design:type", Number)
], UserBet.prototype, "betUid", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Bet_1.Bet, bet => bet.userBet),
    __metadata("design:type", Bet_1.Bet)
], UserBet.prototype, "bet", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.bets),
    __metadata("design:type", User_1.User)
], UserBet.prototype, "bettor", void 0);
UserBet = __decorate([
    typeorm_1.Entity()
], UserBet);
exports.UserBet = UserBet;
