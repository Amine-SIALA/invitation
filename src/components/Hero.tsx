import { motion } from "framer-motion";
import { CalendarCheck, ChevronDown, Sparkles, User } from "lucide-react";
import { EVENT } from "../lib/config";
import { useTyping } from "../hooks/useTyping";

export default function Hero() {
  const typed = useTyping([
    "Portail B2B MPBS — Lot 1",
    "Drupal 11 · Next.js · SAGE X3",
    "Un projet, une vision, une démo.",
  ]);

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center justify-center px-5 pt-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex justify-center"
        >
          <span className="chip">
            <Sparkles size={13} className="text-gold-400" aria-hidden />
            {EVENT.eventType} · {EVENT.dateLabel}
          </span>
        </motion.div>

        {/* photo placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mb-7 grid h-28 w-28 place-items-center rounded-full"
        >
          <div className="relative grid h-28 w-28 place-items-center rounded-full">
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyanx-400 via-electric-500 to-gold-400 opacity-90 blur-[2px]" />
            <span className="absolute inset-[3px] rounded-full" style={{ background: "var(--bg-1)" }} />
            <span className="absolute inset-0 animate-pulseRing rounded-full border border-cyanx-400/50" />
            <User size={42} className="relative z-10 t-accent" aria-hidden />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="eyebrow mb-3"
        >
          Cher·e invité·e ✦ vous êtes convié·e
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-3xl font-extrabold leading-[1.08] [text-wrap:balance] break-words sm:text-6xl"
        >
          Invitation à ma <span className="text-gradient">Soutenance</span>
          <br className="hidden sm:block" /> de Projet de Fin d'Études
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-5 max-w-2xl text-base muted sm:text-lg"
        >
          Vous êtes cordialement invité·e à assister à la présentation finale de mon projet.
        </motion.p>

        {/* typing line */}
        <div className="mt-4 flex h-7 items-center justify-center font-display text-lg font-semibold">
          <span className="text-gradient">{typed}</span>
          <span className="ml-0.5 inline-block h-5 w-[2px] animate-pulse bg-cyanx-400" />
        </div>

        {/* host */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] muted">Présenté par</p>
          <p className="mt-1 font-display text-2xl font-bold">{EVENT.host}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#confirmer" className="btn btn-primary">
            <CalendarCheck size={17} aria-hidden /> Confirmer ma présence
          </a>
          <a href="#details" className="btn btn-ghost">
            Voir les détails <ChevronDown size={16} aria-hidden />
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#details"
        aria-label="Défiler"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
      >
        <ChevronDown />
      </motion.a>
    </section>
  );
}
