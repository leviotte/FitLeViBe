import type { Metadata } from "next";
import { FitCheckSection } from "@/components/fitcheck-section";
import { pageMeta } from "@/lib/metadata";
import { type GoalId, goals } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Gratis FitCheck",
  "Vraag een gratis FitCheck aan bij Levi Otte. Naam, gsm en doel. Levi neemt contact op.",
  "/fitcheck",
);

function parseGoal(value: string | string[] | undefined): GoalId | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && raw in goals) return raw as GoalId;
  return undefined;
}

export default async function FitCheckPage({
  searchParams,
}: {
  searchParams: Promise<{ doel?: string | string[] }>;
}) {
  const params = await searchParams;
  const defaultGoal = parseGoal(params.doel);

  return (
    <div className="pt-6">
      <FitCheckSection defaultGoal={defaultGoal} />
    </div>
  );
}
