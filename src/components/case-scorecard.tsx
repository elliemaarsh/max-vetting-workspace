"use client";

import { useState } from "react";
import { AddCitationDialog } from "@/components/add-citation-dialog";
import { CitationList } from "@/components/citation-block";
import {
  RiskLevelSelector,
  type RiskLevelChange,
  type RiskValue,
} from "@/components/risk-level-selector";
import { insertCitationReverseChron } from "@/lib/citation";
import type { Case, Citation, ScorecardSection } from "@/types";

type CaseScorecardProps = {
  caseData: Case;
};

/** Fixture suggestion payload from the case mock (Assembly / risk module). */
function suggestionForSection(
  caseData: Case,
  sectionName: string
): { riskValue: RiskValue; riskReasoning: string } | null {
  const source = caseData.scorecardSections.find(
    (s) => s.sectionName === sectionName
  );
  if (!source?.riskValue || !source.riskReasoning) return null;
  return {
    riskValue: source.riskValue,
    riskReasoning: source.riskReasoning,
  };
}

export function CaseScorecard({ caseData }: CaseScorecardProps) {
  const [sections, setSections] = useState<ScorecardSection[]>(() =>
    caseData.scorecardSections.map((s) => ({
      ...s,
      citations: [...s.citations],
    }))
  );
  const [addForIndex, setAddForIndex] = useState<number | null>(null);

  function updateSummary(index: number, summary: string) {
    setSections((prev) =>
      prev.map((section, i) => (i === index ? { ...section, summary } : section))
    );
  }

  function updateRisk(index: number, next: RiskLevelChange) {
    setSections((prev) =>
      prev.map((section, i) =>
        i === index
          ? {
              ...section,
              riskLevel: next.riskLevel,
              riskValue: next.riskValue,
            }
          : section
      )
    );
  }

  function suggestRiskLevel(index: number) {
    const section = sections[index];
    if (!section) return;
    const suggestion = suggestionForSection(caseData, section.sectionName);
    if (!suggestion) return;

    setSections((prev) =>
      prev.map((s, i) =>
        i === index
          ? {
              ...s,
              riskLevel: "ai_suggested",
              riskValue: suggestion.riskValue,
              riskReasoning: suggestion.riskReasoning,
            }
          : s
      )
    );
  }

  function addCitation(index: number, draft: Omit<Citation, "order">) {
    setSections((prev) =>
      prev.map((section, i) =>
        i === index
          ? {
              ...section,
              citations: insertCitationReverseChron(section.citations, draft),
            }
          : section
      )
    );
  }

  const activeSection =
    addForIndex !== null ? sections[addForIndex] : undefined;

  return (
    <div className="space-y-24px">
      <div>
        <h2 className="text-subheading font-medium text-charcoal">
          Scorecard Draft
        </h2>
        <p className="mt-4px text-body text-steel">
          AI-drafted summaries are editable. Use Suggest Risk Level for an
          AI-suggested state, then confirm or override — humans own the final
          call.
        </p>
      </div>

      <div className="space-y-16px">
        {sections.map((section, index) => {
          const canSuggest = Boolean(
            suggestionForSection(caseData, section.sectionName)
          );

          return (
            <article
              key={section.sectionName}
              className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle"
            >
              <header className="mb-16px flex flex-wrap items-baseline justify-between gap-8px border-b border-ash pb-12px">
                <h3 className="text-subheading font-medium text-charcoal">
                  {section.sectionName}
                </h3>
                <p className="font-mono text-caption text-fog">
                  {index + 1} / {sections.length}
                </p>
              </header>

              <div className="space-y-16px">
                <div className="space-y-8px">
                  <label
                    htmlFor={`scorecard-summary-${index}`}
                    className="text-caption font-semibold uppercase tracking-wide text-slate"
                  >
                    Summary
                  </label>
                  <textarea
                    id={`scorecard-summary-${index}`}
                    value={section.summary}
                    onChange={(e) => updateSummary(index, e.target.value)}
                    rows={4}
                    className="w-full resize-y rounded-lg border border-ash bg-canvas-white px-12px py-8px text-body text-charcoal placeholder:text-fog focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
                  />
                  <p className="text-caption text-fog">
                    AI-drafted — edit freely. Changes stay local until export.
                  </p>
                </div>

                <div className="space-y-8px">
                  <div className="flex flex-wrap items-center justify-between gap-8px">
                    <p className="text-caption font-semibold uppercase tracking-wide text-slate">
                      Citations
                    </p>
                    <button
                      type="button"
                      onClick={() => setAddForIndex(index)}
                      className="rounded-buttons border border-ash bg-canvas-white px-12px py-1.5 text-caption font-medium text-steel hover:border-smoke hover:text-charcoal"
                    >
                      Add Citation
                    </button>
                  </div>
                  <div className="rounded-lg bg-paper-mist p-12px">
                    <CitationList
                      citations={section.citations}
                      emptyLabel="No citations gathered for this section."
                    />
                  </div>
                </div>

                <div className="space-y-8px">
                  <div className="flex flex-wrap items-center justify-between gap-8px">
                    <p className="text-caption font-semibold uppercase tracking-wide text-slate">
                      Risk
                    </p>
                    <button
                      type="button"
                      disabled={!canSuggest}
                      onClick={() => suggestRiskLevel(index)}
                      className="rounded-buttons border border-dashed border-electric-blue bg-[#eff6ff] px-12px py-1.5 text-caption font-medium text-electric-blue hover:bg-[#dbeaff] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Suggest Risk Level
                    </button>
                  </div>
                  <RiskLevelSelector
                    label="Risk Level"
                    riskLevel={section.riskLevel}
                    riskValue={section.riskValue}
                    riskReasoning={section.riskReasoning}
                    onChange={(next) => updateRisk(index, next)}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {activeSection ? (
        <AddCitationDialog
          open={addForIndex !== null}
          sectionName={activeSection.sectionName}
          onClose={() => setAddForIndex(null)}
          onSubmit={(citation) => {
            if (addForIndex !== null) addCitation(addForIndex, citation);
          }}
        />
      ) : null}
    </div>
  );
}
