import { create } from "zustand";
import { auditEvents as seedAuditEvents, type AuditEvent } from "@/data/audit-events";
import { fullCases as seedFullCases, queueOnlyCases } from "@/data";
import type { Case, CaseStatus, CaseSummary, Citation, ScorecardSection } from "@/types";
import type { RiskLevelChange, RiskValue } from "@/components/risk-level-selector";
import { insertCitationReverseChron } from "@/lib/citation";

export type DemoRole = "Analyst" | "Reviewer" | "QA/QC";

function cloneCase(c: Case): Case {
  return structuredClone(c);
}

function toSummary(c: Case | CaseSummary): CaseSummary {
  return {
    id: c.id,
    influencerName: c.influencerName,
    market: c.market,
    language: c.language,
    status: c.status,
    vettingDeadline: c.vettingDeadline,
    reviewDeadline: c.reviewDeadline,
    qaqcDeadline: c.qaqcDeadline,
    submissionDeadline: c.submissionDeadline,
    isRevet: c.isRevet,
    revetDate: c.revetDate,
    effort: c.effort,
    assignedAnalyst: c.assignedAnalyst,
    assignedReviewer: c.assignedReviewer,
    assignedQAQC: c.assignedQAQC,
  };
}

function nowIso(): string {
  return new Date().toISOString();
}

function allRisksConfirmed(sections: ScorecardSection[]): boolean {
  return (
    sections.length > 0 &&
    sections.every((s) => s.riskLevel === "confirmed" && Boolean(s.riskValue))
  );
}

type CasesStore = {
  fullCases: Record<string, Case>;
  queueOnly: CaseSummary[];
  coverageScanInserted: Record<string, boolean>;
  auditLog: AuditEvent[];
  role: DemoRole;

  getCase: (caseId: string) => Case | undefined;
  getSummaries: () => CaseSummary[];
  listFullCases: () => Case[];

  setRole: (role: DemoRole) => void;
  setCaseStatus: (caseId: string, status: CaseStatus, actor?: string) => void;

  updateSectionSummary: (
    caseId: string,
    sectionName: string,
    summary: string
  ) => void;
  updateSectionRisk: (
    caseId: string,
    sectionName: string,
    next: RiskLevelChange
  ) => void;
  suggestSectionRisk: (
    caseId: string,
    sectionName: string,
    suggestion: { riskValue: RiskValue; riskReasoning: string }
  ) => void;
  addSectionCitation: (
    caseId: string,
    sectionName: string,
    draft: Omit<Citation, "order">
  ) => void;

  /** Insert Coverage Scan into case — records audit + may advance status. */
  insertCoverageScan: (caseId: string, runId: string) => void;

  resetDemoData: () => void;
};

function buildInitialFullCases(): Record<string, Case> {
  return Object.fromEntries(seedFullCases.map((c) => [c.id, cloneCase(c)]));
}

