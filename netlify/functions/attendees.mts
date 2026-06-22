import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

interface Stored {
  name: string;
  date: string;
}
interface Attendee extends Stored {
  number: number;
}

const PREFIX = "a/";
const OBJECTIVE = 100;
const MAX_ENTRIES = 2000;

// control chars, zero-width and bidi-override characters
// eslint-disable-next-line no-control-regex
const UNSAFE = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;

/**
 * A persistent GLOBAL store so the confirmed list survives across redeploys
 * and every visitor sees prior confirmations. Only true PR/branch previews are
 * namespaced apart so they can't pollute the live production list; production
 * and unknown contexts use the canonical store. Each attendee lives under its
 * own key, so concurrent writes never overwrite one another.
 */
function store(context: Context | undefined) {
  const ctx = context?.deploy?.context;
  const isPreview = ctx === "deploy-preview" || ctx === "branch-deploy";
  const name = isPreview ? `soutenance-attendees-${ctx}` : "soutenance-attendees";
  return getStore({ name, consistency: "strong" });
}

function clean(input: unknown, max: number) {
  const s = String(input ?? "").replace(UNSAFE, "").replace(/\s+/g, " ").trim();
  return Array.from(s).slice(0, max).join(""); // code-point safe truncation
}

async function readAll(s: ReturnType<typeof store>): Promise<Attendee[]> {
  const { blobs } = await s.list({ prefix: PREFIX });
  const records = await Promise.all(
    blobs.map((b) => s.get(b.key, { type: "json" }) as Promise<Stored | null>)
  );
  return records
    .filter((r): r is Stored => !!r && typeof r.name === "string")
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
    .map((r, i) => ({ name: r.name, date: r.date, number: i + 1 }));
}

export default async (req: Request, context: Context) => {
  const s = store(context);

  if (req.method === "GET") {
    const attendees = await readAll(s);
    return Response.json({ count: attendees.length, objective: OBJECTIVE, attendees });
  }

  if (req.method === "POST") {
    let body: { name?: unknown; website?: unknown };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Corps de requête invalide." }, { status: 400 });
    }

    // honeypot: bots fill hidden fields
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return Response.json({ error: "Rejeté." }, { status: 400 });
    }

    const name = clean(body.name, 80);
    if (name.length < 3) {
      return Response.json({ error: "Merci d'indiquer votre nom complet." }, { status: 400 });
    }

    const { blobs } = await s.list({ prefix: PREFIX });
    if (blobs.length >= MAX_ENTRIES) {
      return Response.json({ error: "La liste est complète." }, { status: 429 });
    }

    const date = new Date().toISOString();
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    await s.setJSON(`${PREFIX}${id}`, { name, date } satisfies Stored);

    const count = blobs.length + 1;
    return Response.json({ attendee: { name, number: count, date }, count });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
