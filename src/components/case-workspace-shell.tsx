"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { StatusBadge } from "@/components/status-badge";
import { CaseWorkspaceNav } from "@/components/case-workspace-nav";
import { isKnownFullCaseId, useCasesStore } from "@/store/cases-store";
import type { CaseStatus } from "@/types";
import { CASE_STATUS_ORDER, getCaseStatusLabel } from "@/components/status-badge";

type CaseWorkspaceShellProps = {
  caseId: string;
  children: React.ReactNode;
};

/**
 * Live case chrome — status + identity come from Zustand so queue/header stay in sync.
 */
export function CaseWorkspaceShell({
  caseId,
  children,
}: CaseWorkspaceShellProps) {
  const caseData = useCasesStore((s) => s.fullCases[caseId]);
  const setCaseStatus = useCasesStore((s) => s.setCaseStatus);

  useEffect(() => {
    if (!isKnownFullCaseId(caseId)) {
      notFound();
    }
  }, [caseId]);

  if (!caseData) {
    if (!isKnownFullCaseId(caseId)) {
      notFound();
    }
    return null;
  }

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <header className="border-b border-ash bg-canvas-white px-24px py-16px">
        <div className="flex flex-wrap items-start justify-between gap-12px">
          <div className="space-y-4px">
            <p className="font-mono text-caption text-fog">
              <Link href="/cases" className="hover:text-steel">
                Case Workspace
              </Link>
              <span className="mx-1 text-ash">/</span>
              <span>{caseData.id}</span>
            </p>
            <div className="flex flex-wrap items-center gap-12px">
              <h1 className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
                {caseData.influencerName}
              </h1>
              <StatusBadge status={caseData.status} />
            </div>
            <p className="text-body text-steel">
              {caseData.market} · {caseData.language} · {caseData.engagement}
            </p>
          </div>

          <label className="flex flex-col gap-4px text-caption text-steel">
            Pipeline status
            <select
              value={caseData.status}
              onChange={(e) =>
                setCaseStatus(caseId, e.target.value as CaseStatus)
              }
              className="rounded-lg border border-ash bg-canvas-white px-12px py-2 text-caption font-medium text-charcoal focus:border-electric-blue focus:outline-none"
              aria-label="Change case status"
            >
              {CASE_STATUS_ORDER.map((status) => (
                <option key={status} value={status}>
                  {getCaseStatusLabel(status)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <CaseWorkspaceNav caseId={caseData.id} />
        <div className="min-w-0 flex-1 overflow-auto p-24px">{children}</div>
      </div>
    </main>
  );
}