function pushAudit(
  log: AuditEvent[],
  event: Omit<AuditEvent, "id" | "timestamp"> & {
    id?: string;
    timestamp?: string;
  }
): AuditEvent[] {
  const entry: AuditEvent = {
    id: event.id ?? `evt-live-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: event.timestamp ?? nowIso(),
    actor: event.actor,
    actorKind: event.actorKind,
    action: event.action,
    caseId: event.caseId,
    caseName: event.caseName,
    before: event.before,
    after: event.after,
  };
  return [entry, ...log];
}

export const useCasesStore = create<CasesStore>((set, get) => ({
  fullCases: buildInitialFullCases(),
  queueOnly: queueOnlyCases.map((c) => ({ ...c })),
  coverageScanInserted: {},
  auditLog: [...seedAuditEvents],
  role: "Analyst",

  getCase: (caseId) => get().fullCases[caseId],

  getSummaries: () => {
    const { fullCases, queueOnly } = get();
    return [
      ...Object.values(fullCases).map(toSummary),
      ...queueOnly,
    ];
  },

  listFullCases: () => Object.values(get().fullCases),

  setRole: (role) => set({ role }),

  setCaseStatus: (caseId, status, actor) => {
    const state = get();
    const full = state.fullCases[caseId];
    const role = state.role;

    if (full) {
      if (full.status === status) return;
      const before = full.status;
      set({
        fullCases: {
          ...state.fullCases,
          [caseId]: { ...full, status },
        },
        auditLog: pushAudit(state.auditLog, {
          actor: actor ?? role,
          actorKind: "human",
          action: "Status change",
          caseId,
          caseName: full.influencerName,
          before,
          after: status,
        }),
      });
      return;
    }

    const qi = state.queueOnly.findIndex((c) => c.id === caseId);
    if (qi === -1) return;
    const row = state.queueOnly[qi];
    if (row.status === status) return;
    const nextQueue = [...state.queueOnly];
    nextQueue[qi] = { ...row, status };
    set({
      queueOnly: nextQueue,
      auditLog: pushAudit(state.auditLog, {
        actor: actor ?? role,
        actorKind: "human",
        action: "Status change",
        caseId,
        caseName: row.influencerName,
        before: row.status,
        after: status,
      }),
    });
  },

  updateSectionSummary: (caseId, sectionName, summary) => {
    const full = get().fullCases[caseId];
    if (!full) return;
    set({
      fullCases: {
        ...get().fullCases,
        [caseId]: {
          ...full,
          scorecardSections: full.scorecardSections.map((s) =>
            s.sectionName === sectionName ? { ...s, summary } : s
          ),
        },
      },
    });
  },

  updateSectionRisk: (caseId, sectionName, next) => {
    const state = get();
    const full = state.fullCases[caseId];
    if (!full) return;

    const section = full.scorecardSections.find(
      (s) => s.sectionName === sectionName
    );
    if (!section) return;

    const before = `${sectionName} · ${section.riskLevel}${
      section.riskValue ? ` ${section.riskValue}` : ""
    }`;
    const after = `${sectionName} · ${next.riskLevel}${
      next.riskValue ? ` ${next.riskValue}` : ""
    }`;

    let sections = full.scorecardSections.map((s) =>
      s.sectionName === sectionName
        ? {
            ...s,
            riskLevel: next.riskLevel,
            riskValue: next.riskValue,
          }
        : s
    );

    let status = full.status;
    let auditLog = state.auditLog;

    if (next.riskLevel === "confirmed") {
      auditLog = pushAudit(auditLog, {
        actor: state.role,
        actorKind: "human",
        action: "Confirm risk level",
        caseId,
        caseName: full.influencerName,
        before,
        after,
      });

      if (
        allRisksConfirmed(sections) &&
        (status === "vetting_in_progress" || status === "revisions_in_progress")
      ) {
        const prevStatus = status;
        status = "vetting_in_review";
        auditLog = pushAudit(auditLog, {
          actor: state.role,
          actorKind: "human",
          action: "Status change",
          caseId,
          caseName: full.influencerName,
          before: prevStatus,
          after: status,
        });
      }
    }

    set({
      fullCases: {
        ...state.fullCases,
        [caseId]: { ...full, status, scorecardSections: sections },
      },
      auditLog,
    });
  },

  suggestSectionRisk: (caseId, sectionName, suggestion) => {
    const state = get();
    const full = state.fullCases[caseId];
    if (!full) return;

    const section = full.scorecardSections.find(
      (s) => s.sectionName === sectionName
    );
    const before = section
      ? `${sectionName} · ${section.riskLevel}${
          section.riskValue ? ` ${section.riskValue}` : ""
        }`
      : `${sectionName} · unset`;

    set({
      fullCases: {
        ...state.fullCases,
        [caseId]: {
          ...full,
          scorecardSections: full.scorecardSections.map((s) =>
            s.sectionName === sectionName
              ? {
                  ...s,
                  riskLevel: "ai_suggested",
                  riskValue: suggestion.riskValue,
                  riskReasoning: suggestion.riskReasoning,
                }
              : s
          ),
        },
      },
      auditLog: pushAudit(state.auditLog, {
        actor: "MAX Analysis Engine",
        actorKind: "ai",
        action: "Suggest Risk Level",
        caseId,
        caseName: full.influencerName,
        before,
        after: `${sectionName} · ai_suggested ${suggestion.riskValue}`,
      }),
    });
  },

  addSectionCitation: (caseId, sectionName, draft) => {
    const full = get().fullCases[caseId];
    if (!full) return;
    set({
      fullCases: {
        ...get().fullCases,
        [caseId]: {
          ...full,
          scorecardSections: full.scorecardSections.map((s) =>
            s.sectionName === sectionName
              ? {
                  ...s,
                  citations: insertCitationReverseChron(s.citations, draft),
                }
              : s
          ),
        },
      },
    });
  },

  insertCoverageScan: (caseId, runId) => {
    const state = get();
    const full = state.fullCases[caseId];
    if (!full) return;
    if (state.coverageScanInserted[caseId]) return;

    let status = full.status;
    let auditLog = pushAudit(state.auditLog, {
      actor: "MAX Analysis Engine",
      actorKind: "ai",
      action: "Coverage Scan",
      caseId,
      caseName: full.influencerName,
      before: "—",
      after: `${runId} · inserted into case`,
    });

    if (status === "received" || status === "assigned") {
      const prev = status;
      status = "vetting_in_progress";
      auditLog = pushAudit(auditLog, {
        actor: state.role,
        actorKind: "human",
        action: "Status change",
        caseId,
        caseName: full.influencerName,
        before: prev,
        after: status,
      });
    }

    set({
      coverageScanInserted: {
        ...state.coverageScanInserted,
        [caseId]: true,
      },
      fullCases: {
        ...state.fullCases,
        [caseId]: { ...full, status },
      },
      auditLog,
    });
  },

  resetDemoData: () =>
    set({
      fullCases: buildInitialFullCases(),
      queueOnly: queueOnlyCases.map((c) => ({ ...c })),
      coverageScanInserted: {},
      auditLog: [...seedAuditEvents],
    }),
}));

/** Stable existence check for App Router notFound (static seed ids). */
export function isKnownFullCaseId(caseId: string): boolean {
  return seedFullCases.some((c) => c.id === caseId);
}
