import { Pokemon, PokemonType } from './types';
import {
  addToTeam,
  removeFromTeam,
  getTypeCoverage,
  getCoverageGaps,
} from './teamUtils';

// Mock helper to create Pokemon objects
const createMockPokemon = (
  id: number,
  name: string,
  types: string[]
): Pokemon => ({
  id,
  name,
  height: 10,
  weight: 100,
  base_experience: 100,
  types: types.map((typeName, index) => ({
    slot: index + 1,
    type: { name: typeName, url: `https://example.com/types/${typeName}` },
  })),
  stats: [],
  abilities: [],
  sprites: {
    front_default: null,
    front_shiny: null,
    back_default: null,
    other: {
      'official-artwork': {
        front_default: null,
        front_shiny: null,
      },
    },
  },
});

// Test fixtures
const charizard = createMockPokemon(6, 'charizard', ['fire', 'flying']);
const blastoise = createMockPokemon(9, 'blastoise', ['water']);
const venusaur = createMockPokemon(3, 'venusaur', ['grass', 'poison']);
const pikachu = createMockPokemon(25, 'pikachu', ['electric']);
const dragonite = createMockPokemon(149, 'dragonite', ['dragon', 'flying']);
const alakazam = createMockPokemon(65, 'alakazam', ['psychic']);
const golem = createMockPokemon(76, 'golem', ['rock', 'ground']);
const gyarados = createMockPokemon(130, 'gyarados', ['water', 'flying']);
const machamp = createMockPokemon(68, 'machamp', ['fighting']);
const lapras = createMockPokemon(131, 'lapras', ['water', 'ice']);

// All available types from TYPE_COLORS in constants.ts
const ALL_TYPES = [
  'fire',
  'water',
  'grass',
  'electric',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
  'normal',
];

describe('addToTeam', () => {
  it('should add pokemon to empty team', () => {
    const team: Pokemon[] = [];
    const result = addToTeam(team, charizard);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(charizard);
  });

  it('should add pokemon to team with available slots', () => {
    const team = [charizard];
    const result = addToTeam(team, blastoise);
    expect(result).toHaveLength(2);
    expect(result).toContain(charizard);
    expect(result).toContain(blastoise);
  });

  it('should not add pokemon if already in team by ID', () => {
    const team = [charizard, blastoise];
    const duplicateCharizard = createMockPokemon(6, 'charizard', ['fire', 'flying']);
    const result = addToTeam(team, duplicateCharizard);
    expect(result).toHaveLength(2);
    expect(result).toEqual([charizard, blastoise]);
  });

  it('should not add pokemon if team is full (6 pokemon)', () => {
    const fullTeam = [
      charizard,
      blastoise,
      venusaur,
      pikachu,
      dragonite,
      alakazam,
    ];
    const result = addToTeam(fullTeam, golem);
    expect(result).toHaveLength(6);
    expect(result).toEqual(fullTeam);
    expect(result).not.toContain(golem);
  });

  it('should add pokemon when team has 5 members (one slot left)', () => {
    const team = [charizard, blastoise, venusaur, pikachu, dragonite];
    const result = addToTeam(team, alakazam);
    expect(result).toHaveLength(6);
    expect(result).toContain(alakazam);
  });

  it('should return new array without mutating original', () => {
    const team = [charizard];
    const originalLength = team.length;
    const result = addToTeam(team, blastoise);
    expect(team.length).toBe(originalLength);
    expect(result).not.toBe(team);
  });

  it('should handle multiple additions in sequence', () => {
    let team: Pokemon[] = [];
    team = addToTeam(team, charizard);
    team = addToTeam(team, blastoise);
    team = addToTeam(team, venusaur);
    expect(team).toHaveLength(3);
    expect(team).toEqual([charizard, blastoise, venusaur]);
  });
});

