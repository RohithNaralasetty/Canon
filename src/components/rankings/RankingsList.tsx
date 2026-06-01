"use client";

import { BUCKET_LABELS } from "@/lib/buckets";
import { useLibrary } from "@/lib/library-context";

export function RankingsList() {
  const { sortedLibrary } = useLibrary();
  const top = sortedLibrary.slice(0, 10);
  const bottom = [...sortedLibrary].reverse().slice(0, 10);

  if (sortedLibrary.length === 0) {
    return (
      <p className="hint">
        No rankings yet. Add a book from the home page to get started.
      </p>
    );
  }

  return (
    <>
      <div className="placeholder-card">
        <h2>Full list</h2>
        <ol className="placeholder-list ranked-list">
          {sortedLibrary.map((book, index) => (
            <li key={book.id}>
              <span className="rank">{index + 1}</span>
              <span className="book-cover" aria-hidden />
              <div>
                <strong>{book.title}</strong>
                <br />
                <span className="hint">
                  {book.author} · {BUCKET_LABELS[book.bucket]}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="placeholder-card">
        <h2>Top {Math.min(10, top.length)}</h2>
        <ol>
          {top.map((book, index) => (
            <li key={book.id}>
              {index + 1}. {book.title}
            </li>
          ))}
        </ol>
      </div>

      <div className="placeholder-card">
        <h2>Bottom {Math.min(10, bottom.length)}</h2>
        <ol>
          {bottom.map((book, index) => (
            <li key={book.id}>
              #{sortedLibrary.length - index}. {book.title}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
