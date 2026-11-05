import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTitles } from "../data/adminStorage";

/**
 * Compatibility route for older `/title/:id` links. The actual details pages
 * live under type-specific routes so all pages use the active catalogue.
 */
export default function TitleDetails() {
  const { id } = useParams<{ id: string }>();
  const title = getTitles().find((item) => item.id === id);

  if (title) {
    const destination =
      title.type === "movie"
        ? `/movies/${title.id}`
        : title.type === "series"
          ? `/series/${title.id}`
          : `/anime/${title.id}`;
    return <Navigate to={destination} replace />;
  }

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[var(--background)] px-6 text-center text-[var(--text-primary)]">
      <h1 className="text-3xl font-black">Title Not Found</h1>
      <p className="mt-3 max-w-lg text-[var(--text-secondary)]">
        This title ID does not exist in the active OMNIVERSE catalogue.
      </p>
      <Link to="/movies" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700">
        <ArrowLeft size={18} /> Browse titles
      </Link>
    </main>
  );
}
