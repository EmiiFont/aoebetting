export enum EloResult {
  LOOSE = 0,
  WIN = 1,
}

export class Elo {
  private KFACTOR = 15;

  protected _ratingA: number;
  protected _ratingB: number;

  protected _scoreA: number;
  protected _scoreB: number;

  protected _expectedA: number;
  protected _expectedB: number;

  protected _newRatingA: number;
  protected _newRatingB: number;

  /**
   * Constructor function which does all the maths and stores the results ready
   * for retrieval.
   *
   * @param number ratingA Current rating of A
   * @param number ratingB Current rating of B
   * @param number scoreA Score of A
   * @param number scoreB Score of B
   */
  constructor(ratingA: number, ratingB: number, scoreA: number, scoreB: number) {
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
  public SetNewSettings(ratingA: number, ratingB: number, scoreA: number, scoreB: number): Elo {
    this._ratingA = ratingA;
    this._ratingB = ratingB;
    this._scoreA = scoreA;
    this._scoreB = scoreB;

    const expectedScores = this._getExpectedScores(this._ratingA, this._ratingB);
    this._expectedA = expectedScores[0];
    this._expectedB = expectedScores[1];

    const newRatingsList = this._getNewRatings(
      this._ratingA,
      this._ratingB,
      this._expectedA,
      this._expectedB,
      this._scoreA,
      this._scoreB,
    );
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
  public GetNewRatings(): Array<number> {
    const newRatingsList: Array<number> = [this._newRatingA, this._newRatingB];

    return newRatingsList;
  }

  public static predictResult(currentRatingA: number, currentRatingB: number): Array<number> {
    const ea = 1 / (1 + Math.pow(10, (currentRatingB - currentRatingA) / 400));
    const eb = 1 / (1 + Math.pow(10, (currentRatingA - currentRatingB) / 400));

    return [ea, eb];
  }

  protected _getExpectedScores(ratingA: number, ratingB: number) {
    const expectedScoreA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
    const expectedScoreB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

    const expectedScoresList: Array<number> = [expectedScoreA, expectedScoreB];

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
  protected _getNewRatings(
    ratingA: number,
    ratingB: number,
    expectedA: number,
    expectedB: number,
    scoreA: number,
    scoreB: number,
  ): Array<number> {
    const newRatingA = ratingA + this.KFACTOR * (scoreA - expectedA);
    const newRatingB = ratingB + this.KFACTOR * (scoreB - expectedB);

    const newRatingList: Array<number> = [newRatingA, newRatingB];

    return newRatingList;
  }
}
