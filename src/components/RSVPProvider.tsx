import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { celebrate } from "../lib/confetti";
import RSVPModal from "./RSVPModal";
import type { Attendee } from "../types";

interface RSVPContextValue {
  /** Open the "confirmer ma présence" dialog from anywhere. */
  openRSVP: () => void;
  /** Bumps whenever a confirmation succeeds — consumers refresh on change. */
  confirmedAt: number;
}

const RSVPContext = createContext<RSVPContextValue | null>(null);

export function useRSVP(): RSVPContextValue {
  const ctx = useContext(RSVPContext);
  if (!ctx) throw new Error("useRSVP must be used within <RSVPProvider>");
  return ctx;
}

export default function RSVPProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [confirmedAt, setConfirmedAt] = useState(0);

  const openRSVP = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const onConfirmed = useCallback((_a: Attendee) => {
    celebrate();
    setConfirmedAt(Date.now());
  }, []);

  return (
    <RSVPContext.Provider value={{ openRSVP, confirmedAt }}>
      {children}
      <RSVPModal open={open} onClose={close} onConfirmed={onConfirmed} />
    </RSVPContext.Provider>
  );
}
