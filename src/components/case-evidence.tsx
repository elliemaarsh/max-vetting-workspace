"use client";

import { useState } from "react";
import { CitationBlock } from "@/components/citation-block";
import { CoverageScanResult } from "@/components/coverage-scan-result";
import { SocialProfilesModule } from "@/components/social-profiles-module";
import type { Case, Citation } from "@/types";

type EvidenceItem = {
  citation: Citation;
  sectionName: string;
  key: string;
};

function gatherEvidence(caseData: Case): EvidenceItem[] {
  const items: EvidenceItem[] = [];

  for (const section of caseData.scorecardSections) {
    for (const citation of section.citations) {
      items.push({
        citation,
        sectionName: section.sectionName,
        key: `${section.sectionName}-${citation.order}-${citation.url}`,
      });
    }
  }

  return items.sort((a, b) => {
    const dateCmp = b.citation.date.localeCompare(a.citation.date);
    if (dateCmp !== 0) return dateCmp;
    return a.citation.order - b.citation.order;
  });
}

type CaseEvidenceProps = {
  caseData: Case;
};

export function CaseEvidence({ caseData }: CaseEvidenceProps) {
  const evidence = gatherEvidence(caseData);
  const [scanVisible, setScanVisible] = useState(false);
  const [scanInserted, setScanInserted] = useState(false);

  return (
    <div className="space-y-32px">
      <div className="flex flex-wrap items-start justify-between gap-12px">
        <div>
          <h2 className="text-subheading font-medium text-charcoal">
            Evidence
          </h2>
          <p className="mt-4px text-body text-steel">
            Confirmed social channels and gathered source items mapped to
            scorecard sections. Run a Coverage Scan to draft AI findings in
            context — nothing inserts without an explicit click.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setScanVisible(true)}
          className="shrink-0 rounded-buttons bg-primary-action px-16px py-2 text-caption font-medium text-canvas-white hover:bg-midnight-ink"
        >
          Run Coverage Scan
        </button>
      </div>

      {scanVisible ? (
        <section className="space-y-8px">
          <div className="flex flex-wrap items-baseline justify-between gap-8px">
            <h3 className="text-subheading font-medium text-charcoal">
              Coverage Scan result
            </h3>
            <p className="font-mono text-caption text-fog">
              Static mock · scoped to {caseData.id}
            </p>
          </div>
          <CoverageScanResult
            caseData={caseData}
            inserted={scanInserted}
            onInsert={() => setScanInserted(true)}
          />
        </section>
      ) : null}

      <section className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle">
        <SocialProfilesModule profiles={caseData.socialProfiles} />
      </section>

      <section className="space-y-16px">
        <div className="flex flex-wrap items-baseline justify-between gap-8px">
          <h3 className="text-subheading font-medium text-charcoal">
            Gathered evidence
          </h3>
          <p className="font-mono text-caption text-fog">
            {evidence.length} item{evidence.length === 1 ? "" : "s"}
          </p>
        </div>

        {evidence.length === 0 ? (
          <p className="rounded-cards border border-dashed border-ash bg-canvas-white px-24px py-16px text-center text-body text-fog">
            No evidence items gathered for this case yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-12px">
            {evidence.map((item) => (
              <li
                key={item.key}
                className="rounded-cards border border-ash bg-canvas-white p-16px shadow-subtle"
              >
                <div className="mb-12px">
                  <span className="rounded-tags bg-paper-mist px-8px py-1 text-caption font-medium text-slate">
                    {item.sectionName}
                  </span>
                </div>
                <CitationBlock citation={item.citation} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
