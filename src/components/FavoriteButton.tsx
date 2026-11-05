import { Heart } from "lucide-react";
import { useFavorites, type FavoriteItemType } from "../hooks/useFavorites";

export interface FavoriteButtonProps {
  id: string;
  itemType: FavoriteItemType;
  className?: string;
  showLabel?: boolean;
}

export default function FavoriteButton({
  id,
  itemType,
  className = "",
  showLabel = true,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id, itemType);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={() => toggleFavorite(id, itemType)}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold transition hover:border-rose-400 hover:text-rose-400 ${className}`}
    >
      <Heart size={17} className={active ? "fill-rose-500 text-rose-500" : ""} />
      {showLabel ? (active ? "Saved" : "Add to Favorites") : null}
    </button>
  );
}
