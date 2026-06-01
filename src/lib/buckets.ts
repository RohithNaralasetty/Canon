import type { Bucket } from "./types";

export const BUCKET_LABELS: Record<Bucket, string> = {
  loved: "Loved / Good",
  mid: "Mid / Mixed",
  disliked: "Bad / Disliked",
};

export const BUCKET_CONFIG: Record<
  Bucket,
  { min: number; max: number; initial: number }
> = {
  loved: { min: 6.5, max: 10, initial: 8.25 },
  mid: { min: 3, max: 6.5, initial: 4.75 },
  disliked: { min: 1, max: 3, initial: 2 },
};
