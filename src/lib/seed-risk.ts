import { fullCases as seedFullCases } from "@/data";
import type { RiskValue } from "@/components/risk-level-selector";

export type SeedRiskSuggestion = {
  riskValue: RiskValue;
  riskReasoning: string;
};

/** Immutable fixture suggestions — used when re-running Suggest Risk Level. */
export const SEED_RISK_SUGGESTIONS: Record<
  string,
  Record<string, SeedRiskSuggestion>
> = Object.fromEntries(
  seedFullCases.map((c) => [
    c.id,
    Object.fromEntries(
      c.scorecardSections
        .filter((s) => s.riskValue && s.riskReasoning)
        .map((s) => [
          s.sectionName,
          {
            riskValue: s.riskValue as RiskValue,
            riskReasoning: s.riskReasoning as string,
          },
        ])
    ),
  ])
);
