import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import movieDetailsData from "../data/omniverse-movie-details-enriched.json";
import { getCharacterAppearance } from "../data/characterData";
import FavoriteButton from "../components/FavoriteButton";
import "./MovieDetailsPage.css";

type CastCredit = {
  actor: string;
  characterName: string | null;
  characterId?: string;
  roleType?: "Main" | "Supporting" | "Antagonist" | string;
  sourceNote?: string;
};

type CrewCredit = {
  name: string;
  job: string;
};

type CharacterProfile = {
  id: string;
  name: string;
  role?: string;
  biography?: string;
  personality?: string;
  gender?: string;
  affiliations?: string[];
  relationships?: Array<{ name: string; relation: string }>;
};

type SourceRecord = {
  publisher?: string;
  url: string;
  supports?: string;
};

type MovieDetail = {
  titleId: string;
  title: string;
  originalTitle?: string;
  year?: number;
  releaseDate?: string;
  runtimeMinutes?: number;
  genres?: string;
  imdbRating?: number;
  userRating?: number;
  imdbUrl?: string;
  directors: string[];
  cast: CastCredit[];
  characters: CharacterProfile[];
  crew: CrewCredit[];
  sources: SourceRecord[];
  researchStatus: string;
  researchNotes: string[];
};

const allMovies = (movieDetailsData as { movies: MovieDetail[] }).movies;

function formatRuntime(minutes?: number) {
  if (!minutes || !Number.isFinite(minutes)) return "Runtime unavailable";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  return hours ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
}

function roleClass(role?: string) {
  if (!role) return "neutral";
  return role.toLowerCase().replace(/[^a-z]/g, "");
}

