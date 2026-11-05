
import {
  Play,
  Info,
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function HeroSection({
  title = "ENTER THE OMNIVERSE",
  subtitle = "Explore legendary movies, epic anime, unforgettable series, iconic characters, extraordinary powers, and limitless fictional universes — all in one place.",
  backgroundImage = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=80",
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[680px] items-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/30" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
            <Sparkles size={16} />

            Discover Your Next Universe
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-7xl">
            {title.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                className={
                  word === "OMNIVERSE"
                    ? "bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    : "text-white"
                }
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-300 sm:text-lg">
            {subtitle}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#trending"
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
            >
              <Play size={18} fill="currentColor" />
              Explore Now
            </a>

            <a
              href="#categories"
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold backdrop-blur-md transition hover:bg-white/10"
            >
              <Info size={18} />
              Discover More
            </a>
          </div>

          {/* Categories */}
          <div className="mt-10 flex flex-wrap gap-4 text-sm text-gray-400">
            <span>Movies</span>
            <span>•</span>
            <span>TV Series</span>
            <span>•</span>
            <span>Anime</span>
            <span>•</span>
            <span>Character Encyclopedia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
