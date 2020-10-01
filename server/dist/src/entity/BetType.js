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
exports.BetType = void 0;
const typeorm_1 = require("typeorm");
const Bet_1 = require("./Bet");
/* These can be:
 * - Win Bet/Moneyline Wager
 * - Point Spreads
 * - Handicap
 * - Over-Unders
 * - Prop/Specials
 * - Parlays/Accumulators
 * Source: https://tinyurl.com/y2l4r9po
 * */
let BetType = class BetType {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BetType.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100
    }),
    __metadata("design:type", String)
], BetType.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], BetType.prototype, "rules", void 0);
__decorate([
    typeorm_1.OneToMany(() => Bet_1.Bet, bet => bet.type),
    __metadata("design:type", Array)
], BetType.prototype, "bets", void 0);
BetType = __decorate([
    typeorm_1.Entity()
], BetType);
exports.BetType = BetType;
