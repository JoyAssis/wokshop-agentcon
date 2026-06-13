'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Pokemon } from '@/lib/types';
import { BATCH } from '@/lib/constants';
import { addToTeam, removeFromTeam, getTypeCoverage, getCoverageGaps } from '@/lib/teamUtils';
import { TYPE_COLORS } from '@/lib/constants';
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
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [team, setTeam] = useState<Pokemon[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pokedex-favorites');
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pokedex-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((pokemonId: number) => {
    setFavorites(prev =>
      prev.includes(pokemonId)
        ? prev.filter(id => id !== pokemonId)
        : [...prev, pokemonId]
    );
  }, []);

  const selectRandomPokemon = useCallback(() => {
    if (pokemon.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pokemon.length);
    setSelectedId(pokemon[randomIndex].id);
  }, [pokemon]);

  const handleAddToTeam = useCallback((p: Pokemon) => {
    setTeam(prev => addToTeam(prev, p));
  }, []);

  const handleRemoveFromTeam = useCallback((pokemonId: number) => {
    setTeam(prev => removeFromTeam(prev, pokemonId));
  }, []);

  const coveredTypes = useMemo(() => getTypeCoverage(team), [team]);
  const coverageGaps = useMemo(() => getCoverageGaps(team), [team]);

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

  const displayedPokemon = useMemo(() => {
    if (!showOnlyFavorites) return filteredPokemon;
    return filteredPokemon.filter(p => favorites.includes(p.id));
  }, [filteredPokemon, favorites, showOnlyFavorites]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0d0e1a]">
      <Header
        search={search}
        onSearch={setSearch}
        loadedCount={pokemon.length}
        totalCount={totalCount}
        favoriteCount={favorites.length}
        showOnlyFavorites={showOnlyFavorites}
        onFavoritesFilterToggle={() => setShowOnlyFavorites(prev => !prev)}
        onRandomSelect={selectRandomPokemon}
      />

      <main className="flex-1 overflow-y-auto p-4">
        {displayedPokemon.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-sm text-slate-500">
            {showOnlyFavorites && favorites.length === 0
              ? 'No favorites yet. Heart a Pokémon to save it!'
              : 'No Pokémon found.'}
          </div>
        ) : (
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
            {displayedPokemon.map((entry) => (
              <PokemonCard
                key={entry.id}
                pokemon={entry}
                isSelected={selectedId === entry.id}
                isFavorited={favorites.includes(entry.id)}
                onFavoriteToggle={() => toggleFavorite(entry.id)}
                onClick={() => setSelectedId((current) => (current === entry.id ? null : entry.id))}
                onAddToTeam={() => handleAddToTeam(entry)}
                isInTeam={team.some(t => t.id === entry.id)}
                disableAdd={team.length >= 6}
              />
            ))}
          </div>
        )}

        {!search.trim() && offset < totalCount && !showOnlyFavorites && (
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

        {/* Team Panel */}
        <div className="mt-6 rounded-lg border border-[#1e2038] bg-[#07102a] p-3 text-sm text-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold">Equipe ({team.length}/6)</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTeam([])}
                disabled={team.length === 0}
                className="rounded-md bg-red-600 px-3 py-1 text-xs text-white disabled:opacity-50"
              >
                Limpar Equipe
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            {team.length === 0 ? (
              <div className="text-slate-400">Nenhum Pokémon na equipe.</div>
            ) : (
              team.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleRemoveFromTeam(t.id)}
                  title={`Remover ${t.name} da equipe`}
                  className="w-12 h-12 rounded-md overflow-hidden bg-[#0b1220] border border-[#162033]"
                >
                  <img src={t.sprites.front_default ?? t.sprites.other['official-artwork'].front_default} alt={t.name} className="w-full h-full object-contain" />
                </button>
              ))
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <div className="w-full text-xs text-slate-300 font-semibold">Tipos cobertos:</div>
            {coveredTypes.length === 0 ? (
              <div className="text-slate-400 text-xs">—</div>
            ) : (
              coveredTypes.map((type) => (
                <span key={type} className="px-2 py-0.5 rounded text-[10px] font-bold text-white capitalize" style={{ backgroundColor: TYPE_COLORS[type] ?? '#6b7280' }}>
                  {type}
                </span>
              ))
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="w-full text-xs text-slate-300 font-semibold">Lacunas:</div>
            {coverageGaps.length === 0 ? (
              <div className="text-slate-400 text-xs">Nenhuma — cobertura completa</div>
            ) : (
              coverageGaps.slice(0, 8).map((type) => (
                <span key={type} className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-200 capitalize border" style={{ borderColor: TYPE_COLORS[type] ?? '#334155' }}>
                  {type}
                </span>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#1e2038] bg-[#0a0b15] px-4 py-2 text-[11px] text-slate-500">
        Starter scope: search, card selection, pagination, and favorites.
      </footer>
    </div>
  );
}
