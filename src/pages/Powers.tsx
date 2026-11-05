import { useMemo, useState } from "react";
import { Search, Zap } from "lucide-react";

import { getPowers } from "../data/adminStorage";
import { getCharacterProfile } from "../data/characterData";

export default function Powers() {
  const powers = getPowers();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => [...new Set(powers.map((power) => power.category).filter(Boolean))].sort(),
    [powers]
  );

  const filteredPowers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return powers.filter((power) => {
      const userNames = power.userIds
        .map((id) => getCharacterProfile(id)?.name ?? id)
        .join(" ");
      const searchableText = [
        power.name,
        power.category,
        power.description,
        power.origin,
        userNames,
        ...power.strengths,
        ...power.weaknesses,
        ...power.specialAbilities,
      ].join(" ").toLocaleLowerCase();

      return (category === "All" || power.category === category) && searchableText.includes(query);
    });
  }, [powers, search, category]);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-12 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-widest text-purple-400">Abilities & Techniques</p>
          <h1 className="mt-2 text-4xl font-black md:text-5xl">Powers</h1>
          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            Explore verified supernatural abilities, combat techniques, and special powers.
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4">
            <Search size={20} className="text-[var(--text-secondary)]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search powers or characters..." className="w-full bg-transparent py-3 outline-none" />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none" aria-label="Filter powers by category">
            <option value="All">All Categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <p className="mb-5 text-sm text-[var(--text-secondary)]">{filteredPowers.length} powers found</p>

        {filteredPowers.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredPowers.map((power) => (
              <article key={power.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-purple-500/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400"><Zap size={25} /></div>
                <h2 className="mt-5 text-2xl font-bold">{power.name}</h2>
                <span className="mt-3 inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">{power.category}</span>
                <p className="mt-4 leading-7 text-[var(--text-secondary)]">{power.description}</p>
                {!!power.origin && <p className="mt-4 text-sm text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">Origin:</strong> {power.origin}</p>}
                <div className="mt-5 border-t border-[var(--border)] pt-4">
                  <p className="text-sm text-[var(--text-secondary)]">Known users</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {power.userIds.length ? power.userIds.map((id) => {
                      const character = getCharacterProfile(id);
                      return character ? (
                        <span key={id} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">{character.name}</span>
                      ) : <span key={id} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">{id}</span>;
                    }) : <span className="text-xs text-[var(--text-secondary)]">Not listed</span>}
                  </div>
                </div>
                {!!power.strengths.length && <div className="mt-4"><h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Strengths</h3><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">{power.strengths.map((value) => <li key={value}>{value}</li>)}</ul></div>}
                {!!power.weaknesses.length && <div className="mt-4"><h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">Weaknesses</h3><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">{power.weaknesses.map((value) => <li key={value}>{value}</li>)}</ul></div>}
                {!!power.specialAbilities.length && <div className="mt-4"><h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">Special abilities</h3><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">{power.specialAbilities.map((value) => <li key={value}>{value}</li>)}</ul></div>}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-20 text-center text-[var(--text-secondary)]">No powers found.</div>
        )}
      </div>
    </main>
  );
}
