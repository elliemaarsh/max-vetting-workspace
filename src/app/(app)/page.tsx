"use client";

import { useMemo } from "react";
import { CaseQueueSection } from "@/components/case-queue-section";
import { RoleSwitcher } from "@/components/role-switcher";
import { StatusSummaryStrip } from "@/components/status-summary-strip";
import { useCasesStore } from "@/store/cases-store";
import type { CaseSummary } from "@/types";

function toSummary(c: {
  id: string;
  influencerName: string;
  market: string;
  language: string;
  status: CaseSummary["status"];
  vettingDeadline: string;
  reviewDeadline: string;
  qaqcDeadline: string;
  submissionDeadline: string;
  isRevet: boolean;
  revetDate?: string;
  effort: CaseSummary["effort"];
  assignedAnalyst: string;
  assignedReviewer: string;
  assignedQAQC: string;
}): CaseSummary {
  return {
    id: c.id,
    influencerName: c.influencerName,
    market: c.market,
    language: c.language,
    status: c.status,
    vettingDeadline: c.vettingDeadline,
    reviewDeadline: c.reviewDeadline,
    qaqcDeadline: c.qaqcDeadline,
    submissionDeadline: c.submissionDeadline,
    isRevet: c.isRevet,
    revetDate: c.revetDate,
    effort: c.effort,
    assignedAnalyst: c.assignedAnalyst,
    assignedReviewer: c.assignedReviewer,
    assignedQAQC: c.assignedQAQC,
  };
}

export default function HomeQueuePage() {
  const fullCases = useCasesStore((s) => s.fullCases);
  const queueOnly = useCasesStore((s) => s.queueOnly);

  const summaries = useMemo(
    () => [...Object.values(fullCases).map(toSummary), ...queueOnly],
    [fullCases, queueOnly]
  );

  return (
    <main className="flex-1 overflow-auto">
      <header className="flex flex-wrap items-end justify-between gap-16px border-b border-ash bg-canvas-white px-16px py-20px md:px-24px">
        <div className="space-y-4px">
          <p className="font-mono text-caption text-steel">Home / Queue</p>
          <h1 className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
            What needs attention
          </h1>
          <p className="mt-4px text-body text-steel">
            Cases across the pipeline — sort, filter, and open the next deadline
            first. Status counts update when case stage changes in the
            workspace.
          </p>
        </div>
        <RoleSwitcher />
      </header>

      <div className="space-y-24px p-16px md:p-24px">
        <StatusSummaryStrip />
        <CaseQueueSection data={summaries} />
      </div>
    </main>
  );
}
