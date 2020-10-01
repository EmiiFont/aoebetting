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
exports.Match = exports.CompetitorTypeEnum = void 0;
const typeorm_1 = require("typeorm");
const Competitor_1 = require("./Competitor");
const Bet_1 = require("./Bet");
const MatchInformation_1 = require("./MatchInformation");
var CompetitorTypeEnum;
(function (CompetitorTypeEnum) {
    CompetitorTypeEnum[CompetitorTypeEnum["Player"] = 0] = "Player";
    CompetitorTypeEnum[CompetitorTypeEnum["Team"] = 1] = "Team";
})(CompetitorTypeEnum = exports.CompetitorTypeEnum || (exports.CompetitorTypeEnum = {}));
//
let Match = class Match {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Match.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 150
    }),
    __metadata("design:type", String)
], Match.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Match.prototype, "competitorType", void 0);
__decorate([
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Match.prototype, "bestOf", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Match.prototype, "Started", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], Match.prototype, "finished", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Match.prototype, "lastUpdate", void 0);
__decorate([
    typeorm_1.OneToMany(() => Bet_1.Bet, bet => bet.match),
    __metadata("design:type", Array)
], Match.prototype, "bets", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Competitor_1.Competitor, competitor => competitor.competitorOneMatch),
    __metadata("design:type", Competitor_1.Competitor)
], Match.prototype, "competitorOne", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Competitor_1.Competitor, competitor => competitor.competitorTwoMatch),
    __metadata("design:type", Competitor_1.Competitor)
], Match.prototype, "competitorTwo", void 0);
__decorate([
    typeorm_1.RelationId((competitor) => competitor.competitorOne),
    __metadata("design:type", Number)
], Match.prototype, "competitorOneUid", void 0);
__decorate([
    typeorm_1.RelationId((competitor) => competitor.competitorTwo),
    __metadata("design:type", Number)
], Match.prototype, "competitorTwoUid", void 0);
__decorate([
    typeorm_1.OneToMany(() => MatchInformation_1.MatchInformation, matchInfo => matchInfo.match),
    __metadata("design:type", Array)
], Match.prototype, "matchInformation", void 0);
Match = __decorate([
    typeorm_1.Entity()
], Match);
exports.Match = Match;
