import { EVENT } from "./config";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function stamp(d: Date) {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

/** Build + trigger download of an .ics calendar invite. */
export function downloadICS() {
  const start = new Date(EVENT.datetimeISO);
  const end = new Date(start.getTime() + EVENT.durationMinutes * 60000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Soutenance PFE//Invitation//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${stamp(start)}-pfe-soutenance@invitation`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${EVENT.eventType} — ${EVENT.presentersLabel}`,
    `DESCRIPTION:${EVENT.projectTitle}. ${EVENT.shareText}`,
    `LOCATION:${EVENT.venue} — ${EVENT.venueDetail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "soutenance-pfe.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
