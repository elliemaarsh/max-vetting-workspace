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
 * Case-scoped sub-nav. Desktop/tablet-landscape: left rail.
 * Narrow tablet: horizontal scroll strip under the case header.
 */
export function CaseWorkspaceNav({ caseId }: CaseWorkspaceNavProps) {
  const pathname = usePathname();
  const base = `/cases/${caseId}`;

  return (
    <nav
      className={cn(
        "flex shrink-0 gap-4px border-ash bg-canvas-white p-8px",
        "w-full flex-row overflow-x-auto border-b",
        "md:w-44 md:flex-col md:overflow-visible md:border-b-0 md:border-r"
      )}
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
              "shrink-0 rounded-lg px-8px py-2 text-caption font-medium transition-colors whitespace-nowrap",
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
