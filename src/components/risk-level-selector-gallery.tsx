"use client";

import { useState } from "react";
import {
  RiskLevelSelector,
  type RiskLevelChange,
  type RiskLevelState,
  type RiskValue,
} from "@/components/risk-level-selector";

type DemoState = {
  riskLevel: RiskLevelState;
  riskValue?: RiskValue;
  riskReasoning?: string;
  title: string;
  reset: DemoState;
};

const INITIAL_DEMOS: Omit<DemoState, "reset">[] = [
  {
    title: "unset",
    riskLevel: "unset",
  },
  {
    title: "ai_suggested (yellow)",
    riskLevel: "ai_suggested",
    riskValue: "yellow",
    riskReasoning:
      "Suggested: Yellow. 4 examples of political content across 3 platforms spanning 2022–2025; no single-issue pattern, platform not centered on controversy.",
  },
  {
    title: "ai_suggested (red)",
    riskLevel: "ai_suggested",
    riskValue: "red",
    riskReasoning:
      "Suggested: Red. Two Meridian Bank paid posts within the last 18 months meet the competing-financial-services threshold.",
  },
  {
    title: "confirmed (green)",
    riskLevel: "confirmed",
    riskValue: "green",
  },
];

function DemoCard({
  initial,
}: {
  initial: Omit<DemoState, "reset">;
}) {
  const [state, setState] = useState(initial);

  function handleChange(next: RiskLevelChange) {
    setState((prev) => ({
      ...prev,
      riskLevel: next.riskLevel,
      riskValue: next.riskValue,
    }));
  }

  function handleReset() {
    setState(initial);
  }

  return (
    <div className="space-y-8px border-b border-ash pb-16px last:border-b-0 last:pb-0">
      <div className="flex flex-wrap items-center justify-between gap-8px">
        <code className="font-mono text-caption text-fog">{state.title}</code>
        <div className="flex items-center gap-8px">
          <code className="font-mono text-caption text-silver">
            {state.riskLevel}
            {state.riskValue ? ` / ${state.riskValue}` : ""}
          </code>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-buttons border border-ash bg-canvas-white px-8px py-1 text-caption text-steel hover:border-smoke hover:text-charcoal"
          >
            Reset
          </button>
        </div>
      </div>
      <RiskLevelSelector
        riskLevel={state.riskLevel}
        riskValue={state.riskValue}
        riskReasoning={state.riskReasoning}
        onChange={handleChange}
        label="Risk Level"
      />
    </div>
  );
}

export function RiskLevelSelectorGallery() {
  return (
    <div className="space-y-16px">
      <div className="space-y-4px">
        <h2 className="text-subheading font-medium text-charcoal">
          RiskLevelSelector
        </h2>
        <p className="text-body text-steel">
          Three states from the analysis-engine spec:{" "}
          <code className="font-mono text-caption text-graphite">unset</code>,{" "}
          <code className="font-mono text-caption text-graphite">
            ai_suggested
          </code>{" "}
          (dashed + reasoning),{" "}
          <code className="font-mono text-caption text-graphite">confirmed</code>
          . One click confirms or overrides — no dialog.
        </p>
      </div>

      <div className="space-y-16px rounded-cards border border-ash bg-canvas-white p-24px shadow-subtle">
        {INITIAL_DEMOS.map((demo) => (
          <DemoCard key={demo.title} initial={demo} />
        ))}
      </div>
    </div>
  );
}
