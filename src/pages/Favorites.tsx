import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

import ImageWithFallback from "../components/ImageWithFallback";
import { getTitles } from "../data/adminStorage";
import { getCharacterProfile } from "../data/characterData";
import {
  getAllAnimePowers,
  getAllAnimeWeapons,
  getAnimeCharacterById,
} from "../data/animeCharacterData";
import { getPowers, getWeapons } from "../data/adminStorage";
import { useFavorites, type FavoriteItem } from "../hooks/useFavorites";

interface ResolvedFavorite {
  key: string;
  id: string;
  itemType: FavoriteItem["itemType"];
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  href?: string;
  addedAt: string;
}

function getTitlePath(type: string, id: string): string {
  if (type === "movie") return `/movies/${id}`;
  if (type === "series") return `/series/${id}`;
  if (type === "anime") return `/anime/${id}`;
  return "/";
}

function resolveFavorite(item: FavoriteItem): ResolvedFavorite {
  const base: ResolvedFavorite = {
    key: `${item.itemType}:${item.id}`,
    id: item.id,
    itemType: item.itemType,
    title: "Saved item unavailable",
    subtitle: item.itemType,
    description: "This item is no longer present in the active OMNIVERSE dataset.",
    addedAt: item.addedAt,
  };

  if (["movie", "series", "anime"].includes(item.itemType)) {
    const title = getTitles().find((entry) => entry.id === item.id);
    if (!title) return base;
    return {
      ...base,
      title: title.name,
      subtitle: `${title.type.toUpperCase()}${title.year ? ` · ${title.year}` : ""}`,
      description: title.description || "No synopsis is available for this title yet.",
      image: title.poster,
      href: getTitlePath(title.type, title.id),
    };
  }

  if (item.itemType === "character") {
    const character = getCharacterProfile(item.id);
    if (character) {
      return {
        ...base,
        title: character.name,
        subtitle: "Live-action character",
        description: character.description || character.biography || "Character profile.",
        image: character.image,
        href: `/characters/${character.id}`,
      };
    }

    const animeCharacter = getAnimeCharacterById(item.id);
    if (animeCharacter) {
      return {
        ...base,
        title: animeCharacter.name,
        subtitle: "Anime character",
        description: animeCharacter.description || animeCharacter.biography || "Character profile.",
        image: animeCharacter.image,
        href: `/anime/characters/${animeCharacter.id}`,
      };
    }
    return base;
  }

  if (item.itemType === "power") {
    const power = [...getPowers(), ...getAllAnimePowers()].find((entry) => entry.id === item.id);
    if (power) {
      const linkedCharacterId = power.userIds[0];
      const href = linkedCharacterId
        ? getAnimeCharacterById(linkedCharacterId)
          ? `/anime/characters/${linkedCharacterId}`
          : getCharacterProfile(linkedCharacterId)
            ? `/characters/${linkedCharacterId}`
            : "/powers"
        : "/powers";
      return {
        ...base,
        title: power.name,
        subtitle: `${power.category} · Power`,
        description: power.description,
        image: power.image,
        href,
      };
    }
    return base;
  }

  if (item.itemType === "weapon") {
    const weapon = [...getWeapons(), ...getAllAnimeWeapons()].find((entry) => entry.id === item.id);
    if (weapon) {
      const linkedCharacterId = weapon.wielderIds[0];
      const href = linkedCharacterId
        ? getAnimeCharacterById(linkedCharacterId)
          ? `/anime/characters/${linkedCharacterId}`
          : getCharacterProfile(linkedCharacterId)
            ? `/characters/${linkedCharacterId}`
            : "/weapons"
        : "/weapons";
      return {
        ...base,
        title: weapon.name,
        subtitle: `${weapon.category} · Weapon`,
        description: weapon.description,
        image: weapon.image,
        href,
      };
    }
  }

  return base;
}

export default function Favorites() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const resolved = favorites.map(resolveFavorite);

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-12 text-[var(--text-primary)] md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Heart className="text-rose-400" size={30} />
              <h1 className="text-4xl font-black md:text-5xl">My Favorites</h1>
            </div>
            <p className="mt-3 text-[var(--text-secondary)]">
              Your saved titles, characters, powers, and weapons.
            </p>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {favorites.length} saved {favorites.length === 1 ? "item" : "items"}
            </p>
          </div>
          {favorites.length > 0 && (
            <button
              type="button"
              onClick={clearFavorites}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-rose-500 hover:text-rose-400"
            >
              Clear all
            </button>
          )}
        </header>

        {resolved.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
            <Heart className="mx-auto text-[var(--text-secondary)]" size={48} />
            <h2 className="mt-5 text-2xl font-bold">No favorites yet</h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              Save an item from a title or character profile to build your collection.
            </p>
            <Link
              to="/movies"
              className="mt-6 inline-flex rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {resolved.map((item) => (
              <article
                key={item.key}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              >
                {item.href ? (
                  <Link to={item.href} className="block">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      fallbackLabel={item.title}
                      containerClassName="aspect-[2/3] w-full"
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </Link>
                ) : (
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    fallbackLabel={item.title}
                    containerClassName="aspect-[2/3] w-full"
                  />
                )}
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-purple-400">
                    {item.subtitle}
                  </p>
                  <h2 className="mt-2 line-clamp-2 font-bold">
                    {item.href ? <Link to={item.href} className="hover:text-purple-400">{item.title}</Link> : item.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 min-h-12 text-xs leading-5 text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
                    <span className="text-[10px] text-[var(--text-secondary)]">
                      Saved {Number.isNaN(Date.parse(item.addedAt)) ? "recently" : new Date(item.addedAt).toLocaleDateString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFavorite(item.id, item.itemType)}
                      title="Remove from favorites"
                      aria-label={`Remove ${item.title} from favorites`}
                      className="rounded-lg p-2 text-rose-400 transition hover:bg-rose-500/10"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
