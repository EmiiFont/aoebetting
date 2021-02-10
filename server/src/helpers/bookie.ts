import { OddsConverter } from './oddsConverter'
import { BetDTO, BetTypeEnum, EventsOdd } from '../model/betDto'

export class Bookie {
  // the fee charged by the bookmaker
  private VIGORISH: number = 0.15
  // initial amount for the starting probabilities
  private INITIAL_PROB_WEIGHT: number = 50

  public async setOdds(bets: BetDTO[], eventOdds: EventsOdd[]): Promise<EventsOdd[]> {
    if (eventOdds !== undefined) {
      const event1 = eventOdds[0].odd
      const event2 = eventOdds[1].odd

      const event1HouseStake = (event1 / 100) * this.INITIAL_PROB_WEIGHT
      const event2HouseStake = (event2 / 100) * this.INITIAL_PROB_WEIGHT

      const stubBets: BetDTO[] = []

      stubBets.push({
        eventId: 1,
        stake: event1HouseStake,
        odd: event1,
        created: new Date(),
        betType: BetTypeEnum.MoneyLine,
      })
      stubBets.push({
        eventId: 2,
        stake: event2HouseStake,
        odd: event2,
        created: new Date(),
        betType: BetTypeEnum.MoneyLine,
      })

      bets = stubBets.concat(bets)
    }

    const probs = await this.balanceProbFromBets(bets)

    const impliedOdds: EventsOdd[] = []
    const numOutcomes = probs.length

    for (const prob of probs) {
      const p = prob.odd + this.VIGORISH / numOutcomes

      impliedOdds.push({
        eventId: prob.eventId,
        odd: OddsConverter.fromProbability(p).americanOdds,
      })
    }

    return impliedOdds
  }

  public async balanceProbFromBets(bets: BetDTO[]): Promise<EventsOdd[]> {
    // todo: this can be improved saving the last calculated value in cache or database

    let total = 0
    const outcomeTotals: EventsOdd[] = []

    bets.forEach((betTuple) => {
      const outcome = betTuple.eventId
      const amount = betTuple.stake

      // increment total bet and outcome specific amount
      total += amount

      const existingOutcome = outcomeTotals.find((v) => v.eventId === outcome)

      if (existingOutcome !== undefined) {
        existingOutcome.odd = existingOutcome.odd + amount || amount
      } else {
        outcomeTotals.push({ eventId: outcome ?? 0, odd: amount })
      }
    })

    // stabilize amounts based on the average of bets amount
    outcomeTotals.forEach((b) => {
      b.odd /= total
    })

    return outcomeTotals
  }

  public getBetEarnings(bet: BetDTO, eventIdWinner: number): BetDTO {
    if (bet.eventId === eventIdWinner) {
      bet.profit = bet.stake * OddsConverter.fromAmerican(bet.odd ?? 0).decimalOdds - bet.stake
      bet.total = bet.stake + bet.profit
    }
    return bet
  }
}
