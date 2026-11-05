import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star } from "lucide-react";

import type { Title, ContentType } from "../types";
import ImageWithFallback from "./ImageWithFallback";
import { filterTitles, sortTitles } from "../utils/filters";
import type { TitleSortOption } from "../utils/filters";

interface ContentListingProps {
  titles: Title[];
  type: ContentType;
  heading: string;
  description: string;
}

// Return the correct details page for each content type.
function getTitlePath(title: Title): string {
  switch (title.type) {
    case "movie":
      return `/movies/${title.id}`;

    case "series":
      return `/series/${title.id}`;

    case "anime":
      return `/anime/${title.id}`;

    default:
      return "/";
  }
}

export default function ContentListing({
  titles,
  type,
  heading,
  description,
}: ContentListingProps) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [formatFilter, setFormatFilter] = useState("");
  const [sortOption, setSortOption] =
    useState<TitleSortOption>("rating-desc");

  // Get available genres for the selected content type.
  const genres = useMemo(() => {
    const allGenres = titles
      .filter((title) => title.type === type)
      .flatMap((title) => title.genre ?? []);

    return [...new Set(allGenres)].sort();
  }, [titles, type]);

  // Anime data includes animated movies, TV series, mini-series, and videos.
  const formats = useMemo(() => {
    const availableFormats = titles
      .filter((title) => title.type === type)
      .map((title) => title.format)
      .filter((format): format is string => Boolean(format));

    return [...new Set(availableFormats)].sort();
  }, [titles, type]);

  // Filter and sort titles.
  const filteredTitles = useMemo(() => {
    const filtered = filterTitles(titles, {
      type,
      search,
      genre: genre || undefined,
    });

    const formatFiltered =
      type === "anime" && formatFilter
        ? filtered.filter((title) => title.format === formatFilter)
        : filtered;

    return sortTitles(formatFiltered, sortOption);
  }, [titles, type, search, genre, formatFilter, sortOption]);

  // Reset all filters.
  const resetFilters = () => {
    setSearch("");
    setGenre("");
    setFormatFilter("");
    setSortOption("rating-desc");
  };

  return (
    <section className="min-h-screen bg-[var(--background)] px-4 py-12 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-purple-500">
            Explore the Universe
          </p>

          <h1 className="text-4xl font-black md:text-5xl">
            {heading}
          </h1>

          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            {description}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />

            <input
              type="text"
              placeholder={`Search ${heading.toLowerCase()}...`}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label={`Search ${heading}`}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] py-3 pl-10 pr-4 outline-none focus:border-purple-500"
            />
          </div>

          {/* Genre Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={18}
              className="text-purple-500"
            />

            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              aria-label="Filter by genre"
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-purple-500"
            >
              <option value="">All Genres</option>

              {genres.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Anime Format Filter */}
          {type === "anime" && formats.length > 0 && (
            <select
              value={formatFilter}
              onChange={(event) => setFormatFilter(event.target.value)}
              aria-label="Filter by animation format"
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-purple-500"
            >
              <option value="">All Formats</option>
              {formats.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
          )}

          {/* Sorting */}
          <select
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as TitleSortOption)
            }
            aria-label="Sort titles"
            className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none focus:border-purple-500"
          >
            <option value="rating-desc">Highest Rated</option>
            <option value="rating-asc">Lowest Rated</option>
            <option value="year-desc">Newest First</option>
            <option value="year-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>

          {/* Reset */}
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-xl border border-[var(--border)] px-5 py-3 transition hover:bg-purple-600 hover:text-white"
          >
            Reset
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[var(--text-secondary)]">
            {filteredTitles.length} results found
          </p>
        </div>

        {/* Empty State */}
        {filteredTitles.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-20 text-center">
            <h2 className="text-2xl font-bold">
              No content found
            </h2>

            <p className="mt-2 text-[var(--text-secondary)]">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-purple-600 px-5 py-3 text-white transition hover:bg-purple-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (

          /* Content Cards */
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredTitles.map((title) => (
              <Link
                key={title.id}
                to={getTitlePath(title)}
                className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10"
              >

                {/* Poster */}
                <div className="relative aspect-[2/3] overflow-hidden bg-[var(--surface-hover)]">
                  <ImageWithFallback
                    src={title.poster}
                    alt={`${title.name} poster`}
                    fallbackLabel={title.name}
                    containerClassName="absolute inset-0"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Content Type */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    <span className="rounded-lg bg-black/75 px-3 py-1 text-xs font-semibold uppercase text-white">
                      {title.type}
                    </span>
                    {title.type === "anime" && title.format && (
                      <span className="rounded-lg bg-purple-700/90 px-2.5 py-1 text-[10px] font-semibold uppercase text-white">
                        {title.format}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/75 px-2 py-1 text-sm text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    {title.rating || "N/A"}
                  </div>
                </div>

                {/* Content Information */}
                <div className="p-4">
                  <h2 className="line-clamp-1 text-lg font-bold transition group-hover:text-purple-400">
                    {title.name}
                  </h2>

                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {title.year || "Year unknown"}
                    {title.type === "anime"
                      ? ` · ${title.format || "Animation"}`
                      : ` · ${title.country || "Country not listed"}`}
                  </p>

                  {/* Genres */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(title.genre ?? []).slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-purple-500/10 px-2 py-1 text-xs text-purple-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}