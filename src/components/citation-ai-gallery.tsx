"use client";

import { useState } from "react";
import { AIOutputCard } from "@/components/ai-output-card";
import { CitationList } from "@/components/citation-block";
import { maraWhitfieldCase } from "@/data";

const trackRecord = maraWhitfieldCase.scorecardSections.find(
  (s) => s.sectionName === "Track Record & Personal Conduct"
)!;

const competitive = maraWhitfieldCase.scorecardSections.find(
  (s) => s.sectionName === "Competitive Partnerships"
)!;

export function CitationAndAIOutputGallery() {
  const [scanInserted, setScanInserted] = useState(false);
  const [assemblyInserted, setAssemblyInserted] = useState(false);

  return (
    <div className="space-y-32px">
      <div className="space-y-16px">
        <div className="space-y-4px">
          <h2 className="text-subheading font-medium text-charcoal">
            CitationBlock
          </h2>
          <p className="text-body text-steel">
            Month Year prefix, hyperlinked platform/publication name, quote.
            Lists sort by <code className="font-mono text-caption">order</code>{" "}
            ascending (reverse-chron). Sample: Mara Whitfield — Track Record.
          </p>
        </div>

        <div className="rounded-cards border border-ash bg-canvas-white p-24px shadow-subtle">
          <CitationList citations={trackRecord.citations} />
        </div>
      </div>

      <div className="space-y-16px">
        <div className="space-y-4px">
          <h2 className="text-subheading font-medium text-charcoal">
            AIOutputCard
          </h2>
          <p className="text-body text-steel">
            Mode label, timestamp/run ID, content slot, single{" "}
            <span className="font-medium text-charcoal">Insert into case</span>{" "}
            action — nothing auto-commits. In product, Coverage Scan cards
            render on Evidence; risk suggestions feed Scorecard selectors.
          </p>
        </div>

        <div className="space-y-16px">
          <AIOutputCard
            mode="Coverage Scan"
            timestamp="2026-07-22T14:12:08Z"
            runId="run_scan_mw_01"
            inserted={scanInserted}
            onInsert={() => setScanInserted(true)}
          >
            <div className="space-y-8px">
              <p className="text-caption font-semibold uppercase tracking-wide text-slate">
                Track Record & Personal Conduct
              </p>
              <p className="text-body text-steel">
                Found 3 public items in the lookback window. Gaps checked:
                Instagram, X, TikTok, Google News — no additional misconduct
                hits beyond the scoring dispute cluster below.
              </p>
              <CitationList citations={trackRecord.citations} />
            </div>
          </AIOutputCard>

          <AIOutputCard
            mode="Scorecard Assembly"
            timestamp="2026-07-22T14:18:41Z"
            runId="run_asm_mw_02"
            inserted={assemblyInserted}
            onInsert={() => setAssemblyInserted(true)}
          >
            <div className="space-y-12px">
              <p className="text-caption font-semibold uppercase tracking-wide text-slate">
                Competitive Partnerships
              </p>
              <p className="text-body text-charcoal">{competitive.summary}</p>
              <CitationList citations={competitive.citations} />
              <p className="rounded-cards border border-dashed border-electric-blue bg-[#eff6ff] p-12px text-body text-slate">
                <span className="font-medium text-electric-blue">
                  AI-suggested risk:{" "}
                </span>
                {competitive.riskReasoning}
              </p>
            </div>
          </AIOutputCard>
        </div>
      </div>
    </div>
  );
}
