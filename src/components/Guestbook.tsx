import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareHeart, Loader2, Send, Quote } from "lucide-react";
import { addGuestMessage, getGuestbook } from "../lib/api";
import type { GuestMessage } from "../types";
import Reveal from "./Reveal";

const SUGGESTIONS = ["Bonne chance ! 🍀", "Félicitations pour ce parcours 🎓", "Tu vas assurer 💪"];

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");

  async function load() {
    try {
      const { messages } = await getGuestbook();
      setMessages(messages);
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const t = text.trim();
    if (n.length < 2 || t.length < 2) {
      setError("Indiquez votre nom et un petit message.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const { message } = await addGuestMessage(n, t, website);
      setMessages((m) => [message, ...m]);
      setText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <section id="livre-or" className="relative mx-auto max-w-6xl px-5 py-24">
      <Reveal className="mb-12 text-center">
        <p className="eyebrow">Livre d'or</p>
        <h2 className="section-title mt-2">Laissez un petit mot</h2>
        <p className="mx-auto mt-3 max-w-lg muted">
          Vos encouragements comptent énormément — merci d'être là.
        </p>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* form */}
        <Reveal className="lg:col-span-2">
          <form onSubmit={submit} className="gradient-border h-full space-y-3 p-7" noValidate>
            <p className="flex items-center gap-2 font-display font-bold">
              <MessageSquareHeart size={18} className="text-gold-400" aria-hidden /> Votre message
            </p>
            {/* honeypot — keep empty */}
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
              <label htmlFor="gb-website">Ne pas remplir</label>
              <input
                id="gb-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
            <input
              className="input"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <textarea
              className="input min-h-[96px] resize-y"
              placeholder="Votre message d'encouragement…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={280}
            />
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setText(s)}
                  className="chip transition hover:scale-105"
                >
                  {s}
                </button>
              ))}
            </div>
            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}
            <button type="submit" disabled={status === "loading"} className="btn btn-primary w-full">
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Envoi…
                </>
              ) : (
                <>
                  <Send size={16} /> Publier mon message
                </>
              )}
            </button>
          </form>
        </Reveal>

        {/* messages */}
        <div className="lg:col-span-3">
          {messages.length === 0 ? (
            <div className="gradient-border grid h-full place-items-center p-10 text-center muted">
              Aucun message pour l'instant — soyez le premier à en laisser un.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.figure
                    key={`${m.date}-${i}`}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="gradient-border p-5"
                  >
                    <Quote size={18} className="text-cyanx-400" />
                    <blockquote className="mt-2 text-sm">{m.message}</blockquote>
                    <figcaption className="mt-3 font-display text-sm font-semibold">
                      — {m.name}
                    </figcaption>
                  </motion.figure>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
