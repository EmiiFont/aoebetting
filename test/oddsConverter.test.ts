import {OddsConverter} from '../src/helpers/oddsConverter'

test('from probability greater than 50 decimal should be less than 2', async () => {

  let d = new OddsConverter();
  let odd = await d.fromProbability(51);
  
  expect(odd.getDecimal).toBeLessThan(2);
});

test('from american should return correct probability', async () => {

    let d = new OddsConverter();
    let odd = await d.fromAmerican(-110);
    
    expect(odd.getImpliedProbability).toBeGreaterThan(50);
  });

  test('from american should not fail when passing 0', async () => {

    let d = new OddsConverter();
    let odd = await d.fromAmerican(0);
    
    expect(odd.getImpliedProbability).toBe(0);
  });

  test('from decimal should not fail when passing 0', async () => {

    let d = new OddsConverter();
    let odd = await d.fromDecimal(0);
    
    expect(odd.getImpliedProbability).toBe(0);
  });

  test('from probability should not fail when passing 0', async () => {

    let d = new OddsConverter();
    let odd = await d.fromProbability(0);
    
    expect(odd.getImpliedProbability).toBe(0);
  });

  test('from probability should not fail  passing values less than 0', async () => {

    let d = new OddsConverter();
    let odd = await d.fromProbability(-1);
    
    expect(odd.getImpliedProbability).toBe(0);
  });

  test('from american should not fail  passing values less than 100', async () => {

    let d = new OddsConverter();
    let odd = await d.fromAmerican(99);
    
    expect(odd.getImpliedProbability).toBe(0);
  });

  test('from decimal should not fail when passing values less than 0', async () => {

    let d = new OddsConverter();
    let odd = await d.fromDecimal(-1);
    
    expect(odd.getImpliedProbability).toBe(0);
  });



