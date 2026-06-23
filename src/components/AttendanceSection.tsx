import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Users, Target, Trophy, UserPlus, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAttendees } from "../hooks/useAttendees";
import AnimatedNumber from "./AnimatedNumber";
import Reveal from "./Reveal";
import { useRSVP } from "./RSVPProvider";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.floor(h / 24);
  return `il y a ${d} j`;
}

export default function AttendanceSection() {
  const { count, objective, attendees, justJoined, refresh } = useAttendees();
  const { openRSVP, confirmedAt } = useRSVP();

  // refresh the counter immediately after a confirmation (from anywhere)
  useEffect(() => {
    if (confirmedAt) refresh();
  }, [confirmedAt, refresh]);

  const recent = [...attendees].sort((a, b) => b.number - a.number).slice(0, 5);
  const pct = Math.min(100, Math.round((count / objective) * 100));
  const exceeded = count > objective;

  return (
    <section id="confirmer" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal className="mb-12 text-center">
        <p className="eyebrow">Présence</p>
        <h2 className="section-title mt-2">Confirmez votre venue</h2>
        <p className="mx-auto mt-3 max-w-lg muted">
          Rejoignez celles et ceux qui ont déjà confirmé — votre nom apparaîtra dans la liste.
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Counter + progress */}
        <Reveal className="lg:col-span-3">
          <div className="gradient-border h-full p-7 shadow-glow-blue">
            <div className="flex items-center gap-4">
              <motion.span
                animate={justJoined ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.6 }}
                className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyanx-400 to-electric-600 text-white shadow-glow"
              >
                <Users size={28} />
                {justJoined && (
                  <span className="absolute inset-0 animate-pulseRing rounded-2xl border-2 border-cyanx-400" />
                )}
              </motion.span>
              <div role="status" aria-live="polite">
                <p className="font-display text-5xl font-extrabold leading-none text-gradient">
                  <AnimatedNumber value={count} />
                </p>
                <p className="mt-1 text-sm muted">
                  {count <= 1 ? "personne a confirmé" : "personnes ont confirmé leur présence"}
                </p>
              </div>
            </div>

            {/* progress */}
            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 muted">
                  <Target size={14} /> Objectif : {objective} participants
                </span>
                <span className="font-semibold">{pct}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg,#22d3ee,#2563eb 60%,#fde047)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              {exceeded && (
                <p role="status" className="t-gold mt-3 flex items-center gap-2 font-semibold">
                  <Trophy size={16} aria-hidden /> Objectif dépassé ! Merci à toutes et à tous.
                </p>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={openRSVP} className="btn btn-primary">
                <UserPlus size={17} aria-hidden /> Je serai présent·e
              </button>
              <Link to="/attendance" className="btn btn-ghost">
                Voir tous les participants
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Recent confirmations */}
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="gradient-border h-full p-7">
            <p className="mb-4 flex items-center gap-2 font-display font-bold">
              <Clock3 size={16} className="text-cyanx-400" /> Dernières confirmations
            </p>

            {recent.length === 0 ? (
              <p className="text-sm muted">
                Soyez la première personne à confirmer votre présence.
              </p>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence initial={false}>
                  {recent.map((a) => (
                    <motion.li
                      key={`${a.number}-${a.name}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-electric-500 to-cyanx-500 text-xs font-bold text-white">
                        {initials(a.name)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{a.name}</p>
                        <p className="text-xs muted">{timeAgo(a.date)}</p>
                      </div>
                      <span className="t-accent font-mono text-xs">
                        #{String(a.number).padStart(3, "0")}
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </Reveal>
      </div>

    </section>
  );
}
