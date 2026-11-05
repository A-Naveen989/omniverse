import charactersData from "./characters.json";
import appearancesData from "./characterAppearances.json";
import toolsData from "./tools.json";
import movieDetailsData from "./omniverse-movie-details-enriched.json";

import { getCharacters, getPowers, getWeapons } from "./adminStorage";
import type {
  Character,
  CharacterAppearance,
  Power,
  Tool,
  Weapon,
} from "../types/CharacterTypes";

export interface MovieSummary {
  titleId: string;
  title: string;
  originalTitle?: string;
  year?: number;
  releaseDate?: string;
  runtimeMinutes?: number;
  genres?: string;
  imdbRating?: number;
  userRating?: number;
  imdbUrl?: string;
}

export interface CharacterMovieAppearance {
  appearance: CharacterAppearance;
  movie?: MovieSummary;
}

interface MovieDetailsFile {
  movies: MovieSummary[];
}

const bundledCharacters = charactersData as Character[];
const appearances = appearancesData as CharacterAppearance[];
const tools = toolsData as Tool[];
const movieDetails = (movieDetailsData as unknown as MovieDetailsFile).movies;

const movieById = new Map(
  movieDetails.map((movie) => [movie.titleId, movie])
);

function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))];
}

/**
 * Returns profiles from admin storage. The storage layer falls back to the
 * bundled 3,807-profile database when no admin edits have been saved.
 */
export function getCharacterProfiles(): Character[] {
  return getCharacters();
}

export function getCharacterProfile(id: string): Character | undefined {
  return getCharacterProfiles().find((character) => character.id === id);
}

export function getAllCharacterAppearances(): CharacterAppearance[] {
  return appearances;
}

export function getCharacterAppearance(
  characterId: string,
  titleId: string
): CharacterAppearance | undefined {
  return appearances.find(
    (appearance) =>
      appearance.characterId === characterId &&
      appearance.titleId === titleId
  );
}

export function getCharacterMovieAppearances(
  characterId: string
): CharacterMovieAppearance[] {
  return appearances
    .filter((appearance) => appearance.characterId === characterId)
    .map((appearance) => ({
      appearance,
      movie: movieById.get(appearance.titleId),
    }))
    .sort((a, b) => (a.movie?.year ?? 0) - (b.movie?.year ?? 0));
}

export function getMovieSummary(titleId: string): MovieSummary | undefined {
  return movieById.get(titleId);
}

export function getCharacterPowers(characterId: string): Power[] {
  const character = getCharacterProfile(characterId);
  const appearancePowerIds = appearances
    .filter((appearance) => appearance.characterId === characterId)
    .flatMap((appearance) => appearance.powerIds);

  const ids = new Set([
    ...(character?.powerIds ?? []),
    ...appearancePowerIds,
  ]);

  return getPowers().filter(
    (power) => ids.has(power.id) || power.userIds.includes(characterId)
  );
}

export function getCharacterWeapons(characterId: string): Weapon[] {
  const character = getCharacterProfile(characterId);
  const appearanceWeaponIds = appearances
    .filter((appearance) => appearance.characterId === characterId)
    .flatMap((appearance) => appearance.weaponIds);

  const ids = new Set([
    ...(character?.weaponIds ?? []),
    ...appearanceWeaponIds,
  ]);

  return getWeapons().filter(
    (weapon) => ids.has(weapon.id) || weapon.wielderIds.includes(characterId)
  );
}

export function getCharacterTools(characterId: string): Tool[] {
  const character = getCharacterProfile(characterId);
  const appearanceToolIds = appearances
    .filter((appearance) => appearance.characterId === characterId)
    .flatMap((appearance) => appearance.toolIds);

  const ids = new Set([
    ...(character?.toolIds ?? []),
    ...appearanceToolIds,
  ]);

  return tools.filter(
    (tool) => ids.has(tool.id) || tool.ownerIds.includes(characterId)
  );
}

export function searchCharacterProfiles(
  query: string,
  profiles: Character[] = getCharacterProfiles()
): Character[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return profiles;
  }

  return profiles.filter((character) => {
    const appearanceTitles = getCharacterMovieAppearances(character.id)
      .map(({ movie }) => movie?.title ?? "")
      .join(" ");

    const searchableText = [
      character.name,
      ...character.aliases,
      character.description,
      character.biography,
      character.species,
      ...character.occupation,
      ...character.affiliations,
      ...character.abilities,
      ...character.relationships,
      character.origin,
      appearanceTitles,
    ]
      .join(" ")
      .toLocaleLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/** Exposes the unmodified bundled dataset for diagnostics and import tools. */
export function getBundledCharacterProfiles(): Character[] {
  return bundledCharacters;
}

export function getCharacterDatabaseCounts() {
  return {
    characters: getCharacterProfiles().length,
    appearances: appearances.length,
    powers: getPowers().length,
    weapons: getWeapons().length,
    tools: tools.length,
    movies: movieDetails.length,
  };
}

export function getMovieTitleIdsForCharacter(character: Character): string[] {
  const appearanceIds = getCharacterMovieAppearances(character.id).map(
    ({ appearance }) => appearance.titleId
  );

  return unique([...character.titleIds, ...appearanceIds]);
}
