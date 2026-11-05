
import { useState } from "react";

import {
  Outlet,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  Orbit,
  LayoutDashboard,
  Film,
  Tv,
  Clapperboard,
  Users,
  Zap,
  Sword,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const adminLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Movies",
    path: "/admin/movies",
    icon: Film,
  },
  {
    name: "Series",
    path: "/admin/series",
    icon: Tv,
  },
  {
    name: "Anime",
    path: "/admin/anime",
    icon: Clapperboard,
  },
  {
    name: "Characters",
    path: "/admin/characters",
    icon: Users,
  },
  {
    name: "Powers & Abilities",
    path: "/admin/powers",
    icon: Zap,
  },
  {
    name: "Weapons & Tools",
    path: "/admin/weapons",
    icon: Sword,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Replace with your actual authentication logout logic.
    localStorage.removeItem("omniverse-admin-auth");

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#111114] transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <a
            href="/"
            className="flex items-center gap-2"
          >
            <Orbit
              size={30}
              className="text-purple-500"
            />

            <span className="text-xl font-black">
              OMNI
              <span className="text-purple-500">
                VERSE
              </span>
            </span>
          </a>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* Admin Badge */}
        <div className="mx-5 mt-6 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-600/20 p-2">
              <ShieldCheck
                size={22}
                className="text-purple-400"
              />
            </div>

            <div>
              <p className="text-sm font-bold">
                Admin Panel
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Content Management
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 space-y-1 overflow-y-auto px-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Management
          </p>

          {adminLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/10"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={19} />

                  <span>{link.name}</span>
                </div>

                <ChevronRight
                  size={16}
                  className="opacity-50"
                />
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Bottom */}
        <div className="border-t border-white/10 p-4">
          <NavLink
            to="/"
            className="mb-3 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <Orbit size={18} />
            View Website
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="min-h-screen lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#09090b]/90 px-5 backdrop-blur-xl lg:px-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 transition hover:text-white lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-lg font-bold">
                Admin Dashboard
              </h1>

              <p className="hidden text-xs text-gray-500 sm:block">
                Manage your OMNIVERSE content
              </p>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                Administrator
              </p>

              <p className="text-xs text-gray-500">
                Content Manager
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
              <ShieldCheck size={21} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-5 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
