import Image from 'next/image';
import type { Pokemon } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';

interface Props {
  pokemon: Pokemon;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function PokemonCard({
  pokemon,
  isSelected = false,
  onClick,
}: Props) {
  const spriteUrl = pokemon.sprites.front_default ?? pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl p-3 cursor-pointer select-none transition-all duration-150 hover:scale-[1.02] ${
        isSelected
          ? 'bg-[#1a2040] border border-blue-500 shadow-lg shadow-blue-500/20'
          : 'bg-[#1a1b2e] border border-[#252640] hover:border-[#353760]'
      }`}
    >
      <div className="mb-1 flex items-start justify-between">
        <span className="text-[10px] text-slate-600 font-mono">#{String(pokemon.id).padStart(3, '0')}</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-500">Starter</span>
      </div>

      <div className="flex justify-center items-center h-24 mb-2">
        {spriteUrl ? (
          <Image
            src={spriteUrl}
            alt={pokemon.name}
            width={96}
            height={96}
            className="object-contain"
            style={{ imageRendering: 'pixelated' }}
            unoptimized
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center text-slate-700 text-3xl">?</div>
        )}
      </div>

      <p className="text-center text-sm font-semibold text-slate-200 capitalize mb-1.5">{pokemon.name}</p>

      <div className="flex justify-center gap-1 flex-wrap mb-1.5">
        {pokemon.types.map(({ type }) => (
          <span
            key={type.name}
            className="px-2 py-0.5 rounded text-[10px] font-bold text-white capitalize"
            style={{ backgroundColor: TYPE_COLORS[type.name] ?? '#6b7280' }}
          >
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
