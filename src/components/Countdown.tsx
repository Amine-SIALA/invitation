import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, PartyPopper } from "lucide-react";
import { EVENT } from "../lib/config";
import { useCountdown } from "../hooks/useCountdown";
import { downloadICS } from "../lib/ics";
import Reveal from "./Reveal";

function Unit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="gradient-border flex min-w-[74px] flex-col items-center px-3 py-4 shadow-glow-blue sm:min-w-[110px] sm:px-6 sm:py-6">
      <div className="relative h-[1.1em] overflow-hidden font-display text-4xl font-extrabold tabular-nums sm:text-6xl">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block text-gradient"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] muted sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const t = useCountdown(EVENT.datetimeISO);

  return (
    <section id="countdown" className="relative mx-auto max-w-5xl px-5 py-24 text-center">
      <Reveal className="mb-10">
        <p className="eyebrow">Compte à rebours</p>
        <h2 className="section-title mt-2">Le grand jour approche</h2>
        <p className="mx-auto mt-3 max-w-md muted">
          Rendez-vous le {EVENT.dateLabel} à {EVENT.timeLabel}.
        </p>
      </Reveal>

      {t.done ? (
        <Reveal>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="gradient-border mx-auto max-w-xl p-6 shadow-glow-gold sm:p-10"
          >
            <motion.div
              animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-3 flex justify-center text-gold-400"
            >
              <PartyPopper size={48} aria-hidden />
            </motion.div>
            <p className="font-display text-3xl font-extrabold text-gradient [text-wrap:balance] break-words">
              La soutenance a commencé !
            </p>
            <p className="mt-2 muted">Merci d'être avec nous pour ce moment 🎉</p>
          </motion.div>
        </Reveal>
      ) : (
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <Unit value={t.days} label="Jours" />
            <span className="hidden font-display text-4xl text-cyanx-400/60 sm:block">:</span>
            <Unit value={t.hours} label="Heures" />
            <span className="hidden font-display text-4xl text-cyanx-400/60 sm:block">:</span>
            <Unit value={t.minutes} label="Minutes" />
            <span className="hidden font-display text-4xl text-cyanx-400/60 sm:block">:</span>
            <Unit value={t.seconds} label="Secondes" />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.1} className="mt-9">
        <button onClick={() => downloadICS()} className="btn btn-gold">
          <CalendarPlus size={17} /> Ajouter à mon calendrier
        </button>
      </Reveal>
    </section>
  );
}
