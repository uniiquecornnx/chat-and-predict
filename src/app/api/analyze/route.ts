import { NextRequest, NextResponse } from 'next/server';
import { getBetAdvice } from '@/algorithms/betAdvice';

export async function POST(req: NextRequest) {
  try {
    const { marketProbability, botProbability, marketOdds, bankroll, priceHistory } = await req.json();
    if (
      typeof marketProbability !== 'number' ||
      typeof botProbability !== 'number' ||
      typeof marketOdds !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const result = getBetAdvice({ marketProbability, botProbability, marketOdds, bankroll, priceHistory });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
