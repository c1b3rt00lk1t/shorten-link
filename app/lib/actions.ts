"use server";

import { sql } from "@vercel/postgres";

export async function insertLinkToShorten(
  originalUrl: string,
  shortId: string
) {
  const query = sql`INSERT INTO shorten_link (url, short_id) VALUES (${originalUrl}, ${shortId})`;
  const result = await query;
  return result;
}

export async function getLinkToRedirect(shortId: string) {
  const query = sql`SELECT url FROM shorten_link WHERE short_id = ${shortId}`;
  const result = await query;
  return result;
}
