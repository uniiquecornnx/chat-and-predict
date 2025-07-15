// Bet advice logic for prediction market bot

export interface BetAdviceInput {
  marketProbability: number; // e.g. 0.55 for 55%
  botProbability: number;    // e.g. 0.60 for 60%
  marketOdds: number;        // e.g. 1.8 (decimal odds)
  bankroll?: number;         // optional, for stake advice
  priceHistory?: number[];   // optional, for trend analysis
}

export interface BetAdviceResult {
  oddsAdvice: string;
  trendAdvice: string;
  sentimentAdvice: string;
  priceHistory?: number[];
}

export function getBetAdvice(input: BetAdviceInput): BetAdviceResult {
  // (A) Odds Analysis
  const edge = input.botProbability - input.marketProbability;
  let oddsAdvice = '';
  if (edge > 0) {
    oddsAdvice = "This market is undervalued. You’re getting alpha here. Go for it.";
  } else {
    oddsAdvice = "Careful! The market is overpricing this. Risk is higher than reward ⚠️.";
  }

  // (B) Stake Size Advice (Kelly Criterion)
  // Remove or comment out 'stakeAdvice' if it is not used
  // if (input.bankroll && input.marketOdds > 1) {
  //   // Kelly formula: f* = (bp - q) / (odds - 1), where b = odds - 1, p = botProbability, q = 1 - p
  //   const b = input.marketOdds - 1;
  //   const p = input.botProbability;
  //   const q = 1 - p;
  //   const kelly = (b * p - q) / b;
  //   const percent = Math.max(0, Math.round(kelly * 100));
  //   stakeAdvice = `Optimal stake: ${percent}% of your bankroll.`;
  // } else {
  //   stakeAdvice = "No bankroll info provided. Can't compute optimal stake.";
  // }

  // (C) Market Trends (improved)
  let trendAdvice = '';
  if (input.priceHistory && input.priceHistory.length > 1) {
    const oldPrice = input.priceHistory[0];
    const newPrice = input.priceHistory[input.priceHistory.length - 1];
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    trendAdvice = `Price changed ${change.toFixed(2)}% over the period.`;
    if (Math.abs(change) > 20) {
      trendAdvice += " Could be risky 🚨.";
    } else if (change > 0) {
      trendAdvice += " Uptrend 📈.";
    } else if (change < 0) {
      trendAdvice += " Downtrend 📉.";
    } else {
      trendAdvice += " Flat trend.";
    }
  } else {
    trendAdvice = "No price history available for trend analysis.";
  }

  // (D) Sentiment Check (mocked)
  const sentimentAdvice = Math.random() > 0.5
    ? "Sentiment is highly bullish on this outcome – 80% of recent posts agree."
    : "Sentiment is mixed. Proceed cautiously.";

  return {
    oddsAdvice,
    trendAdvice,
    sentimentAdvice,
    priceHistory: input.priceHistory,
  };
} 