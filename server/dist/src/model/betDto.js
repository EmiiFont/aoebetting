"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventOwnerType = exports.BetTypeEnum = void 0;
var BetTypeEnum;
(function (BetTypeEnum) {
    BetTypeEnum[BetTypeEnum["MoneyLine"] = 0] = "MoneyLine";
    BetTypeEnum[BetTypeEnum["OverUnder"] = 1] = "OverUnder";
    BetTypeEnum[BetTypeEnum["Spread"] = 2] = "Spread";
    BetTypeEnum[BetTypeEnum["Parimutuel"] = 3] = "Parimutuel";
})(BetTypeEnum = exports.BetTypeEnum || (exports.BetTypeEnum = {}));
var EventOwnerType;
(function (EventOwnerType) {
    EventOwnerType[EventOwnerType["Player"] = 0] = "Player";
    EventOwnerType[EventOwnerType["Team"] = 1] = "Team";
    EventOwnerType[EventOwnerType["MatchSpread"] = 2] = "MatchSpread";
})(EventOwnerType = exports.EventOwnerType || (exports.EventOwnerType = {}));
