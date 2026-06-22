import { useCallback, useEffect, useRef, useState } from "react";
import { getAttendees } from "../lib/api";
import type { Attendee } from "../types";

interface State {
  count: number;
  objective: number;
  attendees: Attendee[];
  loading: boolean;
  error: string | null;
}

/**
 * Polls the attendees endpoint so every visitor sees who confirmed before them.
 * `bump` lets the UI flag a fresh arrival (for the pulse animation).
 */
export function useAttendees(pollMs = 12000) {
  const [state, setState] = useState<State>({
    count: 0,
    objective: 100,
    attendees: [],
    loading: true,
    error: null,
  });
  const [justJoined, setJustJoined] = useState(false);
  const prevCount = useRef(0);
  const pulseTimer = useRef<ReturnType<typeof setTimeout>>();

  const refresh = useCallback(async () => {
    try {
      const data = await getAttendees();
      setState((s) => ({
        ...s,
        count: data.count,
        objective: data.objective,
        attendees: data.attendees,
        loading: false,
        error: null,
      }));
      if (data.count > prevCount.current && prevCount.current !== 0) {
        setJustJoined(true);
        clearTimeout(pulseTimer.current);
        pulseTimer.current = setTimeout(() => setJustJoined(false), 2400);
      }
      prevCount.current = data.count;
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        error: e instanceof Error ? e.message : "Erreur",
      }));
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, pollMs);
    return () => {
      clearInterval(id);
      clearTimeout(pulseTimer.current);
    };
  }, [refresh, pollMs]);

  return { ...state, justJoined, refresh };
}
