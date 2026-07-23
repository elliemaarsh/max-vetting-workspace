import type { CaseStatus } from "@/types";
import { caseSummaries } from "@/data";
import {
  CASE_STATUS_CONFIG,
  CASE_STATUS_ORDER,
  getCaseStatusLabel,
} from "@/components/status-badge";
import { cn } from "@/lib/utils";

/** All CaseStatus values — keep in sync with CASE_STATUS_ORDER. */
export const SUMMARY_STRIP_STATUSES: CaseStatus[] = [...CASE_STATUS_ORDER];

export function countByStatus(
  statuses: CaseStatus[] = SUMMARY_STRIP_STATUSES
): Record<CaseStatus, number> {
  const counts = Object.fromEntries(
    statuses.map((s) => [s, 0])
  ) as Record<CaseStatus, number>;

  for (const row of caseSummaries) {
    if (row.status in counts) {
      counts[row.status] += 1;
    }
  }
  return counts;
}

type StatusSummaryStripProps = {
  className?: string;
};

/** Small stat cards — counts by status, not charts. */
export function StatusSummaryStrip({ className }: StatusSummaryStripProps) {
  const counts = countByStatus();

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-8px sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-9",
        className
      )}
    >
      {SUMMARY_STRIP_STATUSES.map((status) => {
        const count = counts[status] ?? 0;
        const { dotClass } = CASE_STATUS_CONFIG[status];
        return (
          <div
            key={status}
            className="rounded-cards border border-ash bg-canvas-white px-12px py-12px shadow-subtle"
          >
            <div className="mb-8px flex items-center gap-1.5">
              <span
                className={cn("size-1.5 shrink-0 rounded-full", dotClass)}
                aria-hidden="true"
              />
              <p className="truncate text-caption font-medium text-steel">
                {getCaseStatusLabel(status)}
              </p>
            </div>
            <p className="font-display text-heading-sm font-medium tracking-tight text-charcoal">
              {count}
            </p>
          </div>
        );
      })}
    </div>
  );
}
