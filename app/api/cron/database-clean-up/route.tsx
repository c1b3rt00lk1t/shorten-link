import type { NextRequest } from "next/server";
import { cleanOldShortenLinks } from "../../../lib/actions";

/* Route handler to be executed by a cron job to clean up the database */
export async function GET(request: NextRequest): Promise<Response> {
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
