/**
 * Calculates the Exponential Moving Average (EMA) for a given array of prices.
 * @param prices Array of price numbers
 * @param window Number of periods for the EMA
 * @returns The latest EMA value, or null if not enough data
 */
export function predictNextPriceEMA(prices: number[], window: number = 7): number | null {
  if (prices.length < window) return null;
  const k = 2 / (window + 1);
  let ema = prices[0];
  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }
  return ema;
} 