describe('removeFromTeam', () => {
  it('should remove pokemon by ID from team', () => {
    const team = [charizard, blastoise, venusaur];
    const result = removeFromTeam(team, 9); // blastoise id
    expect(result).toHaveLength(2);
    expect(result).not.toContain(blastoise);
    expect(result).toEqual([charizard, venusaur]);
  });

  it('should remove pokemon from beginning of team', () => {
    const team = [charizard, blastoise, venusaur];
    const result = removeFromTeam(team, 6); // charizard id
    expect(result).toHaveLength(2);
    expect(result).toEqual([blastoise, venusaur]);
  });

  it('should remove pokemon from end of team', () => {
    const team = [charizard, blastoise, venusaur];
    const result = removeFromTeam(team, 3); // venusaur id
    expect(result).toHaveLength(2);
    expect(result).toEqual([charizard, blastoise]);
  });

  it('should not modify team if pokemon ID not found', () => {
    const team = [charizard, blastoise];
    const result = removeFromTeam(team, 999); // non-existent id
    expect(result).toHaveLength(2);
    expect(result).toEqual([charizard, blastoise]);
  });

  it('should handle removing from single-pokemon team', () => {
    const team = [charizard];
    const result = removeFromTeam(team, 6); // charizard id
    expect(result).toHaveLength(0);
  });

  it('should handle removing from empty team', () => {
    const team: Pokemon[] = [];
    const result = removeFromTeam(team, 6);
    expect(result).toHaveLength(0);
  });

  it('should return new array without mutating original', () => {
    const team = [charizard, blastoise];
    const originalLength = team.length;
    const result = removeFromTeam(team, 6);
    expect(team.length).toBe(originalLength);
    expect(result).not.toBe(team);
  });

  it('should only remove first occurrence if duplicates exist', () => {
    const team = [charizard, blastoise, venusaur, charizard];
    const result = removeFromTeam(team, 6); // charizard id
    expect(result).toHaveLength(3);
    const charizardCount = result.filter((p) => p.id === 6).length;
    expect(charizardCount).toBe(1);
  });
});

describe('getTypeCoverage', () => {
  it('should return all types from single-type pokemon', () => {
    const team = [blastoise]; // water type
    const result = getTypeCoverage(team);
    expect(result).toContain('water');
  });

  it('should return all types from dual-type pokemon', () => {
    const team = [charizard]; // fire and flying
    const result = getTypeCoverage(team);
    expect(result).toContain('fire');
    expect(result).toContain('flying');
  });

  it('should return unique types without duplicates', () => {
    const team = [charizard, dragonite]; // both have flying
    const result = getTypeCoverage(team);
    const flyingCount = result.filter((t) => t === 'flying').length;
    expect(flyingCount).toBe(1);
  });

  it('should aggregate types from multiple pokemon', () => {
    const team = [
      charizard, // fire, flying
      blastoise, // water
      venusaur, // grass, poison
    ];
    const result = getTypeCoverage(team);
    expect(result).toContain('fire');
    expect(result).toContain('flying');
    expect(result).toContain('water');
    expect(result).toContain('grass');
    expect(result).toContain('poison');
    expect(result).toHaveLength(5);
  });

  it('should return empty array for empty team', () => {
    const team: Pokemon[] = [];
    const result = getTypeCoverage(team);
    expect(result).toEqual([]);
  });

  it('should handle full team with overlapping types', () => {
    const team = [
      charizard, // fire, flying
      dragonite, // dragon, flying
      gyarados, // water, flying
      lapras, // water, ice
      pikachu, // electric
      machamp, // fighting
    ];
    const result = getTypeCoverage(team);
    // Should have: fire, flying, dragon, water, ice, electric, fighting
    expect(result).toContain('fire');
    expect(result).toContain('flying');
    expect(result).toContain('dragon');
    expect(result).toContain('water');
    expect(result).toContain('ice');
    expect(result).toContain('electric');
    expect(result).toContain('fighting');
    expect(result).toHaveLength(7);
  });

  it('should not include types not in team', () => {
    const team = [charizard, blastoise]; // fire, flying, water
    const result = getTypeCoverage(team);
    expect(result).not.toContain('grass');
    expect(result).not.toContain('electric');
  });

  it('should work with pokemon having the same types', () => {
    const charizard2 = createMockPokemon(6, 'charizard', ['fire', 'flying']);
    const charizard3 = createMockPokemon(6, 'charizard', ['fire', 'flying']);
    const team = [charizard2, charizard3];
    const result = getTypeCoverage(team);
    expect(result).toEqual(['fire', 'flying']);
  });
});

