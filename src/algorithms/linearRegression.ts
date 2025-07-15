/**
 * Predicts the next value in a sequence using simple linear regression.
 * @param data An array of numbers (e.g., price history).
 * @returns The predicted next value, or null if there's not enough data.
 */
export function predictNextPrice(data: number[]): number | null {
  const n = data.length;
  if (n < 2) {
    // Not enough data to create a regression line
    return null;
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    const x = i;
    const y = data[i];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  if (isNaN(slope) || isNaN(intercept)) {
    // This can happen if the denominator is zero (e.g., if all prices are the same).
    // In this case, predict the next price to be the same as the last one.
    return data[n - 1];
  }

  // Predict the value for the next time step (x = n)
  const predictedPrice = slope * n + intercept;

  return predictedPrice;
} 