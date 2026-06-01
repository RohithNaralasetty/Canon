import { redirect } from "next/navigation";

/** Rankings live on the Library page for now. */
export default function RankingsPage() {
  redirect("/library");
}
