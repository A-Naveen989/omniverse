import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(projectRoot, "src", "data");
const errors = [];
const warnings = [];
const metrics = [];

function readJson(relativePath) {
  const fullPath = path.join(dataRoot, relativePath);
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    errors.push(`${relativePath}: ${error.message}`);
    return null;
  }
}

function countImageValues(rows, field = "image") {
  return rows.filter((row) => typeof row?.[field] === "string" && row[field].trim()).length;
}

function duplicates(values) {
  const seen = new Set();
  const duplicated = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicated.add(value);
    seen.add(value);
  }
  return [...duplicated];
}

function assertNoDuplicates(label, values) {
  const repeated = duplicates(values);
  if (repeated.length) {
    errors.push(`${label}: ${repeated.length} duplicate identifiers (${repeated.slice(0, 8).join(", ")})`);
  }
}

function assertReferences(label, references, validIds) {
  const missing = references.filter((value) => !validIds.has(value));
  if (missing.length) {
    errors.push(`${label}: ${missing.length} unresolved reference(s) (${missing.slice(0, 8).join(", ")})`);
  }
}

function reportImages(label, rows, field = "image") {
  const present = countImageValues(rows, field);
  const missing = rows.length - present;
  metrics.push(`${label}: ${present}/${rows.length} image fields populated`);
  if (missing) warnings.push(`${label}: ${missing} image field(s) are empty`);
}

const movies = readJson("movies.json") ?? [];
const series = readJson("series.json") ?? [];
const anime = readJson("anime.json") ?? [];
const liveCharacters = readJson("characters.json") ?? [];
const liveAppearances = readJson("characterAppearances.json") ?? [];
const livePowers = readJson("powers.json") ?? [];
const liveWeapons = readJson("weapons.json") ?? [];
const liveTools = readJson("tools.json") ?? [];
const animeCharacters = readJson("anime/characters.json") ?? [];
const animeAppearances = readJson("anime/characterAppearances.json") ?? [];
const animePowers = readJson("anime/powers.json") ?? [];
const animeTechniques = readJson("anime/techniques.json") ?? [];
const animeWeapons = readJson("anime/weapons.json") ?? [];
const animeTools = readJson("anime/tools.json") ?? [];
const animeTransformations = readJson("anime/transformations.json") ?? [];
const seriesCharacters = readJson("series-characters.json") ?? [];
const seriesCastCredits = readJson("series-cast-credits.json") ?? [];
const movieDetailsFile = readJson("omniverse-movie-details-enriched.json") ?? { movies: [] };
const movieResearchStatus = readJson("movieResearchStatus.json") ?? [];
const animeResearchStatus = readJson("anime/animeResearchStatus.json") ?? [];

const movieIds = new Set(movies.map((row) => row.Const).filter(Boolean));
const seriesIds = new Set(series.map((row) => row.Const).filter(Boolean));
const animeIds = new Set(anime.map((row) => row.Const).filter(Boolean));
const liveTitleIds = new Set([...movieIds, ...seriesIds]);
const liveCharacterIds = new Set(liveCharacters.map((row) => row.id));
const livePowerIds = new Set(livePowers.map((row) => row.id));
const liveWeaponIds = new Set(liveWeapons.map((row) => row.id));
const liveToolIds = new Set(liveTools.map((row) => row.id));
const animeCharacterIds = new Set(animeCharacters.map((row) => row.id));
const animePowerIds = new Set(animePowers.map((row) => row.id));
const animeWeaponIds = new Set(animeWeapons.map((row) => row.id));
const animeToolIds = new Set(animeTools.map((row) => row.id));

// Identifier uniqueness.
assertNoDuplicates("Movie IMDb IDs", movies.map((row) => row.Const));
assertNoDuplicates("Series IMDb IDs", series.map((row) => row.Const));
assertNoDuplicates("Anime IMDb IDs", anime.map((row) => row.Const));
assertNoDuplicates("Live-action character IDs", liveCharacters.map((row) => row.id));
assertNoDuplicates("Live-action character/title pairs", liveAppearances.map((row) => `${row.characterId}\u0000${row.titleId}`));
assertNoDuplicates("Anime character IDs", animeCharacters.map((row) => row.id));
assertNoDuplicates("Anime character/title pairs", animeAppearances.map((row) => `${row.characterId}\u0000${row.titleId}`));

// Live-action movie registry and relationships.
assertReferences("Live-action appearance character IDs", liveAppearances.map((row) => row.characterId), liveCharacterIds);
assertReferences("Live-action appearance title IDs", liveAppearances.map((row) => row.titleId), movieIds);
for (const appearance of liveAppearances) {
  if (!["Main", "Supporting", "Antagonist"].includes(appearance.role)) {
    errors.push(`Live-action appearance ${appearance.characterId}/${appearance.titleId}: invalid role "${appearance.role}"`);
  }
}
for (const character of liveCharacters) {
  assertReferences(`Character ${character.id} title IDs`, character.titleIds ?? [], liveTitleIds);
  assertReferences(`Character ${character.id} power IDs`, character.powerIds ?? [], livePowerIds);
  assertReferences(`Character ${character.id} weapon IDs`, character.weaponIds ?? [], liveWeaponIds);
  assertReferences(`Character ${character.id} tool IDs`, character.toolIds ?? [], liveToolIds);
}
for (const appearance of liveAppearances) {
  assertReferences(`Appearance ${appearance.characterId}/${appearance.titleId} power IDs`, appearance.powerIds ?? [], livePowerIds);
  assertReferences(`Appearance ${appearance.characterId}/${appearance.titleId} weapon IDs`, appearance.weaponIds ?? [], liveWeaponIds);
  assertReferences(`Appearance ${appearance.characterId}/${appearance.titleId} tool IDs`, appearance.toolIds ?? [], liveToolIds);
}
for (const power of livePowers) assertReferences(`Power ${power.id} user IDs`, power.userIds ?? [], liveCharacterIds);
for (const weapon of liveWeapons) assertReferences(`Weapon ${weapon.id} wielder IDs`, weapon.wielderIds ?? [], liveCharacterIds);
for (const tool of liveTools) assertReferences(`Tool ${tool.id} owner IDs`, tool.ownerIds ?? [], liveCharacterIds);

