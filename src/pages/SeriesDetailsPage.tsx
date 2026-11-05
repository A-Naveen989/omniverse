import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Star, Users, BookOpen, Film } from "lucide-react";

import { getSeries } from "../data/adminStorage";
import FavoriteButton from "../components/FavoriteButton";
import ImageWithFallback from "../components/ImageWithFallback";
import {
  getSeriesCastForTitle,
  getSeriesCharactersForTitle,
  getSeriesNonfictionForTitle,
  getSeriesSourcesForTitle,
  type SeriesCharacter,
} from "../data/seriesCharacterData";

function CharacterCard({
  character,
  titleId,
  actor,
  otherAppearances,
}: {
  character: SeriesCharacter;
  titleId: string;
  actor?: string;
  otherAppearances: { titleId: string; title: string; role: string }[];
}) {
  const appearance = character.appearances.find(
    (item) => item.titleId === titleId
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center gap-4 border-b border-[var(--border)] p-4">
        <ImageWithFallback
          src={character.image}
          alt={character.name}
          fallbackLabel={character.name}
          containerClassName="h-20 w-20 shrink-0 rounded-xl"
          className="h-full w-full object-cover"
        />
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            {character.name}
          </h3>
          {actor && (
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Played by <span className="font-semibold text-purple-400">{actor}</span>
            </p>
          )}
          {appearance && (
            <span className="mt-2 inline-flex rounded-md bg-purple-500/10 px-2 py-1 text-xs font-semibold text-purple-400">
              {appearance.role}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 p-4">
        {character.biography && (
          <div>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Biography</h4>
            <p className="text-sm leading-6 text-[var(--text-primary)]">{character.biography}</p>
          </div>
        )}

        {character.personality && (
          <div>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Personality</h4>
            <p className="text-sm leading-6 text-[var(--text-primary)]">{character.personality}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm">
          {character.age && <p><span className="text-[var(--text-secondary)]">Age:</span> {character.age}</p>}
          {character.gender && <p><span className="text-[var(--text-secondary)]">Gender:</span> {character.gender}</p>}
          {character.species && <p><span className="text-[var(--text-secondary)]">Species:</span> {character.species}</p>}
          {character.height && <p><span className="text-[var(--text-secondary)]">Height:</span> {character.height}</p>}
          {character.birthday && <p><span className="text-[var(--text-secondary)]">Birthday:</span> {character.birthday}</p>}
          {character.fightingStyle && <p><span className="text-[var(--text-secondary)]">Fighting style:</span> {character.fightingStyle}</p>}
        </div>

        {character.affiliations.length > 0 && (
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Affiliations</h4>
            <div className="flex flex-wrap gap-2">
              {character.affiliations.map((item) => (
                <span key={item} className="rounded-md bg-[var(--surface-hover)] px-2 py-1 text-xs">{item}</span>
              ))}
            </div>
          </div>
        )}

        {character.gallery.length > 0 && (
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Gallery</h4>
            <div className="flex flex-wrap gap-2">
              {character.gallery.map((imageUrl, index) => (
                <ImageWithFallback
                  key={`${imageUrl}-${index}`}
                  src={imageUrl}
                  alt={`${character.name} gallery ${index + 1}`}
                  fallbackLabel={character.name}
                  containerClassName="h-20 w-20 rounded-lg"
                  className="h-full w-full object-cover"
                />
              ))}
            </div>
          </div>
        )}

        {otherAppearances.length > 0 && (
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Also appears in</h4>
            <div className="flex flex-wrap gap-2">
              {otherAppearances.map((appearance) => (
                <Link key={appearance.titleId} to={`/series/${appearance.titleId}`} className="rounded-lg bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-400 hover:bg-purple-500/20">
                  {appearance.title} · {appearance.role}
                </Link>
              ))}
            </div>
          </div>
        )}

        {character.relationships.length > 0 && (
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Relationships</h4>
            <div className="space-y-2">
              {character.relationships.map((relationship, index) => (
                <div key={`${relationship.name}-${index}`} className="rounded-lg bg-[var(--surface-hover)] p-3">
                  <p className="text-sm font-semibold">{relationship.name}</p>
                  <p className="text-xs text-purple-400">{relationship.relation}</p>
                  {relationship.description && <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{relationship.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {character.characterDevelopment && (
          <div>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Character development</h4>
            <p className="text-sm leading-6">{character.characterDevelopment}</p>
          </div>
        )}

        {character.firstAppearance && (
          <p className="text-xs text-[var(--text-secondary)]"><span className="font-semibold">First appearance:</span> {character.firstAppearance}</p>
        )}

        {[
          { label: "Weaknesses", values: character.weaknesses },
          { label: "Achievements", values: character.achievements },
          { label: "Notable battles", values: character.notableBattles },
          { label: "Ability IDs", values: character.abilityIds },
          { label: "Power IDs", values: character.powerIds },
          { label: "Weapon IDs", values: character.weaponIds },
        ].filter((section) => section.values.length > 0).map((section) => (
          <div key={section.label}>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">{section.label}</h4>
            <ul className="list-inside list-disc space-y-1 text-sm text-[var(--text-primary)]">
              {section.values.map((value) => <li key={value}>{value}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function SeriesDetailsPage() {
  const { titleId } = useParams<{ titleId: string }>();
  const allSeries = getSeries();
  const series = allSeries.find((item) => item.id === titleId);
  const seriesNameById = new Map(allSeries.map((item) => [item.id, item.name]));

  if (!titleId || !series) {
    return (
      <section className="min-h-screen bg-[var(--background)] px-4 py-20 text-center text-[var(--text-primary)]">
        <h1 className="text-3xl font-black">Series not found</h1>
        <p className="mt-3 text-[var(--text-secondary)]">The requested series ID does not exist in your series database.</p>
        <Link to="/series" className="mt-6 inline-flex rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700">Back to Series</Link>
      </section>
    );
  }

  const characters = getSeriesCharactersForTitle(titleId);
  const castCredits = getSeriesCastForTitle(titleId);
  const research = getSeriesSourcesForTitle(titleId);
  const nonfiction = getSeriesNonfictionForTitle(titleId);

  const actorByCharacterId = new Map(
    castCredits.map((credit) => [credit.characterId, credit.actor])
  );

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/series" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300">
          <ArrowLeft size={17} /> Back to TV Series
        </Link>

        <section className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="bg-gradient-to-br from-purple-950 via-zinc-900 to-zinc-950 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
              <span className="rounded-full bg-purple-500/15 px-3 py-1">TV Series</span>
              {series.year > 0 && <span>{series.year}</span>}
              {series.runtime && <span>{series.runtime} min / episode</span>}
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl font-black md:text-6xl">{series.name}</h1>
            <div className="mt-5"><FavoriteButton id={series.id} itemType="series" /></div>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-zinc-300">
              <span className="inline-flex items-center gap-1 text-yellow-400"><Star size={16} fill="currentColor" /> {series.rating ? series.rating.toFixed(1) : "Not rated"} IMDb</span>
              {series.country && <span>{series.country}</span>}
              {series.director && <span>Director: {series.director}</span>}
            </div>
            {series.genre.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {series.genre.map((genre) => <span key={genre} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200">{genre}</span>)}
              </div>
            )}
            {series.imdb && (
              <a href={series.imdb} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-purple-700">
                View on IMDb <ExternalLink size={15} />
              </a>
            )}
          </div>
          <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
            <div className="rounded-xl bg-[var(--surface-hover)] p-4"><p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Characters</p><p className="mt-1 text-2xl font-black">{characters.length}</p></div>
            <div className="rounded-xl bg-[var(--surface-hover)] p-4"><p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Actor credits</p><p className="mt-1 text-2xl font-black">{castCredits.length}</p></div>
            <div className="rounded-xl bg-[var(--surface-hover)] p-4"><p className="text-xs uppercase tracking-wider text-[var(--text-secondary)]">Research status</p><p className="mt-1 text-sm font-bold">{research?.researchStatus?.replace(/_/g, " ") ?? "Not researched"}</p></div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <Users className="text-purple-400" />
            <div><h2 className="text-2xl font-black">Cast & Characters</h2><p className="text-sm text-[var(--text-secondary)]">Actor credits matched to character profiles for this series.</p></div>
          </div>

          {characters.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  titleId={titleId}
                  actor={actorByCharacterId.get(character.id)}
                  otherAppearances={character.appearances
                    .filter((appearance) => appearance.titleId !== titleId)
                    .map((appearance) => ({
                      titleId: appearance.titleId,
                      title: seriesNameById.get(appearance.titleId) ?? appearance.titleId,
                      role: appearance.role,
                    }))}
                />
              ))}
            </div>
          ) : nonfiction ? (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-lg font-bold">{nonfiction.format} — presenters and guests</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">This is an unscripted programme. The people below are listed as themselves, not as fictional characters.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {nonfiction.people.map((person) => <div key={`${person.name}-${person.credit}`} className="rounded-lg bg-[var(--surface-hover)] p-3"><p className="font-semibold">{person.name}</p><p className="text-xs text-purple-400">{person.credit}</p></div>)}
              </div>
              <p className="mt-4 text-sm text-[var(--text-secondary)]">{nonfiction.note}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--text-secondary)]">
              No named fictional character profiles are available in the current research dataset for this title.
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="mb-4 flex items-center gap-3"><BookOpen className="text-purple-400" /><h2 className="text-2xl font-black">Research & Sources</h2></div>
          {research ? (
            <>
              <p className="mb-4 text-sm leading-6 text-[var(--text-secondary)]">{research.scopeNote}</p>
              <div className="space-y-3">
                {research.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex flex-col gap-1 rounded-xl bg-[var(--surface-hover)] p-4 transition hover:ring-1 hover:ring-purple-500 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold">{source.name}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-purple-400">Open source <ExternalLink size={13} /></span>
                    {source.scope && <span className="text-xs text-[var(--text-secondary)] sm:basis-full">{source.scope}</span>}
                  </a>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-[var(--text-secondary)]">No research-source record is available for this title.</p>
          )}
          {nonfiction?.sourceUrls?.length ? (
            <div className="mt-5">
              <h3 className="mb-2 font-bold">Programme sources</h3>
              {nonfiction.sourceUrls.map((url) => <a key={url} href={url} target="_blank" rel="noreferrer" className="mb-2 block break-all text-sm text-purple-400 hover:underline">{url}</a>)}
            </div>
          ) : null}
        </section>

        <div className="mt-8 flex items-center gap-2 text-xs text-[var(--text-secondary)]"><Film size={15} />Character roles are editorial classifications where the original source did not explicitly label them.</div>
      </div>
    </main>
  );
}
