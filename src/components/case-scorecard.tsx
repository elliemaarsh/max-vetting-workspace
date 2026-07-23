"use client";

import { useState } from "react";
import { AddCitationDialog } from "@/components/add-citation-dialog";
import { CitationList } from "@/components/citation-block";
import {
  RiskLevelSelector,
  type RiskLevelChange,
} from "@/components/risk-level-selector";
import { SEED_RISK_SUGGESTIONS } from "@/lib/seed-risk";
import { useCasesStore } from "@/store/cases-store";

type Props = { caseId: string };

export function CaseScorecard({ caseId }: Props) {
  const caseData = useCasesStore((s) => s.fullCases[caseId]);
  const updateSectionSummary = useCasesStore((s) => s.updateSectionSummary);
  const updateSectionRisk = useCasesStore((s) => s.updateSectionRisk);
  const suggestSectionRisk = useCasesStore((s) => s.suggestSectionRisk);
  const addSectionCitation = useCasesStore((s) => s.addSectionCitation);

  const [addForIndex, setAddForIndex] = useState<number | null>(null);

  if (!caseData) return null;

  const sections = caseData.scorecardSections;
  const activeSection =
    addForIndex !== null ? sections[addForIndex] : undefined;

  function handleRiskChange(sectionName: string, next: RiskLevelChange) {
    updateSectionRisk(caseId, sectionName, next);
  }

  function handleSuggest(sectionName: string) {
    const suggestion = SEED_RISK_SUGGESTIONS[caseId]?.[sectionName];
    if (!suggestion) return;
    suggestSectionRisk(caseId, sectionName, suggestion);
  }

  return (
    <div className="space-y-24px">
      <div>
        <h2 className="text-subheading font-medium text-charcoal">
          Scorecard Draft
        </h2>
        <p className="mt-4px text-body text-steel">
          Edits, citations, and risk confirms write to shared case state.
          Confirming all section risks advances the case to In Review (visible
          on Home).
        </p>
      </div>

      <div className="space-y-16px">
        {sections.map((section, index) => {
          const canSuggest = Boolean(
            SEED_RISK_SUGGESTIONS[caseId]?.[section.sectionName]
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
                    onChange={(e) =>
                      updateSectionSummary(
                        caseId,
                        section.sectionName,
                        e.target.value
                      )
                    }
                    rows={4}
                    className="w-full resize-y rounded-lg border border-ash bg-canvas-white px-12px py-8px text-body text-charcoal placeholder:text-fog focus:border-electric-blue focus:outline-none focus:ring-1 focus:ring-electric-blue"
                  />
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
                      onClick={() => handleSuggest(section.sectionName)}
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
                    onChange={(next) =>
                      handleRiskChange(section.sectionName, next)
                    }
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
            addSectionCitation(caseId, activeSection.sectionName, citation);
          }}
        />
      ) : null}
    </div>
  );
}
