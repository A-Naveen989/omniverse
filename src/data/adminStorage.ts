
/* =========================================
   OMNIVERSE - ADMIN STORAGE
   ========================================= */

import type { Title } from "../types";
import type {
  Character as CharacterProfile,
  Power as PowerRecord,
  Weapon as WeaponRecord,
} from "../types/CharacterTypes";

import moviesData from "./movies.json";
import seriesData from "./series.json";
import animeData from "./anime.json";
import charactersData from "./characters.json";
import powersData from "./powers.json";
import weaponsData from "./weapons.json";

import {
  getStorageItem,
  setStorageItem,
} from "../utils/storage";

/* =========================================
   STORAGE KEYS
   ========================================= */

const TITLES_STORAGE_KEY = "admin-titles";
const CHARACTERS_STORAGE_KEY = "admin-characters";
const POWERS_STORAGE_KEY = "admin-powers";
const WEAPONS_STORAGE_KEY = "admin-weapons";

const SERIES_DATA_VERSION_KEY = "admin-series-data-version";
const SERIES_DATA_VERSION = 1;

const ANIME_DATA_VERSION_KEY = "admin-anime-data-version";
const ANIME_DATA_VERSION = 2;

// These were the four temporary demo records shipped before the IMDb animation import.
const LEGACY_ANIME_SAMPLE_IDS = new Set([
  "demon-slayer",
  "jujutsu-kaisen",
  "my-hero-academia",
  "naruto-shippuden",
]);

// Episode records removed from the previous 138-record animation export.
// The replacement anime.json intentionally contains 108 records without episodes.
const REMOVED_ANIME_EPISODE_IDS = new Set([
  "tt8489800",
  "tt8489792",
  "tt33609045",
  "tt8489814",
  "tt32986935",
  "tt10433108",
  "tt17324012",
  "tt33609043",
  "tt23779658",
  "tt33609040",
  "tt32986933",
  "tt24250910",
  "tt33609039",
  "tt23475664",
  "tt8489808",
  "tt24438368",
  "tt23055240",
  "tt10433106",
  "tt8489810",
  "tt33609044",
  "tt23650588",
  "tt23018132",
  "tt30223243",
  "tt15190820",
  "tt24438514",
  "tt33478674",
  "tt24058952",
  "tt23854592",
  "tt33609042",
  "tt15757632",
]);

/* =========================================
   IMDb SERIES RECORD TYPE
   ========================================= */

interface IMDbMovieRecord {
  Const: string;
  Title: string;
  "IMDb Rating"?: number | null;
  Year?: number | null;
  Genres?: string | null;
  "Runtime (mins)"?: number | null;
  URL?: string;
  Directors?: string | null;
}

interface IMDbSeriesRecord {
  Const: string;
  Title: string;
  "Original Title"?: string;
  "IMDb Rating"?: number | null;
  "Your Rating"?: number | null;
  Year?: number | null;
  Genres?: string | null;
  "Runtime (mins)"?: number | null;
  URL?: string;
  Directors?: string | null;
}

/* =========================================
   HELPER FUNCTIONS
   ========================================= */

function toOptionalNumber(
  value: unknown
): number | undefined {
  return typeof value === "number" &&
    Number.isFinite(value)
    ? value
    : undefined;
}

/* =========================================
   CONVERT IMDb DATA TO TITLE FORMAT
   ========================================= */

function normalizeSeriesRecord(
  record: IMDbSeriesRecord
): Title {
  const genres = (record.Genres ?? "")
    .split(",")
    .map((genre) => genre.trim())
    .filter(Boolean);

  const runtime = toOptionalNumber(
    record["Runtime (mins)"]
  );

  const director = record.Directors?.trim();

  return {
    id: record.Const,
    name: record.Title,
    type: "series",

    year: toOptionalNumber(record.Year) ?? 0,

    country: "Not listed",

    rating: toOptionalNumber(
      record["IMDb Rating"]
    ) ?? 0,

    genre: genres,

    description: "",
    poster: "",
    backdrop: "",

    ...(director ? { director } : {}),
    ...(runtime !== undefined ? { runtime } : {}),
    ...(record.URL ? { imdb: record.URL } : {}),
  };
}

