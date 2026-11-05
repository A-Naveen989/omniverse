# OMNIVERSE — character database integration

## What is connected

The public character and movie pages now use the canonical movie character database:

- `src/data/characters.json`: 3,807 canonical character profiles.
- `src/data/characterAppearances.json`: 4,040 movie-specific character appearances and roles.
- `src/data/powers.json`: 1 researched power record.
- `src/data/weapons.json`: 1 researched weapon record.
- `src/data/tools.json`: currently empty; no distinct researched tool record is included.
- `src/data/omniverse-movie-details-enriched.json`: 957 movie detail records.
- `src/data/characterData.ts`: data access and relationship lookup functions.

## Main UI changes

- `src/pages/Characters.tsx` lists the canonical character profiles and links to `/characters/:id`.
- `src/pages/CharacterDetails.tsx` resolves character information, movie-specific appearances, powers, weapons, tools, and relationships.
- `src/pages/MovieDetailsPage.tsx` links cast credits and character profile cards to `/characters/:id`.
- `src/data/adminStorage.ts` normalizes IMDb movie data and supports the canonical character, power, and weapon schemas.
- Admin character, power, weapon, and title forms were updated to use the corresponding data models.

## Data model rule

A character's role is movie-specific. It belongs on `CharacterAppearance` in `characterAppearances.json`, not as one global `role` field on `Character`. The same character can be Main in one movie and Supporting or Antagonist in another.

## Research coverage — important limitation

The current snapshot contains 957 movies:

- 10 web-researched titles.
- 292 titles with existing character data but incomplete actor-to-character mapping.
- 655 titles not researched.

It contains 3,807 character profiles and 4,040 appearance links, but this is not comprehensive research for every movie. Character image fields remain blank. `tools.json` is empty. The power and weapon files contain only the small number of currently researched records. Do not interpret an empty relationship list as proof that no relationship, power, weapon, or tool exists.

## Install and run

From the `Omniverse/project` directory:

```bash
npm install
npm run dev
```

For a production TypeScript/Vite build:

```bash
npm run build
```

`node_modules` is intentionally excluded from the updated project archive. Install dependencies on the target computer rather than reusing binaries from another operating system.

## Suggested verification URLs

- `/movies/tt10350922` — Laxmii
- `/characters/char_laxmi_350922` — Laxmi
- `/movies/tt0924317` — Yamadonga
- `/characters/char_yama_dharmaraju_924317` — Yama
- `/characters/char_raja_924317` — Raja

The router already contained the movie and character detail routes; `App.tsx` did not need to change for this integration.

## Current limitations

- Powers and weapons are displayed on character profiles but do not have separate detail pages/routes yet.
- Tools and equipment are shown with an empty state because the current tools dataset is empty.
- Character/movie images are not supplied in the current research snapshot; the UI uses fallback presentation.
- Four unrelated baseline ESLint issues remain in `ThemeContext.tsx`, `useFavorites.ts`, `useRecentlyViewed.ts`, and `Favorites.tsx`.

## Anime page integration

The separate Anime page is preserved and now uses the replacement `animations_without_episodes(1).json` export, installed as `src/data/anime.json`. The JSON was normalized so non-standard `NaN` values are stored as `null`. The imported IMDb IDs are used as stable title IDs. The replacement contains 108 records:

- 68 Movie records
- 37 TV Series records
- 2 TV Mini Series records
- 1 Video record
- 0 TV Episode records

Every imported record is represented as `type: "anime"` for the dedicated Anime section, while its original IMDb `Title Type` is retained in `Title.format`. The Anime listing has an additional format filter and its cards open `/anime/:titleId`. `src/pages/AnimeDetailsPage.tsx` displays the fields present in the export and links back to the supplied IMDb page.

The source export does not contain poster URLs, backdrop URLs, country, or plot descriptions. Those fields are left empty or marked `Not listed`; the page uses a fallback poster and does not invent synopses. The dataset includes animated content beyond Japanese anime, but no individual TV episode records.

Anime data migration version 2 removes the 30 episode IDs that were present in the previous 138-record animation export, removes only the four old demo anime IDs (`demon-slayer`, `jujutsu-kaisen`, `my-hero-academia`, `naruto-shippuden`), and preserves other existing titles and custom Anime records. The migration runs automatically when the title database is loaded.

Suggested Anime test URLs:

- `/anime` — Anime and animation catalogue
- `/anime/tt0347149` — Howl's Moving Castle
- `/anime/tt9335498` — Demon Slayer: Kimetsu no Yaiba
- `/anime/tt4731072` — Food Wars: Shokugeki no Soma

