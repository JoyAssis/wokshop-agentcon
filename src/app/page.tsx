import { fetchPokemonBatch } from '@/lib/api';
import { BATCH } from '@/lib/constants';
import PokedexApp from './components/PokedexApp';

export default async function Home() {
  try {
    const { pokemon, count } = await fetchPokemonBatch(0, BATCH);
    return <PokedexApp initialPokemon={pokemon} totalCount={count} />;
  } catch {
    return (
      <main className="flex items-center justify-center h-screen bg-[#0d0e1a]">
        <p className="text-red-400 text-lg">Failed to load Pokémon. Please refresh the page.</p>
      </main>
    );
  }
}
