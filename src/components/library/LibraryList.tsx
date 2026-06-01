"use client";

import { BUCKET_LABELS } from "@/lib/buckets";
import { booksInBucketSorted, useLibrary } from "@/lib/library-context";
import type { Bucket } from "@/lib/types";

const BUCKET_ORDER: Bucket[] = ["loved", "mid", "disliked"];

export function LibraryList() {
  const { library, placement } = useLibrary();

  if (library.length === 0) {
    return (
      <p className="hint">
        No books yet. Search on the home page to add your first read.
      </p>
    );
  }

  return (
    <div className="library-by-bucket">
      {BUCKET_ORDER.map((bucket) => {
        const books = booksInBucketSorted(library, bucket);
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
                  <div>
                    <strong>{book.title}</strong>
                    {placement?.focusBookId === book.id && (
                      <span className="badge">Placing…</span>
                    )}
                    <br />
                    <span className="hint">
                      {book.author}
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
  );
}
