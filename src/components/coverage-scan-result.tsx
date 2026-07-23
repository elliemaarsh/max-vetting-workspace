"use client";

import { AIOutputCard } from "@/components/ai-output-card";
import { CitationList } from "@/components/citation-block";
import type { Case, ScorecardSection } from "@/types";

type CoverageScanResultProps = {
  caseData: Case;
  inserted: boolean;
  onInsert: () => void;
  /** Optional override for demo timestamps / run IDs */
  timestamp?: string;
  runId?: string;
};

function findSection(
  sections: ScorecardSection[],
  name: string
): ScorecardSection | undefined {
  return sections.find((s) => s.sectionName === name);
}

/**
 * Static Coverage Scan output (AIOutputCard) scoped to the active case.
 * Relocated from the removed standalone AI Analysis page.
 */
export function CoverageScanResult({
  caseData,
  inserted,
  onInsert,
  timestamp = "2026-07-23T18:04:12Z",
  runId,
}: CoverageScanResultProps) {
  const track = findSection(
    caseData.scorecardSections,
    "Track Record & Personal Conduct"
  );
  const competitive = findSection(
    caseData.scorecardSections,
    "Competitive Partnerships"
  );
  const political = findSection(
    caseData.scorecardSections,
    "Political Involvement"
  );

  const gapSections = caseData.scorecardSections.filter(
    (s) => s.citations.length === 0
  );

  const resolvedRunId =
    runId ?? `run_scan_${caseData.id.replace(/^case-/, "")}_full_01`;

  return (
    <AIOutputCard
      mode="Coverage Scan"
      timestamp={timestamp}
      runId={resolvedRunId}
      inserted={inserted}
      onInsert={onInsert}
    >
      <div className="space-y-20px">
        <p className="text-body text-steel">
          Full coverage scan for{" "}
          <span className="font-medium text-charcoal">
            {caseData.influencerName}
          </span>{" "}
          ({caseData.market}). Public/hyperlinkable sources only. Lookbacks
          applied per section.
        </p>

        {track && track.citations.length > 0 ? (
          <div className="space-y-8px">
            <p className="text-caption font-semibold uppercase tracking-wide text-slate">
              {track.sectionName}
            </p>
            <p className="text-body text-steel">
              Found {track.citations.length} public item
              {track.citations.length === 1 ? "" : "s"} in the Brand Safety
              lookback.
            </p>
            <CitationList citations={track.citations} />
          </div>
        ) : null}

        {competitive && competitive.citations.length > 0 ? (
          <div className="space-y-8px">
            <p className="text-caption font-semibold uppercase tracking-wide text-slate">
              {competitive.sectionName}
            </p>
            <p className="text-body text-steel">
              Found {competitive.citations.length} item
              {competitive.citations.length === 1 ? "" : "s"} in the 18-month
              competitive window.
            </p>
            <CitationList citations={competitive.citations} />
          </div>
        ) : null}

        {political && political.citations.length > 0 ? (
          <div className="space-y-8px">
            <p className="text-caption font-semibold uppercase tracking-wide text-slate">
              {political.sectionName}
            </p>
            <p className="text-body text-steel">
              Found {political.citations.length} civic/political item
              {political.citations.length === 1 ? "" : "s"}.
            </p>
            <CitationList citations={political.citations} />
          </div>
        ) : null}

        <div className="space-y-8px">
          <p className="text-caption font-semibold uppercase tracking-wide text-slate">
            Gaps checked (no results)
          </p>
          {gapSections.length === 0 ? (
            <p className="text-body text-steel">
              Every section returned at least one citeable item in this mock
              pull.
            </p>
          ) : (
            <ul className="list-inside list-disc space-y-4px text-body text-steel">
              {gapSections.map((s) => (
                <li key={s.sectionName}>
                  {s.sectionName} — Instagram, X, TikTok, Google News checked;
                  nothing citeable in the lookback window.
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-cards border border-ash bg-paper-mist p-12px">
          <p className="text-caption font-semibold uppercase tracking-wide text-slate">
            Contradictions / ambiguities
          </p>
          <p className="mt-4px text-body text-steel">
            None flagged for {caseData.influencerName}. Evidence clusters are
            directionally consistent within each section.
          </p>
        </div>
      </div>
    </AIOutputCard>
  );
}
