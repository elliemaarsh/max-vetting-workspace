import { CaseActivity } from "@/components/case-activity";

type PageProps = {
  params: { caseId: string };
};

export default function CaseActivityPage({ params }: PageProps) {
  return <CaseActivity caseId={params.caseId} />;
}