// Animated-title registry and relationships.
assertReferences("Anime appearance character IDs", animeAppearances.map((row) => row.characterId), animeCharacterIds);
assertReferences("Anime appearance title IDs", animeAppearances.map((row) => row.titleId), animeIds);
for (const appearance of animeAppearances) {
  if (!["Main", "Supporting", "Antagonist"].includes(appearance.role)) {
    errors.push(`Anime appearance ${appearance.characterId}/${appearance.titleId}: invalid role "${appearance.role}"`);
  }
}
for (const character of animeCharacters) {
  assertReferences(`Anime character ${character.id} title IDs`, character.titleIds ?? [], animeIds);
  assertReferences(`Anime character ${character.id} power IDs`, character.powerIds ?? [], animePowerIds);
  assertReferences(`Anime character ${character.id} weapon IDs`, character.weaponIds ?? [], animeWeaponIds);
  assertReferences(`Anime character ${character.id} tool IDs`, character.toolIds ?? [], animeToolIds);
}
for (const power of animePowers) assertReferences(`Anime power ${power.id} user IDs`, power.userIds ?? [], animeCharacterIds);
for (const technique of animeTechniques) assertReferences(`Anime technique ${technique.id} user IDs`, technique.userIds ?? [], animeCharacterIds);
for (const weapon of animeWeapons) assertReferences(`Anime weapon ${weapon.id} wielder IDs`, weapon.wielderIds ?? [], animeCharacterIds);
for (const tool of animeTools) assertReferences(`Anime tool ${tool.id} owner IDs`, tool.ownerIds ?? [], animeCharacterIds);
for (const form of animeTransformations) assertReferences(`Anime transformation ${form.id} character IDs`, form.characterIds ?? [], animeCharacterIds);

// Series cast-character links.
const seriesCharacterIds = new Set(seriesCharacters.map((row) => row.id));
assertReferences("Series cast title IDs", seriesCastCredits.map((row) => row.titleId), seriesIds);
assertReferences("Series cast character IDs", seriesCastCredits.map((row) => row.characterId), seriesCharacterIds);

// Enriched detail and research-status records should map to catalogue records.
const movieDetailRows = Array.isArray(movieDetailsFile.movies) ? movieDetailsFile.movies : [];
assertReferences("Enriched movie detail title IDs", movieDetailRows.map((row) => row.titleId), movieIds);
assertReferences("Movie research-status title IDs", movieResearchStatus.map((row) => row.titleId), movieIds);
assertReferences("Anime research-status title IDs", animeResearchStatus.map((row) => row.titleId), animeIds);

// Image coverage. Empty images are warnings, not structural failures.
reportImages("Movie poster URLs", movies, "Poster URL");
reportImages("Series poster URLs", series, "Poster URL");
reportImages("Anime poster URLs", anime, "Poster URL");
reportImages("Live-action character images", liveCharacters);
reportImages("Series character images", seriesCharacters);
reportImages("Live-action power images", livePowers);
reportImages("Live-action weapon images", liveWeapons);
reportImages("Live-action tool images", liveTools);
reportImages("Anime character images", animeCharacters);
reportImages("Anime power images", animePowers);
reportImages("Anime technique images", animeTechniques);
reportImages("Anime weapon images", animeWeapons);
reportImages("Anime tool images", animeTools);
reportImages("Anime transformation images", animeTransformations);

metrics.unshift(
  `Titles: ${movies.length} movies, ${series.length} series, ${anime.length} animated titles`,
  `Characters: ${liveCharacters.length} live-action, ${animeCharacters.length} anime`,
  `Relationships: ${liveAppearances.length} live-action appearances, ${animeAppearances.length} anime appearances`,
  `Movie research states: ${countStatuses(movieResearchStatus)}`,
  `Anime research states: ${countStatuses(animeResearchStatus)}`
);

function countStatuses(rows) {
  const counts = new Map();
  for (const row of rows) {
    const value = row.researchStatus ?? "missing-status";
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].map(([key, value]) => `${key}=${value}`).join(", ");
}

console.log("OMNIVERSE DATA VALIDATION\n");
for (const metric of metrics) console.log(`✓ ${metric}`);
for (const warning of warnings) console.warn(`! WARNING: ${warning}`);
for (const error of errors) console.error(`✗ ERROR: ${error}`);
console.log(`\nResult: ${errors.length ? "FAILED" : "PASSED"} (${errors.length} errors, ${warnings.length} image coverage warnings)`);

if (errors.length) process.exitCode = 1;
