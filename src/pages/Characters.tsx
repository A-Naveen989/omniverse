import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users, X } from "lucide-react";

import { getCharacters } from "../data/adminStorage";
import { getCharacterMovieAppearances } from "../data/characterData";
import ImageWithFallback from "../components/ImageWithFallback";

const PAGE_SIZE = 48;

export default function Characters() {
  const characters = getCharacters();
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredCharacters = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return [...characters]
      .filter((character) => {
        if (!query) return true;

        const titleNames = getCharacterMovieAppearances(character.id)
          .map(({ movie }) => movie?.title ?? "")
          .join(" ");

        const searchableText = [
          character.name,
          ...character.aliases,
          character.description,
          character.biography,
          character.species,
          ...character.occupation,
          ...character.affiliations,
          ...character.abilities,
          ...character.relationships,
          character.origin,
          titleNames,
        ]
          .join(" ")
          .toLocaleLowerCase();

        return searchableText.includes(query);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [characters, search]);

  const visibleCharacters = filteredCharacters.slice(0, visibleCount);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-12 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-3 text-purple-500">
            <Users size={24} />
            <span className="text-sm font-semibold uppercase tracking-widest">
              Character Database
            </span>
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            Legendary Characters
          </h1>

          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            Explore character profiles, their movie appearances, abilities,
            affiliations, and connections across the OMNIVERSE.
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search names, aliases, abilities, affiliations, or movies..."
              aria-label="Search characters"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-11 outline-none transition focus:border-purple-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                aria-label="Clear character search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleSearchChange("")}
            className="rounded-xl border border-[var(--border)] px-5 py-3 transition hover:border-purple-500 hover:bg-purple-600 hover:text-white"
          >
            Reset Search
          </button>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--text-secondary)]">
          <p>
            Showing {visibleCharacters.length.toLocaleString()} of {filteredCharacters.length.toLocaleString()} characters
          </p>
          <p>{characters.length.toLocaleString()} profiles in database</p>
        </div>

        {filteredCharacters.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-20 text-center">
            <Users size={40} className="mx-auto text-purple-500" />
            <h2 className="mt-4 text-2xl font-bold">No Characters Found</h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Try a different name, alias, ability, affiliation, or movie title.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleCharacters.map((character) => {
                const appearances = getCharacterMovieAppearances(character.id);
                const firstMovie = appearances[0]?.movie;

                return (
                  <Link
                    key={character.id}
                    to={`/characters/${character.id}`}
                    className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10"
                  >
                    <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-purple-950/70 to-zinc-950">
                      <ImageWithFallback
                        src={character.image}
                        alt={character.name}
                        fallbackLabel={character.name}
                        containerClassName="absolute inset-0"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/75 px-3 py-1 text-xs text-white">
                        {appearances.length} {appearances.length === 1 ? "movie" : "movies"}
                      </span>
                    </div>

                    <div className="p-4">
                      <h2 className="line-clamp-1 text-base font-bold transition group-hover:text-purple-400">
                        {character.name}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-xs text-[var(--text-secondary)]">
                        {character.species && character.species !== "Unknown"
                          ? character.species
                          : character.origin || "Origin unknown"}
                      </p>
                      <p className="mt-3 line-clamp-2 min-h-9 text-xs text-[var(--text-secondary)]">
                        {character.description || character.biography || "Character profile available."}
                      </p>
                      {firstMovie && (
                        <p className="mt-3 line-clamp-1 text-xs font-medium text-purple-400">
                          {firstMovie.title} {firstMovie.year ? `(${firstMovie.year})` : ""}
                        </p>
                      )}
                      <span className="mt-4 inline-block text-sm font-semibold text-purple-400">
                        View Profile →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {visibleCharacters.length < filteredCharacters.length && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
                >
                  Load More Characters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
