import { NextRequest, NextResponse } from 'next/server';

const NODIT_AVALANCHE_ENDPOINT = 'https://avalanche-fuji.nodit.io/majBfBsBugLFJq5rOepzhpKS6LUI3pdw';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const noditRes = await fetch(NODIT_AVALANCHE_ENDPOINT, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await noditRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 