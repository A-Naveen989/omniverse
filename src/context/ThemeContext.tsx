
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* =========================================
   THEME TYPES
   ========================================= */

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

/* =========================================
   THEME CONTEXT
   ========================================= */

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

/* =========================================
   STORAGE KEY
   ========================================= */

const THEME_STORAGE_KEY = "omniverse-theme";

/* =========================================
   THEME PROVIDER
   ========================================= */

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem(
        THEME_STORAGE_KEY
      );

      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
      }
    } catch (error) {
      console.error("Failed to load theme:", error);
    }

    return "dark";
  });

  /* =========================================
     APPLY THEME TO HTML DOCUMENT
     ========================================= */

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  }, [theme]);

  /* =========================================
     SET THEME
     ========================================= */

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  /* =========================================
     TOGGLE THEME
     ========================================= */

  const toggleTheme = () => {
    setThemeState((previousTheme) =>
      previousTheme === "dark" ? "light" : "dark"
    );
  };

  /* =========================================
     CONTEXT VALUE
     ========================================= */

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/* =========================================
   CUSTOM THEME HOOK
   ========================================= */

// This module intentionally exports the provider and its paired hook.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      "useTheme must be used within a ThemeProvider"
    );
  }

  return context;
}
