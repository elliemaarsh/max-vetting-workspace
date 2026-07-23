export type AuditActorKind = "human" | "ai";

export type AuditEvent = {
  id: string;
  timestamp: string;
  actor: string;
  actorKind: AuditActorKind;
  action: string;
  caseId: string;
  caseName: string;
  before: string;
  after: string;
};

/**
 * Immutable-feeling mock audit log — includes human status changes and AI runs
 * (Coverage Scans, Risk Level suggestions) so Reports can replace the old
 * standalone AI Analysis "past outputs" browse.
 */
export const auditEvents: AuditEvent[] = [
  {
    id: "evt-01",
    timestamp: "2026-07-23T18:22:47Z",
    actor: "MAX Analysis Engine",
    actorKind: "ai",
    action: "Suggest Risk Level",
    caseId: "case-mara-whitfield",
    caseName: "Mara Whitfield",
    before: "Competitive Partnerships · unset",
    after: "Competitive Partnerships · ai_suggested red",
  },
  {
    id: "evt-02",
    timestamp: "2026-07-23T18:04:12Z",
    actor: "MAX Analysis Engine",
    actorKind: "ai",
    action: "Coverage Scan",
    caseId: "case-mara-whitfield",
    caseName: "Mara Whitfield",
    before: "—",
    after: "run_scan_mara-whitfield_full_01 · 3 sections with finds",
  },
  {
    id: "evt-03",
    timestamp: "2026-07-22T16:40:00Z",
    actor: "Alex Rivera",
    actorKind: "human",
    action: "Status change",
    caseId: "case-mara-whitfield",
    caseName: "Mara Whitfield",
    before: "assigned",
    after: "vetting_in_progress",
  },
  {
    id: "evt-04",
    timestamp: "2026-07-22T15:12:08Z",
    actor: "MAX Analysis Engine",
    actorKind: "ai",
    action: "Suggest Risk Level",
    caseId: "case-mara-whitfield",
    caseName: "Mara Whitfield",
    before: "Track Record · unset",
    after: "Track Record · ai_suggested yellow",
  },
  {
    id: "evt-05",
    timestamp: "2026-07-21T19:05:33Z",
    actor: "MAX Analysis Engine",
    actorKind: "ai",
    action: "Coverage Scan",
    caseId: "case-julian-voss",
    caseName: "Julian Voss",
    before: "—",
    after: "run_scan_julian-voss_full_01 · political + affiliations finds",
  },
  {
    id: "evt-06",
    timestamp: "2026-07-21T19:18:02Z",
    actor: "MAX Analysis Engine",
    actorKind: "ai",
    action: "Suggest Risk Level",
    caseId: "case-julian-voss",
    caseName: "Julian Voss",
    before: "Political Involvement · unset",
    after: "Political Involvement · ai_suggested yellow",
  },
  {
    id: "evt-07",
    timestamp: "2026-07-21T11:02:00Z",
    actor: "Morgan Blake",
    actorKind: "human",
    action: "Status change",
    caseId: "case-julian-voss",
    caseName: "Julian Voss",
    before: "vetting_in_progress",
    after: "vetting_in_review",
  },
  {
    id: "evt-08",
    timestamp: "2026-07-20T14:30:00Z",
    actor: "Sam Okonkwo",
    actorKind: "human",
    action: "Confirm risk level",
    caseId: "case-julian-voss",
    caseName: "Julian Voss",
    before: "Brand Values · ai_suggested green",
    after: "Brand Values · confirmed green",
  },
  {
    id: "evt-09",
    timestamp: "2026-07-19T09:15:00Z",
    actor: "Alex Rivera",
    actorKind: "human",
    action: "Add citation",
    caseId: "case-mara-whitfield",
    caseName: "Mara Whitfield",
    before: "Industry · 1 citation",
    after: "Industry · 2 citations",
  },
  {
    id: "evt-10",
    timestamp: "2026-07-18T17:44:11Z",
    actor: "MAX Analysis Engine",
    actorKind: "ai",
    action: "Suggest Risk Level",
    caseId: "case-julian-voss",
    caseName: "Julian Voss",
    before: "Competitive Partnerships · unset",
    after: "Competitive Partnerships · ai_suggested red",
  },
];
