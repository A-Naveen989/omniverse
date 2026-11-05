/* =========================================
   OMNIVERSE - SERIES CHARACTER DATA ACCESS

   Keep this richer series-character model separate
   from the existing admin Character model.
   ========================================= */

export type CharacterRole = "Main" | "Supporting" | "Antagonist";

export interface CharacterAppearance {
  titleId: string;
  role: CharacterRole;
}

export interface SeriesCharacterRelationship {
  name: string;
  relation: string;
  description?: string;
}

export interface SeriesCharacter {
  id: string;
  name: string;
  image: string;
  gallery: string[];
  appearances: CharacterAppearance[];
  biography: string;
  age?: string;
  gender?: string;
  species?: string;
  height?: string;
  birthday?: string;
  personality: string;
  affiliations: string[];
  relationships: SeriesCharacterRelationship[];
  firstAppearance: string;
  characterDevelopment: string;
  abilityIds: string[];
  powerIds: string[];
  weaponIds: string[];
  fightingStyle?: string;
  weaknesses: string[];
  achievements: string[];
  notableBattles: string[];
}

export interface SeriesCastCredit {
  titleId: string;
  characterId: string;
  character: string;
  actor: string;
  role: CharacterRole;
}

export interface SeriesResearchSource {
  name: string;
  url: string;
  scope?: string;
}

export interface SeriesCharacterSourceRecord {
  titleId: string;
  title: string;
  researchStatus: string;
  characterIds: string[];
  characterCount: number;
  actorCharacterCreditCount: number;
  sources: SeriesResearchSource[];
  webResearchReferenceIds: string[];
  scopeNote: string;
}

export interface SeriesNonfictionPerson {
  name: string;
  credit: string;
}

export interface SeriesNonfictionRecord {
  titleId: string;
  title: string;
  format: string;
  people: SeriesNonfictionPerson[];
  sourceUrls: string[];
  note: string;
}

import charactersJson from "./series-characters.json";
import castCreditsJson from "./series-cast-credits.json";
import sourcesJson from "./series-character-sources.json";
import nonfictionJson from "./series-nonfiction-presenters.json";

const seriesCharacters = charactersJson as unknown as SeriesCharacter[];
const seriesCastCredits = castCreditsJson as unknown as SeriesCastCredit[];
const seriesSources = sourcesJson as unknown as SeriesCharacterSourceRecord[];
const seriesNonfiction = nonfictionJson as unknown as SeriesNonfictionRecord[];

/** All researched fictional characters, with shared IDs across series. */
export function getAllSeriesCharacters(): SeriesCharacter[] {
  return seriesCharacters;
}

/** Characters appearing in the requested IMDb series ID. */
export function getSeriesCharactersForTitle(
  titleId: string
): SeriesCharacter[] {
  return seriesCharacters.filter((character) =>
    character.appearances.some((appearance) => appearance.titleId === titleId)
  );
}

/** Actor-to-character credits for one series. */
export function getSeriesCastForTitle(
  titleId: string
): SeriesCastCredit[] {
  return seriesCastCredits.filter((credit) => credit.titleId === titleId);
}

/** Research notes and source URLs for one series. */
export function getSeriesSourcesForTitle(
  titleId: string
): SeriesCharacterSourceRecord | undefined {
  return seriesSources.find((record) => record.titleId === titleId);
}

/** Hosts and guests for unscripted/talk-show titles. */
export function getSeriesNonfictionForTitle(
  titleId: string
): SeriesNonfictionRecord | undefined {
  return seriesNonfiction.find((record) => record.titleId === titleId);
}
