# BookRank — MVP decisions

Locked product and technical choices for the first release. Details live in [ranking-design.md](./ranking-design.md).

---

## Ranking model

| ID | Decision |
|----|----------|
| R1 | Use **bucketed relative ranking**, not global Elo. Initial sentiment sets the score band; head-to-head comparisons set order **within** that band. |
| R2 | Do **not** show raw numeric scores in the UI. Show ordered rank (and Top / Bottom lists). Scores are an internal ordering key only. |
| R3 | On add, the user **must** choose one sentiment bucket before the book enters the library. |

### Sentiment buckets (score bands)

| Bucket | User label (copy TBD) | Score range (inclusive) |
|--------|------------------------|-------------------------|
| `loved` | Loved / liked | 6.5 – 10.0 |
| `mid` | Mid / mixed | 3.0 – 6.5 |
| `disliked` | Disliked | 1.0 – 3.0 |

| ID | Decision |
|----|----------|
| R4 | New books receive an **initial score at the midpoint** of their bucket (Loved → 8.25, Mid → 4.75, Disliked → 2.0). |
| R5 | After each comparison, scores are adjusted with a **small pairwise step** and **clamped** to the book’s bucket range. The winner’s score must end **strictly above** the loser’s. |
| R6 | **MVP: comparisons are only between books in the same bucket.** No cross-bucket matchups. |
| R7 | **No ties** in MVP. The user must pick a winner. |
| R8 | To move a book to a different sentiment band, the user **changes bucket** on the book (explicit action). Reset score to that bucket’s midpoint and set `needs_placement = true`. Past comparisons remain in the log but do not auto-migrate scores across buckets. |

---

## Comparisons and placement

| ID | Decision |
|----|----------|
| C1 | Head-to-head compare remains the core interaction (Beli-style). |
| C2 | When a book is added or re-bucketed, run **placement** comparisons until `needs_placement = false` (see ranking-design for stop rule). |
| C3 | **Refinement** (“Start ranking”) picks pairs **within the same bucket**, favoring books with close scores and few past comparisons. |
| C4 | Default refinement session length: **10 comparisons**, then offer to continue. |
| C5 | Library size 1: skip comparisons; mark `needs_placement = false`. |

---

## Library and catalog

| ID | Decision |
|----|----------|
| L1 | One row per user per book: `UNIQUE (user_id, book_id)`. |
| L2 | Add via **Open Library search** or **manual** entry (title required). |
| L3 | Soft-delete from library: `status = removed`; exclude from compare and rankings; keep comparison history. |
| L4 | No star ratings, Goodreads import, genre rankings, tiers, or social features in MVP. |

---

## Data and security

| ID | Decision |
|----|----------|
| D1 | **Supabase (Postgres)** for data; **Supabase Auth** for users. |
| D2 | Tables: `profiles`, `books`, `user_books`, `comparisons`. See ranking-design for columns. |
| D3 | Record every comparison in `comparisons` with `user_id`, winner/loser `user_books.id`, and `context` (`placement` \| `refinement`). |
| D4 | Apply score updates and comparison insert in a **single transaction** (RPC or equivalent). |
| D5 | **RLS:** users can only read/write their own `user_books` and `comparisons`; `books` catalog is readable by authenticated users. |

---

## Rankings UI

| ID | Decision |
|----|----------|
| U1 | **Full ranking:** all active books, ordered by `score` descending (global list; bucket boundaries create natural clusters). |
| U2 | **Top 10 / Bottom 10:** same ordering; if fewer than 10 active books, show all. |
| U3 | Tie-break for equal scores: `comparison_count` desc, then earlier `created_at` (stable list). |
| U4 | Profile page in MVP: **books read** and **comparison count** only. **Favorite genre** is out of scope (show nothing or “—”). |

---

## Stack and pages (unchanged from tech spec)

| ID | Decision |
|----|----------|
| T1 | Next.js web app on Vercel; Open Library for search. |
| T2 | Pages: landing, login/signup, library, add book (can be combined with library), compare, rankings, profile. |
| T3 | Copy “leaderboard” in early docs means **personal rankings**, not friends. |

---

## Explicitly deferred (not MVP)

- Cross-bucket comparisons  
- Ties / “haven’t read both” skip  
- Genre-specific rankings and favorite-genre stat  
- Goodreads import, friend leaderboards, AI recs  
- Dynamic K-factor, Glicko, or user-visible rating numbers  
- `comparison_sessions` table (optional; use `context` on `comparisons` only for MVP)

---

## Supersedes

- Product open question “Should rankings use Elo?” → **No** for MVP; use bucketed relative scores (R1, R5).  
- `tech-spec.md` “Elo scoring” → treat as superseded by this document for MVP implementation.
