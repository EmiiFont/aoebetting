export class OddsConverter {
  _decimalOdds: number;

  /**
   * Create an Odds object
   *
   * @param decimalOdds Decimal odds to instantiate the class
   */
  constructor(decimalOdds: number) {
    this._decimalOdds = decimalOdds;
  }

  /**
   * Gets the decimal odds tidied
   *
   * @readonly
   * @memberof OddsConverter
   */
  get decimalOdds() {
    return this._decimalOdds;
  }

  /**
   * Get the American odds
   *
   * @readonly
   * @memberof OddsConverter
   */
  get americanOdds() {
    if (this.decimalOdds <= 0) throw new RangeError("Decimal Odds value of 0 is invalid");

    return this._decimalOdds > 2 ? (this._decimalOdds - 1) * 100 : -100 / (this._decimalOdds - 1);
  }

  /**
   * Get the American odds as a formatted string
   *
   * @readonly
   * @memberof OddsConverter
   */
  get usOddsString() {
    return this.americanOdds > 0 ? `+${this.americanOdds}` : `-${this.americanOdds}`;
  }

  /**
   * Gets the implied probability
   *
   * @readonly
   * @memberof OddsConverter
   */
  get impliedProbability() {
    if (this.decimalOdds <= 0) throw new RangeError(`Decimal odds value of ${this.decimalOdds} is invalid`);
    return 1 / this._decimalOdds;
  }

  /**
   * Create an OddsConverter object from an implied probability number
   *
   * @static
   * @param {(number)} prob
   * @returns {OddsConverter}
   * @memberof OddsConverter
   */
  public static fromProbability(prob: number): OddsConverter {
    if (prob <= 0) throw new RangeError(`Implied probability value of ${prob} is invalid`);

    if (prob <= 1) {
      prob *= 100;
    }
    const decimal = 1 / (prob / 100);

    return new OddsConverter(decimal);
  }

  /**
   * Create an OddsConverter object from a american odds number
   *
   * @static
   * @param {(number)} americanOdd
   * @returns {OddsConverter}
   * @memberof OddsConverter
   */
  public static fromAmerican(americanOdd: number): OddsConverter {
    if (Math.abs(americanOdd) < 100) throw new RangeError(`US Odds value of ${americanOdd} is invalid`);

    let decimal = 0;

    if (americanOdd > 0) {
      decimal = 1 + americanOdd / 100;
    } else {
      americanOdd *= -1;
      decimal = 1 + 100 / americanOdd;
    }

    return new OddsConverter(decimal);
  }
}
