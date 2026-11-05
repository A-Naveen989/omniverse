import { Link } from "react-router-dom";
import { Users } from "lucide-react";

import ContentListing from "../components/ContentListing";
import { getAnime } from "../data/adminStorage";

export default function Anime() {
  return (
    <>
      <div className="bg-[var(--background)] px-4 pt-6 text-[var(--text-primary)] md:px-8">
        <div className="mx-auto flex max-w-7xl justify-end">
          <Link
            to="/anime/characters"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold transition hover:border-purple-500 hover:text-purple-400"
          >
            <Users size={17} /> Browse Anime Characters
          </Link>
        </div>
      </div>
      <ContentListing
        titles={getAnime()}
        type="anime"
        heading="Anime"
        description="Explore animated movies, anime series, mini-series, and animated videos from your collection."
      />
    </>
  );
}
