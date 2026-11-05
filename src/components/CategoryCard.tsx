
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
}

export default function CategoryCard({
  title,
  description,
  icon: Icon,
  href,
  color,
}: CategoryCardProps) {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141418] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-500/50"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
      >
        <Icon size={28} />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <ArrowUpRight
          size={20}
          className="text-gray-500 transition group-hover:text-purple-400"
        />
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-400">{description}</p>
    </a>
  );
}
