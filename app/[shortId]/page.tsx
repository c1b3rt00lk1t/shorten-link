import { redirect } from "next/navigation";
import { getLinkToRedirect } from "../lib/actions";

export default async function Page({
  params: { shortId },
}: {
  params: { shortId: string };
}) {
  let url: string = "";
  try {
    const result = await getLinkToRedirect(shortId);
    url = result.rows[0]?.url;
  } catch (error) {
    console.error("Error:", error);
  }
  if (!url) {
    redirect("/");
  }
  redirect("https://" + url);
}
