import type {
  Attendee,
  AttendeesResponse,
  GuestMessage,
  GuestbookResponse,
} from "../types";

const BASE = "/.netlify/functions";

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.json())?.error ?? "";
    } catch {
      /* ignore */
    }
    throw new Error(detail || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function getAttendees(): Promise<AttendeesResponse> {
  return jsonFetch<AttendeesResponse>(`${BASE}/attendees`);
}

export function addAttendee(
  name: string,
  website = ""
): Promise<{ attendee: Attendee; count: number }> {
  return jsonFetch(`${BASE}/attendees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, website }),
  });
}

export function getGuestbook(): Promise<GuestbookResponse> {
  return jsonFetch<GuestbookResponse>(`${BASE}/guestbook`);
}

export function addGuestMessage(
  name: string,
  message: string,
  website = ""
): Promise<{ message: GuestMessage }> {
  return jsonFetch(`${BASE}/guestbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message, website }),
  });
}
