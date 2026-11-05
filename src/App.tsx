
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Link,
} from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Main Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import Series from "./pages/Series";
import SeriesDetailsPage from "./pages/SeriesDetailsPage";
import Anime from "./pages/Anime";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
import AnimeCharactersPage from "./pages/AnimeCharactersPage";
import AnimeCharacterDetailsPage from "./pages/AnimeCharacterDetailsPage";
import Characters from "./pages/Characters";
import CharacterDetails from "./pages/CharacterDetails";
import TitleDetails from "./pages/TitleDetails";
import Powers from "./pages/Powers";
import Weapons from "./pages/Weapons";
import Favorites from "./pages/Favorites";
import About from "./pages/About";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageTitles from "./admin/ManageTitles";
import ManageCharacters from "./admin/ManageCharacters";
import ManagePowers from "./admin/ManagePowers";
import ManageWeapons from "./admin/ManageWeapons";

/* =========================================
   NOT FOUND PAGE
   ========================================= */

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-7xl font-extrabold text-purple-500">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
        Universe Not Found
      </h2>

      <p className="mt-2 max-w-md text-[var(--text-secondary)]">
        The page you are looking for does not exist or has
        been moved to another universe.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
      >
        Return Home
      </Link>
    </div>
  );
}

/* =========================================
   DATA ROUTER
   ========================================= */

const router = createBrowserRouter([
  /* =========================================
     MAIN WEBSITE
     ========================================= */

  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      // =====================================
      // MOVIES
      // =====================================

      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/:titleId",
        element: <MovieDetailsPage />,
      },

      // =====================================
      // SERIES
      // =====================================

      {
        path: "series",
        element: <Series />,
      },
      {
        path: "series/:titleId",
        element: <SeriesDetailsPage />,
      },

      // =====================================
      // ANIME
      // =====================================

      {
        path: "anime",
        element: <Anime />,
      },
      {
        path: "anime/characters",
        element: <AnimeCharactersPage />,
      },
      {
        path: "anime/characters/:id",
        element: <AnimeCharacterDetailsPage />,
      },
      {
        path: "anime/:titleId",
        element: <AnimeDetailsPage />,
      },

      // =====================================
      // CHARACTERS
      // =====================================

      {
        path: "characters",
        element: <Characters />,
      },
      {
        path: "characters/:id",
        element: <CharacterDetails />,
      },

      // =====================================
      // GENERAL CONTENT DETAILS
      // =====================================

      {
        path: "title/:id",
        element: <TitleDetails />,
      },

      // =====================================
      // POWERS AND WEAPONS
      // =====================================

      {
        path: "powers",
        element: <Powers />,
      },
      {
        path: "weapons",
        element: <Weapons />,
      },

      // =====================================
      // USER FEATURES
      // =====================================

      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },

  /* =========================================
     ADMIN LOGIN
     ========================================= */

  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  /* =========================================
     ADMIN DASHBOARD
     ========================================= */

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "titles",
        element: <ManageTitles />,
      },
      {
        path: "characters",
        element: <ManageCharacters />,
      },
      {
        path: "powers",
        element: <ManagePowers />,
      },
      {
        path: "weapons",
        element: <ManageWeapons />,
      },
    ],
  },

  /* =========================================
     404 PAGE
     ========================================= */

  {
    path: "*",
    element: <NotFound />,
  },
]);

/* =========================================
   APP COMPONENT
   ========================================= */

function App() {
  return <RouterProvider router={router} />;
}

export default App;
