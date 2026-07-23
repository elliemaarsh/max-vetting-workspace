import { notFound } from "next/navigation";
import { CaseEvidence } from "@/components/case-evidence";
import { getCaseById } from "@/lib/cases";

type PageProps = {
  params: { caseId: string };
};

export default function CaseEvidencePage({ params }: PageProps) {
  const caseData = getCaseById(params.caseId);
  if (!caseData) notFound();

  return <CaseEvidence caseData={caseData} />;
}
