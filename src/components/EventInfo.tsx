import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, GraduationCap, Heart } from "lucide-react";
import { EVENT } from "../lib/config";
import Reveal from "./Reveal";

const CARDS = [
  {
    icon: Calendar,
    label: "Date",
    value: EVENT.dateLabel,
    accent: "from-cyanx-400 to-electric-500",
    emoji: "📅",
  },
  {
    icon: Clock,
    label: "Heure",
    value: EVENT.timeLabel,
    accent: "from-electric-400 to-electric-600",
    emoji: "🕘",
  },
  {
    icon: MapPin,
    label: "Lieu",
    value: EVENT.venue,
    sub: EVENT.venueDetail,
    accent: "from-sky2-300 to-cyanx-500",
    emoji: "📍",
  },
  {
    icon: GraduationCap,
    label: "Événement",
    value: EVENT.eventType,
    accent: "from-gold-300 to-gold-500",
    emoji: "🎓",
  },
] as const;

export default function EventInfo() {
  return (
    <section id="details" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal className="mb-12 text-center">
        <p className="eyebrow">Informations</p>
        <h2 className="section-title mt-2">L'essentiel de l'événement</h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.08}>
            <motion.article
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="gradient-border group h-full p-6"
            >
              <div className="mb-4 flex items-center">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${c.accent} text-white shadow-glow transition group-hover:scale-110`}
                >
                  <c.icon size={22} />
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] muted">{c.label}</p>
              <p className="mt-1 font-display text-lg font-bold leading-snug">{c.value}</p>
              {"sub" in c && c.sub && <p className="mt-1 text-sm muted">{c.sub}</p>}
            </motion.article>
          </Reveal>
        ))}
      </div>

      {/* message card */}
      <Reveal delay={0.1} className="mt-6">
        <div className="gradient-border flex items-center justify-center gap-3 p-7 text-center">
          <Heart className="hidden text-gold-400 sm:block" aria-hidden />
          <p className="font-display text-xl font-semibold sm:text-2xl">
            <span className="text-gradient">«&nbsp;{EVENT.heartMessage}&nbsp;»</span>
          </p>
          <Heart className="hidden text-gold-400 sm:block" aria-hidden />
        </div>
      </Reveal>
    </section>
  );
}
