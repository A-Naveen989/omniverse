import { useState } from "react";

type ImageLoading = "eager" | "lazy";

export interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackLabel?: string;
  fallbackClassName?: string;
  loading?: ImageLoading;
  hideWhenUnavailable?: boolean;
}

function getInitials(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Renders a remote or local image and replaces missing/broken sources with a
 * deliberate OMNIVERSE fallback instead of a browser broken-image icon.
 */
export default function ImageWithFallback({
  src,
  alt,
  className = "h-full w-full object-cover",
  containerClassName = "relative h-full w-full overflow-hidden",
  fallbackLabel,
  fallbackClassName = "",
  loading = "lazy",
  hideWhenUnavailable = false,
}: ImageWithFallbackProps) {
  const normalizedSource = typeof src === "string" ? src.trim() : "";
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const available = Boolean(normalizedSource) && failedSource !== normalizedSource;

  if (!available && hideWhenUnavailable) {
    return null;
  }

  return (
    <div className={containerClassName}>
      {available ? (
        <img
          key={normalizedSource}
          src={normalizedSource}
          alt={alt}
          loading={loading}
          decoding="async"
          className={className}
          onError={() => setFailedSource(normalizedSource)}
        />
      ) : (
        <div
          role="img"
          aria-label={`${alt || fallbackLabel || "Image"} unavailable`}
          className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-purple-950/80 to-zinc-900 p-3 text-center ${fallbackClassName}`}
        >
          <span className="text-3xl font-black tracking-wide text-purple-200/90">
            {getInitials(fallbackLabel || alt) || "OV"}
          </span>
          <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.24em] text-zinc-400">
            OMNIVERSE
          </span>
          <span className="mt-1 text-[10px] text-zinc-500">Image unavailable</span>
        </div>
      )}
    </div>
  );
}
