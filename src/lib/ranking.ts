import { BUCKET_CONFIG } from "./buckets";
import type { Bucket, UserBook } from "./types";

const MIN_GAP = 0.01;

export function clampToBucket(score: number, bucket: Bucket): number {
  const { min, max } = BUCKET_CONFIG[bucket];
  return Math.min(max, Math.max(min, score));
}

/** Opponents sorted best-first (rank #1 first). */
export function sortByRank(books: UserBook[]): UserBook[] {
  return [...books].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.title.localeCompare(b.title);
  });
}

export function opponentsInBucket(
  library: UserBook[],
  bucket: Bucket,
  excludeId: string,
): UserBook[] {
  return sortByRank(
    library.filter((b) => b.bucket === bucket && b.id !== excludeId),
  );
}

/** Compare against the middle index between low and high (inclusive). */
export function pickOpponentIndex(low: number, high: number): number {
  return Math.floor((low + high) / 2);
}

/**
 * After the new book wins vs mid: search among higher-ranked opponents.
 * After it loses: search among lower-ranked opponents.
 */
export function nextPlacementBounds(
  focusWon: boolean,
  low: number,
  high: number,
  mid: number,
): { low: number; high: number } {
  if (focusWon) {
    return { low, high: mid - 1 };
  }
  return { low: mid + 1, high };
}

/** Insertion binary search is done when low > high. */
export function isPlacementDone(low: number, high: number): boolean {
  return low > high;
}

/**
 * Set the new book's score so it sorts at insertIndex among opponents (best-first).
 * insertIndex = how many opponents rank above the new book.
 */
export function scoreForInsertion(
  bucket: Bucket,
  opponents: UserBook[],
  insertIndex: number,
): number {
  const { min, max } = BUCKET_CONFIG[bucket];

  if (opponents.length === 0) {
    return BUCKET_CONFIG[bucket].initial;
  }
  if (insertIndex <= 0) {
    const top = opponents[0].score;
    return clampToBucket(Math.min(max, top + MIN_GAP * 10), bucket);
  }
  if (insertIndex >= opponents.length) {
    const bottom = opponents[opponents.length - 1].score;
    return clampToBucket(Math.max(min, bottom - MIN_GAP * 10), bucket);
  }

  const above = opponents[insertIndex - 1].score;
  const below = opponents[insertIndex].score;
  return clampToBucket((above + below) / 2, bucket);
}
