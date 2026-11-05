
import {
  ArrowUpRight,
  Shield,
} from "lucide-react";

export interface CharacterCardProps {
  id: string;
  name: string;
  image: string;
  title: string;
  role: "Main" | "Supporting" | "Antagonist";
  species: string;
  affiliation: string;
  onClick?: () => void;
}

export default function CharacterCard({
  id,
  name,
  image,
  title,
  role,
  species,
  affiliation,
  onClick,
}: CharacterCardProps) {
  const roleColors = {
    Main: "bg-purple-500/15 text-purple-400",
    Supporting: "bg-blue-500/15 text-blue-400",
    Antagonist: "bg-red-500/15 text-red-400",
  };

  return (
    <article
      data-character-id={id}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#141418] transition duration-300 hover:-translate-y-1 hover:border-purple-500/40"
    >
      {/* Character Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#18181b]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent" />

        {/* Role */}
        <span
          className={`absolute left-3 top-3 rounded-md px-3 py-1 text-xs font-semibold ${roleColors[role]}`}
        >
          {role}
        </span>

        {/* Arrow */}
        <div className="absolute bottom-4 right-4 rounded-full bg-purple-600 p-2 opacity-0 transition group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </div>
      </div>

      {/* Character Information */}
      <div className="p-4">
        <h3 className="text-lg font-bold transition group-hover:text-purple-400">
          {name}
        </h3>

        <p className="mt-1 truncate text-sm text-gray-400">
          {title}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield size={14} className="text-purple-400" />
            <span>{species}</span>
          </div>

          <p className="truncate text-xs text-gray-500">
            Affiliation: {affiliation}
          </p>
        </div>
      </div>
    </article>
  );
}
