import { fullCases } from "@/data";
import type { Case } from "@/types";

/** Static seed helpers — live case data lives in Zustand (`useCasesStore`). */
export function getSeedCaseById(caseId: string): Case | undefined {
  return fullCases.find((c) => c.id === caseId);
}

export function listSeedFullCases(): Case[] {
  return fullCases;
}

export const DEFAULT_CASE_ID = "case-mara-whitfield";
