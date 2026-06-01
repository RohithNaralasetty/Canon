import type { CatalogBook } from "./types";

export const MOCK_CATALOG: CatalogBook[] = [
  { id: "cat-1", title: "Red Rising", author: "Pierce Brown" },
  { id: "cat-2", title: "Project Hail Mary", author: "Andy Weir" },
  { id: "cat-3", title: "Dune", author: "Frank Herbert" },
  { id: "cat-4", title: "The Way of Kings", author: "Brandon Sanderson" },
  { id: "cat-5", title: "Lonesome Dove", author: "Larry McMurtry" },
  { id: "cat-6", title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: "cat-7", title: "1984", author: "George Orwell" },
  { id: "cat-8", title: "Piranesi", author: "Susanna Clarke" },
  { id: "cat-9", title: "The Name of the Wind", author: "Patrick Rothfuss" },
  { id: "cat-10", title: "Klara and the Sun", author: "Kazuo Ishiguro" },
];

export function searchCatalog(query: string): CatalogBook[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return MOCK_CATALOG.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q),
  );
}
