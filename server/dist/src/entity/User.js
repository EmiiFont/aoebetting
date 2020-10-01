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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const UserBet_1 = require("./UserBet");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "uid", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 100
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50
    }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({
        type: "varchar",
        length: 50
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("boolean"),
    __metadata("design:type", Boolean)
], User.prototype, "email_verified", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", Date)
], User.prototype, "dateCreated", void 0);
__decorate([
    typeorm_1.OneToMany(() => UserBet_1.UserBet, bet => bet.bettor),
    __metadata("design:type", Array)
], User.prototype, "bets", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", Date)
], User.prototype, "lastLogin", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
