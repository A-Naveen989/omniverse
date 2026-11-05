
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Film,
  Tv,
  Clapperboard,
  Users,
  Zap,
  Sword,
  ArrowUpRight,
  Database,
} from "lucide-react";

import {
  getTitles,
  getCharacters,
  getPowers,
  getWeapons,
} from "../data/adminStorage";

export default function AdminDashboard() {
  const [stats] = useState(() => {
    const allTitles = getTitles();

    return {
      movies: allTitles.filter((item) => item.type === "movie").length,
      series: allTitles.filter((item) => item.type === "series").length,
      anime: allTitles.filter((item) => item.type === "anime").length,
      characters: getCharacters().length,
      powers: getPowers().length,
      weapons: getWeapons().length,
    };
  });

  const [recentTitles] = useState(() => getTitles().slice(-5).reverse());

  const cards = [
    {
      label: "Movies",
      value: stats.movies,
      icon: Film,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      link: "/admin/titles",
    },
    {
      label: "Series",
      value: stats.series,
      icon: Tv,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      link: "/admin/titles",
    },
    {
      label: "Anime",
      value: stats.anime,
      icon: Clapperboard,
      color: "text-red-400",
      bg: "bg-red-500/10",
      link: "/admin/titles",
    },
    {
      label: "Characters",
      value: stats.characters,
      icon: Users,
      color: "text-green-400",
      bg: "bg-green-500/10",
      link: "/admin/characters",
    },
    {
      label: "Powers",
      value: stats.powers,
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      link: "/admin/powers",
    },
    {
      label: "Weapons",
      value: stats.weapons,
      icon: Sword,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      link: "/admin/weapons",
    },
  ];

  return (
    <div className="space-y-8 text-white">
      <header>
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
          Overview
        </p>
        <h1 className="mt-2 text-3xl font-black md:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-3 text-gray-400">
          Manage your OMNIVERSE entertainment database.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.label}
              to={card.link}
              className="rounded-xl border border-white/10 bg-[#12121a] p-6 transition hover:border-purple-500/50"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-3 ${card.bg} ${card.color}`}>
                  <Icon size={24} />
                </div>
                <ArrowUpRight size={18} className="text-gray-500" />
              </div>

              <p className="mt-5 text-sm text-gray-400">{card.label}</p>
              <h2 className="mt-1 text-3xl font-black">{card.value}</h2>
            </Link>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#12121a]">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="text-xl font-bold">Recently Added Titles</h2>
            <p className="mt-1 text-sm text-gray-400">
              Latest records in your content collection
            </p>
          </div>

          <Link
            to="/admin/titles"
            className="text-sm font-semibold text-purple-400 hover:text-purple-300"
          >
            Manage Titles
          </Link>
        </div>

        {recentTitles.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No titles available.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentTitles.map((title) => (
              <div
                key={title.id}
                className="flex items-center gap-4 p-5 transition hover:bg-white/[0.02]"
              >
                <img
                  src={title.poster}
                  alt={title.name}
                  className="h-16 w-12 rounded object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">{title.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">
                    {title.type} • {title.year}
                  </p>
                </div>

                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                  {title.type}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-xl border border-white/10 bg-[#12121a] p-6">
        <div className="flex items-center gap-3">
          <Database className="text-purple-400" size={24} />
          <h2 className="text-xl font-bold">Database Information</h2>
        </div>

        <p className="mt-3 leading-7 text-gray-400">
          OMNIVERSE currently stores content in your browser's localStorage.
          Records persist on this browser unless the browser storage is cleared.
          This is suitable for a prototype, not a multi-user production website.
        </p>
      </section>
    </div>
  );
}
