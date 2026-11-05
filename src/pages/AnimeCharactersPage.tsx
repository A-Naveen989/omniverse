import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Users } from "lucide-react";

import ImageWithFallback from "../components/ImageWithFallback";
import {
  getAnimeCharacterResearchReport,
  getAnimeCharacterTitleAppearances,
  getAnimeCharacters,
} from "../data/animeCharacterData";

export default function AnimeCharactersPage() {
  const characters = getAnimeCharacters();
  const report = getAnimeCharacterResearchReport();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return characters;
    return characters.filter((character) => {
      const titles = getAnimeCharacterTitleAppearances(character.id).map(({ title }) => title?.name ?? "").join(" ");
      const haystack = [
        character.name,
        character.description,
        character.biography,
        character.species,
        character.origin,
        ...character.aliases,
        ...character.occupation,
        ...character.affiliations,
        ...character.abilities,
        titles,
      ].join(" ").toLocaleLowerCase();
      return haystack.includes(query);
    });
  }, [characters, search]);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/anime" className="mb-7 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-purple-400">
          <ArrowLeft size={17} /> Back to Anime
        </Link>

        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-purple-400"><Users size={22} /><span className="text-xs font-bold uppercase tracking-[0.2em]">Anime character database</span></div>
          <h1 className="text-4xl font-black md:text-5xl">Anime Characters</h1>
          <p className="mt-3 max-w-3xl text-[var(--text-secondary)]">Explore the character profiles associated with the 108 animated titles in your collection. A recurring character has one profile and multiple title appearances.</p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">{report.outputCounts.uniqueCharacters.toLocaleString()} unique characters · {report.outputCounts.uniqueCharacterAppearancePairs.toLocaleString()} title-specific appearances</p>
        </header>

        <div className="relative mb-7 max-w-2xl">
          <Search size={19} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search names, aliases, species, occupation or anime title..." aria-label="Search anime characters" className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-4 outline-none focus:border-purple-500" />
        </div>

        <p className="mb-5 text-sm text-[var(--text-secondary)]">Showing {filtered.length.toLocaleString()} of {characters.length.toLocaleString()} characters</p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center text-[var(--text-secondary)]">No matching anime characters found.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((character) => {
              const titleAppearances = getAnimeCharacterTitleAppearances(character.id);
              const firstTitle = titleAppearances.find((item) => item.title)?.title;
              return (
                <Link key={character.id} to={`/anime/characters/${character.id}`} className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10">
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
                    <h2 className="truncate font-bold group-hover:text-purple-400">{character.name}</h2>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">{character.species || character.occupation[0] || character.role}</p>
                    <p className="mt-2 line-clamp-2 min-h-9 text-xs text-[var(--text-secondary)]">{character.description || "No detailed description has been verified yet."}</p>
                    <p className="mt-3 text-xs font-semibold text-purple-400">{titleAppearances.length} {titleAppearances.length === 1 ? "appearance" : "appearances"}</p>
                    {firstTitle && <p className="mt-1 truncate text-xs text-[var(--text-secondary)]">{firstTitle.name}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
