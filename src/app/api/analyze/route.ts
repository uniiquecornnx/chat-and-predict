import { NextRequest, NextResponse } from 'next/server';
import { getBetAdvice } from '@/algorithms/betAdvice';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;
const ALCHEMY_PRICE_HISTORY_ENDPOINT = `https://api.g.alchemy.com/prices/v1/${ALCHEMY_API_KEY}/tokens/historical`;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY!;
const TOKEN_CONTRACTS: Record<string, string | null> = {
  ETH: null, // native
  WBTC: '0x2260FAC5E5542a773AaA73edC008A79646d1F9912',
  WDOGE: '0xbA2aE424d960c26247Dd6c32edC70B295c744C43',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  SHIBA: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  PEPE: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
  TON: '0x2e9d63788249371f1dfc918a52f8d799f4a38c94', // ERC-20 version
  // SOL: Not ERC-20, handle separately if needed
  // BONK: Not ERC-20, handle separately if needed
};

const COINGECKO_IDS: Record<string, string> = {
  SOL: 'solana',
  BONK: 'bonk',
  BTC: 'bitcoin',
  DOGE: 'dogecoin',
  HYPE: 'hyperliquid',
  PENGU: 'pudgy-penguins',
  PUMP: 'pump-fun',
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

async function fetchAlchemyHistory(token: string, contract: string | null, days: number) {
  if (!contract && token !== 'ETH') return [];
  const startTime = getPastISOString(days);
  const endTime = getTodayISOString();
  const body = contract
    ? { network: 'ethereum', address: contract, startTime, endTime }
    : { symbol: token, startTime, endTime };
  const res = await fetch(ALCHEMY_PRICE_HISTORY_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data?.data?.prices) {
    return data.data.prices.map((p: any) => parseFloat(p.value)).filter((v: any) => !isNaN(v));
  }
  return [];
}

async function fetchCoinGeckoHistory(contract: string, days: number) {
  const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contract}/market_chart?vs_currency=usd&days=${days}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.prices) {
      return data.prices.map((p: any) => p[1]).filter((v: any) => !isNaN(v));
    } else {
      console.log(`[CoinGecko] No price history found for contract: ${contract}`);
    }
  } catch (err) {
    console.error(`[CoinGecko] Error fetching price history for contract: ${contract}`, err);
  }
  return [];
}

async function fetchSolHistory(days: number) {
  const url = `https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=${days}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.prices) {
      return data.prices.map((p: any) => p[1]).filter((v: any) => !isNaN(v));
    } else {
      console.log(`[CoinGecko] No price history found for SOL`);
    }
  } catch (err) {
    console.error(`[CoinGecko] Error fetching price history for SOL`, err);
  }
  return [];
}

async function fetchCoinGeckoIdHistory(id: string, days: number) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data?.prices) {
      return data.prices.map((p: any) => p[1]).filter((v: any) => !isNaN(v));
    } else {
      console.log(`[CoinGecko] No price history found for id: ${id}`);
    }
  } catch (err) {
    console.error(`[CoinGecko] Error fetching price history for id: ${id}`, err);
  }
  return [];
}

const NODIT_API_URL = process.env.NODIT_API_URL || "http://localhost:3000/api/nodit";

async function fetchCurrentPriceNodit(token: string) {
  try {
    const res = await fetch(NODIT_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "get_price", // Replace with actual Nodit method for price
        params: [token],
        id: 1
      })
    });
    const data = await res.json();
    if (data?.result?.price) {
      return data.result.price;
    }
  } catch (err) {
    console.error(`[Nodit] Error fetching current price for ${token}`, err);
  }
  return null;
}

// Fetch current price using CoinGecko
async function fetchCurrentPriceCoinGecko(token: string, contract?: string) {
  try {
    let url = "";
    if (token === "ETH") {
      url = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`;
    } else if (COINGECKO_IDS[token]) {
      url = `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS[token]}&vs_currencies=usd`;
    } else if (contract) {
      url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contract}&vs_currencies=usd`;
    } else {
      return null;
    }
    const res = await fetch(url);
    const data = await res.json();
    if (token === "ETH" && data?.ethereum?.usd) return data.ethereum.usd;
    if (COINGECKO_IDS[token] && data[COINGECKO_IDS[token]]?.usd) return data[COINGECKO_IDS[token]].usd;
    if (contract) {
      const key = Object.keys(data)[0];
      if (key && data[key]?.usd) return data[key].usd;
    }
  } catch (err) {
    console.error(`[CoinGecko] Error fetching current price for ${token}`, err);
  }
  return null;
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
    // Fetch current price using Nodit, fallback to CoinGecko
    price = await fetchCurrentPriceNodit(lookupToken);
    let contract = TOKEN_CONTRACTS[lookupToken];
    if (price === null) {
      price = await fetchCurrentPriceCoinGecko(lookupToken, contract === null ? undefined : contract);
    }
    if (COINGECKO_IDS[lookupToken]) {
      // Non-ERC20 tokens: use CoinGecko ID endpoints
      const history7 = await fetchCoinGeckoIdHistory(COINGECKO_IDS[lookupToken], 7);
      priceHistory = history7;
      ma7 = calculateMovingAverage(history7, 7);
      botProbability = ma7 && price ? Math.min(1, Math.max(0, ma7 / price)) : 0.6;
    } else if (lookupToken === 'ETH') {
      priceHistory = [3400, 3450, 3500];
      botProbability = 0.6;
      ma7 = ma15 = ma30 = 3500;
    } else {
      const contract = TOKEN_CONTRACTS[lookupToken];
      if (!contract) {
        return NextResponse.json({ error: 'Unsupported token' }, { status: 400 });
      }
      // Try Alchemy first
      let history7 = await fetchAlchemyHistory(token, contract, 7);
      if (!history7.length) {
        // Fallback to CoinGecko
        history7 = await fetchCoinGeckoHistory(contract, 7);
      }
      priceHistory = history7;
      ma7 = calculateMovingAverage(history7, 7);
      botProbability = ma7 && price ? Math.min(1, Math.max(0, ma7 / price)) : 0.6;
    }

    const result = getBetAdvice({
      marketProbability: marketProbability ?? 0.55,
      botProbability,
      marketOdds: marketOdds ?? 1.8,
      bankroll,
      priceHistory,
    });
    return NextResponse.json({ ...result, price, token, ma7 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
