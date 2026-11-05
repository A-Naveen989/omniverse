
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Film,
  Tv,
  Clapperboard,
  Users,
  Star,
  Sparkles,
} from "lucide-react";

import { getTitles, getCharacters } from "../data/adminStorage";
import { getCharacterMovieAppearances } from "../data/characterData";
import ImageWithFallback from "../components/ImageWithFallback";

import type { Title } from "../types";

const categories = [
  {
    name: "Movies",
    description: "Discover cinematic masterpieces.",
    path: "/movies",
    icon: Film,
    color: "from-purple-600 to-indigo-600",
  },
  {
    name: "Series",
    description: "Explore stories across seasons.",
    path: "/series",
    icon: Tv,
    color: "from-pink-600 to-purple-600",
  },
  {
    name: "Anime",
    description: "Enter extraordinary anime worlds.",
    path: "/anime",
    icon: Clapperboard,
    color: "from-red-600 to-orange-600",
  },
  {
    name: "Characters",
    description: "Meet heroes, villains, and legends.",
    path: "/characters",
    icon: Users,
    color: "from-blue-600 to-cyan-600",
  },
];

function getFeaturedTitle(titles: Title[]): Title | undefined {
  return titles.find((title) => title.featured) ?? titles[0];
}

export default function Home() {
  const titles = getTitles();
  const characters = getCharacters();

  const featuredTitle = getFeaturedTitle(titles);

  const popularTitles = [...titles]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  const featuredCharacters = characters.slice(0, 6);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-[75vh] items-center overflow-hidden"
      >
        <ImageWithFallback
          src={featuredTitle?.backdrop}
          alt="Featured title backdrop"
          hideWhenUnavailable
          containerClassName="absolute inset-0"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#09090f] via-[#09090f]/90 to-[#09090f]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-transparent to-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 md:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              <Sparkles size={16} />
              Explore Every Universe
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Your Gateway to
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Infinite Stories
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
              Explore movies, series, anime, legendary
              characters, powerful abilities, and iconic
              weapons—all in one universe.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/movies"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Explore Movies
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/anime"
                className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Anime
              </Link>
            </div>

            {featuredTitle && (
              <div className="mt-10 flex items-center gap-3 text-sm text-gray-300">
                <Star
                  size={18}
                  fill="currentColor"
                  className="text-yellow-400"
                />

                <span>
                  Featured:{" "}
                  <Link
                    to={`/title/${featuredTitle.id}`}
                    className="font-semibold text-white hover:text-purple-400"
                  >
                    {featuredTitle.name}
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-500">
            Browse Collections
          </p>

          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            Explore by Category
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to={category.path}
                className={`group rounded-2xl bg-gradient-to-br ${category.color} p-[1px] transition hover:-translate-y-1`}
              >
                <div className="h-full rounded-2xl bg-[var(--surface)] p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold">
                    {category.name}
                  </h3>

                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {category.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-400">
                    Explore
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Titles */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-500">
              Top Rated
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Popular Titles
            </h2>
          </div>

          <Link
            to="/movies"
            className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {popularTitles.length === 0 ? (
          <p className="text-[var(--text-secondary)]">
            No titles available. Add content from the Admin
            Dashboard.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {popularTitles.map((title) => (
              <Link
                key={title.id}
                to={`/title/${title.id}`}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:-translate-y-1 hover:border-purple-500"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <ImageWithFallback
                    src={title.poster}
                    alt={`${title.name} poster`}
                    fallbackLabel={title.name}
                    containerClassName="h-full w-full"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-1 font-bold group-hover:text-purple-400">
                    {title.name}
                  </h3>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {title.year} · {title.type}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-sm text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    {title.rating}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Characters */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-500">
              Legendary Figures
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Featured Characters
            </h2>
          </div>

          <Link
            to="/characters"
            className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {featuredCharacters.length === 0 ? (
          <p className="text-[var(--text-secondary)]">
            No characters available yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {featuredCharacters.map((character) => (
              <Link
                key={character.id}
                to={`/characters/${character.id}`}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-purple-500"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-purple-950/70 to-zinc-950">
                  <ImageWithFallback
                    src={character.image}
                    alt={character.name}
                    fallbackLabel={character.name}
                    containerClassName="h-full w-full"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-3">
                  <h3 className="line-clamp-1 text-sm font-bold group-hover:text-purple-400">
                    {character.name}
                  </h3>

                  <p className="mt-1 line-clamp-1 text-xs text-[var(--text-secondary)]">
                    {getCharacterMovieAppearances(character.id)[0]?.movie?.title ?? character.origin ?? "Character profile"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="mx-4 mb-16 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-pink-900/20 px-6 py-16 text-center md:mx-8">
        <h2 className="text-3xl font-black md:text-4xl">
          The Universe Is Yours to Explore
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-[var(--text-secondary)]">
          Discover new stories, powerful characters, and
          unforgettable worlds.
        </p>

        <Link
          to="/characters"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
        >
          Discover Characters
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
