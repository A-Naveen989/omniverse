import { useMemo, useState } from "react";
import { Search, Sword } from "lucide-react";

import { getWeapons } from "../data/adminStorage";
import { getCharacterProfile } from "../data/characterData";

export default function Weapons() {
  const weapons = getWeapons();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => [...new Set(weapons.map((weapon) => weapon.category).filter(Boolean))].sort(),
    [weapons]
  );

  const filteredWeapons = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return weapons.filter((weapon) => {
      const wielderNames = weapon.wielderIds
        .map((id) => getCharacterProfile(id)?.name ?? id)
        .join(" ");
      const searchableText = [
        weapon.name,
        weapon.category,
        weapon.description,
        weapon.origin,
        wielderNames,
        ...weapon.strengths,
        ...weapon.weaknesses,
        ...weapon.specialAbilities,
      ].join(" ").toLocaleLowerCase();

      return (category === "All" || weapon.category === category) && searchableText.includes(query);
    });
  }, [weapons, search, category]);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-12 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="text-sm uppercase tracking-widest text-red-400">Legendary Arsenal</p>
          <h1 className="mt-2 text-4xl font-black md:text-5xl">Weapons</h1>
          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            Explore canonical weapons, supernatural artifacts, and their known wielders.
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4">
            <Search size={20} className="text-[var(--text-secondary)]" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search weapons or wielders..." className="w-full bg-transparent py-3 outline-none" />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)] outline-none" aria-label="Filter weapons by category">
            <option value="All">All Categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <p className="mb-5 text-sm text-[var(--text-secondary)]">{filteredWeapons.length} weapons found</p>

        {filteredWeapons.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredWeapons.map((weapon) => (
              <article key={weapon.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-red-500/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 text-red-400"><Sword size={25} /></div>
                <h2 className="mt-5 text-2xl font-bold">{weapon.name}</h2>
                <span className="mt-3 inline-block rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-300">{weapon.category}</span>
                <p className="mt-4 leading-7 text-[var(--text-secondary)]">{weapon.description}</p>
                {!!weapon.origin && <p className="mt-4 text-sm text-[var(--text-secondary)]"><strong className="text-[var(--text-primary)]">Origin:</strong> {weapon.origin}</p>}
                <div className="mt-5 border-t border-[var(--border)] pt-4">
                  <p className="text-sm text-[var(--text-secondary)]">Known wielders</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {weapon.wielderIds.length ? weapon.wielderIds.map((id) => {
                      const character = getCharacterProfile(id);
                      return character ? (
                        <span key={id} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">{character.name}</span>
                      ) : <span key={id} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs">{id}</span>;
                    }) : <span className="text-xs text-[var(--text-secondary)]">Not listed</span>}
                  </div>
                </div>
                {!!weapon.strengths.length && <div className="mt-4"><h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Strengths</h3><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">{weapon.strengths.map((value) => <li key={value}>{value}</li>)}</ul></div>}
                {!!weapon.weaknesses.length && <div className="mt-4"><h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">Weaknesses</h3><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">{weapon.weaknesses.map((value) => <li key={value}>{value}</li>)}</ul></div>}
                {!!weapon.specialAbilities.length && <div className="mt-4"><h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">Special properties</h3><ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">{weapon.specialAbilities.map((value) => <li key={value}>{value}</li>)}</ul></div>}
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-20 text-center text-[var(--text-secondary)]">No weapons found.</div>
        )}
      </div>
    </main>
  );
}