export default function MovieDetailsPage() {
  const { titleId } = useParams<{ titleId: string }>();

  const movie = useMemo(
    () => allMovies.find((item) => item.titleId === titleId),
    [titleId]
  );

  if (!movie) {
    return (
      <main className="movie-details-page">
        <div className="movie-details-empty">
          <p className="movie-details-eyebrow">OMNIVERSE / MOVIES</p>
          <h1>Movie not found</h1>
          <p>The movie ID in this URL does not match a record in the local dataset.</p>
          <Link to="/movies" className="movie-details-back">
            ← Back to movies
          </Link>
        </div>
      </main>
    );
  }

  const hasResearchedCast = movie.cast.length > 0;
  const hasProfiles = movie.characters.length > 0;

  return (
    <main className="movie-details-page">
      <div className="movie-details-shell">
        <nav className="movie-details-topbar" aria-label="Breadcrumb">
          <Link to="/movies" className="movie-details-back">
            ← All movies
          </Link>
          <span>OMNIVERSE</span>
        </nav>

        <section className="movie-details-hero">
          <p className="movie-details-eyebrow">MOVIE PROFILE</p>
          <h1>{movie.title}</h1>
          <div className="movie-details-meta">
            {movie.year && <span>{movie.year}</span>}
            <span>{formatRuntime(movie.runtimeMinutes)}</span>
            {movie.genres && <span>{movie.genres}</span>}
            {typeof movie.imdbRating === "number" && (
              <span className="movie-details-rating">★ {movie.imdbRating.toFixed(1)} IMDb</span>
            )}
            {typeof movie.userRating === "number" && (
              <span>Your rating: {movie.userRating}/10</span>
            )}
          </div>
          <div className="movie-details-actions">
            <FavoriteButton id={movie.titleId} itemType="movie" />
            {movie.imdbUrl && (
              <a href={movie.imdbUrl} target="_blank" rel="noreferrer">
                View on IMDb ↗
              </a>
            )}
          </div>
        </section>

        {/* Cast and verified character links */}
        <section className="movie-details-section">
          <div className="movie-details-section-heading">
            <div>
              <p className="movie-details-eyebrow">PEOPLE</p>
              <h2>Cast</h2>
            </div>
            <span className="movie-details-count">
              {hasResearchedCast ? movie.cast.length : "—"}
            </span>
          </div>

          {hasResearchedCast ? (
            <div className="movie-details-grid">
              {movie.cast.map((person, index) => (
                <article className="movie-person-card" key={`${person.actor}-${index}`}>
                  <h3>{person.actor}</h3>
                  <p className="movie-person-character">
                    {person.characterName ? `as ${person.characterName}` : "Character not listed"}
                  </p>
                  {person.roleType && (
                    <span className={`movie-role-badge ${roleClass(person.roleType)}`}>
                      {person.roleType}
                    </span>
                  )}
                  {person.characterId && (
                    <Link
                      to={`/characters/${person.characterId}`}
                      className="movie-person-profile-link"
                    >
                      Open character profile <ArrowUpRight size={14} />
                    </Link>
                  )}
                  {person.sourceNote && <p className="movie-person-note">{person.sourceNote}</p>}
                </article>
              ))}
            </div>
          ) : (
            <div className="movie-details-notice">
              <strong>Actor-to-character credits are not available yet.</strong>
              <p>
                This dataset may contain character profiles below, but it does not currently
                confirm which actors portray them. The page deliberately does not guess.
              </p>
            </div>
          )}
        </section>

        {/* Production team */}
        <section className="movie-details-section">
          <div className="movie-details-section-heading">
            <div>
              <p className="movie-details-eyebrow">PRODUCTION</p>
              <h2>Crew</h2>
            </div>
            <span className="movie-details-count">{movie.crew.length}</span>
          </div>
          {movie.crew.length ? (
            <div className="movie-crew-grid">
              {movie.crew.map((person, index) => (
                <article className="movie-crew-row" key={`${person.name}-${person.job}-${index}`}>
                  <span>{person.job}</span>
                  <strong>{person.name}</strong>
                </article>
              ))}
            </div>
          ) : (
            <div className="movie-details-notice">
              Crew information has not been added to this movie record.
            </div>
          )}
        </section>

        {/* Character cards open canonical character profiles */}
        {hasProfiles && (
          <section className="movie-details-section">
            <div className="movie-details-section-heading">
              <div>
                <p className="movie-details-eyebrow">STORY DATABASE</p>
                <h2>Character Profiles</h2>
              </div>
              <span className="movie-details-count">{movie.characters.length}</span>
            </div>
            <div className="movie-character-list">
              {movie.characters.map((character) => {
                const appearance = getCharacterAppearance(character.id, movie.titleId);
                const role = appearance?.role ?? character.role;

                return (
                  <Link
                    to={`/characters/${character.id}`}
                    className="movie-character-card movie-character-link"
                    key={character.id}
                  >
                    <div className="movie-character-title">
                      <h3>{character.name}</h3>
                      {role && (
                        <span className={`movie-role-badge ${roleClass(role)}`}>
                          {role}
                        </span>
                      )}
                    </div>
                    {character.biography && <p>{character.biography}</p>}
                    {character.personality && (
                      <p><strong>Personality:</strong> {character.personality}</p>
                    )}
                    {!!character.affiliations?.length && (
                      <p><strong>Affiliations:</strong> {character.affiliations.join(", ")}</p>
                    )}
                    {!!character.relationships?.length && (
                      <p>
                        <strong>Relationships:</strong>{" "}
                        {character.relationships
                          .map((relationship) => `${relationship.name} (${relationship.relation})`)
                          .join(", ")}
                      </p>
                    )}
                    <span className="movie-character-profile-cta">
                      View full character profile <ArrowUpRight size={14} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {!!movie.researchNotes.length && (
          <section className="movie-details-section movie-details-research">
            <p className="movie-details-eyebrow">DATA NOTES</p>
            <ul>
              {movie.researchNotes.map((note, index) => <li key={index}>{note}</li>)}
            </ul>
          </section>
        )}

        {!!movie.sources.length && (
          <section className="movie-details-section movie-details-sources">
            <p className="movie-details-eyebrow">REFERENCES</p>
            <h2>Sources</h2>
            <ul>
              {movie.sources.map((source, index) => (
                <li key={`${source.url}-${index}`}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.publisher || "Source"} ↗
                  </a>
                  {source.supports && <span>{source.supports}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
