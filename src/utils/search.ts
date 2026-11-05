
/* =========================================
   OMNIVERSE - SEARCH UTILITIES
   ========================================= */

import type {
  Title,
  Character,
  Power,
  Weapon,
} from "../types";

/* =========================================
   SEARCH ITEM TYPES
   ========================================= */

export type SearchableItem =
  | Title
  | Character
  | Power
  | Weapon;

export type SearchCategory =
  | "movie"
  | "series"
  | "anime"
  | "character"
  | "power"
  | "weapon";

/* =========================================
   NORMALIZE SEARCH TEXT
   ========================================= */

export function normalizeSearchText(
  text: string
): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

/* =========================================
   SEARCH TITLES
   ========================================= */

export function searchTitles(
  titles: Title[],
  query: string
): Title[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return titles;
  }

  return titles.filter((title) => {
    const searchableText = [
      title.name,
      title.type,
      title.year.toString(),
      title.country,
      title.description,
      ...title.genre,
      title.director ?? "",
      title.creator ?? "",
      title.studio ?? "",
      title.language ?? "",
    ].join(" ");

    return normalizeSearchText(searchableText).includes(
      normalizedQuery
    );
  });
}

/* =========================================
   SEARCH CHARACTERS
   ========================================= */

export function searchCharacters(
  characters: Character[],
  query: string
): Character[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return characters;
  }

  return characters.filter((character) => {
    const searchableText = [
      character.name,
      character.title,
      character.role,
      character.power,
      character.description,
      character.age?.toString() ?? "",
      character.gender ?? "",
      character.species ?? "",
      character.affiliation ?? "",
      character.firstAppearance ?? "",
      ...(character.abilities ?? []),
    ].join(" ");

    return normalizeSearchText(searchableText).includes(
      normalizedQuery
    );
  });
}

/* =========================================
   SEARCH POWERS
   ========================================= */

export function searchPowers(
  powers: Power[],
  query: string
): Power[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return powers;
  }

  return powers.filter((power) => {
    const searchableText = [
      power.name,
      power.user,
      power.title,
      power.category,
      power.description,
      power.origin ?? "",
      power.powerLevel?.toString() ?? "",
      ...(power.abilities ?? []),
      ...(power.weaknesses ?? []),
    ].join(" ");

    return normalizeSearchText(searchableText).includes(
      normalizedQuery
    );
  });
}

/* =========================================
   SEARCH WEAPONS
   ========================================= */

export function searchWeapons(
  weapons: Weapon[],
  query: string
): Weapon[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return weapons;
  }

  return weapons.filter((weapon) => {
    const searchableText = [
      weapon.name,
      weapon.user,
      weapon.title,
      weapon.category,
      weapon.description,
      weapon.material ?? "",
      weapon.origin ?? "",
      weapon.powerLevel?.toString() ?? "",
      ...(weapon.abilities ?? []),
    ].join(" ");

    return normalizeSearchText(searchableText).includes(
      normalizedQuery
    );
  });
}

/* =========================================
   SEARCH ALL CONTENT
   ========================================= */

export interface GlobalSearchResult {
  id: string;
  name: string;
  category: SearchCategory;
  description: string;
  image: string;
  item: SearchableItem;
}

export function searchAllContent(
  titles: Title[],
  characters: Character[],
  powers: Power[],
  weapons: Weapon[],
  query: string
): GlobalSearchResult[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const titleResults = searchTitles(titles, query).map(
    (title): GlobalSearchResult => ({
      id: title.id,
      name: title.name,
      category: title.type,
      description: title.description,
      image: title.poster,
      item: title,
    })
  );

  const characterResults = searchCharacters(
    characters,
    query
  ).map(
    (character): GlobalSearchResult => ({
      id: character.id,
      name: character.name,
      category: "character",
      description: character.description,
      image: character.image,
      item: character,
    })
  );

  const powerResults = searchPowers(powers, query).map(
    (power): GlobalSearchResult => ({
      id: power.id,
      name: power.name,
      category: "power",
      description: power.description,
      image: power.image ?? "",
      item: power,
    })
  );

  const weaponResults = searchWeapons(weapons, query).map(
    (weapon): GlobalSearchResult => ({
      id: weapon.id,
      name: weapon.name,
      category: "weapon",
      description: weapon.description,
      image: weapon.image ?? "",
      item: weapon,
    })
  );

  return [
    ...titleResults,
    ...characterResults,
    ...powerResults,
    ...weaponResults,
  ];
}

/* =========================================
   SEARCH BY CATEGORY
   ========================================= */

export function searchByCategory(
  titles: Title[],
  characters: Character[],
  powers: Power[],
  weapons: Weapon[],
  category: SearchCategory,
  query: string
): GlobalSearchResult[] {
  const allResults = searchAllContent(
    titles,
    characters,
    powers,
    weapons,
    query
  );

  return allResults.filter(
    (result) => result.category === category
  );
}

/* =========================================
   LIMIT SEARCH RESULTS
   ========================================= */

export function limitSearchResults<T>(
  results: T[],
  limit: number = 10
): T[] {
  return results.slice(0, Math.max(0, limit));
}
