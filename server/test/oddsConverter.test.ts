import {OddsConverter} from '../src/helpers/oddsConverter'

test('from probability greater than 50 decimal should be less than 2', async () => {

  let odd = OddsConverter.fromProbability(51);
  expect(odd.decimalOdds).toBeLessThan(2);
});

test('from american should return correct probability', async () => {

    let odd = OddsConverter.fromAmerican(-140);
    expect(odd.impliedProbability.toFixed(2)).toBe("0.58");
  });

  test('from american should not fail when passing 0', async () => {

    expect(() => {OddsConverter.fromAmerican(0)}).toThrowError('US Odds value of 0 is invalid');
  });

  test('from decimal should not fail when passing 0', async () => {

    let odd = new OddsConverter(0);
    expect(() => {odd.impliedProbability}).toThrowError("Decimal odds value of 0 is invalid");
  });

  test('from probability should not fail when passing 0', async () => {

    expect(() => {OddsConverter.fromProbability(0)}).toThrowError("Implied probability value of 0 is invalid")
  });

  test('from probability should not fail  passing values less than 0', async () => {

    expect(() => {OddsConverter.fromProbability(-1)}).toThrowError("Implied probability value of -1 is invalid");
  });

  test('from american should not fail  passing values less than 100', async () => {

    
    expect(() => {OddsConverter.fromAmerican(99)}).toThrowError('US Odds value of 99 is invalid');
  });

  test('from decimal should throw an error when passing values less than 0', async () => {

    let odd = new OddsConverter(-1);
    
    expect(() => {odd.impliedProbability}).toThrowError('Decimal odds value of -1 is invalid');
  });

  test('should create an object from US odds', () => {

    let odds = OddsConverter.fromAmerican(137.5);
    expect(odds.decimalOdds).toBe(2.375);

    odds = OddsConverter.fromAmerican(137.5);
    expect(odds.decimalOdds).toBe(2.375);

    odds = OddsConverter.fromAmerican(-450);
    expect(parseFloat(odds.decimalOdds.toFixed(2))).toBe( 1.22);

    odds = OddsConverter.fromAmerican(-450);
    expect(parseFloat(odds.decimalOdds.toFixed(2))).toBe(1.22);
  });

  test('should convert to US odds', () =>{
    const expectations = [
      [2.25, 125],
      [1.25, -400],
      [1001, 100000],
      [10, 900],
    ];
    for (let e of expectations) {
      let odds = new OddsConverter(e[0]);
      expect(odds.americanOdds).toBe(e[1]);
    }
  })
 


