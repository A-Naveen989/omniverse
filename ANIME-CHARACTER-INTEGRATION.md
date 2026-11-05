# OMNIVERSE Anime Encyclopedia — Integration Guide

## What is in this build

This build converts the episode-free 108-title animation dataset into a separate Anime character database. It preserves the 619 existing character IDs and adds one official-source-backed Mai Zenin character/appearance record.

- 620 character profiles
- 837 character/title appearance relationships
- 15 researched powers
- 7 researched techniques
- 1 researched weapon
- 1 researched tool
- 12 selected transformations/forms
- 108 title status records and 108 title source records

This is a broad first pass, not a completed exhaustive encyclopedia. All 108 titles remain `partial_character_and_element_research` and no title is marked complete. The selected elements cover a small subset of franchises. See `animeCharacterResearchReport.json` for exact coverage and limitations.

## Project data layout

The Anime files live under `src/data/anime/` to avoid collisions with the separate live-action character database.

```text
src/
├── data/
│   ├── anime.json                         # active animated title list; keep this at this location
│   ├── animeTitles-source.json            # original IMDb export, retained for provenance
│   ├── animeCharacterData.ts              # data access layer
│   └── anime/
│       ├── characters.json
│       ├── characterAppearances.json
│       ├── powers.json
│       ├── techniques.json
│       ├── weapons.json
│       ├── tools.json
│       ├── transformations.json
│       ├── animeResearchStatus.json
│       ├── animeResearchSources.json
│       └── animeCharacterResearchReport.json
├── types/
│   └── AnimeCharacterTypes.ts
└── pages/
    ├── AnimeDetailsPage.tsx
    ├── AnimeCharactersPage.tsx
    └── AnimeCharacterDetailsPage.tsx
```

Do not replace or merge the live-action `src/data/characters.json`, `src/types/CharacterTypes.ts`, or `src/data/characterData.ts` with these Anime records.

## How relationships work

- `characters.json` is the canonical character registry.
- `characterAppearances.json` joins one character to one IMDb title ID and carries the role for that specific title.
- `characters[].titleIds` is a convenient reverse index.
- Powers link to characters through `userIds`.
- Techniques link to characters through `userIds` and to power records through `powerIds`.
- Weapons link through `wielderIds`.
- Tools link through `ownerIds`.
- Transformations link through `characterIds` and `powerIds`.

The requested `Character` schema has one global `role` field, but recurring characters can have different roles in different titles. Therefore `characterAppearances[].role` is authoritative when rendering a character on a specific Anime detail page. The global `characters[].role` is only the most frequent/primary role across the linked titles.

## Routes already present in App.tsx

The uploaded project already contains these routes, so App.tsx did not need a code change:

- `/anime`
- `/anime/:titleId`
- `/anime/characters`
- `/anime/characters/:id`

The Anime character routes remain separate from the live-action `/characters/:id` routes.

## Run locally

Extract the updated project, open its root folder in a terminal, and run:

```bash
npm install
npm run dev
```

Then test:

- `/anime`
- `/anime/tt0347149` (Howl's Moving Castle)
- `/anime/characters`
- `/anime/characters/jujutsu_mai_zenin`

The project ZIP excludes `node_modules`. A full production Vite build could not be run in this environment because the supplied project did not have installed dependencies and dependency installation timed out. The changed Anime TypeScript files passed a syntax pass and isolated TypeScript checking with ambient declarations; run the real build after `npm install` on your machine.

## Research and canon limits

Official anime/studio/rightsholder sources were prioritized. A few relevant secondary sources are identified in `animeResearchSources.json`. The selected element data includes official-source-supported examples such as MHA Quirks, JJK cursed techniques, Demon Slayer breathing styles, Dandadan psychic/spirit-medium abilities, Denji/Pochita's hybrid transformation, Ben 10's Omnitrix alien forms, Elsa's ice powers, Mob's psychic abilities, and the JJK Playful Cloud weapon.

Most character images are blank because stable, title-continuity-specific image URLs were not verified. Empty arrays and strings are intentional. The current research does not list every minor/credited character, every named technique, all equipment, or all forms in every title.
