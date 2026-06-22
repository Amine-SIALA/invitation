// One-off maintenance: clear test entries from the production Blobs stores.
// Usage: NETLIFY_SITE_ID=... NETLIFY_TOKEN=... node scripts/clean-blobs.mjs
import { getStore } from "@netlify/blobs";

const siteID = process.env.NETLIFY_SITE_ID;
const token = process.env.NETLIFY_TOKEN;
if (!siteID || !token) {
  console.error("Set NETLIFY_SITE_ID and NETLIFY_TOKEN");
  process.exit(1);
}

for (const name of ["soutenance-attendees", "soutenance-guestbook"]) {
  const store = getStore({ name, siteID, token, consistency: "strong" });
  const { blobs } = await store.list();
  for (const b of blobs) await store.delete(b.key);
  console.log(`cleared ${name}: ${blobs.length} entr${blobs.length === 1 ? "y" : "ies"}`);
}
