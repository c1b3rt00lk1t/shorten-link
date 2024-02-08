import type { NextRequest } from "next/server";
import { cleanOldShortenLinks } from "../../../lib/actions";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    //Clean up old links the database
    await cleanOldShortenLinks();
  } catch (error) {
    return new Response(error as string, {
      status: 500,
    });
  }

  return Response.json({ success: true });
}
