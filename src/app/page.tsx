import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <h1>Rank the books you&apos;ve actually read</h1>
      <p className="lead">
        BookRank helps you build a personal reading ranking through simple
        head-to-head picks—not star ratings. Placeholder app: navigation works;
        data and comparisons come later.
      </p>

      <div className="placeholder-card">
        <h2>How it will work</h2>
        <p>
          Add books to your library, choose how you felt about each one, then
          compare pairs to refine your order within that band.
        </p>
      </div>

      <div className="actions">
        <Link href="/login" className="btn">
          Log in (placeholder)
        </Link>
        <Link href="/library" className="btn btn--secondary">
          View library
        </Link>
      </div>
    </main>
  );
}
