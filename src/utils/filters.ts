
/* =========================================
   OMNIVERSE - FILTER UTILITIES
   ========================================= */

import type {
  Title,
  Character,
  Power,
  Weapon,
  TitleFilters,
} from "../types";

import { searchTitles } from "./search";

/* =========================================
   SORT OPTIONS
   ========================================= */

export type TitleSortOption =
  | "name-asc"
  | "name-desc"
  | "year-asc"
  | "year-desc"
  | "rating-asc"
  | "rating-desc";

/* =========================================
   FILTER TITLES
   ========================================= */

export function filterTitles(
  titles: Title[],
  filters: TitleFilters
): Title[] {
  let filteredTitles = [...titles];

  /* Filter by content type */
  if (filters.type) {
    filteredTitles = filteredTitles.filter(
      (title) => title.type === filters.type
    );
  }

  /* Filter by genre */
  if (filters.genre) {
    const selectedGenre = filters.genre.toLowerCase();

    filteredTitles = filteredTitles.filter((title) =>
      title.genre.some(
        (genre) => genre.toLowerCase() === selectedGenre
      )
    );
  }

  /* Filter by release year */
  if (filters.year !== undefined) {
    filteredTitles = filteredTitles.filter(
      (title) => title.year === filters.year
    );
  }

  /* Filter by country */
  if (filters.country) {
    const selectedCountry = filters.country.toLowerCase();

    filteredTitles = filteredTitles.filter(
      (title) =>
        title.country.toLowerCase() === selectedCountry
    );
  }

  /* Filter by minimum rating */
  if (filters.rating !== undefined) {
    filteredTitles = filteredTitles.filter(
      (title) => title.rating >= filters.rating!
    );
  }

  /* Filter by search query */
  if (filters.search?.trim()) {
    filteredTitles = searchTitles(
      filteredTitles,
      filters.search
    );
  }

  return filteredTitles;
}

/* =========================================
   SORT TITLES
   ========================================= */

export function sortTitles(
  titles: Title[],
  sortOption: TitleSortOption = "rating-desc"
): Title[] {
  const sortedTitles = [...titles];

  switch (sortOption) {
    case "name-asc":
      return sortedTitles.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "name-desc":
      return sortedTitles.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    case "year-asc":
      return sortedTitles.sort(
        (a, b) => a.year - b.year
      );

    case "year-desc":
      return sortedTitles.sort(
        (a, b) => b.year - a.year
      );

    case "rating-asc":
      return sortedTitles.sort(
        (a, b) => a.rating - b.rating
      );

    case "rating-desc":
      return sortedTitles.sort(
        (a, b) => b.rating - a.rating
      );

    default:
      return sortedTitles;
  }
}

/* =========================================
   FILTER CHARACTERS
   ========================================= */

export interface CharacterFilters {
  title?: string;
  role?: string;
  search?: string;
}

export function filterCharacters(
  characters: Character[],
  filters: CharacterFilters
): Character[] {
  let filteredCharacters = [...characters];

  if (filters.title) {
    filteredCharacters = filteredCharacters.filter(
      (character) =>
        character.title.toLowerCase() ===
        filters.title!.toLowerCase()
    );
  }

  if (filters.role) {
    filteredCharacters = filteredCharacters.filter(
      (character) =>
        character.role.toLowerCase() ===
        filters.role!.toLowerCase()
    );
  }

  if (filters.search?.trim()) {
    const query = filters.search.toLowerCase().trim();

    filteredCharacters = filteredCharacters.filter(
      (character) => {
        const searchableText = [
          character.name,
          character.title,
          character.role,
          character.power,
          character.description,
          ...(character.abilities ?? []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      }
    );
  }

  return filteredCharacters;
}

/* =========================================
   FILTER POWERS
   ========================================= */

export interface PowerFilters {
  category?: string;
  title?: string;
  search?: string;
}

export function filterPowers(
  powers: Power[],
  filters: PowerFilters
): Power[] {
  let filteredPowers = [...powers];

  if (filters.category) {
    filteredPowers = filteredPowers.filter(
      (power) =>
        power.category.toLowerCase() ===
        filters.category!.toLowerCase()
    );
  }

  if (filters.title) {
    filteredPowers = filteredPowers.filter(
      (power) =>
        power.title.toLowerCase() ===
        filters.title!.toLowerCase()
    );
  }

  if (filters.search?.trim()) {
    const query = filters.search.toLowerCase().trim();

    filteredPowers = filteredPowers.filter((power) => {
      const searchableText = [
        power.name,
        power.user,
        power.title,
        power.category,
        power.description,
        ...(power.abilities ?? []),
        ...(power.weaknesses ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }

  return filteredPowers;
}

/* =========================================
   FILTER WEAPONS
   ========================================= */

export interface WeaponFilters {
  category?: string;
  title?: string;
  search?: string;
}

export function filterWeapons(
  weapons: Weapon[],
  filters: WeaponFilters
): Weapon[] {
  let filteredWeapons = [...weapons];

  if (filters.category) {
    filteredWeapons = filteredWeapons.filter(
      (weapon) =>
        weapon.category.toLowerCase() ===
        filters.category!.toLowerCase()
    );
  }

  if (filters.title) {
    filteredWeapons = filteredWeapons.filter(
      (weapon) =>
        weapon.title.toLowerCase() ===
        filters.title!.toLowerCase()
    );
  }

  if (filters.search?.trim()) {
    const query = filters.search.toLowerCase().trim();

    filteredWeapons = filteredWeapons.filter((weapon) => {
      const searchableText = [
        weapon.name,
        weapon.user,
        weapon.title,
        weapon.category,
        weapon.description,
        weapon.material ?? "",
        ...(weapon.abilities ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }

  return filteredWeapons;
}

/* =========================================
   GET UNIQUE GENRES
   ========================================= */

export function getUniqueGenres(
  titles: Title[]
): string[] {
  const genres = titles.flatMap((title) => title.genre);

  return [...new Set(genres)].sort((a, b) =>
    a.localeCompare(b)
  );
}

/* =========================================
   GET UNIQUE YEARS
   ========================================= */

export function getUniqueYears(
  titles: Title[]
): number[] {
  const years = titles.map((title) => title.year);

  return [...new Set(years)].sort(
    (a, b) => b - a
  );
}

/* =========================================
   GET UNIQUE COUNTRIES
   ========================================= */

export function getUniqueCountries(
  titles: Title[]
): string[] {
  const countries = titles.map(
    (title) => title.country
  );

  return [...new Set(countries)].sort(
    (a, b) => a.localeCompare(b)
  );
}

/* =========================================
   GET UNIQUE POWER CATEGORIES
   ========================================= */

export function getUniquePowerCategories(
  powers: Power[]
): string[] {
  const categories = powers.map(
    (power) => power.category
  );

  return [...new Set(categories)].sort(
    (a, b) => a.localeCompare(b)
  );
}

/* =========================================
   GET UNIQUE WEAPON CATEGORIES
   ========================================= */

export function getUniqueWeaponCategories(
  weapons: Weapon[]
): string[] {
  const categories = weapons.map(
    (weapon) => weapon.category
  );

  return [...new Set(categories)].sort(
    (a, b) => a.localeCompare(b)
  );
}