/* =========================================
   INITIAL MOVIE DATABASE
   ========================================= */

function normalizeMovieRecord(record: IMDbMovieRecord): Title {
  const genres = (record.Genres ?? "")
    .split(",")
    .map((genre) => genre.trim())
    .filter(Boolean);
  const runtime = toOptionalNumber(record["Runtime (mins)"]);
  const director = record.Directors?.trim();

  return {
    id: record.Const,
    name: record.Title,
    type: "movie",
    year: toOptionalNumber(record.Year) ?? 0,
    country: "Not listed",
    rating: toOptionalNumber(record["IMDb Rating"]) ?? 0,
    genre: genres,
    description: "",
    poster: "",
    backdrop: "",
    ...(director ? { director } : {}),
    ...(runtime !== undefined ? { runtime } : {}),
    ...(record.URL ? { imdb: record.URL } : {}),
  };
}

const initialMovies: Title[] = (
  moviesData as unknown as IMDbMovieRecord[]
)
  .filter((record) => Boolean(record?.Const && record?.Title))
  .map(normalizeMovieRecord);

/* =========================================
   INITIAL SERIES DATABASE
   ========================================= */

const initialSeries: Title[] = (
  seriesData as unknown as IMDbSeriesRecord[]
)
  .filter(
    (record) =>
      Boolean(record?.Const && record?.Title)
  )
  .map(normalizeSeriesRecord);

/* =========================================
   INITIAL DATABASE
   ========================================= */

interface IMDbAnimeRecord {
  Const: string;
  Title: string;
  "Original Title"?: string | null;
  "Title Type"?: string | null;
  "Your Rating"?: number | null;
  "Date Rated"?: string | null;
  "IMDb Rating"?: number | null;
  "Runtime (mins)"?: number | null;
  Year?: number | null;
  Genres?: string | null;
  "Num Votes"?: number | null;
  "Release Date"?: string | null;
  URL?: string | null;
  Directors?: string | null;
}

function normalizeAnimeRecord(record: IMDbAnimeRecord): Title {
  const genres = (record.Genres ?? "")
    .split(",")
    .map((genre) => genre.trim())
    .filter(Boolean);

  // IMDb exports may represent missing values as NaN; never call trim on those.
  const director =
    typeof record.Directors === "string"
      ? record.Directors.trim()
      : "";
  const runtime = toOptionalNumber(record["Runtime (mins)"]);
  const yourRating = toOptionalNumber(record["Your Rating"]);
  const numVotes = toOptionalNumber(record["Num Votes"]);

  return {
    id: record.Const,
    name: record.Title,
    type: "anime",
    year: toOptionalNumber(record.Year) ?? 0,
    country: "Not listed",
    rating: toOptionalNumber(record["IMDb Rating"]) ?? 0,
    genre: genres,
    description: "",
    poster: "",
    backdrop: "",
    ...(director ? { director } : {}),
    ...(runtime !== undefined ? { runtime } : {}),
    ...(record.URL ? { imdb: record.URL } : {}),
    ...(record["Title Type"] ? { format: record["Title Type"] } : {}),
    ...(record["Original Title"] ? { originalTitle: record["Original Title"] } : {}),
    ...(record["Release Date"] ? { releaseDate: record["Release Date"] } : {}),
    ...(yourRating !== undefined ? { yourRating } : {}),
    ...(record["Date Rated"] ? { dateRated: record["Date Rated"] } : {}),
    ...(numVotes !== undefined ? { numVotes } : {}),
  };
}

const initialAnime: Title[] = (animeData as IMDbAnimeRecord[])
  .filter((record) => Boolean(record?.Const && record?.Title))
  .map(normalizeAnimeRecord);

const initialTitles: Title[] = [
  ...initialMovies,
  ...initialSeries,
  ...initialAnime,
];

