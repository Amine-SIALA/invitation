import { useEffect, useState } from "react";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function compute(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

export function useCountdown(datetimeISO: string): TimeLeft {
  const target = new Date(datetimeISO).getTime();
  const [time, setTime] = useState<TimeLeft>(() => compute(target));

  useEffect(() => {
    const id = setInterval(() => setTime(compute(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}
