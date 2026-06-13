import Image from 'next/image';
import type { Pokemon } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';

interface Props {
  pokemon: Pokemon;
  isSelected?: boolean;
  isFavorited?: boolean;
  onClick?: () => void;
  onFavoriteToggle?: () => void;
  onAddToTeam?: () => void;
  isInTeam?: boolean;
  disableAdd?: boolean;
}

export default function PokemonCard({
  pokemon,
  isSelected = false,
  isFavorited = false,
  onClick,
  onFavoriteToggle,
  onAddToTeam,
  isInTeam = false,
  disableAdd = false,
}: Props) {
  const spriteUrl = pokemon.sprites.front_default ?? pokemon.sprites.other['official-artwork'].front_default;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.();
  };

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
        <button
          onClick={handleFavoriteClick}
          className="p-1 rounded transition-colors hover:bg-[#252640]"
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className={`w-4 h-4 ${isFavorited ? 'text-red-500 fill-red-500' : 'text-slate-500'}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
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

      <div className="flex justify-center">
        <button
          onClick={(e) => { e.stopPropagation(); onAddToTeam?.(); }}
          disabled={disableAdd || isInTeam}
          className={`mt-2 rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
            isInTeam ? 'bg-green-600 text-white cursor-default' : 'bg-blue-600 text-white hover:bg-blue-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isInTeam ? 'Adicionado' : '➕ Adicionar à Equipe'}
        </button>
      </div>
    </div>
  );
}