const initialCharacters: CharacterProfile[] =
  charactersData as CharacterProfile[];

const initialPowers: PowerRecord[] =
  powersData as PowerRecord[];

const initialWeapons: WeaponRecord[] =
  weaponsData as WeaponRecord[];

/* =========================================
   SAVE TITLES
   ========================================= */

export function saveTitles(
  titles: Title[]
): boolean {
  return setStorageItem(
    TITLES_STORAGE_KEY,
    titles
  );
}

/* =========================================
   MIGRATE SERIES DATA
   ========================================= */

function migrateSeriesData(): void {
  const currentVersion = getStorageItem<number>(
    SERIES_DATA_VERSION_KEY,
    0
  );

  if (currentVersion >= SERIES_DATA_VERSION) {
    return;
  }

  const storedTitles = getStorageItem<Title[]>(
    TITLES_STORAGE_KEY,
    initialTitles
  );

  const safeStoredTitles = (
    Array.isArray(storedTitles)
      ? storedTitles
      : []
  ).filter((title) => {
    if (!title || typeof title !== "object") {
      return false;
    }

    // Remove malformed old IMDb series records.
    if (
      title.type === "series" &&
      (!title.id || !title.name)
    ) {
      return false;
    }

    return true;
  });

  const existingIds = new Set(
    safeStoredTitles
      .map((title) => title.id)
      .filter(
        (id): id is string => Boolean(id)
      )
  );

  // Only add series that do not already exist.
  const missingSeries = initialSeries.filter(
    (series) => !existingIds.has(series.id)
  );

  const mergedTitles = [
    ...safeStoredTitles,
    ...missingSeries,
  ];

  const malformedRowsWereRemoved =
    safeStoredTitles.length !== (
      Array.isArray(storedTitles)
        ? storedTitles.length
        : 0
    );

  if (
    missingSeries.length > 0 ||
    malformedRowsWereRemoved
  ) {
    const saved = saveTitles(mergedTitles);

    if (!saved) {
      return;
    }
  }

  setStorageItem(
    SERIES_DATA_VERSION_KEY,
    SERIES_DATA_VERSION
  );
}

/* =========================================
   MIGRATE ANIME DATA
   ========================================= */

function migrateAnimeData(): void {
  const currentVersion = getStorageItem<number>(
    ANIME_DATA_VERSION_KEY,
    0
  );

  if (currentVersion >= ANIME_DATA_VERSION) {
    return;
  }

  const storedTitles = getStorageItem<Title[]>(
    TITLES_STORAGE_KEY,
    initialTitles
  );

  const safeStoredTitles = Array.isArray(storedTitles)
    ? storedTitles.filter(
        (title): title is Title =>
          Boolean(title && typeof title === "object" && title.id && title.name)
      )
    : [];

  // Remove temporary demo records and the 30 episode rows dropped from the source export.
  // Other user-created anime records and all movie/series records are preserved.
  const titlesWithoutLegacySamples = safeStoredTitles.filter(
    (title) =>
      !(
        title.type === "anime" &&
        (LEGACY_ANIME_SAMPLE_IDS.has(title.id) ||
          REMOVED_ANIME_EPISODE_IDS.has(title.id))
      )
  );

  const existingIds = new Set(
    titlesWithoutLegacySamples.map((title) => title.id)
  );

  // Append source records that are not already present; preserve existing edits.
  const missingAnime = initialAnime.filter(
    (anime) => !existingIds.has(anime.id)
  );

  const mergedTitles = [
    ...titlesWithoutLegacySamples,
    ...missingAnime,
  ];

  const changed =
    missingAnime.length > 0 ||
    titlesWithoutLegacySamples.length !== safeStoredTitles.length ||
    safeStoredTitles.length !== (Array.isArray(storedTitles) ? storedTitles.length : 0);

  if (changed) {
    const saved = saveTitles(mergedTitles);
    if (!saved) {
      return;
    }
  }

  setStorageItem(ANIME_DATA_VERSION_KEY, ANIME_DATA_VERSION);
}

