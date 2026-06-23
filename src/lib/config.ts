// ============================================================
//  Single source of truth for the invitation.
//  Change anything here and it propagates across the whole site.
// ============================================================

export const EVENT = {
  /** Présentateurs (binôme) — affichés dans le hero et le pied de page. */
  presenters: [
    { name: "Kais ABBES", photo: "/kais.jpg" },
    { name: "Amine SIALA", photo: "/host.jpg" },
  ],
  presentersLabel: "Kais ABBES & Amine SIALA",

  /**
   * Date & heure de la soutenance (ISO local).
   * NOTE: l'énoncé indiquait « 25 juin 2025 » mais cette date est passée —
   * le compte à rebours a besoin d'une date future. Réglé sur 2026.
   * Modifier ICI au besoin (une seule ligne).
   */
  datetimeISO: "2026-06-25T16:00:00",
  durationMinutes: 60,

  dateLabel: "25 Juin 2026",
  timeLabel: "16:00",

  venue: "Faculté des Sciences de Sfax (FSS)",
  venueDetail: "Département Informatique — 2ᵉ étage",
  mapsQuery: "Faculté des Sciences de Sfax",

  eventType: "Soutenance de Projet de Fin d'Études",
  projectTitle: "Portail B2B MPBS — Lot 1",

  heartMessage: "Votre présence sera un honneur.",

  // attendance goal
  objective: 100,

  // social / sharing
  shareTitle: "Invitation à notre Soutenance de Projet de Fin d'Études",
  shareText:
    "Vous êtes cordialement invité·e à assister à la présentation finale de notre projet — FSS Sfax, 25 juin 2026 à 16h00.",
} as const;

/** Public site URL — set after first deploy; falls back to current origin. */
export const SITE_URL =
  typeof window !== "undefined" ? window.location.origin : "https://example.netlify.app";

export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  EVENT.mapsQuery
)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  EVENT.mapsQuery
)}`;

export const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  EVENT.mapsQuery
)}`;
