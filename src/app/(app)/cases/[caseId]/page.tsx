import { notFound } from "next/navigation";
import { CaseOverview } from "@/components/case-overview";
import { getCaseById } from "@/lib/cases";

type PageProps = {
  params: { caseId: string };
};

export default function CaseOverviewPage({ params }: PageProps) {
  const caseData = getCaseById(params.caseId);
  if (!caseData) notFound();

  return <CaseOverview caseData={caseData} />;
}
