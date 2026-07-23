import type { Case, CaseSummary } from "@/types";
import { julianVossCase } from "./julian-voss";
import { maraWhitfieldCase } from "./mara-whitfield";
import { queueOnlyCases } from "./queue-cases";

export { julianVossCase } from "./julian-voss";
export { maraWhitfieldCase } from "./mara-whitfield";
export { queueOnlyCases } from "./queue-cases";
export { auditEvents } from "./audit-events";
export type { AuditEvent, AuditActorKind } from "./audit-events";

/** Full cases with scorecards + social profiles (demo fixtures). */
export const fullCases: Case[] = [maraWhitfieldCase, julianVossCase];

export const casesById: Record<string, Case> = Object.fromEntries(
  fullCases.map((c) => [c.id, c])
);

function toSummary(c: Case): CaseSummary {
  const {
    id,
    influencerName,
    market,
    language,
    status,
    vettingDeadline,
    reviewDeadline,
    qaqcDeadline,
    submissionDeadline,
    isRevet,
    revetDate,
    effort,
    assignedAnalyst,
    assignedReviewer,
    assignedQAQC,
  } = c;
  return {
    id,
    influencerName,
    market,
    language,
    status,
    vettingDeadline,
    reviewDeadline,
    qaqcDeadline,
    submissionDeadline,
    isRevet,
    revetDate,
    effort,
    assignedAnalyst,
    assignedReviewer,
    assignedQAQC,
  };
}

/** All queue rows: 2 full cases + 5 lightweight entries. */
export const caseSummaries: CaseSummary[] = [
  toSummary(maraWhitfieldCase),
  toSummary(julianVossCase),
  ...queueOnlyCases,
];
