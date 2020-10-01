"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elo = exports.EloResult = void 0;
var EloResult;
(function (EloResult) {
    EloResult[EloResult["LOOSE"] = 0] = "LOOSE";
    EloResult[EloResult["WIN"] = 1] = "WIN";
})(EloResult = exports.EloResult || (exports.EloResult = {}));
class Elo {
    /**
     * Constructor function which does all the maths and stores the results ready
     * for retrieval.
     *
     * @param number ratingA Current rating of A
     * @param number ratingB Current rating of B
     * @param number scoreA Score of A
     * @param number scoreB Score of B
     */
    constructor(ratingA, ratingB, scoreA, scoreB) {
        this.KFACTOR = 15;
        this.SetNewSettings(ratingA, ratingB, scoreA, scoreB);
    }
    /**
      * Set new input data.
      *
      * @param double ratingA Current rating of A
      * @param double ratingB Current rating of B
      * @param double scoreA Score of A
      * @param double scoreB Score of B
      * @returns {Elo}
      */
    SetNewSettings(ratingA, ratingB, scoreA, scoreB) {
        this._ratingA = ratingA;
        this._ratingB = ratingB;
        this._scoreA = scoreA;
        this._scoreB = scoreB;
        let expectedScores = this._getExpectedScores(this._ratingA, this._ratingB);
        this._expectedA = expectedScores[0];
        this._expectedB = expectedScores[1];
        let newRatingsList = this._getNewRatings(this._ratingA, this._ratingB, this._expectedA, this._expectedB, this._scoreA, this._scoreB);
        this._newRatingA = newRatingsList[0];
        this._newRatingB = newRatingsList[1];
        return this;
    }
    /**
     * Retrieve the calculated data.
     *
     * @return List<double> A list containing the new ratings for A and B.
     * @memberof Elo
    */
    GetNewRatings() {
        let newRatingsList = [
            this._newRatingA,
            this._newRatingB
        ];
        return newRatingsList;
    }
    static predictResult(currentRatingA, currentRatingB) {
        let ea = 1 / (1 + Math.pow(10, (currentRatingB - currentRatingA) / 400));
        let eb = 1 / (1 + Math.pow(10, (currentRatingA - currentRatingB) / 400));
        return [ea, eb];
    }
    _getExpectedScores(ratingA, ratingB) {
        let expectedScoreA = 1 / (1 + (Math.pow(10, (ratingB - ratingA) / 400)));
        let expectedScoreB = 1 / (1 + (Math.pow(10, (ratingA - ratingB) / 400)));
        let expectedScoresList = [
            expectedScoreA,
            expectedScoreB
        ];
        return expectedScoresList;
    }
    /**
     * calculate the new rating based on the expected score and kfactor
     *
     * @param number ratingA The Rating of Player A
     * @param number ratingB The Rating of Player A
     * @param number expectedA The expected score of Player A
     * @param number expectedB The expected score of Player B
     * @param number scoreA The score of Player A
     * @param number scoreB The score of Player B
     * @return Array<number>
     */
    _getNewRatings(ratingA, ratingB, expectedA, expectedB, scoreA, scoreB) {
        let newRatingA = ratingA + (this.KFACTOR * (scoreA - expectedA));
        let newRatingB = ratingB + (this.KFACTOR * (scoreB - expectedB));
        let newRatingList = [
            newRatingA,
            newRatingB
        ];
        return newRatingList;
    }
}
exports.Elo = Elo;
