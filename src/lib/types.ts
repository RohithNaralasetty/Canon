export type Bucket = "loved" | "mid" | "disliked";

export type CatalogBook = {
  id: string;
  title: string;
  author: string;
};

export type UserBook = {
  id: string;
  catalogId: string;
  title: string;
  author: string;
  bucket: Bucket;
  score: number;
  needsPlacement: boolean;
};

export type PlacementSession = {
  focusBookId: string;
  low: number;
  high: number;
  comparisonsDone: number;
};
