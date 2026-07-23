import { CaseWorkspaceShell } from "@/components/case-workspace-shell";
import { isKnownFullCaseId } from "@/store/cases-store";
import { notFound } from "next/navigation";

type CaseLayoutProps = {
  children: React.ReactNode;
  params: { caseId: string };
};

export default function CaseWorkspaceLayout({
  children,
  params,
}: CaseLayoutProps) {
  if (!isKnownFullCaseId(params.caseId)) {
    notFound();
  }

  return (
    <CaseWorkspaceShell caseId={params.caseId}>{children}</CaseWorkspaceShell>
  );
}
