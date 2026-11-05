import { Link, useParams } from "react-router-dom";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Film,
  Package,
  Sparkles,
  Swords,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

import FavoriteButton from "../components/FavoriteButton";
import ImageWithFallback from "../components/ImageWithFallback";

import {
  getCharacterMovieAppearances,
  getCharacterPowers,
  getCharacterProfile,
  getCharacterTools,
  getCharacterWeapons,
} from "../data/characterData";

function SectionHeading({
  icon,
  eyebrow,
  title,
  count,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-purple-400">
          {eyebrow}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-purple-400">{icon}</span>
          <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
        </div>
      </div>
      {count !== undefined && (
        <span className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--text-secondary)]">
          {count}
        </span>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm text-[var(--text-secondary)]">
      {message}
    </div>
  );
}

export default function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const character = id ? getCharacterProfile(id) : undefined;

  if (!character) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-4 py-20 text-center text-[var(--text-primary)]">
        <h1 className="text-3xl font-black">Character Not Found</h1>
        <p className="mt-3 text-[var(--text-secondary)]">
          This character ID does not exist in the current OMNIVERSE database.
        </p>
        <Link
          to="/characters"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
        >
          <ArrowLeft size={18} /> Back to Characters
        </Link>
      </main>
    );
  }

  const appearances = getCharacterMovieAppearances(character.id);
  const powers = getCharacterPowers(character.id);
  const weapons = getCharacterWeapons(character.id);
  const tools = getCharacterTools(character.id);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/characters"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:text-purple-400"
        >
          <ArrowLeft size={18} /> Back to Characters
        </Link>

        {/* Character overview */}
        <section className="grid gap-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 md:grid-cols-[minmax(260px,380px)_1fr] md:p-8">
          <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-purple-950/70 to-zinc-950 md:min-h-[480px]">
            <ImageWithFallback
              src={character.image}
              alt={character.name}
              fallbackLabel={character.name}
              containerClassName="h-full w-full"
              className="max-h-[560px] w-full object-contain"
              fallbackClassName="min-h-[320px] md:min-h-[480px]"
            />
          </div>

          <div className="flex flex-col justify-center py-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400">
              Character Profile
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              {character.name}
            </h1>
            <div className="mt-5"><FavoriteButton id={character.id} itemType="character" /></div>

            {!!character.aliases.length && (
              <p className="mt-3 text-[var(--text-secondary)]">
                Also known as {character.aliases.join(", ")}
              </p>
            )}

            {(character.description || character.biography) && (
              <p className="mt-6 max-w-3xl leading-7 text-[var(--text-secondary)]">
                {character.description || character.biography}
              </p>
            )}

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-400">
                  <UserRound size={17} /> Species
                </div>
                <p className="mt-2 text-sm">{character.species || "Unknown"}</p>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-purple-400">
                  <BookOpen size={17} /> Origin
                </div>
                <p className="mt-2 text-sm">{character.origin || "Unknown"}</p>
              </div>
            </div>

            {!!character.occupation.length && (
              <div className="mt-5">
                <h2 className="text-sm font-bold">Occupation</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {character.occupation.map((occupation) => (
                    <span
                      key={occupation}
                      className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs text-purple-300"
                    >
                      {occupation}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!!character.affiliations.length && (
              <div className="mt-5">
                <h2 className="text-sm font-bold">Affiliations</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {character.affiliations.map((affiliation) => (
                    <span
                      key={affiliation}
                      className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                    >
                      {affiliation}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Biography */}
        {!!character.biography && character.description !== character.biography && (
          <section className="mt-12">
            <SectionHeading
              icon={<BookOpen size={22} />}
              eyebrow="Background"
              title="Biography"
            />
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 leading-7 text-[var(--text-secondary)]">
              {character.biography}
            </div>
          </section>
        )}

        {/* Abilities */}
        <section className="mt-12">
          <SectionHeading
            icon={<Zap size={22} />}
            eyebrow="Capabilities"
            title="Abilities"
            count={character.abilities.length}
          />
          {character.abilities.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {character.abilities.map((ability) => (
                <div
                  key={ability}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles size={17} className="mt-0.5 shrink-0 text-purple-400" />
                    <span>{ability}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No separately documented abilities are linked to this character yet." />
          )}
        </section>

        {/* Powers */}
        <section className="mt-12">
          <SectionHeading
            icon={<Zap size={22} />}
            eyebrow="Power Database"
            title="Powers & Special Abilities"
            count={powers.length}
          />
          {powers.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {powers.map((power) => (
                <article
                  key={power.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{power.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-purple-400">
                        {power.category}
                      </p>
                    </div>
                    <Zap size={20} className="shrink-0 text-purple-400" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                    {power.description}
                  </p>
                  {!!power.origin && (
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">
                      <strong className="text-[var(--text-primary)]">Origin:</strong> {power.origin}
                    </p>
                  )}
                  {!!power.strengths.length && (
                    <div className="mt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Strengths</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">
                        {power.strengths.map((strength) => <li key={strength}>{strength}</li>)}
                      </ul>
                    </div>
                  )}
                  {!!power.weaknesses.length && (
                    <div className="mt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Weaknesses</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">
                        {power.weaknesses.map((weakness) => <li key={weakness}>{weakness}</li>)}
                      </ul>
                    </div>
                  )}
                  {!!power.specialAbilities.length && (
                    <div className="mt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">Special Abilities</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">
                        {power.specialAbilities.map((ability) => <li key={ability}>{ability}</li>)}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState message="No verified power records are currently connected to this character." />
          )}
        </section>

        {/* Weapons */}
        <section className="mt-12">
          <SectionHeading
            icon={<Swords size={22} />}
            eyebrow="Armory"
            title="Weapons"
            count={weapons.length}
          />
          {weapons.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {weapons.map((weapon) => (
                <article
                  key={weapon.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{weapon.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-purple-400">
                        {weapon.category}
                      </p>
                    </div>
                    <Swords size={20} className="shrink-0 text-purple-400" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{weapon.description}</p>
                  {!!weapon.origin && (
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">
                      <strong className="text-[var(--text-primary)]">Origin:</strong> {weapon.origin}
                    </p>
                  )}
                  {!!weapon.strengths.length && (
                    <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-[var(--text-secondary)]">
                      {weapon.strengths.map((strength) => <li key={strength}>{strength}</li>)}
                    </ul>
                  )}
                  {!!weapon.weaknesses.length && (
                    <div className="mt-4 text-sm text-[var(--text-secondary)]">
                      <strong className="text-rose-400">Weaknesses:</strong>
                      <ul className="mt-1 list-inside list-disc">
                        {weapon.weaknesses.map((weakness) => <li key={weakness}>{weakness}</li>)}
                      </ul>
                    </div>
                  )}
                  {!!weapon.specialAbilities.length && (
                    <div className="mt-4 text-sm text-[var(--text-secondary)]">
                      <strong className="text-purple-400">Special properties:</strong>
                      <ul className="mt-1 list-inside list-disc">
                        {weapon.specialAbilities.map((ability) => <li key={ability}>{ability}</li>)}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState message="No verified weapons are currently linked to this character." />
          )}
        </section>

        {/* Tools */}
        <section className="mt-12">
          <SectionHeading
            icon={<Package size={22} />}
            eyebrow="Equipment"
            title="Tools & Equipment"
            count={tools.length}
          />
          {tools.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {tools.map((tool) => (
                <article
                  key={tool.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                >
                  <h3 className="text-lg font-bold">{tool.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-purple-400">{tool.category}</p>
                  <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{tool.description}</p>
                  {!!tool.functions.length && (
                    <div className="mt-4">
                      <strong className="text-sm">Functions</strong>
                      <ul className="mt-2 list-inside list-disc text-sm text-[var(--text-secondary)]">
                        {tool.functions.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {!!tool.limitations.length && (
                    <div className="mt-4">
                      <strong className="text-sm text-rose-400">Limitations</strong>
                      <ul className="mt-2 list-inside list-disc text-sm text-[var(--text-secondary)]">
                        {tool.limitations.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState message="No verified tools or equipment are currently linked to this character." />
          )}
        </section>

        {/* Movie appearances */}
        <section className="mt-12">
          <SectionHeading
            icon={<Film size={22} />}
            eyebrow="Filmography"
            title="Movie Appearances"
            count={appearances.length}
          />
          {appearances.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {appearances.map(({ appearance, movie }) => (
                <Link
                  key={`${appearance.characterId}-${appearance.titleId}`}
                  to={`/movies/${appearance.titleId}`}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-1 hover:border-purple-500"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-900 to-zinc-900">
                        <Film size={21} className="text-purple-300" />
                      </div>
                      <div>
                        <h3 className="font-bold transition group-hover:text-purple-400">
                          {movie?.title ?? `Movie ${appearance.titleId}`}
                        </h3>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">
                          {movie?.year ?? "Year unavailable"}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 text-purple-400" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      appearance.role === "Antagonist"
                        ? "bg-red-500/10 text-red-400"
                        : appearance.role === "Main"
                          ? "bg-purple-500/10 text-purple-300"
                          : "bg-blue-500/10 text-blue-300"
                    }`}>
                      {appearance.role}
                    </span>
                    {movie?.genres && (
                      <span className="line-clamp-1 text-xs text-[var(--text-secondary)]">
                        {movie.genres}
                      </span>
                    )}
                  </div>
                  {!!appearance.characterDescription && (
                    <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                      {appearance.characterDescription}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState message="No movie appearances have been linked to this character yet." />
          )}
        </section>

        {/* Relationships */}
        <section className="mt-12">
          <SectionHeading
            icon={<Users size={22} />}
            eyebrow="Connections"
            title="Relationships"
            count={character.relationships.length}
          />
          {character.relationships.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {character.relationships.map((relationship, index) => (
                <div
                  key={`${relationship}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
                >
                  <Users size={17} className="mt-0.5 shrink-0 text-purple-400" />
                  <p className="text-sm leading-6">{relationship}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No verified relationships are recorded for this character." />
          )}
        </section>

        {!!character.titleIds.length && (
          <p className="mt-10 text-xs text-[var(--text-secondary)]">
            Linked movie IDs: {character.titleIds.join(", ")}
          </p>
        )}

        <div className="mt-12 border-t border-[var(--border)] pt-6">
          <Link
            to="/characters"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-3 text-sm font-semibold transition hover:border-purple-500 hover:text-purple-400"
          >
            <ArrowLeft size={17} /> Back to Character Database
          </Link>
        </div>
      </div>
    </main>
  );
}
