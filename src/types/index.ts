
/* =========================================
   OMNIVERSE - GLOBAL TYPES
   ========================================= */

/* =========================================
   CONTENT TYPE
   ========================================= */

export type ContentType = "movie" | "series" | "anime";

/* =========================================
   TITLE TYPE
   Used for Movies, Series, and Anime
   ========================================= */

export interface Title {
  id: string;
  name: string;
  type: ContentType;
  year: number;
  country: string;
  rating: number;
  genre: string[];
  description: string;
  poster: string;
  backdrop: string;

  director?: string;
  creator?: string;
  studio?: string;
  language?: string;
  status?: "ongoing" | "completed" | "upcoming";
  seasons?: number;
  episodes?: number;
  runtime?: number;

  imdb?: string;
  trailer?: string;
  featured?: boolean;

  // Source metadata retained for animated titles imported from IMDb.
  format?: string;
  originalTitle?: string;
  releaseDate?: string;
  yourRating?: number;
  dateRated?: string;
  numVotes?: number;
}

/* =========================================
   CHARACTER TYPE
   ========================================= */

export interface Character {
  id: string;
  name: string;
  title: string;
  titleId?: string;
  role: string;
  power: string;
  description: string;
  image: string;

  age?: string | number;
  gender?: string;
  species?: string;
  affiliation?: string;
  firstAppearance?: string;
  abilities?: string[];
  weaponIds?: string[];
  powerIds?: string[];
}

/* =========================================
   POWER TYPE
   ========================================= */

export interface Power {
  id: string;
  name: string;
  user: string;
  characterId?: string;
  title: string;
  titleId?: string;
  category: string;
  description: string;
  image?: string;

  abilities?: string[];
  weaknesses?: string[];
  origin?: string;
  powerLevel?: string | number;
}

/* =========================================
   WEAPON TYPE
   ========================================= */

export interface Weapon {
  id: string;
  name: string;
  user: string;
  characterId?: string;
  title: string;
  titleId?: string;
  category: string;
  description: string;
  image?: string;

  material?: string;
  abilities?: string[];
  origin?: string;
  powerLevel?: string | number;
}

/* =========================================
   ADMIN TYPE
   ========================================= */

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor";
}

/* =========================================
   FAVORITE TYPE
   ========================================= */

export interface Favorite {
  id: string;
  itemId: string;
  itemType: ContentType | "character" | "power" | "weapon";
  addedAt: string;
}

/* =========================================
   SEARCH TYPE
   ========================================= */

export interface SearchResult {
  id: string;
  name: string;
  type: ContentType | "character" | "power" | "weapon";
  image: string;
  description?: string;
}

/* =========================================
   FILTER TYPE
   ========================================= */

export interface TitleFilters {
  type?: ContentType;
  genre?: string;
  year?: number;
  country?: string;
  rating?: number;
  search?: string;
}

/* =========================================
   PAGINATION TYPE
   ========================================= */

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/* =========================================
   API-LIKE RESPONSE TYPE
   Used for local JSON data
   ========================================= */

export interface DataResponse<T> {
  data: T[];
  total: number;
  success: boolean;
}

/* =========================================
   ADMIN FORM TYPES
   ========================================= */

export type TitleFormData = Omit<Title, "id">;

export type CharacterFormData = Omit<Character, "id">;

export type PowerFormData = Omit<Power, "id">;

export type WeaponFormData = Omit<Weapon, "id">;

/* =========================================
   DASHBOARD STATISTICS TYPE
   ========================================= */

export interface DashboardStats {
  totalMovies: number;
  totalSeries: number;
  totalAnime: number;
  totalCharacters: number;
  totalPowers: number;
  totalWeapons: number;
}

/* =========================================
   NAVIGATION TYPE
   ========================================= */

export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

/* =========================================
   USER AUTHENTICATION TYPE
   ========================================= */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "user";
}
