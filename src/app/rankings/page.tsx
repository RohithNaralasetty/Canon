import { RankingsList } from "@/components/rankings/RankingsList";

export default function RankingsPage() {
  return (
    <main>
      <h1>My rankings</h1>
      <p className="lead">
        Ordered by your comparisons within each bucket. Scores stay hidden—only
        rank position is shown.
      </p>
      <RankingsList />
    </main>
  );
}
