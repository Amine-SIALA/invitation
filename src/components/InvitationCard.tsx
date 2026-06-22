import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import { Download, GraduationCap, Calendar, Clock, MapPin, Check } from "lucide-react";
import { EVENT, SITE_URL } from "../lib/config";
import type { Attendee } from "../types";

export default function InvitationCard({ attendee }: { attendee: Attendee }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const num = String(attendee.number).padStart(3, "0");

  async function save() {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#070b1a",
      });
      const a = document.createElement("a");
      a.download = `invitation-${attendee.name.replace(/\s+/g, "-").toLowerCase()}.png`;
      a.href = dataUrl;
      a.click();
    } catch {
      /* ignore */
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* The pass */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl p-6"
        style={{
          background:
            "linear-gradient(150deg,#0b1224 0%,#111a33 55%,#0b1224 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* glow blobs */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyanx-400/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-gold-400/15 blur-2xl" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyanx-400 to-electric-600">
                <GraduationCap size={18} />
              </span>
              <span className="font-display text-sm font-bold">Event Pass</span>
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-sky2-300">
              #{num}
            </span>
          </div>

          <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sky2-300">Participant</p>
          <p className="mt-1 font-display text-2xl font-extrabold text-white">{attendee.name}</p>

          <p className="mt-4 text-[0.65rem] uppercase tracking-[0.3em] text-sky2-300">Événement</p>
          <p className="font-display text-base font-semibold text-white">{EVENT.eventType}</p>
          <p className="text-sm text-white/60">{EVENT.projectTitle}</p>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div className="min-w-0 space-y-2 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <Calendar size={14} className="text-cyanx-400" /> {EVENT.dateLabel}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-cyanx-400" /> {EVENT.timeLabel}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-cyanx-400" /> {EVENT.venue}
              </span>
            </div>
            <div className="rounded-xl bg-white p-2">
              <QRCodeCanvas value={SITE_URL} size={84} bgColor="#ffffff" fgColor="#0b1224" />
            </div>
          </div>

          <div className="my-5 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full" style={{ background: "var(--bg-1)" }} />
            <div className="h-px flex-1 border-t border-dashed border-white/20" />
            <span className="h-3 w-3 rounded-full" style={{ background: "var(--bg-1)" }} />
          </div>

          <p className="text-center text-sm italic text-white/70">
            « Nous serons ravis de vous accueillir, {attendee.name.split(" ")[0]}. »
          </p>
        </div>
      </div>

      <button onClick={save} disabled={saving} className="btn btn-gold">
        {saving ? <Check size={16} /> : <Download size={16} />}
        {saving ? "Enregistré" : "Enregistrer ma carte"}
      </button>
    </div>
  );
}
