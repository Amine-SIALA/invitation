import { QRCodeCanvas } from "qrcode.react";
import { Github, Linkedin, Mail, GraduationCap, Heart } from "lucide-react";
import { EVENT, SITE_URL } from "../lib/config";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-5 py-14">
      {/* tiny floating particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-6 h-2 w-2 rounded-full bg-cyanx-400/50 animate-float" />
        <div className="absolute right-[18%] top-10 h-1.5 w-1.5 rounded-full bg-gold-400/50 animate-floatSlow" />
        <div className="absolute left-[42%] bottom-8 h-1.5 w-1.5 rounded-full bg-electric-400/50 animate-float" />
        <div className="absolute right-[34%] bottom-12 h-2 w-2 rounded-full bg-sky2-300/50 animate-floatSlow" />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyanx-400 to-electric-600 text-white shadow-glow">
            <GraduationCap size={18} />
          </span>
          <span className="text-gradient">Soutenance PFE 2026</span>
        </div>

        <div className="rounded-2xl bg-white p-2.5">
          <QRCodeCanvas value={SITE_URL} size={92} bgColor="#ffffff" fgColor="#0b1224" />
        </div>
        <p className="-mt-3 text-xs muted">Scannez pour rouvrir l'invitation</p>

        <p className="max-w-md muted">
          {EVENT.presentersLabel} — merci infiniment pour votre visite et votre présence à nos côtés.
        </p>

        <div className="flex items-center gap-3">
          {[
            { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
            { icon: <Github size={18} />, href: "#", label: "GitHub" },
            { icon: <Mail size={18} />, href: "#", label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full glass transition hover:scale-110 hover:border-cyanx-400/60"
            >
              {s.icon}
            </a>
          ))}
        </div>

        <p className="flex items-center gap-1.5 text-xs muted">
          Conçu avec <Heart size={12} className="text-gold-400" /> pour un moment inoubliable.
        </p>
      </div>
    </footer>
  );
}
