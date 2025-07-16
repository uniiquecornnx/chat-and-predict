/**
 * Predicts the next value in a sequence using 2nd-degree polynomial regression.
 * @param data An array of numbers (e.g., price history).
 * @returns The predicted next value, or null if there's not enough data.
 */
export function predictNextPricePolynomial(data: number[]): number | null {
  const n = data.length;
  if (n < 3) {
    // Not enough data for quadratic regression
    return null;
  }

  // Fit y = ax^2 + bx + c
  let sumX = 0, sumX2 = 0, sumX3 = 0, sumX4 = 0;
  let sumY = 0, sumXY = 0, sumX2Y = 0;

  for (let i = 0; i < n; i++) {
    const x = i;
    const y = data[i];
    sumX += x;
    sumX2 += x * x;
    sumX3 += x * x * x;
    sumX4 += x * x * x * x;
    sumY += y;
    sumXY += x * y;
    sumX2Y += x * x * y;
  }

  // Solve the normal equations for a, b, c
  // | n    sumX   sumX2 |   | c |   | sumY   |
  // | sumX sumX2  sumX3 | * | b | = | sumXY  |
  // | sumX2 sumX3 sumX4 |   | a |   | sumX2Y |
  const A = [
    [n, sumX, sumX2],
    [sumX, sumX2, sumX3],
    [sumX2, sumX3, sumX4],
  ];
  const B = [sumY, sumXY, sumX2Y];

  // Gaussian elimination
  function solve(A: number[][], B: number[]): number[] {
    const n = B.length;
    for (let i = 0; i < n; i++) {
      // Partial pivot
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
      }
      [A[i], A[maxRow]] = [A[maxRow], A[i]];
      [B[i], B[maxRow]] = [B[maxRow], B[i]];
      // Eliminate
      for (let k = i + 1; k < n; k++) {
        const c = A[k][i] / A[i][i];
        for (let j = i; j < n; j++) {
          A[k][j] -= c * A[i][j];
        }
        B[k] -= c * B[i];
      }
    }
    // Back substitution
    const x = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      x[i] = B[i];
      for (let j = i + 1; j < n; j++) {
        x[i] -= A[i][j] * x[j];
      }
      x[i] /= A[i][i];
    }
    return x;
  }

  let a = 0, b = 0, c = 0;
  try {
    [c, b, a] = solve(A, B);
  } catch {
    return null;
  }

  // Predict the value for the next time step (x = n)
  const predicted = a * n * n + b * n + c;
  return predicted;
} 