"use client";

import { BUCKET_LABELS } from "@/lib/buckets";
import { useLibrary } from "@/lib/library-context";

export function LibraryList() {
  const { library } = useLibrary();

  if (library.length === 0) {
    return (
      <p className="hint">
        No books yet. Search on the home page to add your first read.
      </p>
    );
  }

  return (
    <ul className="placeholder-list" aria-label="Your library">
      {library.map((book) => (
        <li key={book.id}>
          <span className="book-cover" aria-hidden />
          <div>
            <strong>{book.title}</strong>
            <br />
            <span className="hint">
              {book.author} · {BUCKET_LABELS[book.bucket]}
              {book.needsPlacement ? " · needs ranking" : ""}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
