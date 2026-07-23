import { casesById, fullCases } from "@/data";
import type { Case } from "@/types";

export function getCaseById(caseId: string): Case | undefined {
  return casesById[caseId];
}

export function listFullCases(): Case[] {
  return fullCases;
}

/** Default demo case when opening Case Workspace without an id. */
export const DEFAULT_CASE_ID = "case-mara-whitfield";
