'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Pokemon } from '@/lib/types';
import { BATCH } from '@/lib/constants';
import Header from './Header';
import PokemonCard from './PokemonCard';

interface Props {
  initialPokemon: Pokemon[];
  totalCount: number;
}

export default function PokedexApp({ initialPokemon, totalCount }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);
  const [offset, setOffset] = useState(initialPokemon.length);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || offset >= totalCount) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pokemon?offset=${offset}&limit=${BATCH}`);
      if (!res.ok) throw new Error('Failed');
      const data: { pokemon: Pokemon[]; count: number } = await res.json();
      setPokemon(prev => [...prev, ...data.pokemon]);
      setOffset(prev => prev + data.pokemon.length);
    } finally {
      setLoading(false);
    }
  }, [loading, offset, totalCount]);

  const filteredPokemon = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return pokemon;
    return pokemon.filter((entry) => entry.name.includes(query) || String(entry.id).includes(query));
  }, [pokemon, search]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0d0e1a]">
      <Header
        search={search}
        onSearch={setSearch}
        loadedCount={pokemon.length}
        totalCount={totalCount}
      />

      <main className="flex-1 overflow-y-auto p-4">
        {filteredPokemon.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-slate-500">
            No Pokémon found.
          </div>
        ) : (
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
            {filteredPokemon.map((entry) => (
              <PokemonCard
                key={entry.id}
                pokemon={entry}
                isSelected={selectedId === entry.id}
                onClick={() => setSelectedId((current) => (current === entry.id ? null : entry.id))}
              />
            ))}
          </div>
        )}

        {!search.trim() && offset < totalCount && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <button
              onClick={loadMore}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading…' : 'Load more'}
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-[#1e2038] bg-[#0a0b15] px-4 py-2 text-[11px] text-slate-500">
        Starter scope: search, card selection, and pagination.
      </footer>
    </div>
  );
}
