
import { Link } from "react-router-dom";
import {
  Sparkles,
  Film,
  Tv,
  Compass,
  Users,
  Zap,
  Sword,
} from "lucide-react";

const features = [
  {
    icon: Film,
    title: "Movies",
    description: "Explore movies, genres, release years, ratings, and stories.",
  },
  {
    icon: Tv,
    title: "Series & Anime",
    description: "Discover television series and anime universes.",
  },
  {
    icon: Users,
    title: "Characters",
    description: "Learn about heroes, villains, origins, and affiliations.",
  },
  {
    icon: Zap,
    title: "Powers",
    description: "Explore special abilities, techniques, and superpowers.",
  },
  {
    icon: Sword,
    title: "Weapons",
    description: "Discover iconic weapons, gadgets, and artifacts.",
  },
  {
    icon: Compass,
    title: "Explore Universes",
    description: "Navigate between stories, characters, and their worlds.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#08080d] px-6 py-16 text-white md:px-16">
      <section className="mx-auto max-w-4xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
          <Sparkles size={32} />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
          About the Project
        </p>

        <h1 className="mt-4 text-5xl font-black md:text-7xl">
          Welcome to
          <span className="block bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent">
            OMNIVERSE
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
          OMNIVERSE is an entertainment encyclopedia built for fans who want to
          explore movies, series, anime, characters, powers, and legendary
          weapons. It brings different fictional worlds together in one
          organized platform.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-6xl">
        <h2 className="text-center text-3xl font-bold">What You Can Explore</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-xl border border-white/10 bg-[#12121a] p-6 transition hover:border-purple-500/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-gray-400">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl rounded-2xl border border-white/10 bg-[#12121a] p-8 text-center">
        <h2 className="text-3xl font-bold">Explore Every Universe</h2>
        <p className="mt-4 text-gray-400">
          Start discovering your favorite fictional worlds today.
        </p>
        <Link
          to="/"
          className="mt-7 inline-block rounded-lg bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-700"
        >
          Go to Homepage
        </Link>
      </section>
    </main>
  );
}
