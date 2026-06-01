import { DISPLAY_BAND } from "./buckets";
import type { Bucket, UserBook } from "./types";

/** Opponents sorted best-first (rank #1 first). */
export function sortByRank(books: UserBook[]): UserBook[] {
  return [...books].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.title.localeCompare(b.title);
  });
}

export function sortByDateRead(books: UserBook[]): UserBook[] {
  return [...books].sort((a, b) => {
    if (!a.dateRead && !b.dateRead) {
      return a.title.localeCompare(b.title);
    }
    if (!a.dateRead) return 1;
    if (!b.dateRead) return -1;
    return b.dateRead.localeCompare(a.dateRead);
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

export function pickOpponentIndex(low: number, high: number): number {
  return Math.floor((low + high) / 2);
}

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

export function isPlacementDone(low: number, high: number): boolean {
  return low > high;
}

/** Score from rank index (0 = best) within a bucket. */
export function displayScoreForRank(
  bucket: Bucket,
  rankIndex: number,
  count: number,
): number {
  const { top, bottom } = DISPLAY_BAND[bucket];
  if (count <= 1) return top;
  const fraction = rankIndex / (count - 1);
  const score = top - fraction * (top - bottom);
  return Math.round(score * 10) / 10;
}

/** Assign display scores to every book in a bucket from current rank order. */
export function recomputeBucketScores(
  library: UserBook[],
  bucket: Bucket,
): UserBook[] {
  const inBucket = sortByRank(library.filter((b) => b.bucket === bucket));
  const byId = new Map(
    inBucket.map((book, index) => [
      book.id,
      {
        ...book,
        score: displayScoreForRank(bucket, index, inBucket.length),
      },
    ]),
  );
  return library.map((b) => (b.bucket === bucket ? (byId.get(b.id) ?? b) : b));
}

export function recomputeAllDisplayScores(library: UserBook[]): UserBook[] {
  let result = library;
  const buckets: Bucket[] = ["loved", "mid", "disliked"];
  for (const bucket of buckets) {
    result = recomputeBucketScores(result, bucket);
  }
  return result;
}

/** After insertion search, set order and display scores for the whole bucket. */
export function finalizePlacement(
  library: UserBook[],
  focusId: string,
  bucket: Bucket,
  insertIndex: number,
): UserBook[] {
  const focus = library.find((b) => b.id === focusId);
  if (!focus) return library;

  const opponents = opponentsInBucket(library, bucket, focusId);
  const ordered = [
    ...opponents.slice(0, insertIndex),
    { ...focus, needsPlacement: false },
    ...opponents.slice(insertIndex),
  ];

  const rescored = ordered.map((book, index) => ({
    ...book,
    score: displayScoreForRank(bucket, index, ordered.length),
    needsPlacement: book.id === focusId ? false : book.needsPlacement,
  }));

  const byId = new Map(rescored.map((b) => [b.id, b]));
  return library.map((b) => byId.get(b.id) ?? b);
}
