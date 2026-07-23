"use client";

import { CaseOverview } from "@/components/case-overview";
import { useCasesStore } from "@/store/cases-store";

type Props = { caseId: string };

export function CaseOverviewContainer({ caseId }: Props) {
  const caseData = useCasesStore((s) => s.fullCases[caseId]);
  if (!caseData) return null;
  return <CaseOverview caseData={caseData} />;
}
