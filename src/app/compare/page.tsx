export default function ComparePage() {
  return (
    <main>
      <h1>Which is better?</h1>
      <p className="lead">
        Placeholder comparison. Later: two books from the same bucket, you pick
        a winner, and scores update behind the scenes.
      </p>

      <div className="compare-vs">
        <div className="compare-book">
          <div className="book-cover" aria-hidden />
          <strong>Red Rising</strong>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "#666" }}>
            Pierce Brown
          </p>
          <button type="button" className="btn" style={{ marginTop: "1rem" }} disabled>
            Select
          </button>
        </div>

        <p className="vs-label">VS</p>

        <div className="compare-book">
          <div className="book-cover" aria-hidden />
          <strong>Project Hail Mary</strong>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "#666" }}>
            Andy Weir
          </p>
          <button type="button" className="btn" style={{ marginTop: "1rem" }} disabled>
            Select
          </button>
        </div>
      </div>

      <div className="placeholder-card" style={{ marginTop: "1.5rem" }}>
        <h2>Session</h2>
        <p>Placement / refinement logic not implemented.</p>
      </div>
    </main>
  );
}
