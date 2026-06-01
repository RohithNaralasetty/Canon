import { BUCKET_CONFIG } from "./buckets";
import type { Bucket, UserBook } from "./types";

const STEP = 0.25;
const MIN_GAP = 0.01;

export function clampToBucket(score: number, bucket: Bucket): number {
  const { min, max } = BUCKET_CONFIG[bucket];
  return Math.min(max, Math.max(min, score));
}

/** Simple in-band score update after a comparison (winner beats loser). */
export function applyComparison(
  winner: UserBook,
  loser: UserBook,
): { winnerScore: number; loserScore: number } {
  const { min, max } = BUCKET_CONFIG[winner.bucket];

  let winnerScore = Math.min(winner.score + STEP, max);
  let loserScore = Math.max(loser.score - STEP, min);

  if (winnerScore <= loserScore) {
    const mid = (winner.score + loser.score) / 2;
    winnerScore = Math.min(mid + MIN_GAP / 2, max);
    loserScore = Math.max(mid - MIN_GAP / 2, min);
  }

  if (winnerScore <= loserScore) {
    winnerScore = max;
    loserScore = min;
  }

  return {
    winnerScore: clampToBucket(winnerScore, winner.bucket),
    loserScore: clampToBucket(loserScore, loser.bucket),
  };
}

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

export function maxPlacementComparisons(opponentCount: number): number {
  if (opponentCount <= 1) return opponentCount;
  return Math.ceil(Math.log2(opponentCount)) + 2;
}

export function placementComplete(
  low: number,
  high: number,
  comparisonsDone: number,
  opponentCount: number,
): boolean {
  if (opponentCount === 0) return true;
  if (opponentCount === 1) return comparisonsDone >= 1;
  if (high - low <= 1) return true;
  return comparisonsDone >= maxPlacementComparisons(opponentCount);
}

export function pickOpponentIndex(low: number, high: number): number {
  return Math.floor((low + high) / 2);
}
