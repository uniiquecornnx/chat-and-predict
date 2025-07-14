import { NextRequest, NextResponse } from 'next/server';
import { getBetAdvice } from '@/algorithms/betAdvice';

const NODIT_ETH_ENDPOINT = 'https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenPricesByContracts';
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

export async function POST(req: NextRequest) {
  try {
    const { token, priceToken, marketProbability, botProbability, marketOdds, bankroll, priceHistory } = await req.json();
    if (
      typeof marketProbability !== 'number' ||
      typeof botProbability !== 'number' ||
      typeof marketOdds !== 'number' ||
      typeof token !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    let price = null;
    const lookupToken = priceToken || token;
    if (lookupToken === 'ETH') {
      price = 3500;
    } else {
      const contract = TOKEN_CONTRACTS[lookupToken];
      if (!contract) {
        return NextResponse.json({ error: 'Unsupported token' }, { status: 400 });
      }
      const noditRes = await fetch(NODIT_ETH_ENDPOINT, {
        method: 'POST',
        headers: {
          'X-API-KEY': process.env.NODIT_API_KEY || '',
          'accept': 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({ contractAddresses: [contract], currency: 'USD' }),
      });
      const noditData = await noditRes.json();
      price = noditData?.data?.[0]?.price || null;
    }

    const result = getBetAdvice({ marketProbability, botProbability, marketOdds, bankroll, priceHistory });
    return NextResponse.json({ ...result, price, token });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
