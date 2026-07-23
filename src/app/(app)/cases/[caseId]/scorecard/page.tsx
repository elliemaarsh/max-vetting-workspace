import { CaseScorecard } from "@/components/case-scorecard";

type PageProps = {
  params: { caseId: string };
};

export default function CaseScorecardPage({ params }: PageProps) {
  return <CaseScorecard caseId={params.caseId} />;
}
