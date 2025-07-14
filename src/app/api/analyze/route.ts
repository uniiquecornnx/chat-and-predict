import { NextRequest, NextResponse } from 'next/server';
import { getBetAdvice } from '@/algorithms/betAdvice';

const ALCHEMY_API_KEY = 's-hL3Vfz4wA9SExlo7HX0O4cESo63hKL';
const ALCHEMY_PRICE_HISTORY_ENDPOINT = `https://api.g.alchemy.com/prices/v1/${ALCHEMY_API_KEY}/tokens/historical`;
const TOKEN_CONTRACTS: Record<string, string | null> = {
  ETH: null, // native
  WBTC: '0x2260FAC5E5542a773AaA73edC008A79646d1F9912',
  WDOGE: '0x3832d2F059E55934220881F831bE501D180671A7',
  WSOL: '0xd93f7E271cB87c23AaA73edC008A79646d1F9912',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  SHIBA: '0xd93f7E271cB87c23AaA73edC008A79646d1F9912',
  TON: '0xd93f7E271cB87c23AaA73edC008A79646d1F9912',
  PEPE: '0xd93f7E271cB87c23AaA73edC008A79646d1F9912',
  BONK: '0xd93f7E271cB87c23AaA73edC008A79646d1F9912',
};

function calculateMovingAverage(prices: number[], window: number): number | null {
  if (prices.length < window) return null;
  const sum = prices.slice(-window).reduce((a, b) => a + b, 0);
  return sum / window;
}

function getTodayISOString() {
  return new Date().toISOString().split('T')[0] + 'T23:59:59Z';
}
function getPastISOString(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0] + 'T00:00:00Z';
}

export async function POST(req: NextRequest) {
  try {
    const { token, priceToken, marketProbability, marketOdds, bankroll } = await req.json();
    if (
      typeof marketOdds !== 'number' ||
      typeof token !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    let price = null;
    let priceHistory: number[] = [];
    let botProbability = 0.6; // fallback
    let ma7 = null, ma15 = null, ma30 = null;
    const lookupToken = priceToken || token;
    let symbol = token;
    if (lookupToken === 'ETH') {
      price = 3500;
      priceHistory = [3400, 3450, 3500];
      botProbability = 0.6;
      ma7 = ma15 = ma30 = 3500;
    } else {
      const contract = TOKEN_CONTRACTS[lookupToken];
      if (!contract) {
        return NextResponse.json({ error: 'Unsupported token' }, { status: 400 });
      }
      // Use symbol for Alchemy (if not ETH)
      // For demo, fallback to symbol if contract not mapped
      // Fetch 30 days of price history from Alchemy
      const fetchHistory = async (days: number) => {
        const startTime = getPastISOString(days);
        const endTime = getTodayISOString();
        const body = contract
          ? { contractAddress: contract, startTime, endTime }
          : { symbol, startTime, endTime };
        const res = await fetch(ALCHEMY_PRICE_HISTORY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        return data?.data?.prices?.map((p: any) => parseFloat(p.value)).filter((v: any) => !isNaN(v)) || [];
      };
      // Fetch histories
      const [history7, history15, history30] = await Promise.all([
        fetchHistory(7),
        fetchHistory(15),
        fetchHistory(30),
      ]);
      // Use the latest price from the most recent history
      price = history7.length ? history7[history7.length - 1] : null;
      priceHistory = history7;
      ma7 = calculateMovingAverage(history7, 7);
      ma15 = calculateMovingAverage(history15, 15);
      ma30 = calculateMovingAverage(history30, 30);
      // Use 7-day MA as botProbability for demo
      botProbability = ma7 && price ? Math.min(1, Math.max(0, ma7 / price)) : 0.6;
    }

    const result = getBetAdvice({
      marketProbability: marketProbability ?? 0.55,
      botProbability,
      marketOdds: marketOdds ?? 1.8,
      bankroll,
      priceHistory,
    });
    return NextResponse.json({ ...result, price, token, ma7, ma15, ma30 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
