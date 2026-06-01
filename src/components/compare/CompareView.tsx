"use client";

import { useLibrary } from "@/lib/library-context";
import { BUCKET_LABELS } from "@/lib/buckets";
import type { UserBook } from "@/lib/types";

function BookCard({
  book,
  onSelect,
}: {
  book: UserBook;
  onSelect: () => void;
}) {
  return (
    <div className="compare-book">
      <div className="book-cover" aria-hidden />
      <strong>{book.title}</strong>
      <p className="compare-book__author">{book.author}</p>
      <button type="button" className="btn" onClick={onSelect}>
        This one
      </button>
    </div>
  );
}

export function CompareView() {
  const {
    placement,
    placementFocus,
    placementOpponent,
    pickComparisonWinner,
  } = useLibrary();

  if (!placement || !placementFocus) {
    return (
      <div className="placeholder-card">
        <p>
          No active comparison. Search for a book on the home page, mark it as
          read, and choose a bucket to place it in your library ranking.
        </p>
      </div>
    );
  }

  if (!placementOpponent) {
    return (
      <div className="placeholder-card">
        <p>
          <strong>{placementFocus.title}</strong> is the only book in the{" "}
          {BUCKET_LABELS[placementFocus.bucket]} bucket—no comparisons needed.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="lead">
        Finding where <strong>{placementFocus.title}</strong> belongs in{" "}
        <strong>{BUCKET_LABELS[placementFocus.bucket]}</strong>. Pick the book
        you prefer—higher or lower in the list depending on your answer.
      </p>
      <p className="hint">
        Comparison {placement.comparisonsDone + 1} · vs rank #
        {placement.low <= placement.high
          ? Math.floor((placement.low + placement.high) / 2) + 1
          : "—"}{" "}
        in this bucket
      </p>

      <div className="compare-vs">
        <BookCard
          book={placementFocus}
          onSelect={() => pickComparisonWinner(placementFocus.id)}
        />
        <p className="vs-label">VS</p>
        <BookCard
          book={placementOpponent}
          onSelect={() => pickComparisonWinner(placementOpponent.id)}
        />
      </div>
    </div>
  );
}
