import type { CaseStatus, CaseSummary } from "@/types";

export type DeadlineUrgency = "overdue" | "due_today" | "on_track";

export type DeadlineField =
  | "vettingDeadline"
  | "reviewDeadline"
  | "qaqcDeadline"
  | "submissionDeadline";

export const DEADLINE_FIELD_LABELS: Record<DeadlineField, string> = {
  vettingDeadline: "Vetting",
  reviewDeadline: "Review",
  qaqcDeadline: "QA/QC",
  submissionDeadline: "Submission",
};

/** Local calendar date as YYYY-MM-DD (avoids UTC shift on date-only strings). */
export function toLocalDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getDeadlineUrgency(
  deadline: string,
  today: string = toLocalDateString()
): DeadlineUrgency {
  const day = deadline.slice(0, 10);
  if (day < today) return "overdue";
  if (day === today) return "due_today";
  return "on_track";
}

export function formatDeadlineLabel(deadline: string): string {
  const day = deadline.slice(0, 10);
  const [y, m, d] = day.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Which deadline is "next" for the case's current pipeline stage.
 * Returns null for hold (paused) and submitted (complete) — no active next date.
 */
export function getNextDeadlineField(status: CaseStatus): DeadlineField | null {
  switch (status) {
    case "hold":
    case "submitted":
      return null;
    case "received":
    case "assigned":
    case "vetting_in_progress":
      return "vettingDeadline";
    case "vetting_in_review":
    case "revisions_in_progress":
      return "reviewDeadline";
    case "vetting_complete":
      return "qaqcDeadline";
    case "qaqc_complete":
      return "submissionDeadline";
  }
}

/** Active next deadline date, or null when none applies (hold / submitted). */
export function getNextDeadline(
  row: Pick<
    CaseSummary,
    | "status"
    | "vettingDeadline"
    | "reviewDeadline"
    | "qaqcDeadline"
    | "submissionDeadline"
  >
): string | null {
  const field = getNextDeadlineField(row.status);
  return field ? row[field] : null;
}
