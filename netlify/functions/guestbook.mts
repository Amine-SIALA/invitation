import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

interface GuestMessage {
  name: string;
  message: string;
  date: string;
}

const PREFIX = "m/";
const MAX_ENTRIES = 2000;

// control chars, zero-width and bidi-override characters
// eslint-disable-next-line no-control-regex
const UNSAFE = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;

function store(context: Context | undefined) {
  const ctx = context?.deploy?.context;
  const isPreview = ctx === "deploy-preview" || ctx === "branch-deploy";
  const name = isPreview ? `soutenance-guestbook-${ctx}` : "soutenance-guestbook";
  return getStore({ name, consistency: "strong" });
}

function clean(input: unknown, max: number) {
  const s = String(input ?? "").replace(UNSAFE, "").replace(/[^\S\n]+/g, " ").trim();
  return Array.from(s).slice(0, max).join(""); // code-point safe truncation
}

async function readAll(s: ReturnType<typeof store>): Promise<GuestMessage[]> {
  const { blobs } = await s.list({ prefix: PREFIX });
  const records = await Promise.all(
    blobs.map((b) => s.get(b.key, { type: "json" }) as Promise<GuestMessage | null>)
  );
  return records
    .filter((r): r is GuestMessage => !!r && typeof r.message === "string")
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // newest first
}

export default async (req: Request, context: Context) => {
  const s = store(context);

  if (req.method === "GET") {
    const messages = await readAll(s);
    return Response.json({ messages });
  }

  if (req.method === "POST") {
    let body: { name?: unknown; message?: unknown; website?: unknown };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: "Corps de requête invalide." }, { status: 400 });
    }

    if (typeof body.website === "string" && body.website.trim() !== "") {
      return Response.json({ error: "Rejeté." }, { status: 400 });
    }

    const name = clean(body.name, 60);
    const message = clean(body.message, 280);
    if (name.length < 2 || message.length < 2) {
      return Response.json({ error: "Nom et message requis." }, { status: 400 });
    }

    const { blobs } = await s.list({ prefix: PREFIX });
    if (blobs.length >= MAX_ENTRIES) {
      return Response.json({ error: "Le livre d'or est complet." }, { status: 429 });
    }

    const entry: GuestMessage = { name, message, date: new Date().toISOString() };
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    await s.setJSON(`${PREFIX}${id}`, entry);

    return Response.json({ message: entry });
  }

  return new Response("Method Not Allowed", { status: 405 });
};
