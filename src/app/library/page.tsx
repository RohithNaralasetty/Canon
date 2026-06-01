import Link from "next/link";
import { LibraryList } from "@/components/library/LibraryList";

export default function LibraryPage() {
  return (
    <main>
      <h1>My library</h1>
      <p className="lead">
        Your ranked reads, grouped by how you felt about them. Add books from the{" "}
        <Link href="/">home page</Link>.
      </p>
      <LibraryList />
    </main>
  );
}
