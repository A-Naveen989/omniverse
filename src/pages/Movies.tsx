
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import moviesData from "../data/movies.json";

interface Movie {
  Const: string;
  Title: string;
  "Original Title": string;
  "IMDb Rating": number;
  "Your Rating": number;
  Year: number;
  Genres: string;
  "Runtime (mins)": number;
  Directors: string;
  URL: string;
}

const movies = moviesData as Movie[];

export default function Movies() {
  const [search, setSearch] = useState("");

  // Filter movies based on title
  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return movies;

    return movies.filter((movie) =>
      movie.Title.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#09090b] px-6 py-10 text-white md:px-12">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Movies
        </h1>

        <p className="mt-2 text-zinc-400">
          Explore your movie collection
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          {filteredMovies.length} movies available
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search movies by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search movies by title"
          className="w-full max-w-xl rounded-lg border border-zinc-700
          bg-zinc-900 px-4 py-3 text-white outline-none
          transition focus:border-purple-500 focus:ring-1
          focus:ring-purple-500"
        />
      </div>

      {/* Movie Grid */}
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {filteredMovies.map((movie) => (
          <article
            key={movie.Const}
            className="group flex flex-col rounded-xl border
            border-zinc-800 bg-zinc-900 p-4
            transition-all duration-300
            hover:-translate-y-1 hover:border-purple-500
            hover:bg-zinc-800/80 hover:shadow-lg
            hover:shadow-purple-500/10"
          >

            {/* Clickable Movie Details */}
            <Link
              to={`/movies/${movie.Const}`}
              aria-label={`View details for ${movie.Title}`}
              className="block flex-1 rounded-lg outline-none
              focus-visible:ring-2 focus-visible:ring-purple-500"
            >

              {/* Movie Title */}
              <h2 className="mb-2 text-lg font-semibold
              text-white transition-colors
              group-hover:text-purple-400">
                {movie.Title}
              </h2>

              {/* Year */}
              <p className="text-sm text-zinc-400">
                {movie.Year}
              </p>

              {/* IMDb Rating */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-yellow-400">
                  ★
                </span>

                <span className="font-semibold">
                  {movie["IMDb Rating"]}
                </span>

                <span className="text-xs text-zinc-500">
                  IMDb
                </span>
              </div>

              {/* Your Rating */}
              <p className="mt-2 text-sm text-zinc-300">
                Your Rating: {movie["Your Rating"]}/10
              </p>

              {/* Genres */}
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {movie.Genres}
              </p>

              {/* Director */}
              <p className="mt-3 text-sm text-zinc-500">
                Director: {movie.Directors || "Not available"}
              </p>

              {/* Runtime */}
              <p className="mt-2 text-xs text-zinc-500">
                {movie["Runtime (mins)"]
                  ? `${movie["Runtime (mins)"]} min`
                  : "Runtime unavailable"}
              </p>

              {/* Details CTA */}
              <div className="mt-4 flex items-center gap-2
              text-sm font-semibold text-purple-400
              transition group-hover:text-purple-300">
                Explore Movie Details
                <span aria-hidden="true">→</span>
              </div>

            </Link>

            {/* IMDb External Link */}
            <div className="mt-4 border-t border-zinc-800 pt-3">
              <a
                href={movie.URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block text-sm text-yellow-400
                transition hover:text-yellow-300 hover:underline"
              >
                View on IMDb ↗
              </a>
            </div>

          </article>
        ))}
      </div>

      {/* Empty Search */}
      {filteredMovies.length === 0 && (
        <div className="mt-16 text-center">
          <h2 className="text-xl font-semibold text-zinc-300">
            No movies found
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Try searching with another movie title.
          </p>

          <button
            onClick={() => setSearch("")}
            className="mt-5 rounded-lg bg-purple-600
            px-5 py-2 text-sm font-semibold text-white
            transition hover:bg-purple-700"
          >
            Clear Search
          </button>
        </div>
      )}

    </div>
  );
}
