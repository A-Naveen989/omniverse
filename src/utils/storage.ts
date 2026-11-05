
/* =========================================
   OMNIVERSE - STORAGE UTILITIES
   ========================================= */

const STORAGE_PREFIX = "omniverse-";

/* =========================================
   GET DATA FROM LOCAL STORAGE
   ========================================= */

export function getStorageItem<T>(
  key: string,
  fallback: T
): T {
  try {
    const storedValue = localStorage.getItem(
      `${STORAGE_PREFIX}${key}`
    );

    if (storedValue === null) {
      return fallback;
    }

    return JSON.parse(storedValue) as T;
  } catch (error) {
    console.error(`Failed to read storage key "${key}":`, error);
    return fallback;
  }
}

/* =========================================
   SAVE DATA TO LOCAL STORAGE
   ========================================= */

export function setStorageItem<T>(
  key: string,
  value: T
): boolean {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${key}`,
      JSON.stringify(value)
    );

    return true;
  } catch (error) {
    console.error(`Failed to save storage key "${key}":`, error);
    return false;
  }
}

/* =========================================
   REMOVE DATA FROM LOCAL STORAGE
   ========================================= */

export function removeStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    return true;
  } catch (error) {
    console.error(`Failed to remove storage key "${key}":`, error);
    return false;
  }
}

/* =========================================
   CLEAR OMNIVERSE STORAGE ONLY
   ========================================= */

export function clearOmniverseStorage(): boolean {
  try {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key?.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    return true;
  } catch (error) {
    console.error("Failed to clear OMNIVERSE storage:", error);
    return false;
  }
}

/* =========================================
   CHECK IF STORAGE KEY EXISTS
   ========================================= */

export function hasStorageItem(key: string): boolean {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${key}`) !== null;
  } catch (error) {
    console.error(`Failed to check storage key "${key}":`, error);
    return false;
  }
}

/* =========================================
   GET STORAGE ITEM COUNT
   ========================================= */

export function getOmniverseStorageCount(): number {
  try {
    let count = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key?.startsWith(STORAGE_PREFIX)) {
        count++;
      }
    }

    return count;
  } catch (error) {
    console.error("Failed to count storage items:", error);
    return 0;
  }
}
