"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CompareView } from "@/components/compare/CompareView";
import { BUCKET_LABELS } from "@/lib/buckets";
import { useLibrary } from "@/lib/library-context";
import { searchCatalog } from "@/lib/mock-catalog";
import type { Bucket, CatalogBook } from "@/lib/types";

type Step = "search" | "detail" | "bucket";

export function HomeFlow() {
  const { addReadBook, isInLibrary, placement } = useLibrary();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CatalogBook | null>(null);
  const [step, setStep] = useState<Step>("search");
  const [dateRead, setDateRead] = useState("");
  const [justPlacedTitle, setJustPlacedTitle] = useState<string | null>(null);

  const results = useMemo(() => searchCatalog(query), [query]);
  const alreadyRead = selected ? isInLibrary(selected.id) : false;

  function selectBook(book: CatalogBook) {
    setSelected(book);
    setStep("detail");
    setDateRead("");
    setJustPlacedTitle(null);
  }

  function markAsRead() {
    if (!selected || alreadyRead) return;
    setStep("bucket");
  }

  function chooseBucket(bucket: Bucket) {
    if (!selected) return;
    const title = selected.title;
    addReadBook(selected, bucket, dateRead || undefined);
    setSelected(null);
    setQuery("");
    setDateRead("");
    setStep("search");
    setJustPlacedTitle(title);
  }

  const showCompare = placement !== null;

  return (
    <>
      <h1>Rank the books you&apos;ve actually read</h1>
      <p className="lead">
        Search for a book, mark it as read, pick how you felt, then compare it
        to other books in that same bucket.
      </p>

      <section className="flow-section" aria-labelledby="search-heading">
        <h2 id="search-heading">Search books</h2>
        <input
          type="search"
          className="search-input"
          placeholder='Try "Dune" or "Sanderson"'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search books"
        />
        {query.trim() && results.length === 0 && (
          <p className="hint">No matches in the mock catalog.</p>
        )}
        {results.length > 0 && (
          <ul className="search-results">
            {results.map((book) => (
              <li key={book.id}>
                <button
                  type="button"
                  className="search-result-btn"
                  onClick={() => selectBook(book)}
                >
                  <span className="book-cover" aria-hidden />
                  <span>
                    <strong>{book.title}</strong>
                    <br />
                    <span className="hint">{book.author}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {selected && step === "detail" && (
        <section className="flow-section placeholder-card">
          <h2>Selected book</h2>
          <p>
            <strong>{selected.title}</strong>
            <br />
            <span className="hint">{selected.author}</span>
          </p>
          {alreadyRead ? (
            <p className="hint">This book is already in your library.</p>
          ) : (
            <button type="button" className="btn" onClick={markAsRead}>
              Mark as Read
            </button>
          )}
          <button
            type="button"
            className="btn btn--secondary"
            style={{ marginLeft: "0.75rem" }}
            onClick={() => {
              setSelected(null);
              setStep("search");
            }}
          >
            Cancel
          </button>
        </section>
      )}

      {selected && step === "bucket" && (
        <section className="flow-section placeholder-card">
          <h2>Finish adding</h2>
          <p className="hint">
            <strong>{selected.title}</strong> — choose a bucket and optionally
            when you finished it.
          </p>
          <label className="date-read-label" htmlFor="date-read">
            Date read <span className="hint">(optional)</span>
          </label>
          <input
            id="date-read"
            type="date"
            className="search-input"
            value={dateRead}
            onChange={(e) => setDateRead(e.target.value)}
          />
          <p className="hint" style={{ marginTop: "1rem" }}>
            How did you feel about it?
          </p>
          <div className="bucket-picker">
            {(["loved", "mid", "disliked"] as const).map((bucket) => (
              <button
                key={bucket}
                type="button"
                className="btn bucket-btn"
                onClick={() => chooseBucket(bucket)}
              >
                {BUCKET_LABELS[bucket]}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="btn btn--secondary"
            style={{ marginTop: "0.75rem" }}
            onClick={() => setStep("detail")}
          >
            Back
          </button>
        </section>
      )}

      {justPlacedTitle && !placement && (
        <div className="placeholder-card success-card">
          <p>
            <strong>{justPlacedTitle}</strong> was placed in your library. See{" "}
            <Link href="/library">Library</Link> for scores and rankings.
          </p>
        </div>
      )}

      {showCompare && (
        <section className="flow-section" aria-labelledby="compare-heading">
          <h2 id="compare-heading">Place in your ranking</h2>
          <CompareView />
        </section>
      )}
    </>
  );
}
