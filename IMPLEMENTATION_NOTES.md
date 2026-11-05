# OMNIVERSE implementation notes — 5 November 2026

## Source inspection

The supplied archive contained a React 19 / TypeScript 6 / Vite 8 application with 89 source files, local JSON datasets, a `dist` folder, and a Windows-oriented `node_modules` tree. The working source archive excludes `node_modules` and `dist`; install dependencies on the target machine.

## Changes made

### Functional fixes

- Replaced the stale demo-data implementation of `/title/:id` with a compatibility redirect to `/movies/:id`, `/series/:id`, or `/anime/:id` based on the active title record. Home-page links to `/title/:id` now resolve against the real catalogue.
- Rebuilt the Favorites page to resolve saved records from the current movie/series/anime, live-action character, anime character, power, and weapon datasets.
- Added a shared `FavoriteButton` and connected it to movie, series, anime, live-action character, and anime character detail pages.
- Unified favorites around the `omniverse-favorites` object schema managed by `useFavorites`; added basic item validation, cross-tab storage synchronization, and migration of legacy string IDs when their titles still exist in the active catalogue.
- Removed synchronous “loaded” state updates from the favorites and recently-viewed hooks. This clears the React hooks lint violations while retaining browser-storage persistence.

### Image behavior

- Added `src/components/ImageWithFallback.tsx` with lazy loading, async decoding, empty-source handling, failed-URL handling, and an OMNIVERSE-styled fallback.
- Integrated the fallback into the Home hero/posters/featured characters, title listings, live-action character cards and profile, anime character cards and profile, anime title details, and Favorites.
- No remote image URLs or artwork were added because the active data files contain no verified image assets. The current implementation avoids broken-image UI but does not satisfy the outstanding image-research backlog.

### Data quality tooling

- Added `scripts/validate-data.mjs` and `npm run validate:data`.
- The validator checks JSON parsing, duplicate IDs, duplicate title/character relationship pairs, role values, references between active movie/anime/series catalogues and their character/element records, and image-field coverage.
- Missing images are warnings, not errors. Empty image fields are not silently treated as verified images.

### Other cleanup

- Updated the README to describe the actual project rather than the default Vite starter template.
- Removed the baseline ESLint issues from `useFavorites`, `useRecentlyViewed`, and the `ThemeContext` provider/hook module.

## Validation performed

| Check | Result |
|---|---|
| JSON parsing in validator inputs | Passed |
| Live-action IDs / appearance pairs / roles / references | Passed; no structural errors |
| Anime IDs / appearance pairs / roles / references | Passed; no structural errors |
| Series cast title and character references | Passed |
| TypeScript `tsc -b` | Passed |
| ESLint | Passed with 0 errors and 0 warnings |
| `npm run validate:data` | Passed with 0 errors; image coverage is reported as warnings for empty image fields |
| Vite production build | Not verified in this environment; the supplied `node_modules` did not include the Linux Rolldown native binding, and installing the optional binding timed out |

## Current data coverage (from the supplied active files)

- Movies: 957; research status = 10 `web-researched`, 292 `existing-character-data`, 655 `not-researched`.
- Movie element review: 955 `not-reviewed`, 2 `partially-reviewed`.
- Series: 86 titles and 650 series character profiles; source coverage is not an exhaustive cast extraction.
- Animated titles: 108; all are marked `partial_character_and_element_research`.
- Live-action characters: 3,807; appearance pairs: 4,040.
- Anime characters: 620; appearance pairs: 837.
- Live-action power/weapon/tool records: 1 / 1 / 0.
- Anime power/technique/weapon/tool/transformation records: 15 / 7 / 1 / 1 / 12.
- Image fields populated: 0 for the movie, series, anime, live-action character, series character, live-action power/weapon/tool, anime character, and anime element datasets checked by the validator.

## Not completed

- Exhaustive character-by-character and element-by-element research across all 957 movies, 86 series, and 108 animated titles.
- Official/promotional image sourcing, licensing review, download, attribution, and per-entity image verification.
- Individual detail routes for every power, weapon, tool, technique, and transformation.
- A production build in this Linux environment (the uploaded binary dependency tree was not portable).

Do not interpret empty entity arrays as proof that the relevant fictional character has no power, weapon, tool, technique, or transformation. Do not interpret a populated character list as evidence that every credited or minor character has been researched.

## File manifest

### Modified existing files

- `package.json`
- `README.md`
- `src/components/ContentListing.tsx`
- `src/context/ThemeContext.tsx`
- `src/hooks/useFavorites.ts`
- `src/hooks/useRecentlyViewed.ts`
- `src/pages/AnimeCharacterDetailsPage.tsx`
- `src/pages/AnimeCharactersPage.tsx`
- `src/pages/AnimeDetailsPage.tsx`
- `src/pages/CharacterDetails.tsx`
- `src/pages/Characters.tsx`
- `src/pages/Favorites.tsx`
- `src/pages/Home.tsx`
- `src/pages/MovieDetailsPage.tsx`
- `src/pages/SeriesDetailsPage.tsx`
- `src/pages/TitleDetails.tsx`

### New files

- `IMPLEMENTATION_NOTES.md`
- `scripts/validate-data.mjs`
- `src/components/FavoriteButton.tsx`
- `src/components/ImageWithFallback.tsx`

### Images obtained in this delivery

None. No image was downloaded or added, and no external image URL was inserted. The archive's active image fields are empty; adding guessed URLs or unrelated artwork would create false coverage and broken references. The UI changes only make missing/failed image states render cleanly.
