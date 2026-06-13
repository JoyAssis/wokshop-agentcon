import { Pokemon } from './types';
import { TYPE_COLORS } from './constants';

/**
 * Maximum number of Pokémon allowed on a team.
 * @constant
 */
const MAX_TEAM_SIZE: number = 6;

/**
 * Adds a Pokémon to the team if there is available space and the Pokémon is not already on the team.
 *
 * This function implements team management rules:
 * - Teams are limited to a maximum of 6 Pokémon (MAX_TEAM_SIZE)
 * - Duplicate Pokémon (same ID) cannot be added
 * - The original team array is never mutated; a new array is returned
 *
 * @param team - The current team array of Pokémon
 * @param pokemon - The Pokémon to add to the team
 * @returns A new array containing the updated team. If the team is full or the Pokémon
 *          is already in the team, the original team is returned unchanged.
 *
 * @example
 * // Adding a Pokémon to an empty team
 * const emptyTeam: Pokemon[] = [];
 * const newTeam = addToTeam(emptyTeam, charizard);
 * console.log(newTeam.length); // 1
 *
 * @example
 * // Attempting to add a duplicate Pokémon
 * const team = [charizard];
 * const duplicate = { ...charizard, id: 6 };
 * const result = addToTeam(team, duplicate);
 * console.log(result.length); // 1 (duplicate not added)
 */
export function addToTeam(team: Pokemon[], pokemon: Pokemon): Pokemon[] {
  // Return original team if it's already at maximum capacity
  if (team.length >= MAX_TEAM_SIZE) {
    return team;
  }

  // Prevent duplicate Pokémon entries by checking if a Pokémon with the same ID already exists
  if (team.some((p: Pokemon) => p.id === pokemon.id)) {
    return team;
  }

  // Return new array with Pokémon appended (immutable operation)
  return [...team, pokemon];
}

/**
 * Removes a Pokémon from the team by its ID.
 *
 * This function removes the first Pokémon found with the specified ID from the team.
 * The original team array is never mutated; a new array is returned.
 *
 * @param team - The current team array of Pokémon
 * @param pokemonId - The ID of the Pokémon to remove
 * @returns A new array with the specified Pokémon removed. If the Pokémon ID is not found,
 *          the original team is returned unchanged.
 *
 * @example
 * // Removing a Pokémon from the middle of the team
 * const team = [charizard, blastoise, venusaur];
 * const updated = removeFromTeam(team, 9); // Blastoise ID
 * console.log(updated.length); // 2
 * console.log(updated); // [charizard, venusaur]
 *
 * @example
 * // Attempting to remove a non-existent Pokémon
 * const team = [charizard, blastoise];
 * const result = removeFromTeam(team, 999);
 * console.log(result); // [charizard, blastoise] (unchanged)
 */
export function removeFromTeam(
  team: Pokemon[],
  pokemonId: number
): Pokemon[] {
  // Find the index of the Pokémon with the matching ID
  const indexToRemove: number = team.findIndex((p: Pokemon) => p.id === pokemonId);

  // If Pokémon is not found, return the original team unchanged
  if (indexToRemove === -1) {
    return team;
  }

  // Return new array with the Pokémon removed (immutable operation)
  // Combines array segments before and after the removed element
  return [...team.slice(0, indexToRemove), ...team.slice(indexToRemove + 1)];
}

/**
 * Gets all unique Pokémon types covered by the team.
 *
 * Aggregates type information from all Pokémon in the team and returns a sorted,
 * deduplicated list of type names. Pokémon can have multiple types (e.g., Fire/Flying),
 * and this function ensures each type appears only once in the result.
 *
 * @param team - The team array of Pokémon to analyze
 * @returns A sorted array of unique type names covered by the team.
 *          Returns an empty array if the team is empty.
 *
 * @example
 * // Single-type Pokémon
 * const team = [blastoise]; // Water type
 * const coverage = getTypeCoverage(team);
 * console.log(coverage); // ['water']
 *
 * @example
 * // Multiple Pokémon with overlapping types
 * const team = [charizard, dragonite]; // Both have Flying type
 * const coverage = getTypeCoverage(team);
 * console.log(coverage); // ['dragon', 'fire', 'flying']
 */
export function getTypeCoverage(team: Pokemon[]): string[] {
  // Use Set to automatically handle deduplication of type names
  const typeSet: Set<string> = new Set<string>();

  // Iterate through each Pokémon in the team
  for (const pokemon of team) {
    // Extract and collect each type name from the Pokémon's type objects
    for (const typeObject of pokemon.types) {
      typeSet.add(typeObject.type.name);
    }
  }

  // Convert Set to sorted array for consistent, predictable output
  return Array.from(typeSet).sort();
}

/**
 * Gets all Pokémon types NOT covered by the current team.
 *
 * Calculates the difference between all available Pokémon types (defined in TYPE_COLORS)
 * and the types currently covered by the team. Useful for identifying type weaknesses
 * and informing team-building decisions.
 *
 * @param team - The team array of Pokémon to analyze
 * @returns A sorted array of type names that are not covered by any Pokémon in the team.
 *          If the team covers all types, returns an empty array.
 *          If the team is empty, returns all available types.
 *
 * @example
 * // Team with water type only
 * const team = [blastoise];
 * const gaps = getCoverageGaps(team);
 * console.log(gaps.includes('fire')); // true
 * console.log(gaps.includes('water')); // false
 *
 * @example
 * // Empty team (all types are gaps)
 * const emptyTeam: Pokemon[] = [];
 * const gaps = getCoverageGaps(emptyTeam);
 * console.log(gaps.length); // 18 (all available types)
 */
export function getCoverageGaps(team: Pokemon[]): string[] {
  // Get all available types from the TYPE_COLORS constant, sorted for consistency
  const allAvailableTypes: string[] = Object.keys(TYPE_COLORS);

  // Get the types currently covered by the team
  const coveredTypes: string[] = getTypeCoverage(team);

  // Filter to find types that are NOT in the team's coverage
  // Conceptually: all types - covered types = gaps
  return allAvailableTypes.filter(
    (type: string) => !coveredTypes.includes(type)
  );
}
