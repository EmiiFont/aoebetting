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
exports.MatchInformation = void 0;
const typeorm_1 = require("typeorm");
const Competitor_1 = require("./Competitor");
const Match_1 = require("./Match");
//
let MatchInformation = class MatchInformation {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MatchInformation.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], MatchInformation.prototype, "MatchIdFromApi", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], MatchInformation.prototype, "Started", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], MatchInformation.prototype, "finished", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], MatchInformation.prototype, "lastUpdate", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Competitor_1.Competitor, competitor => competitor.competitorOneMatch),
    __metadata("design:type", Competitor_1.Competitor)
], MatchInformation.prototype, "competitor", void 0);
__decorate([
    typeorm_1.RelationId((competitor) => competitor.competitor),
    __metadata("design:type", Number)
], MatchInformation.prototype, "winnerUid", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Match_1.Match, match => match.matchInformation),
    __metadata("design:type", Match_1.Match)
], MatchInformation.prototype, "match", void 0);
__decorate([
    typeorm_1.RelationId((matchInfo) => matchInfo.match),
    __metadata("design:type", Number)
], MatchInformation.prototype, "matchUid", void 0);
MatchInformation = __decorate([
    typeorm_1.Entity()
], MatchInformation);
exports.MatchInformation = MatchInformation;
