import { useCallback, useEffect, useState } from "react";
import { getTitles } from "../data/adminStorage";

export type FavoriteItemType =
  | "movie"
  | "series"
  | "anime"
  | "character"
  | "power"
  | "weapon";

export interface FavoriteItem {
  id: string;
  itemType: FavoriteItemType;
  addedAt: string;
}

const FAVORITES_STORAGE_KEY = "omniverse-favorites";

function isFavoriteItem(value: unknown): value is FavoriteItem {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<FavoriteItem>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.addedAt === "string" &&
    ["movie", "series", "anime", "character", "power", "weapon"].includes(
      candidate.itemType ?? ""
    )
  );
}

function getStoredFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];

  try {
    const storedData = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!storedData) return [];

    const parsedData: unknown = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) return [];

    // Older title pages stored only string IDs. Migrate those IDs when they
    // still exist in the active catalogue so users do not lose saved titles.
    const titleTypes = new Map(
      getTitles().map((title) => [title.id, title.type as FavoriteItemType])
    );

    const migratedFavorites: FavoriteItem[] = [];
    for (const entry of parsedData) {
      if (isFavoriteItem(entry)) {
        migratedFavorites.push(entry);
      } else if (typeof entry === "string") {
        const itemType = titleTypes.get(entry);
        if (itemType) {
          migratedFavorites.push({
            id: entry,
            itemType,
            addedAt: new Date().toISOString(),
          });
        }
      }
    }
    return migratedFavorites;
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(getStoredFavorites);

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  useEffect(() => {
    const syncFromStorage = (event: StorageEvent) => {
      if (event.key === FAVORITES_STORAGE_KEY) {
        setFavorites(getStoredFavorites());
      }
    };

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const addFavorite = useCallback((id: string, itemType: FavoriteItemType) => {
    setFavorites((previousFavorites) => {
      if (previousFavorites.some((favorite) => favorite.id === id && favorite.itemType === itemType)) {
        return previousFavorites;
      }
      return [...previousFavorites, { id, itemType, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeFavorite = useCallback((id: string, itemType: FavoriteItemType) => {
    setFavorites((previousFavorites) =>
      previousFavorites.filter((favorite) => !(favorite.id === id && favorite.itemType === itemType))
    );
  }, []);

  const toggleFavorite = useCallback((id: string, itemType: FavoriteItemType) => {
    setFavorites((previousFavorites) => {
      const exists = previousFavorites.some(
        (favorite) => favorite.id === id && favorite.itemType === itemType
      );
      if (exists) {
        return previousFavorites.filter(
          (favorite) => !(favorite.id === id && favorite.itemType === itemType)
        );
      }
      return [...previousFavorites, { id, itemType, addedAt: new Date().toISOString() }];
    });
  }, []);

  const isFavorite = useCallback(
    (id: string, itemType: FavoriteItemType) =>
      favorites.some((favorite) => favorite.id === id && favorite.itemType === itemType),
    [favorites]
  );

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const getFavoritesByType = useCallback(
    (itemType: FavoriteItemType) => favorites.filter((favorite) => favorite.itemType === itemType),
    [favorites]
  );

  return {
    favorites,
    favoriteCount: favorites.length,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesByType,
  };
}
