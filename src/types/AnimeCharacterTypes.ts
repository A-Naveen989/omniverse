/**
 * Anime encyclopedia types.
 * Kept separate from the live-action Character types in CharacterTypes.ts.
 */
export type AnimeCharacterRole = "Main" | "Supporting" | "Antagonist";

export interface AnimeCharacter {
  id: string;
  name: string;
  image: string;
  aliases: string[];
  description: string;
  biography: string;
  species: string;
  occupation: string[];
  affiliations: string[];
  titleIds: string[];
  role: AnimeCharacterRole;
  powerIds: string[];
  weaponIds: string[];
  toolIds: string[];
  abilities: string[];
  relationships: string[];
  origin: string;
}

export interface AnimeCharacterAppearance {
  characterId: string;
  titleId: string;
  role: AnimeCharacterRole;
  characterDescription: string;
  powerIds: string[];
  weaponIds: string[];
  toolIds: string[];
}

export interface AnimePower {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  userIds: string[];
  origin: string;
  strengths: string[];
  weaknesses: string[];
  specialAbilities: string[];
}

export interface AnimeTechnique {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  userIds: string[];
  origin: string;
  powerIds: string[];
  strengths: string[];
  weaknesses: string[];
  specialEffects: string[];
  requirements: string[];
}

export interface AnimeWeapon {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  wielderIds: string[];
  origin: string;
  strengths: string[];
  weaknesses: string[];
  specialAbilities: string[];
}

export interface AnimeTool {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  ownerIds: string[];
  origin: string;
  functions: string[];
  limitations: string[];
  specialFeatures: string[];
}

export interface AnimeTransformation {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  characterIds: string[];
  origin: string;
  powerIds: string[];
  abilities: string[];
  strengths: string[];
  weaknesses: string[];
  requirements: string[];
  limitations: string[];
}

export interface AnimeTitleResearchStatus {
  titleId: string;
  title: string;
  originalTitle?: string;
  year?: number;
  titleType?: string;
  researchStatus: string;
  characterIds: string[];
  characterCount: number;
  powerIds: string[];
  techniqueIds: string[];
  weaponIds: string[];
  toolIds: string[];
  transformationIds: string[];
  sourceUrls: string[];
  scopeNote?: string;
}

export interface AnimeResearchSource {
  url: string;
  publisher: string;
  supports: string;
}

export interface AnimeTitleResearchSources {
  titleId: string;
  title: string;
  sources: AnimeResearchSource[];
  scope: string;
}

export interface AnimeResearchReport {
  dataset: string;
  generatedOn: string;
  scope: {
    totalTitles: number;
    titleTypeCounts: Record<string, number>;
    individualEpisodesExcludedByInput: boolean;
  };
  outputCounts: Record<string, number>;
  coverage: Record<string, number>;
  profileFieldCoverage: Record<string, number>;
  roleCounts: Record<string, number>;
  validation: Record<string, boolean | number>;
  limitations: string[];
}
