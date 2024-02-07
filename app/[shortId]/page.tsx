import { redirect } from "next/navigation";
import { getLinkToRedirect } from "../lib/actions";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    shortId: string;
  };
};

export default async function Page({ params: { shortId } }: PageProps) {
  let url: string = "";
  try {
    const result = await getLinkToRedirect(shortId);
    url = result.rows[0]?.url;
  } catch (error) {
    console.error("Error:", error);
  }
  if (!url) {
    notFound();
  }
  const targetURL = "https://" + url;
  const newURL = new URL(targetURL);
  redirect(newURL.href);
}
