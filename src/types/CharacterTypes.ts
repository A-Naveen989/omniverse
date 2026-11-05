export type CharacterRole = "Main" | "Supporting" | "Antagonist";

/**
 * A character is a canonical identity shared across one or more titles.
 * Role is deliberately not stored here because it belongs to a specific title.
 */
export interface Character {
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
  powerIds: string[];
  weaponIds: string[];
  toolIds: string[];
  abilities: string[];
  relationships: string[];
  origin: string;
}

/** A movie-specific relationship; this is the authoritative location for role. */
export interface CharacterAppearance {
  characterId: string;
  titleId: string;
  role: CharacterRole;
  characterDescription: string;
  powerIds: string[];
  weaponIds: string[];
  toolIds: string[];
}

export interface Power {
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

export interface Weapon {
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

export interface Tool {
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
