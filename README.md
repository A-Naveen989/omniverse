# OMNIVERSE

OMNIVERSE is a React + TypeScript entertainment encyclopedia for movies, television series, animated titles, characters, powers, techniques, weapons, tools, and transformations.

## Technology

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- Tailwind CSS 4
- Lucide React icons
- Local JSON catalogues with browser `localStorage` for admin edits and user collections

## Start locally

Use Node.js 22.12 or newer (the bundled Vite/Rolldown version requires a recent Node release).

```bash
npm install
npm run dev
```

The app is served by Vite. The production commands are:

```bash
npm run build
npm run preview
```

## Data validation

Validate JSON parsing, identifier uniqueness, character/title relationships, roles, entity references, and image-field coverage:

```bash
npm run validate:data
```

Image gaps are reported as warnings rather than structural errors. The validator exits with a non-zero status when it detects invalid JSON, duplicate IDs/pairs, invalid roles, or unresolved references.

Type-check and lint the source:

```bash
npx tsc -b
npm run lint
```

## Main routes

| Route | Purpose |
|---|---|
| `/` | Home and featured catalogue |
| `/movies` | Movie catalogue |
| `/movies/:titleId` | Movie research and cast details |
| `/series` | Series catalogue |
| `/series/:titleId` | Series and character details |
| `/anime` | Animated-title catalogue |
| `/anime/:titleId` | Animated-title and character details |
| `/characters` | Live-action character directory |
| `/characters/:id` | Live-action character profile |
| `/anime/characters` | Anime character directory |
| `/anime/characters/:id` | Anime character profile |
| `/powers` | Live-action power catalogue |
| `/weapons` | Live-action weapon catalogue |
| `/favorites` | Saved titles, characters, powers, and weapons |
| `/title/:id` | Compatibility redirect to the correct type-specific title route |
| `/admin` | Local admin dashboard and catalogue management |

## Dataset overview

The active source data currently contains:

- 957 movie records
- 86 series records
- 108 animated-title records
- 3,807 live-action character profiles and 4,040 title-specific appearances
- 620 anime character profiles and 837 title-specific appearances
- 1 live-action power record and 1 live-action weapon record
- 15 anime power records, 7 techniques, 1 weapon, 1 tool, and 12 transformations

The live-action character registry is in `src/data/characters.json`. Movie/title-specific roles are stored in `src/data/characterAppearances.json`, not globally on the character. The animated dataset is separate under `src/data/anime/` so the two character registries do not collide.

## Research and image coverage

The supplied files are a partial research snapshot, not a completed encyclopedia. The latest movie status file marks 10 of 957 movies `web-researched`, 292 as `existing-character-data`, and 655 as `not-researched`. The anime status file marks all 108 animated titles as partial. The active character and element datasets currently have empty image fields; the 957 movie and 108 animated-title exports also do not provide usable poster URLs.

The app now uses a reusable `ImageWithFallback` component in key catalogue and profile views so missing or failed image URLs do not display broken-image icons. This is presentation resilience, not image sourcing: no new copyrighted artwork or unverified image URLs have been inserted. Source image research and licensing review remain outstanding.

See `IMPLEMENTATION_NOTES.md` for the exact changes and validation result, and `INTEGRATION_NOTES.md` / `ANIME-CHARACTER-INTEGRATION.md` for the existing data-model notes.

## User data

Admin edits and favorites are stored in the current browser's `localStorage`; they are not a shared hosted database. Clearing site storage or changing browsers/devices will not sync those records automatically.
