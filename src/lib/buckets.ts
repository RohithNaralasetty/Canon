import type { Bucket } from "./types";

export const BUCKET_LABELS: Record<Bucket, string> = {
  loved: "Loved / Good",
  mid: "Mid / Mixed",
  disliked: "Bad / Disliked",
};

/**
 * Compressed visible score bands (rank #1 → last in bucket).
 * Order matters more than the number; gaps stay tight within a bucket.
 */
export const DISPLAY_BAND: Record<Bucket, { top: number; bottom: number }> = {
  loved: { top: 10.0, bottom: 8.0 },
  mid: { top: 7.9, bottom: 5.0 },
  disliked: { top: 4.9, bottom: 1.0 },
};