/* =========================================
   GET ALL TITLES
   ========================================= */

export function getTitles(): Title[] {
  migrateSeriesData();
  migrateAnimeData();

  return getStorageItem<Title[]>(
    TITLES_STORAGE_KEY,
    initialTitles
  );
}

/* =========================================
   GET MOVIES
   ========================================= */

export function getMovies(): Title[] {
  return getTitles().filter(
    (title) => title.type === "movie"
  );
}

/* =========================================
   GET SERIES
   ========================================= */

export function getSeries(): Title[] {
  return getTitles().filter(
    (title) => title.type === "series"
  );
}

/* =========================================
   GET ANIME
   ========================================= */

export function getAnime(): Title[] {
  return getTitles().filter(
    (title) => title.type === "anime"
  );
}

/* =========================================
   GET CHARACTERS
   ========================================= */

function isCharacterProfile(value: unknown): value is CharacterProfile {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<CharacterProfile>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    Array.isArray(candidate.aliases) &&
    Array.isArray(candidate.occupation) &&
    Array.isArray(candidate.affiliations) &&
    Array.isArray(candidate.titleIds) &&
    Array.isArray(candidate.powerIds) &&
    Array.isArray(candidate.weaponIds) &&
    Array.isArray(candidate.toolIds) &&
    Array.isArray(candidate.abilities) &&
    Array.isArray(candidate.relationships)
  );
}

function migrateLegacyCharacter(value: unknown): CharacterProfile | null {
  if (!value || typeof value !== "object") return null;

  const legacy = value as Record<string, unknown>;
  if (typeof legacy.id !== "string" || typeof legacy.name !== "string") {
    return null;
  }

  const legacyPower = typeof legacy.power === "string" ? legacy.power : "";
  const legacyDescription =
    typeof legacy.description === "string" ? legacy.description : "";
  const legacyBiography =
    typeof legacy.biography === "string" ? legacy.biography : legacyDescription;
  const legacyAffiliation =
    typeof legacy.affiliation === "string" ? [legacy.affiliation] : [];
  const legacyAffiliations = Array.isArray(legacy.affiliations)
    ? legacy.affiliations.filter((item): item is string => typeof item === "string")
    : legacyAffiliation;
  const legacyAppearances = Array.isArray(legacy.appearances)
    ? legacy.appearances.filter(
        (item): item is { titleId: string } =>
          Boolean(item && typeof item === "object" && typeof (item as { titleId?: unknown }).titleId === "string")
      )
    : [];
  const legacyTitleIds = Array.isArray(legacy.titleIds)
    ? legacy.titleIds.filter((item): item is string => typeof item === "string")
    : [];
  const legacyRelationships = Array.isArray(legacy.relationships)
    ? legacy.relationships.map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object") {
          const relationship = item as { name?: unknown; relation?: unknown };
          if (typeof relationship.name === "string") {
            return `${relationship.name}${typeof relationship.relation === "string" ? ` — ${relationship.relation}` : ""}`;
          }
        }
        return "";
      }).filter(Boolean)
    : [];

  return {
    id: legacy.id,
    name: legacy.name,
    image: typeof legacy.image === "string" ? legacy.image : "",
    aliases: Array.isArray(legacy.aliases)
      ? legacy.aliases.filter((item): item is string => typeof item === "string")
      : [],
    description: legacyDescription,
    biography: legacyBiography,
    species: typeof legacy.species === "string" ? legacy.species : "Unknown",
    occupation: Array.isArray(legacy.occupation)
      ? legacy.occupation.filter((item): item is string => typeof item === "string")
      : [],
    affiliations: legacyAffiliations,
    titleIds: [...new Set([...legacyTitleIds, ...legacyAppearances.map((item) => item.titleId), ...(typeof legacy.titleId === "string" ? [legacy.titleId] : [])])],
    powerIds: Array.isArray(legacy.powerIds)
      ? legacy.powerIds.filter((item): item is string => typeof item === "string")
      : Array.isArray(legacy.abilityIds)
        ? legacy.abilityIds.filter((item): item is string => typeof item === "string")
        : [],
    weaponIds: Array.isArray(legacy.weaponIds)
      ? legacy.weaponIds.filter((item): item is string => typeof item === "string")
      : [],
    toolIds: Array.isArray(legacy.toolIds)
      ? legacy.toolIds.filter((item): item is string => typeof item === "string")
      : [],
    abilities: [
      ...(Array.isArray(legacy.abilities)
        ? legacy.abilities.filter((item): item is string => typeof item === "string")
        : []),
      ...(legacyPower ? [legacyPower] : []),
    ],
    relationships: legacyRelationships,
    origin: typeof legacy.origin === "string" ? legacy.origin : "Unknown",
  };
}

