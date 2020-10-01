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
exports.Competitor = exports.CompetitorTypeEnum = void 0;
const typeorm_1 = require("typeorm");
const Match_1 = require("./Match");
const Player_1 = require("./Player");
var CompetitorTypeEnum;
(function (CompetitorTypeEnum) {
    CompetitorTypeEnum[CompetitorTypeEnum["SinglePlayer"] = 0] = "SinglePlayer";
    CompetitorTypeEnum[CompetitorTypeEnum["Team"] = 1] = "Team";
})(CompetitorTypeEnum = exports.CompetitorTypeEnum || (exports.CompetitorTypeEnum = {}));
let Competitor = class Competitor {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Competitor.prototype, "uid", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Player_1.Player, player => player.uid),
    __metadata("design:type", Array)
], Competitor.prototype, "players", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Competitor.prototype, "teamUid", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Competitor.prototype, "competitorType", void 0);
__decorate([
    typeorm_1.OneToMany(() => Match_1.Match, match => match.competitorOne),
    __metadata("design:type", Array)
], Competitor.prototype, "competitorOneMatch", void 0);
__decorate([
    typeorm_1.OneToMany(() => Match_1.Match, match => match.competitorTwo),
    __metadata("design:type", Array)
], Competitor.prototype, "competitorTwoMatch", void 0);
Competitor = __decorate([
    typeorm_1.Entity()
], Competitor);
exports.Competitor = Competitor;
