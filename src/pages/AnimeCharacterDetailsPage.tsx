import { Link, useParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import ImageWithFallback from "../components/ImageWithFallback";
import type { ReactNode } from "react";
import { ArrowLeft, Film, Sparkles, Swords, Wrench, WandSparkles, Dna } from "lucide-react";

import {
  getAnimeCharacterById,
  getAnimeCharacterTitleAppearances,
  getAnimePowersForCharacter,
  getAnimeTechniquesForCharacter,
  getAnimeWeaponsForCharacter,
  getAnimeToolsForCharacter,
  getAnimeTransformationsForCharacter,
} from "../data/animeCharacterData";

function Section({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return <section className="mt-10"><div className="mb-4 flex items-center gap-2">{icon}<h2 className="text-2xl font-black">{title}</h2></div>{children}</section>;
}
function Chips({ items, empty }: { items: string[]; empty: string }) {
  if (!items.length) return <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">{empty}</p>;
  return <div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm">{item}</span>)}</div>;
}
function DetailCard({ title, category, image, description, details }: { title: string; category: string; image: string; description: string; details: string[] }) {
  return <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
    <div className="flex items-start gap-3">
      <ImageWithFallback
        src={image}
        alt={title}
        fallbackLabel={title}
        containerClassName="h-16 w-16 shrink-0 rounded-lg"
        className="h-full w-full object-cover"
      />
      <div className="min-w-0"><h3 className="font-bold">{title}</h3><p className="mt-1 text-xs text-purple-400">{category || "Category not recorded"}</p></div>
    </div>
    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{description || "No verified description is available."}</p>
    {details.length > 0 && <ul className="mt-3 space-y-1 text-xs text-[var(--text-secondary)]">{details.map((detail) => <li key={detail}>• {detail}</li>)}</ul>}
  </article>;
}

export default function AnimeCharacterDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const character = id ? getAnimeCharacterById(id) : undefined;

  if (!character) return <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[var(--background)] px-4 text-center text-[var(--text-primary)]"><h1 className="text-3xl font-black">Anime Character Not Found</h1><p className="mt-3 text-[var(--text-secondary)]">This ID is not present in the Anime character database.</p><Link to="/anime/characters" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white"><ArrowLeft size={17} /> Back to Anime Characters</Link></main>;

  const appearances = getAnimeCharacterTitleAppearances(character.id);
  const powers = getAnimePowersForCharacter(character.id);
  const techniques = getAnimeTechniquesForCharacter(character.id);
  const weapons = getAnimeWeaponsForCharacter(character.id);
  const tools = getAnimeToolsForCharacter(character.id);
  const transformations = getAnimeTransformationsForCharacter(character.id);

  return <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] md:px-8"><div className="mx-auto max-w-6xl">
    <Link to="/anime/characters" className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-purple-400"><ArrowLeft size={17} /> Back to Anime Characters</Link>

    <section className="grid gap-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 md:grid-cols-[280px_1fr] md:p-8">
      <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-purple-950 to-zinc-950">
        <ImageWithFallback
          src={character.image}
          alt={character.name}
          fallbackLabel={character.name}
          containerClassName="h-full w-full"
          className="h-full max-h-[460px] w-full object-contain"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-400">Anime character profile</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">{character.name}</h1>
        <div className="mt-5"><FavoriteButton id={character.id} itemType="character" /></div>
        <p className="mt-5 leading-7 text-[var(--text-secondary)]">{character.biography || character.description || "No verified biography is available yet."}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"><p className="text-xs uppercase text-[var(--text-secondary)]">Species</p><p className="mt-1 font-semibold">{character.species || "Unknown"}</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"><p className="text-xs uppercase text-[var(--text-secondary)]">Primary role</p><p className="mt-1 font-semibold">{character.role}</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"><p className="text-xs uppercase text-[var(--text-secondary)]">Origin</p><p className="mt-1 font-semibold">{character.origin || "Not recorded"}</p></div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4"><p className="text-xs uppercase text-[var(--text-secondary)]">Title appearances</p><p className="mt-1 font-semibold">{appearances.length}</p></div>
        </div>
      </div>
    </section>

    <Section title="Aliases"><Chips items={character.aliases} empty="No verified aliases are recorded." /></Section>
    <Section title="Occupation"><Chips items={character.occupation} empty="Occupation is not recorded." /></Section>
    <Section title="Affiliations"><Chips items={character.affiliations} empty="No verified affiliations are recorded." /></Section>
    <Section title="Abilities"><Chips items={character.abilities} empty="No separate abilities have been verified for this character yet." /></Section>
    <Section title="Relationships"><Chips items={character.relationships} empty="No verified relationship entries are recorded." /></Section>

    <Section title="Powers & Power Systems" icon={<Sparkles size={20} className="text-purple-400" />}>
      {powers.length ? <div className="grid gap-4 md:grid-cols-2">{powers.map((power) => <DetailCard key={power.id} title={power.name} category={power.category} image={power.image} description={power.description} details={[...power.strengths.map((x) => `Strength: ${x}`), ...power.weaknesses.map((x) => `Weakness: ${x}`), ...power.specialAbilities]} />)}</div> : <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">No researched power records are linked to this character yet.</p>}
    </Section>

    <Section title="Techniques" icon={<WandSparkles size={20} className="text-purple-400" />}>
      {techniques.length ? <div className="grid gap-4 md:grid-cols-2">{techniques.map((technique) => <DetailCard key={technique.id} title={technique.name} category={technique.category} image={technique.image} description={technique.description} details={[...technique.strengths, ...technique.weaknesses.map((x) => `Weakness: ${x}`), ...technique.specialEffects, ...technique.requirements.map((x) => `Requirement: ${x}`)]} />)}</div> : <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">No individually researched named techniques are linked yet.</p>}
    </Section>

    <Section title="Weapons" icon={<Swords size={20} className="text-purple-400" />}>
      {weapons.length ? <div className="grid gap-4 md:grid-cols-2">{weapons.map((weapon) => <DetailCard key={weapon.id} title={weapon.name} category={weapon.category} image={weapon.image} description={weapon.description} details={[...weapon.strengths, ...weapon.weaknesses.map((x) => `Weakness: ${x}`), ...weapon.specialAbilities]} />)}</div> : <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">No researched weapon records are linked to this character yet.</p>}
    </Section>

    <Section title="Tools & Equipment" icon={<Wrench size={20} className="text-purple-400" />}>
      {tools.length ? <div className="grid gap-4 md:grid-cols-2">{tools.map((tool) => <DetailCard key={tool.id} title={tool.name} category={tool.category} image={tool.image} description={tool.description} details={[...tool.functions, ...tool.limitations.map((x) => `Limitation: ${x}`), ...tool.specialFeatures]} />)}</div> : <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">No researched tools or equipment are linked to this character yet.</p>}
    </Section>

    <Section title="Transformations & Forms" icon={<Dna size={20} className="text-purple-400" />}>
      {transformations.length ? <div className="grid gap-4 md:grid-cols-2">{transformations.map((transformation) => <DetailCard key={transformation.id} title={transformation.name} category={transformation.category} image={transformation.image} description={transformation.description} details={[...transformation.abilities, ...transformation.requirements.map((x) => `Requirement: ${x}`), ...transformation.limitations.map((x) => `Limitation: ${x}`)]} />)}</div> : <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-secondary)]">No researched transformations or alternate forms are linked yet.</p>}
    </Section>

    <Section title="Anime Appearances" icon={<Film size={20} className="text-purple-400" />}>
      {appearances.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{appearances.map(({ appearance, title }) => <Link key={appearance.titleId} to={`/anime/${appearance.titleId}`} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition hover:border-purple-500"><div className="flex items-start gap-3"><ImageWithFallback
  src={title?.poster}
  alt={`${title?.name || appearance.titleId} poster`}
  fallbackLabel={title?.name || appearance.titleId}
  containerClassName="h-20 w-14 shrink-0 rounded"
  className="h-full w-full object-cover"
/><div className="min-w-0"><h3 className="font-bold">{title?.name || appearance.titleId}</h3><p className="mt-1 text-xs text-[var(--text-secondary)]">{title?.year || "Year unknown"} · {title?.format || "Animated title"}</p><p className="mt-2 inline-flex rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400">{appearance.role}</p></div></div><p className="mt-3 text-xs leading-5 text-[var(--text-secondary)]">{appearance.characterDescription || "No title-specific character note is recorded."}</p></Link>)}</div> : <p className="text-sm text-[var(--text-secondary)]">No title appearances are linked.</p>}
    </Section>

    <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"><div className="flex items-center gap-2 font-bold"><Sparkles size={18} className="text-purple-400" /> Research coverage note</div><p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">This profile uses the current Anime research records. The registry covers featured characters but is not exhaustive. Only linked powers, techniques, weapons, tools and forms have individual records; empty sections are not evidence that a character has no such abilities or equipment.</p></div>
  </div></main>;
}
