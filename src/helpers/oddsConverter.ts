import { Odd } from "../model/odd";


export class OddsConverter {
    
    constructor() {
        
    }
   
   public async fromProbability(prob: number): Promise<Odd>
   {
    
    if(prob <= 0) return new Odd(0,0,0,0);
   
    if(prob <= 1){
        prob *= 100;
    }
    const decimal = 1 / (prob / 100);
   
    let american = 0;
  
    if(prob <= 50){
        american = 100 / (prob / 100) - 100;
    }else{
        american = prob / ( 1- (prob/100)) * -1;
    }
    
    return new Odd(decimal, 0, american, prob);
   }

   public async fromDecimal(decimalOdd: number): Promise<Odd>{
   
    let american = 0;
    
    if(decimalOdd <= 0) return new Odd(0,0,0,0);

    if(decimalOdd >=2){
        american = (decimalOdd - 1) * 100;
    }else{
        american = -100 / (decimalOdd - 1);
    }
    //TODO: missing fractional.

    const impliedProbability =   (1 / decimalOdd) * 100 ;
    
    return new Odd(decimalOdd, 0, american, impliedProbability);
   }

   public async fromAmerican(americanOdd: number): Promise<Odd>
   {
   
    if(Math.abs(americanOdd) < 100) return new Odd(0,0,0,0);

    let decimal = 0;
    let impliedProbability = 0;
    //TODO: missing fractional.

    if(americanOdd > 0){
        impliedProbability = (100 / (americanOdd + 100)) * 100;
        decimal =  1 + (americanOdd / 100);
    }else{
        americanOdd*= -1;
        impliedProbability =  (americanOdd/(americanOdd+100)) * 100;
        decimal = 1 - (100/americanOdd)
    }

    return new Odd(decimal,0,americanOdd, impliedProbability);
   }

}