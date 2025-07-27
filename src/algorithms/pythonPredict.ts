export async function fetchPythonPrediction(
  endpoint: 'arima' | 'lstm',
  prices: number[]
): Promise<number | null> {
  try {
    const res = await fetch(`http://localhost:5001/predict/${endpoint}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prices }),
      }
    );
    const data = await res.json();
    return typeof data.prediction === 'number' ? data.prediction : null;
  } catch {
    return null;
  }
} 