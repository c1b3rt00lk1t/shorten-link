import { nanoid } from "nanoid";
import { insertLinkToShorten } from "../../lib/actions";

// URL validation utility
const validateURL = (url: string) => {
  try {
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      url = "https://" + url;
    }
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export async function GET(request: Request) {
  // Check for API key in the request headers
  const apiKey = request.headers.get("api-key");
  const validApiKey = process.env.API_KEY_UPLOADER;

  if (!apiKey || apiKey !== validApiKey) {
    return new Response("Invalid API key", { status: 403 });
  }

  // Extract the query from the request URL
  const urlString = request.url;

  // The url can contain other query parameters
  // To extract it as a whole, it cannot be done using the URLSearchParams
  const urlParam = "url=";
  let urlParamIndex = urlString.indexOf(urlParam) + urlParam.length;
  // In prod the url sent as param is encoded and needs to be decoded
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

  // Reencode the URL
  // In PRD the part of the url corresponding to the path in firebase needs to be encoded again, with special care of slashes corresponding to the firebase path
  const uploaderBaseURL = process.env.UPLOADER_BASE_URL!;
  const encodedUrl =
    uploaderBaseURL +
    encodeURI(originalUrl.split(uploaderBaseURL)[1]).replace(/\//g, "%2F");

  // Remove the protocol from the URL
  const replacedUrl = originalUrl
    .replace("https://", "")
    .replace("http://", "");

  // Generate short URL
  const shortId = nanoid(8);

  try {
    // Insert the URL into the database
    const result = await insertLinkToShorten(
      process.env.NODE_ENV === "development" ? replacedUrl : encodedUrl,
      shortId
    );
    if (result.rowCount === 1) {
      const responseData = {
        status: "success",
        message: "ShortId successfully retrieved",
        data: {
          shortURL: process.env.NEXT_PUBLIC_BASE_URL + "/" + shortId,
          shortId,
        },
      };
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response("Database connection failed!", { status: 500 });
    }
  } catch (error) {
    return new Response("Database connection failed!", { status: 500 });
  }
}
