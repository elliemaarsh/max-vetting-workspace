import { CaseOverviewContainer } from "@/components/case-overview-container";

type PageProps = {
  params: { caseId: string };
};

export default function CaseOverviewPage({ params }: PageProps) {
  return <CaseOverviewContainer caseId={params.caseId} />;
}
