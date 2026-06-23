import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, PartyPopper, UserCheck, X } from "lucide-react";
import { addAttendee } from "../lib/api";
import type { Attendee } from "../types";
import InvitationCard from "./InvitationCard";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirmed: (a: Attendee) => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function RSVPModal({ open, onClose, onConfirmed }: Props) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [attendee, setAttendee] = useState<Attendee | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // reset on open + remember the element to restore focus to
  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement as HTMLElement | null;
      setName("");
      setWebsite("");
      setStatus("idle");
      setError("");
      setAttendee(null);
    } else if (openerRef.current) {
      openerRef.current.focus?.();
    }
  }, [open]);

  // move focus into the success view when it appears
  useEffect(() => {
    if (status === "done") successRef.current?.focus();
  }, [status]);

  // Escape to close + focus trap (Tab cycles inside the dialog)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const cleanName = name.trim().replace(/\s+/g, " ");
    if (cleanName.length < 3) {
      setError("Merci d'indiquer votre nom complet (3 caractères min.).");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const { attendee: a } = await addAttendee(cleanName, website);
      setAttendee(a);
      setStatus("done");
      onConfirmed(a);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={status === "done" ? "Présence confirmée" : "Confirmer votre présence"}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden />

          <motion.div
            ref={panelRef}
            className="relative w-full max-w-md"
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            <div className="gradient-border max-h-[88vh] overflow-y-auto p-6">
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full glass transition hover:scale-110"
              >
                <X size={16} aria-hidden />
              </button>

              {status !== "done" ? (
                <>
                  <div className="mb-4 flex flex-col items-center text-center">
                    <span className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyanx-400 to-electric-600 text-white shadow-glow">
                      <UserCheck size={26} aria-hidden />
                    </span>
                    <h3 className="font-display text-2xl font-bold">Je serai présent·e</h3>
                    <p className="mt-1 text-sm muted">
                      Indiquez votre nom pour générer votre carte d'invitation personnalisée.
                    </p>
                  </div>

                  <form onSubmit={submit} className="space-y-3" noValidate>
                    {/* honeypot — visually hidden, must stay empty */}
                    <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
                      <label htmlFor="rsvp-website">Ne pas remplir</label>
                      <input
                        id="rsvp-website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="rsvp-name" className="mb-1.5 block text-xs uppercase tracking-wide muted">
                        Nom et prénom
                      </label>
                      <input
                        id="rsvp-name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom et prénom"
                        className="input"
                        autoComplete="name"
                        aria-invalid={!!error}
                        aria-describedby={error ? "rsvp-error" : undefined}
                      />
                    </div>

                    {error && (
                      <p id="rsvp-error" role="alert" className="text-sm text-red-400">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn btn-primary w-full"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={17} className="animate-spin" aria-hidden /> Enregistrement…
                        </>
                      ) : (
                        <>Confirmer ma présence</>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                attendee && (
                  <div
                    className="text-center outline-none"
                    ref={successRef}
                    tabIndex={-1}
                    role="status"
                    aria-live="polite"
                  >
                    <div className="mb-3 flex items-center justify-center gap-2 text-gold-400">
                      <PartyPopper aria-hidden /> <span className="font-display text-xl font-bold">Merci !</span>{" "}
                      <PartyPopper aria-hidden />
                    </div>
                    <p className="mb-5 text-sm muted">
                      Votre présence est confirmée. Voici votre carte — Participant #
                      {String(attendee.number).padStart(3, "0")}.
                    </p>
                    <InvitationCard attendee={attendee} />
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
