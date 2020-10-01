"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Odd = void 0;
class Odd {
    constructor(decimal, fractional, american, impliedProbability) {
        this.decimal = decimal;
        this.fractional = fractional;
        this.american = american;
        this.impliedProbability = impliedProbability;
    }
    get getDecimal() {
        return this.decimal;
    }
    get getfractional() {
        return this.fractional;
    }
    get getAmerican() {
        return this.american;
    }
    get getImpliedProbability() {
        return this.impliedProbability;
    }
}
exports.Odd = Odd;
