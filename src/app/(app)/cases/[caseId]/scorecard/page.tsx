import { notFound } from "next/navigation";
import { CaseScorecard } from "@/components/case-scorecard";
import { getCaseById } from "@/lib/cases";

type PageProps = {
  params: { caseId: string };
};

export default function CaseScorecardPage({ params }: PageProps) {
  const caseData = getCaseById(params.caseId);
  if (!caseData) notFound();

  return <CaseScorecard caseData={caseData} />;
}
