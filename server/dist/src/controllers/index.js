"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetController = exports.MatchController = exports.HomeController = void 0;
//https://www.typescriptlang.org/docs/handbook/modules.html
//https://medium.com/@balramchavan/smarter-way-to-organize-import-statements-using-index-ts-file-s-in-angular-c685e9d645b7
var homeController_1 = require("./homeController");
Object.defineProperty(exports, "HomeController", { enumerable: true, get: function () { return homeController_1.HomeController; } });
var matchController_1 = require("./matchController");
Object.defineProperty(exports, "MatchController", { enumerable: true, get: function () { return matchController_1.MatchController; } });
var betController_1 = require("./betController");
Object.defineProperty(exports, "BetController", { enumerable: true, get: function () { return betController_1.BetController; } });
