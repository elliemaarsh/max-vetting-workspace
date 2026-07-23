import type { CaseStatus } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Dub Status Badge: tinted pill + colored dot + text label.
 * Color is never the only signal — label is always present.
 */
export const CASE_STATUS_ORDER: CaseStatus[] = [
  "received",
  "assigned",
  "vetting_in_progress",
  "vetting_in_review",
  "revisions_in_progress",
  "vetting_complete",
  "qaqc_complete",
  "hold",
  "submitted",
];

export const CASE_STATUS_CONFIG: Record<
  CaseStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  received: {
    label: "Received",
    badgeClass: "bg-paper-mist text-charcoal",
    dotClass: "bg-fog",
  },
  assigned: {
    label: "Assigned",
    badgeClass: "bg-[#dbeaff] text-charcoal",
    dotClass: "bg-electric-blue",
  },
  vetting_in_progress: {
    label: "Vetting In Progress",
    badgeClass: "bg-[#fff7ed] text-charcoal",
    dotClass: "bg-tangerine",
  },
  vetting_in_review: {
    label: "In Review",
    badgeClass: "bg-[#f3e8ff] text-charcoal",
    dotClass: "bg-lavender",
  },
  revisions_in_progress: {
    label: "Revisions",
    badgeClass: "bg-[#fef3c7] text-charcoal",
    dotClass: "bg-[#d97706]",
  },
  vetting_complete: {
    label: "Vetting Complete",
    badgeClass: "bg-soft-mint text-charcoal",
    dotClass: "bg-vivid-green",
  },
  qaqc_complete: {
    label: "QA/QC Complete",
    badgeClass: "bg-soft-mint text-charcoal",
    dotClass: "bg-vivid-green",
  },
  hold: {
    label: "Hold",
    badgeClass: "bg-[#fee2e2] text-charcoal",
    dotClass: "bg-[#dc2626]",
  },
  submitted: {
    label: "Submitted",
    badgeClass: "bg-[#e0e7ff] text-charcoal",
    dotClass: "bg-deep-sapphire",
  },
};

export function getCaseStatusLabel(status: CaseStatus): string {
  return CASE_STATUS_CONFIG[status].label;
}

type StatusBadgeProps = {
  status: CaseStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, badgeClass, dotClass } = CASE_STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-tags px-2.5 py-1.5 text-caption font-medium leading-none",
        badgeClass,
        className
      )}
      data-status={status}
    >
      <span
        className={cn("size-1.5 shrink-0 rounded-full", dotClass)}
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
