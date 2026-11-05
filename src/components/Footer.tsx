
import { Orbit, ArrowUp } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "Movies", href: "#movies" },
  { name: "Series", href: "#series" },
  { name: "Anime", href: "#anime" },
  { name: "Characters", href: "#characters" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0d0d10]">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <Orbit className="text-purple-500" size={28} />

              <span className="text-xl font-black">
                OMNI
                <span className="text-purple-500">VERSE</span>
              </span>
            </a>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
              Your ultimate destination for movies, series, anime,
              characters, powers, abilities, weapons, and fictional
              universes.
            </p>

            {/* Social Links */}
            <div className="mt-5 flex gap-4">

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-400 transition hover:text-purple-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.85 10.9.57.1.78-.25.78-.55v-2.1c-3.19.69-3.86-1.35-3.86-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.19c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 transition hover:text-purple-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.5"
                    fill="currentColor"
                  />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 transition hover:text-purple-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l7.3-8.4L1.8 2h6.5l4.4 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Explore
            </h3>

            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 transition hover:text-purple-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Information
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href="#about"
                className="text-sm text-gray-400 transition hover:text-purple-400"
              >
                About Us
              </a>

              <a
                href="#contact"
                className="text-sm text-gray-400 transition hover:text-purple-400"
              >
                Contact
              </a>

              <a
                href="#privacy"
                className="text-sm text-gray-400 transition hover:text-purple-400"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} OMNIVERSE. All rights reserved.
          </p>

          <a
            href="#home"
            aria-label="Back to top"
            className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-purple-400"
          >
            Back to top
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
