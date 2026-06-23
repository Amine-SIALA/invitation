import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, GraduationCap } from "lucide-react";
import { useRSVP } from "./RSVPProvider";

const LINKS = [
  { href: "#details", label: "Détails" },
  { href: "#countdown", label: "Compte à rebours" },
  { href: "#lieu", label: "Lieu" },
  { href: "#confirmer", label: "Confirmer" },
  { href: "#livre-or", label: "Livre d'or" },
];

interface Props {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: Props) {
  const { openRSVP } = useRSVP();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-4 flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 xl:mx-auto ${
          scrolled ? "glass shadow-glow-blue" : ""
        }`}
      >
        <a href="#hero" className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyanx-400 to-electric-600 text-white shadow-glow">
            <GraduationCap size={18} />
          </span>
          <span className="hidden text-gradient sm:block">Soutenance PFE</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm muted transition hover:bg-[var(--hover)] hover:text-[var(--text)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
            className="grid h-9 w-9 place-items-center rounded-full glass transition hover:scale-105"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            onClick={openRSVP}
            className="btn btn-primary hidden px-4 py-2 text-xs sm:inline-flex"
          >
            Confirmer ma présence
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-9 w-9 place-items-center rounded-full glass lg:hidden"
          >
            {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="mx-4 mt-2 grid max-h-[calc(100svh-5rem)] gap-1 overflow-y-auto rounded-2xl glass p-3 lg:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 text-sm muted transition hover:bg-[var(--hover)]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
