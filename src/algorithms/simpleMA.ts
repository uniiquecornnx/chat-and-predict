// Simple Moving Average (SMA) algorithm

/**
 * Calculates the Simple Moving Average (SMA) for a given array of prices.
 * @param prices Array of price numbers
 * @param window Number of periods for the moving average
 * @returns Array of SMA values (same length as prices, with undefined for indices before window-1)
 */
export function simpleMovingAverage(prices: number[], window: number): (number | undefined)[] {
  if (window <= 0) throw new Error('Window size must be positive');
  const sma: (number | undefined)[] = [];
  for (let i = 0; i < prices.length; i++) {
    if (i < window - 1) {
      sma.push(undefined); // Not enough data for SMA
    } else {
      const sum = prices.slice(i - window + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(sum / window);
    }
  }
  return sma;
} 