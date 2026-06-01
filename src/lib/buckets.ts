import type { Bucket } from "./types";

export const BUCKET_LABELS: Record<Bucket, string> = {
  loved: "Loved / Good",
  mid: "Mid / Mixed",
  disliked: "Bad / Disliked",
};

/** Visible score range per bucket (top rank → bottom rank). */
export const DISPLAY_BAND: Record<Bucket, { top: number; bottom: number }> = {
  loved: { top: 10.0, bottom: 6.5 },
  mid: { top: 6.4, bottom: 3.0 },
  disliked: { top: 2.9, bottom: 1.0 },
};