describe('getCoverageGaps', () => {
  it('should return all types when team is empty', () => {
    const team: Pokemon[] = [];
    const result = getCoverageGaps(team);
    expect(result).toHaveLength(ALL_TYPES.length);
    ALL_TYPES.forEach((type) => {
      expect(result).toContain(type);
    });
  });

  it('should return missing types for single-type pokemon team', () => {
    const team = [blastoise]; // only water
    const result = getCoverageGaps(team);
    expect(result).not.toContain('water');
    expect(result).toContain('fire');
    expect(result).toContain('grass');
    expect(result).toContain('electric');
    expect(result.length).toBe(ALL_TYPES.length - 1);
  });

  it('should identify gaps in dual-type pokemon team', () => {
    const team = [charizard]; // fire, flying
    const result = getCoverageGaps(team);
    expect(result).not.toContain('fire');
    expect(result).not.toContain('flying');
    expect(result).toContain('water');
    expect(result).toContain('grass');
    expect(result.length).toBe(ALL_TYPES.length - 2);
  });

  it('should return no gaps for complete coverage', () => {
    // Create pokemon covering all types
    const completeTeam = [
      createMockPokemon(1, 'pokemon1', [
        'fire',
        'water',
        'grass',
        'electric',
        'ice',
      ]),
      createMockPokemon(2, 'pokemon2', [
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
      ]),
      createMockPokemon(3, 'pokemon3', [
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
      ]),
      createMockPokemon(4, 'pokemon4', ['steel', 'fairy', 'normal']),
    ];
    const result = getCoverageGaps(completeTeam);
    expect(result).toEqual([]);
  });

  it('should identify gaps in multi-pokemon team', () => {
    const team = [
      charizard, // fire, flying
      blastoise, // water
      venusaur, // grass, poison
    ];
    const result = getCoverageGaps(team);
    const covered = getTypeCoverage(team);
    
    // Gaps should not include covered types
    covered.forEach((type) => {
      expect(result).not.toContain(type);
    });

    // Should include all uncovered types
    const expectedGaps = ALL_TYPES.filter((t) => !covered.includes(t));
    expect(result).toEqual(expectedGaps);
  });

  it('should handle team with overlapping types', () => {
    const team = [
      charizard, // fire, flying
      dragonite, // dragon, flying
      gyarados, // water, flying
    ];
    const result = getCoverageGaps(team);
    expect(result).not.toContain('fire');
    expect(result).not.toContain('flying');
    expect(result).not.toContain('dragon');
    expect(result).not.toContain('water');
    expect(result).toContain('grass');
    expect(result).toContain('electric');
  });

  it('should return correct gaps for nearly complete team', () => {
    const almostComplete = [
      charizard, // fire, flying
      blastoise, // water
      venusaur, // grass, poison
      pikachu, // electric
      alakazam, // psychic
      machamp, // fighting
    ];
    const result = getCoverageGaps(almostComplete);
    const covered = getTypeCoverage(almostComplete);
    
    // Should have gaps for types not in the team
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThan(ALL_TYPES.length);
    
    // Verify no overlap between covered and gaps
    covered.forEach((type) => {
      expect(result).not.toContain(type);
    });
  });

  it('should work correctly with the relationship to getTypeCoverage', () => {
    const team = [charizard, blastoise, venusaur];
    const coverage = getTypeCoverage(team);
    const gaps = getCoverageGaps(team);

    // Every type should be either covered or in gaps (but not both)
    ALL_TYPES.forEach((type) => {
      const inCoverage = coverage.includes(type);
      const inGaps = gaps.includes(type);
      expect(inCoverage).not.toBe(inGaps); // XOR: one or the other, not both
    });

    // Coverage + gaps should equal all types
    const union = new Set([...coverage, ...gaps]);
    expect(union.size).toBe(ALL_TYPES.length);
  });
});