/**
 * Reads the canonical character schema. Older characters saved by the previous
 * admin form are migrated and appended without discarding the bundled database.
 */
export function getCharacters(): CharacterProfile[] {
  const stored = getStorageItem<unknown>(CHARACTERS_STORAGE_KEY, null);

  if (stored === null) {
    return initialCharacters;
  }

  if (!Array.isArray(stored)) {
    return initialCharacters;
  }

  if (stored.every(isCharacterProfile)) {
    return stored;
  }

  const merged = new Map(
    initialCharacters.map((character) => [character.id, character])
  );

  for (const item of stored) {
    const profile = isCharacterProfile(item)
      ? item
      : migrateLegacyCharacter(item);

    if (profile) {
      merged.set(profile.id, profile);
    }
  }

  const migratedCharacters = [...merged.values()];
  setStorageItem(CHARACTERS_STORAGE_KEY, migratedCharacters);
  return migratedCharacters;
}

/* =========================================
   SAVE CHARACTERS
   ========================================= */

export function saveCharacters(
  characters: CharacterProfile[]
): boolean {
  return setStorageItem(
    CHARACTERS_STORAGE_KEY,
    characters
  );
}

/* =========================================
   GET POWERS
   ========================================= */

export function getPowers(): PowerRecord[] {
  return getStorageItem<PowerRecord[]>(
    POWERS_STORAGE_KEY,
    initialPowers
  );
}

/* =========================================
   SAVE POWERS
   ========================================= */

export function savePowers(
  powers: PowerRecord[]
): boolean {
  return setStorageItem(
    POWERS_STORAGE_KEY,
    powers
  );
}

/* =========================================
   GET WEAPONS
   ========================================= */

export function getWeapons(): WeaponRecord[] {
  return getStorageItem<WeaponRecord[]>(
    WEAPONS_STORAGE_KEY,
    initialWeapons
  );
}

/* =========================================
   SAVE WEAPONS
   ========================================= */

export function saveWeapons(
  weapons: WeaponRecord[]
): boolean {
  return setStorageItem(
    WEAPONS_STORAGE_KEY,
    weapons
  );
}

/* =========================================
   RESET ADMIN DATA
   ========================================= */

export function resetAdminData(): void {
  saveTitles(initialTitles);
  saveCharacters(initialCharacters);
  savePowers(initialPowers);
  saveWeapons(initialWeapons);

  setStorageItem(
    SERIES_DATA_VERSION_KEY,
    SERIES_DATA_VERSION
  );
  setStorageItem(
    ANIME_DATA_VERSION_KEY,
    ANIME_DATA_VERSION
  );
}

/* =========================================
   DASHBOARD STATISTICS
   ========================================= */

export function getDashboardStats() {
  const titles = getTitles();

  return {
    totalMovies: titles.filter(
      (title) => title.type === "movie"
    ).length,

    totalSeries: titles.filter(
      (title) => title.type === "series"
    ).length,

    totalAnime: titles.filter(
      (title) => title.type === "anime"
    ).length,

    totalCharacters: getCharacters().length,

    totalPowers: getPowers().length,

    totalWeapons: getWeapons().length,
  };
}
