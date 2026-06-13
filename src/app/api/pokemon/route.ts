import { NextRequest, NextResponse } from 'next/server';
import { fetchPokemonBatch } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get('offset') ?? '0', 10);
  const limit = parseInt(searchParams.get('limit') ?? '40', 10);

  try {
    const data = await fetchPokemonBatch(offset, limit);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch Pokémon' },
      { status: 500 }
    );
  }
}
