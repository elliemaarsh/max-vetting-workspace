import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import { CaseWorkspaceNav } from "@/components/case-workspace-nav";
import { getCaseById } from "@/lib/cases";

type CaseLayoutProps = {
  children: React.ReactNode;
  params: { caseId: string };
};

export default function CaseWorkspaceLayout({
  children,
  params,
}: CaseLayoutProps) {
  const caseData = getCaseById(params.caseId);
  if (!caseData) notFound();

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
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <CaseWorkspaceNav caseId={caseData.id} />
        <div className="min-w-0 flex-1 overflow-auto p-24px">{children}</div>
      </div>
    </main>
  );
}
