import { nanoid } from "nanoid";
import { insertLinkToShorten } from "../../lib/actions";

// URL validation utility
const validateURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export async function GET(request: Request) {
  // Extract the query from the request URL
  const query = new URL(request.url).searchParams;
  const originalUrl = query.get("url");

  // Validate URL
  if (!originalUrl || !validateURL(originalUrl)) {
    return new Response("Invalid URL", { status: 400 });
  }

  // Remove the protocol from the URL
  const replacedUrl = originalUrl
    .replace("https://", "")
    .replace("http://", "");

  // Generate short URL
  const shortId = nanoid(8);

  try {
    // Insert the URL into the database
    const result = await insertLinkToShorten(replacedUrl, shortId);
    if (result.rowCount === 1) {
      return new Response(shortId);
    } else {
      return new Response("Database connection failed!", { status: 500 });
    }
  } catch (error) {
    return new Response("Database connection failed!", { status: 500 });
  }
}
