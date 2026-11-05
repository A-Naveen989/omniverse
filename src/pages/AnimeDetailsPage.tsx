import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, ExternalLink, Star, Tv, Film } from "lucide-react";

import { getAnime } from "../data/adminStorage";
import FavoriteButton from "../components/FavoriteButton";
import ImageWithFallback from "../components/ImageWithFallback";
import {
  getAnimeCharactersForTitle,
  getAnimeCharacterAppearance,
  getAnimeTitleResearchSources,
  getAnimeTitleResearchStatus,
} from "../data/animeCharacterData";

export default function AnimeDetailsPage() {
  const { titleId } = useParams<{ titleId: string }>();
  const title = getAnime().find((item) => item.id === titleId);

  if (!title) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[var(--background)] px-6 text-center text-[var(--text-primary)]">
        <h1 className="text-3xl font-black">Anime Not Found</h1>
        <p className="mt-3 max-w-lg text-[var(--text-secondary)]">
          This animated title is not available in the current collection.
        </p>
        <Link
          to="/anime"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
        >
          <ArrowLeft size={18} /> Back to Anime
        </Link>
      </main>
    );
  }

  const format = title.format || "Animated title";
  const characters = getAnimeCharactersForTitle(title.id);
  const researchStatus = getAnimeTitleResearchStatus(title.id);
  const characterSources = getAnimeTitleResearchSources(title.id);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <ImageWithFallback
          src={title.backdrop}
          alt={`${title.name} backdrop`}
          hideWhenUnavailable
          containerClassName="absolute inset-0"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/90 to-[var(--background)]/70" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <Link
            to="/anime"
            className="mb-9 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-purple-400"
          >
            <ArrowLeft size={18} /> Back to Anime
          </Link>

          <div className="grid items-center gap-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-12">
            <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl md:mx-0">
              <ImageWithFallback
                src={title.poster}
                alt={`${title.name} poster`}
                fallbackLabel={title.name}
                containerClassName="aspect-[2/3] w-full"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-400">
                  Anime & Animation
                </span>
                <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)]">
                  {format}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                {title.name}
              </h1>
              <div className="mt-5"><FavoriteButton id={title.id} itemType="anime" /></div>

              {title.originalTitle && title.originalTitle !== title.name ? (
                <p className="mt-3 text-lg text-[var(--text-secondary)]">
                  {title.originalTitle}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--text-secondary)]">
                {title.rating > 0 ? (
                  <span className="inline-flex items-center gap-2 text-yellow-400">
                    <Star size={17} fill="currentColor" />
                    IMDb {title.rating.toFixed(1)}
                  </span>
                ) : null}
                {title.year > 0 ? (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={17} /> {title.year}
                  </span>
                ) : null}
                {title.runtime ? (
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={17} /> {title.runtime} min
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-2">
                  {format.toLowerCase().includes("series") || format.toLowerCase().includes("episode") ? <Tv size={17} /> : <Film size={17} />}
                  {format}
                </span>
              </div>

              {title.genre.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {title.genre.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text-secondary)]"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              ) : null}

              <p className="mt-7 max-w-3xl leading-7 text-[var(--text-secondary)]">
                {title.description || "A synopsis has not been added to this title yet. The available information is based on the supplied IMDb export."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {title.director ? (
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Director(s)</p>
                    <p className="mt-2 font-semibold">{title.director}</p>
                  </div>
                ) : null}
                {title.releaseDate ? (
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Release date</p>
                    <p className="mt-2 font-semibold">{title.releaseDate}</p>
                  </div>
                ) : null}
                {title.numVotes !== undefined ? (
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">IMDb votes</p>
                    <p className="mt-2 font-semibold">{title.numVotes.toLocaleString()}</p>
                  </div>
                ) : null}
                {title.yourRating !== undefined ? (
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Your rating</p>
                    <p className="mt-2 font-semibold">{title.yourRating}/10</p>
                  </div>
                ) : null}
              </div>

              {title.imdb ? (
                <a
                  href={title.imdb}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700"
                >
                  View on IMDb <ExternalLink size={17} />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400">Cast database</p>
            <h2 className="mt-2 text-3xl font-black">Characters</h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {characters.length} researched character profiles linked to this title.
              {researchStatus ? ` Research status: ${researchStatus.researchStatus.replaceAll("_", " ")}.` : ""}
            </p>
          </div>
          <Link to="/anime/characters" className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:border-purple-500 hover:text-purple-400">
            Browse all Anime Characters
          </Link>
        </div>

        {characters.length ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {characters.map((character) => {
              const appearance = getAnimeCharacterAppearance(character.id, title.id);
              return (
                <Link key={character.id} to={`/anime/characters/${character.id}`} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-purple-500">
                  <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-purple-950 to-zinc-950">
                    <ImageWithFallback
                      src={character.image}
                      alt={character.name}
                      fallbackLabel={character.name}
                      containerClassName="h-full w-full"
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-bold group-hover:text-purple-400">{character.name}</h3>
                    <span className="mt-2 inline-flex rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">{appearance?.role ?? "Role not listed"}</span>
                    <p className="mt-2 line-clamp-2 text-xs text-[var(--text-secondary)]">{character.description || character.biography || "Description not available."}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-secondary)]">
            No character records are currently linked to this title.
          </div>
        )}

        {characterSources?.sources.length ? (
          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="font-bold">Research sources</h3>
            <ul className="mt-3 space-y-2">
              {characterSources.sources.map((source) => (
                <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="break-all text-sm text-purple-400 underline-offset-4 hover:underline">{source.url}</a><p className="mt-1 text-xs text-[var(--text-secondary)]">{source.supports}</p></li>
              ))}
            </ul>
            {researchStatus?.scopeNote && <p className="mt-4 text-xs leading-5 text-[var(--text-secondary)]">{researchStatus.scopeNote}</p>}
          </div>
        ) : null}
      </section>
    </main>
  );
}
