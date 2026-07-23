"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { segment: "", label: "Overview" },
  { segment: "evidence", label: "Evidence" },
  { segment: "scorecard", label: "Scorecard Draft" },
  { segment: "notes", label: "Reviewer Notes" },
  { segment: "activity", label: "Activity" },
] as const;

type CaseWorkspaceNavProps = {
  caseId: string;
};

/**
 * Case-scoped sub-nav — distinct from the app sidebar.
 * Narrow rail with Dub active tint; sits inside the case shell.
 */
export function CaseWorkspaceNav({ caseId }: CaseWorkspaceNavProps) {
  const pathname = usePathname();
  const base = `/cases/${caseId}`;

  return (
    <nav
      className="flex w-44 shrink-0 flex-col gap-4px border-r border-ash bg-canvas-white p-8px"
      aria-label="Case sections"
    >
      {SECTIONS.map((section) => {
        const href = section.segment ? `${base}/${section.segment}` : base;
        const active =
          section.segment === ""
            ? pathname === base || pathname === `${base}/`
            : pathname.startsWith(`${base}/${section.segment}`);

        return (
          <Link
            key={section.label}
            href={href}
            className={cn(
              "rounded-lg px-8px py-2 text-caption font-medium transition-colors",
              active
                ? "bg-[#dbeaff] text-charcoal"
                : "text-slate hover:bg-paper-mist hover:text-charcoal"
            )}
            aria-current={active ? "page" : undefined}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
