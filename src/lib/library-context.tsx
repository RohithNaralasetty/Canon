"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BUCKET_CONFIG } from "./buckets";
import {
  isPlacementDone,
  nextPlacementBounds,
  opponentsInBucket,
  pickOpponentIndex,
  scoreForInsertion,
  sortByRank,
} from "./ranking";
import type { Bucket, CatalogBook, PlacementSession, UserBook } from "./types";

type LibraryContextValue = {
  library: UserBook[];
  placement: PlacementSession | null;
  addReadBook: (catalog: CatalogBook, bucket: Bucket) => void;
  pickComparisonWinner: (winnerId: string) => void;
  isInLibrary: (catalogId: string) => boolean;
  placementFocus: UserBook | null;
  placementOpponent: UserBook | null;
};

const LibraryContext = createContext<LibraryContextValue | null>(null);

const SEED_LIBRARY: UserBook[] = [
  {
    id: "ub-1",
    catalogId: "cat-1",
    title: "Red Rising",
    author: "Pierce Brown",
    bucket: "loved",
    score: 9.5,
    needsPlacement: false,
  },
  {
    id: "ub-2",
    catalogId: "cat-2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    bucket: "loved",
    score: 8.75,
    needsPlacement: false,
  },
  {
    id: "ub-3",
    catalogId: "cat-3",
    title: "Dune",
    author: "Frank Herbert",
    bucket: "mid",
    score: 5.25,
    needsPlacement: false,
  },
];

function newUserBookId(): string {
  return `ub-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [library, setLibrary] = useState<UserBook[]>(SEED_LIBRARY);
  const [placement, setPlacement] = useState<PlacementSession | null>(null);

  const isInLibrary = useCallback(
    (catalogId: string) => library.some((b) => b.catalogId === catalogId),
    [library],
  );

  const placementFocus = placement
    ? (library.find((b) => b.id === placement.focusBookId) ?? null)
    : null;

  const placementOpponent = useMemo(() => {
    if (!placement || !placementFocus) return null;
    const opponents = opponentsInBucket(
      library,
      placementFocus.bucket,
      placementFocus.id,
    );
    if (opponents.length === 0) return null;
    const index = pickOpponentIndex(placement.low, placement.high);
    return opponents[index] ?? null;
  }, [placement, placementFocus, library]);

  const addReadBook = useCallback((catalog: CatalogBook, bucket: Bucket) => {
    const id = newUserBookId();
    const newBook: UserBook = {
      id,
      catalogId: catalog.id,
      title: catalog.title,
      author: catalog.author,
      bucket,
      score: BUCKET_CONFIG[bucket].initial,
      needsPlacement: true,
    };

    setLibrary((prev) => {
      const withNew = [...prev, newBook];
      const opponents = opponentsInBucket(withNew, bucket, id);
      if (opponents.length === 0) {
        setPlacement(null);
        return withNew.map((b) =>
          b.id === id ? { ...b, needsPlacement: false } : b,
        );
      }
      setPlacement({
        focusBookId: id,
        low: 0,
        high: opponents.length - 1,
        comparisonsDone: 0,
      });
      return withNew;
    });
  }, []);

  const pickComparisonWinner = useCallback(
    (winnerId: string) => {
      if (!placement || !placementFocus || !placementOpponent) return;

      const focus = placementFocus;
      const opponents = opponentsInBucket(library, focus.bucket, focus.id);
      const mid = pickOpponentIndex(placement.low, placement.high);
      const focusWon = winnerId === focus.id;

      const { low: newLow, high: newHigh } = nextPlacementBounds(
        focusWon,
        placement.low,
        placement.high,
        mid,
      );
      const comparisonsDone = placement.comparisonsDone + 1;

      if (!isPlacementDone(newLow, newHigh)) {
        setPlacement({
          focusBookId: focus.id,
          low: newLow,
          high: newHigh,
          comparisonsDone,
        });
        return;
      }

      const insertIndex = newLow;
      const finalScore = scoreForInsertion(focus.bucket, opponents, insertIndex);

      setPlacement(null);
      setLibrary((prev) =>
        prev.map((b) =>
          b.id === focus.id
            ? { ...b, score: finalScore, needsPlacement: false }
            : b,
        ),
      );
    },
    [placement, placementFocus, placementOpponent, library],
  );

  const value: LibraryContextValue = {
    library,
    placement,
    addReadBook,
    pickComparisonWinner,
    isInLibrary,
    placementFocus,
    placementOpponent,
  };

  return (
    <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
  );
}

export function useLibrary(): LibraryContextValue {
  const ctx = useContext(LibraryContext);
  if (!ctx) {
    throw new Error("useLibrary must be used within LibraryProvider");
  }
  return ctx;
}

/** Books in one bucket, best-first — for Library UI. */
export function booksInBucketSorted(
  library: UserBook[],
  bucket: Bucket,
): UserBook[] {
  return sortByRank(library.filter((b) => b.bucket === bucket));
}
