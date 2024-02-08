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
  const urlString = request.url;

  // The url can contain other query parameters
  // To extract it as a whole, it cannot be done using the URLSearchParams
  const urlParam = "url=";
  let urlParamIndex = urlString.indexOf(urlParam) + urlParam.length;
  const originalUrl =
    process.env.NODE_ENV === "development"
      ? urlString.substring(urlParamIndex)
      : decodeURIComponent(urlString.substring(urlParamIndex));

  // Validate resulting URL
  if (!originalUrl || !validateURL(originalUrl)) {
    return new Response(process.env.NODE_ENV + " Invalid URL: " + originalUrl, {
      status: 400,
    });
  }

  // Remove the protocol from the URL
  const replacedUrl = originalUrl
    .replace("https://", "")
    .replace("http://", "");

  // Generate short URL
  const shortId = nanoid(8);

  // Encoded URL
  const urlParts = replacedUrl.split("?");
  const encodedUrl = `${encodeURIComponent(urlParts[0])}?${urlParts[1]}`;

  try {
    // Insert the URL into the database
    const result = await insertLinkToShorten(
      process.env.NODE_ENV === "development" ? replacedUrl : encodedUrl,
      shortId
    );
    if (result.rowCount === 1) {
      return new Response(
        process.env.NODE_ENV +
          " " +
          process.env.NEXT_PUBLIC_BASE_URL +
          "/" +
          shortId
      );
    } else {
      return new Response("Database connection failed!", { status: 500 });
    }
  } catch (error) {
    return new Response("Database connection failed!", { status: 500 });
  }
}
