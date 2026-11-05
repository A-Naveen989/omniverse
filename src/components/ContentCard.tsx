
import {
  Star,
  Heart,
} from "lucide-react";

import { useState } from "react";

export interface ContentCardProps {
  id: string;
  title: string;
  year: string | number;
  genre: string;
  rating: string | number;
  image: string;
  type: "Movie" | "Series" | "Anime";
  country?: string;
  onClick?: () => void;
}

export default function ContentCard({
  id,
  title,
  year,
  genre,
  rating,
  image,
  type,
  country,
  onClick,
}: ContentCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article
      data-content-id={id}
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/5 bg-[#18181b]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Type Badge */}
        <span className="absolute left-3 top-3 rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold">
          {type}
        </span>

        {/* Favorite Button */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            setIsFavorite((prev) => !prev);
          }}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className="absolute right-3 top-3 rounded-full bg-black/60 p-2 backdrop-blur-md transition hover:bg-black/80"
        >
          <Heart
            size={18}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-white"
            }
          />
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>

      {/* Content Information */}
      <div className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-base font-bold transition group-hover:text-purple-400">
            {title}
          </h3>

          <div className="flex shrink-0 items-center gap-1 text-sm text-yellow-400">
            <Star size={14} fill="currentColor" />
            {rating}
          </div>
        </div>

        <p className="mt-1 text-sm text-gray-400">
          {year} • {genre}
        </p>

        {country && (
          <p className="mt-1 text-xs text-gray-500">
            {country}
          </p>
        )}
      </div>
    </article>
  );
}
