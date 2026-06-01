"use client";

import { useState } from "react";
import { BUCKET_LABELS } from "@/lib/buckets";
import { booksInBucket, useLibrary } from "@/lib/library-context";
import type { Bucket } from "@/lib/types";

const BUCKET_ORDER: Bucket[] = ["loved", "mid", "disliked"];

type SortMode = "rank" | "date";

function formatDateRead(iso?: string): string {
  if (!iso) return "No date";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" },
  );
}

export function LibraryList() {
  const { library, placement } = useLibrary();
  const [sortMode, setSortMode] = useState<SortMode>("rank");

  if (library.length === 0) {
    return (
      <p className="hint">
        No books yet. Search on the home page to add your first read.
      </p>
    );
  }

  return (
    <>
      <div className="sort-toggle" role="group" aria-label="Sort library by">
        <button
          type="button"
          className={`sort-toggle__btn ${sortMode === "rank" ? "sort-toggle__btn--active" : ""}`}
          onClick={() => setSortMode("rank")}
        >
          Ranking order
        </button>
        <button
          type="button"
          className={`sort-toggle__btn ${sortMode === "date" ? "sort-toggle__btn--active" : ""}`}
          onClick={() => setSortMode("date")}
        >
          Date read
        </button>
      </div>

      <div className="library-by-bucket">
        {BUCKET_ORDER.map((bucket) => {
          const books = booksInBucket(library, bucket, sortMode);
          if (books.length === 0) return null;

          return (
            <section
              key={bucket}
              className="bucket-section"
              aria-labelledby={`bucket-${bucket}`}
            >
              <h2 id={`bucket-${bucket}`} className="bucket-section__title">
                {BUCKET_LABELS[bucket]}
              </h2>
              <ol className="placeholder-list ranked-list">
                {books.map((book, index) => (
                  <li key={book.id}>
                    <span className="rank">{index + 1}</span>
                    <span className="book-cover" aria-hidden />
                    <div className="library-book__main">
                      <strong>{book.title}</strong>
                      {placement?.focusBookId === book.id && (
                        <span className="badge">Placing…</span>
                      )}
                      <span className="book-score">{book.score.toFixed(1)}</span>
                      <br />
                      <span className="hint">
                        {book.author}
                        {sortMode === "date" && (
                          <> · Read {formatDateRead(book.dateRead)}</>
                        )}
                        {sortMode === "rank" && book.dateRead && (
                          <> · {formatDateRead(book.dateRead)}</>
                        )}
                        {book.needsPlacement ? " · needs ranking" : ""}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </>
  );
}
