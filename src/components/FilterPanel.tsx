
import {
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

export interface FilterValues {
  genre: string;
  country: string;
  year: string;
  rating: string;
  status: string;
  sortBy: string;
}

interface FilterPanelProps {
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  genres?: string[];
  countries?: string[];
  years?: string[];
  statuses?: string[];
}

export default function FilterPanel({
  filters,
  onChange,
  genres = ["Action", "Adventure", "Drama", "Fantasy", "Sci-Fi"],
  countries = ["Japan", "USA", "India", "South Korea"],
  years = ["2026", "2025", "2024", "2023", "2022"],
  statuses = ["Ongoing", "Completed", "Upcoming"],
}: FilterPanelProps) {
  const updateFilter = (
    key: keyof FilterValues,
    value: string,
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onChange({
      genre: "",
      country: "",
      year: "",
      rating: "",
      status: "",
      sortBy: "popularity",
    });
  };

  const selectClass =
    "w-full rounded-lg border border-white/10 bg-[#141418] px-3 py-3 text-sm text-gray-300 outline-none transition focus:border-purple-500";

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111114] p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={20}
            className="text-purple-400"
          />

          <h3 className="font-bold text-white">
            Filters
          </h3>
        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-gray-400 transition hover:text-purple-400"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      {/* Filters */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Genre */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Genre
          </label>

          <select
            value={filters.genre}
            onChange={(event) =>
              updateFilter("genre", event.target.value)
            }
            className={selectClass}
          >
            <option value="">All Genres</option>

            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Country
          </label>

          <select
            value={filters.country}
            onChange={(event) =>
              updateFilter("country", event.target.value)
            }
            className={selectClass}
          >
            <option value="">All Countries</option>

            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Release Year
          </label>

          <select
            value={filters.year}
            onChange={(event) =>
              updateFilter("year", event.target.value)
            }
            className={selectClass}
          >
            <option value="">All Years</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            IMDb Rating
          </label>

          <select
            value={filters.rating}
            onChange={(event) =>
              updateFilter("rating", event.target.value)
            }
            className={selectClass}
          >
            <option value="">All Ratings</option>
            <option value="9">9.0+</option>
            <option value="8">8.0+</option>
            <option value="7">7.0+</option>
            <option value="6">6.0+</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Status
          </label>

          <select
            value={filters.status}
            onChange={(event) =>
              updateFilter("status", event.target.value)
            }
            className={selectClass}
          >
            <option value="">All Status</option>

            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-400">
            Sort By
          </label>

          <select
            value={filters.sortBy}
            onChange={(event) =>
              updateFilter("sortBy", event.target.value)
            }
            className={selectClass}
          >
            <option value="popularity">Popularity</option>
            <option value="rating">Highest Rating</option>
            <option value="year">Release Year</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  );
}
