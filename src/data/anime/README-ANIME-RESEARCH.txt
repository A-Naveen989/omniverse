# OMNIVERSE Anime Encyclopedia — Research Build

This package converts the existing 108-title, episode-free animation dataset and its prior 619-character/836-appearance partial registry into the requested relational JSON model. It preserves the existing character IDs and adds one official-source-backed Mai Zenin record plus her Jujutsu Kaisen appearance, for 620 characters and 837 appearances total.

## Files

- `characters.json` — 620 canonical global character records (619 stable IDs preserved plus one additional Mai Zenin profile).
- `characterAppearances.json` — 837 per-title role and power/weapon/tool links.
- `powers.json` — researched power records.
- `techniques.json` — selected named techniques.
- `weapons.json` — researched weapons.
- `tools.json` — researched tools/equipment.
- `transformations.json` — selected forms/transformations.
- `animeResearchStatus.json` — one status row per title.
- `animeResearchSources.json` — title-level source manifest.
- `animeCharacterResearchReport.json` — counts, validation, limitations.

## Important schema rule

`Character.role` is a summary role because the requested Character interface contains one role field. For cross-title role changes, `characterAppearances.json` is authoritative; never use the global `Character.role` to render a title-specific role.

## Coverage

All 108 title IDs have at least one principal/featured character record in this pass, but this does not mean every credited or minor character has been found. The power/technique/weapon/tool/transformation databases are a selected, sourced subset: 15 powers, 7 techniques, 1 weapon, 1 tool, and 12 transformations/forms. Only 16 titles currently have linked power records, 7 have technique records, 1 has a weapon record, 4 have tool records, and 7 have transformation records. No title is marked complete. Empty fields are intentional where information or stable image sources were not confirmed.

## Project integration

Place these JSON files under `src/data/anime/`. Keep the active title listing at `src/data/anime.json`; do not merge these animated profiles into the live-action `src/data/characters.json`. `src/data/animeCharacterData.ts` imports the Anime-specific collection, and the Anime pages use the `AnimeCharacterTypes.ts` schema. The existing routes `/anime/:titleId`, `/anime/characters`, and `/anime/characters/:id` are used.

## Source policy

Official rights-holder/studio/network pages were preferred. Reputable secondary sources were used only where an official page did not expose the relevant element. The source manifest explains what each URL supports.
