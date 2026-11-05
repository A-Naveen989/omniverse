import charactersJson from "./anime/characters.json";
import powersJson from "./anime/powers.json";
import techniquesJson from "./anime/techniques.json";
import weaponsJson from "./anime/weapons.json";
import toolsJson from "./anime/tools.json";
import transformationsJson from "./anime/transformations.json";
import appearancesJson from "./anime/characterAppearances.json";
import statusJson from "./anime/animeResearchStatus.json";
import sourcesJson from "./anime/animeResearchSources.json";
import reportJson from "./anime/animeCharacterResearchReport.json";

import { getAnime } from "./adminStorage";
import type { Title } from "../types";
import type {
  AnimeCharacter,
  AnimeCharacterAppearance,
  AnimePower,
  AnimeTechnique,
  AnimeWeapon,
  AnimeTool,
  AnimeTransformation,
  AnimeTitleResearchStatus,
  AnimeTitleResearchSources,
  AnimeResearchReport,
} from "../types/AnimeCharacterTypes";

const characters = charactersJson as unknown as AnimeCharacter[];
const powers = powersJson as unknown as AnimePower[];
const techniques = techniquesJson as unknown as AnimeTechnique[];
const weapons = weaponsJson as unknown as AnimeWeapon[];
const tools = toolsJson as unknown as AnimeTool[];
const transformations = transformationsJson as unknown as AnimeTransformation[];
const appearances = appearancesJson as unknown as AnimeCharacterAppearance[];
const titleStatuses = statusJson as unknown as AnimeTitleResearchStatus[];
const titleSources = sourcesJson as unknown as AnimeTitleResearchSources[];
const report = reportJson as unknown as AnimeResearchReport;

export interface AnimeCharacterTitleAppearance {
  appearance: AnimeCharacterAppearance;
  title?: Title;
}

const characterById = new Map(characters.map((character) => [character.id, character]));
const appearancesByTitle = new Map<string, AnimeCharacterAppearance[]>();
const appearancesByCharacter = new Map<string, AnimeCharacterAppearance[]>();

for (const appearance of appearances) {
  const titleRows = appearancesByTitle.get(appearance.titleId) ?? [];
  titleRows.push(appearance);
  appearancesByTitle.set(appearance.titleId, titleRows);

  const characterRows = appearancesByCharacter.get(appearance.characterId) ?? [];
  characterRows.push(appearance);
  appearancesByCharacter.set(appearance.characterId, characterRows);
}

export function getAnimeCharacters(): AnimeCharacter[] {
  return characters;
}

export function getAnimeCharacterById(id: string): AnimeCharacter | undefined {
  return characterById.get(id);
}

export function getAnimeCharacterAppearance(
  characterId: string,
  titleId: string
): AnimeCharacterAppearance | undefined {
  return (appearancesByCharacter.get(characterId) ?? []).find(
    (appearance) => appearance.titleId === titleId
  );
}

export function getAnimeCharactersForTitle(titleId: string): AnimeCharacter[] {
  return (appearancesByTitle.get(titleId) ?? [])
    .map((appearance) => characterById.get(appearance.characterId))
    .filter((character): character is AnimeCharacter => Boolean(character));
}

export function getAnimeCharacterTitleAppearances(
  characterId: string
): AnimeCharacterTitleAppearance[] {
  const titleById = new Map(getAnime().map((title) => [title.id, title]));
  return (appearancesByCharacter.get(characterId) ?? [])
    .map((appearance) => ({ appearance, title: titleById.get(appearance.titleId) }))
    .sort((a, b) => (a.title?.year ?? 0) - (b.title?.year ?? 0));
}

export function getAnimePowersForCharacter(characterId: string): AnimePower[] {
  return powers.filter((power) => power.userIds.includes(characterId));
}

export function getAnimeTechniquesForCharacter(characterId: string): AnimeTechnique[] {
  return techniques.filter((technique) => technique.userIds.includes(characterId));
}

export function getAnimeWeaponsForCharacter(characterId: string): AnimeWeapon[] {
  return weapons.filter((weapon) => weapon.wielderIds.includes(characterId));
}

export function getAnimeToolsForCharacter(characterId: string): AnimeTool[] {
  return tools.filter((tool) => tool.ownerIds.includes(characterId));
}

export function getAnimeTransformationsForCharacter(characterId: string): AnimeTransformation[] {
  return transformations.filter((transformation) => transformation.characterIds.includes(characterId));
}

export function getAnimeTitleResearchStatus(titleId: string): AnimeTitleResearchStatus | undefined {
  return titleStatuses.find((record) => record.titleId === titleId);
}

export function getAnimeTitleResearchSources(titleId: string): AnimeTitleResearchSources | undefined {
  return titleSources.find((record) => record.titleId === titleId);
}

export function getAnimeCharacterResearchReport(): AnimeResearchReport {
  return report;
}

export function getAllAnimePowers(): AnimePower[] { return powers; }
export function getAllAnimeTechniques(): AnimeTechnique[] { return techniques; }
export function getAllAnimeWeapons(): AnimeWeapon[] { return weapons; }
export function getAllAnimeTools(): AnimeTool[] { return tools; }
export function getAllAnimeTransformations(): AnimeTransformation[] { return transformations; }
