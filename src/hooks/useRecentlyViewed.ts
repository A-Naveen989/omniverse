import { useCallback, useEffect, useState } from "react";

export type RecentlyViewedItemType =
  | "movie"
  | "series"
  | "anime"
  | "character"
  | "power"
  | "weapon";

export interface RecentlyViewedItem {
  id: string;
  itemType: RecentlyViewedItemType;
  viewedAt: string;
}

const RECENTLY_VIEWED_STORAGE_KEY = "omniverse-recently-viewed";
const DEFAULT_MAX_ITEMS = 20;

function getStoredRecentlyViewed(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return [];

  try {
    const storedData = window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    if (!storedData) return [];
    const parsedData: unknown = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) return [];

    return parsedData.filter((value): value is RecentlyViewedItem => {
      if (!value || typeof value !== "object") return false;
      const candidate = value as Partial<RecentlyViewedItem>;
      return (
        typeof candidate.id === "string" &&
        typeof candidate.viewedAt === "string" &&
        ["movie", "series", "anime", "character", "power", "weapon"].includes(
          candidate.itemType ?? ""
        )
      );
    });
  } catch (error) {
    console.error("Failed to load recently viewed items:", error);
    return [];
  }
}

export function useRecentlyViewed(maxItems: number = DEFAULT_MAX_ITEMS) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>(getStoredRecentlyViewed);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        RECENTLY_VIEWED_STORAGE_KEY,
        JSON.stringify(recentlyViewed)
      );
    } catch (error) {
      console.error("Failed to save recently viewed items:", error);
    }
  }, [recentlyViewed]);

  const addRecentlyViewed = useCallback((id: string, itemType: RecentlyViewedItemType) => {
    setRecentlyViewed((previousItems) => {
      const filteredItems = previousItems.filter(
        (item) => !(item.id === id && item.itemType === itemType)
      );
      return [
        { id, itemType, viewedAt: new Date().toISOString() },
        ...filteredItems,
      ].slice(0, Math.max(0, maxItems));
    });
  }, [maxItems]);

  const removeRecentlyViewed = useCallback((id: string, itemType: RecentlyViewedItemType) => {
    setRecentlyViewed((previousItems) =>
      previousItems.filter((item) => !(item.id === id && item.itemType === itemType))
    );
  }, []);

  const clearRecentlyViewed = useCallback(() => setRecentlyViewed([]), []);

  const getRecentlyViewedByType = useCallback(
    (itemType: RecentlyViewedItemType) =>
      recentlyViewed.filter((item) => item.itemType === itemType),
    [recentlyViewed]
  );

  return {
    recentlyViewed,
    recentlyViewedCount: recentlyViewed.length,
    addRecentlyViewed,
    removeRecentlyViewed,
    clearRecentlyViewed,
    getRecentlyViewedByType,
  };
}
