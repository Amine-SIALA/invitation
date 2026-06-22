import { useState } from "react";
import { Mail, Share2, Link as LinkIcon, Check } from "lucide-react";
import { EVENT, SITE_URL } from "../lib/config";
import Reveal from "./Reveal";

const text = encodeURIComponent(`${EVENT.shareTitle} — ${EVENT.shareText}`);
const url = encodeURIComponent(SITE_URL);

const TARGETS = [
  {
    label: "WhatsApp",
    href: `https://wa.me/?text=${text}%20${url}`,
    bg: "hover:bg-[#25D366]/20 hover:border-[#25D366]/60",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    bg: "hover:bg-[#1877F2]/20 hover:border-[#1877F2]/60",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    bg: "hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/60",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:?subject=${encodeURIComponent(EVENT.shareTitle)}&body=${text}%20${url}`,
    bg: "hover:bg-cyanx-400/20 hover:border-cyanx-400/60",
    icon: <Mail size={20} />,
  },
];

export default function SocialShare() {
  const [copied, setCopied] = useState(false);

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: EVENT.shareTitle, text: EVENT.shareText, url: SITE_URL });
        return;
      } catch {
        /* cancelled */
      }
    }
    await navigator.clipboard?.writeText(SITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="relative mx-auto max-w-4xl px-5 py-16">
      <Reveal>
        <div className="gradient-border flex flex-col items-center gap-5 p-8 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-cyanx-400 to-electric-600 text-white shadow-glow">
            <Share2 size={22} />
          </span>
          <div>
            <h2 className="font-display text-2xl font-bold">Partagez l'invitation</h2>
            <p className="mt-1 text-sm muted">Faites passer le mot autour de vous.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {TARGETS.map((t) => (
              <a
                key={t.label}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Partager via ${t.label}`}
                className={`grid h-12 w-12 place-items-center rounded-xl glass transition hover:scale-110 ${t.bg}`}
              >
                {t.icon}
              </a>
            ))}
            <button
              onClick={nativeShare}
              aria-label="Copier le lien"
              className="grid h-12 w-12 place-items-center rounded-xl glass transition hover:scale-110 hover:border-gold-400/60"
            >
              {copied ? <Check size={20} className="text-gold-400" /> : <LinkIcon size={20} />}
            </button>
          </div>
          {copied && (
            <p role="status" className="t-gold text-xs">
              Lien copié dans le presse-papiers ✦
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
