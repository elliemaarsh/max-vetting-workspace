import { CaseEvidenceContainer } from "@/components/case-evidence";

type PageProps = {
  params: { caseId: string };
};

export default function CaseEvidencePage({ params }: PageProps) {
  return <CaseEvidenceContainer caseId={params.caseId} />;
}
