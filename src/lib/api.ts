import { Pokemon, PokemonListResponse } from './types';

const BASE_URL = 'https://pokeapi.co/api/v2';
const CACHE = { next: { revalidate: 3600 } };

export async function fetchPokemonBatch(
  offset: number,
  limit: number
): Promise<{ pokemon: Pokemon[]; count: number }> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    CACHE
  );

  if (!res.ok) throw new Error('Failed to fetch Pokemon list');

  const data: PokemonListResponse = await res.json();

  const pokemon = await Promise.all(
    data.results.map(async (p) => {
      const detailRes = await fetch(p.url, CACHE);
      if (!detailRes.ok) throw new Error(`Failed to fetch ${p.name}`);
      return detailRes.json() as Promise<Pokemon>;
    })
  );

  return { pokemon, count: data.count };
}
