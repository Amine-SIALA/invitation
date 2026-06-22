import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Users, CheckCircle2 } from "lucide-react";
import Background from "../components/Background";
import { getAttendees } from "../lib/api";
import type { Attendee } from "../types";

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function AttendancePage() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    getAttendees()
      .then((d) => setAttendees(d.attendees))
      .catch(() => setAttendees([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = [...attendees].sort((a, b) => a.number - b.number);
    if (!needle) return list;
    return list.filter((a) => a.name.toLowerCase().includes(needle));
  }, [attendees, q]);

  return (
    <>
      <Background />
      <div className="mx-auto min-h-screen max-w-4xl px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="btn btn-ghost mb-8 px-4 py-2 text-sm">
            <ArrowLeft size={16} /> Retour à l'invitation
          </Link>

          <div className="text-center">
            <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyanx-400 to-electric-600 text-white shadow-glow">
              <CheckCircle2 size={26} />
            </span>
            <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
              Merci pour votre <span className="text-gradient">confirmation</span>.
            </h1>
            <p className="mt-3 flex items-center justify-center gap-2 muted">
              <Users size={16} /> {attendees.length} participant·e·s confirmé·e·s à ce jour
            </p>
          </div>

          {/* search */}
          <div className="relative mx-auto mt-8 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 muted" />
            <input
              className="input pl-11"
              placeholder="Rechercher par nom…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Rechercher un participant"
            />
          </div>

          {/* table */}
          <div className="gradient-border mt-8 overflow-hidden p-1.5">
            <div className="overflow-x-auto rounded-[1rem]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide muted">
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Nom et prénom</th>
                    <th className="px-4 py-3 text-right">Confirmé le</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-10 text-center muted">
                        Chargement…
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-10 text-center muted">
                        {q ? "Aucun résultat." : "Aucune confirmation pour l'instant."}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((a) => (
                      <tr key={a.number} className="border-t border-white/5 transition hover:bg-[var(--hover)]">
                        <td className="t-accent px-4 py-3 font-mono">
                          {String(a.number).padStart(3, "0")}
                        </td>
                        <td className="max-w-[55vw] break-words px-4 py-3 font-medium">{a.name}</td>
                        <td className="px-4 py-3 text-right muted">{fmtDate(a.date)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
