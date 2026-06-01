const placeholderRankings = [
  "Red Rising",
  "Project Hail Mary",
  "Dune",
  "The Way of Kings",
  "Lonesome Dove",
];

export default function RankingsPage() {
  const top = placeholderRankings.slice(0, 3);
  const bottom = [...placeholderRankings].reverse().slice(0, 3);

  return (
    <main>
      <h1>My rankings</h1>
      <p className="lead">
        Placeholder order. Later: your full list, Top 10, and Bottom 10—no
        numeric scores shown, only rank.
      </p>

      <div className="placeholder-card">
        <h2>Full list</h2>
        <ol className="placeholder-list" style={{ listStyle: "none" }}>
          {placeholderRankings.map((title, index) => (
            <li key={title}>
              <span className="rank">{index + 1}</span>
              <span className="book-cover" aria-hidden />
              <strong>{title}</strong>
            </li>
          ))}
        </ol>
      </div>

      <div className="placeholder-card">
        <h2>Top 3 (preview of Top 10)</h2>
        <ol start={1}>
          {top.map((title) => (
            <li key={`top-${title}`}>{title}</li>
          ))}
        </ol>
      </div>

      <div className="placeholder-card">
        <h2>Bottom 3 (preview of Bottom 10)</h2>
        <ol start={1}>
          {bottom.map((title, index) => (
            <li key={`bottom-${title}`}>
              #{placeholderRankings.length - index} — {title}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
