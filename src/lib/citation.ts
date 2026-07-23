import type { Citation } from "@/types";

const MONTH_INDEX: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export const CITATION_MONTHS = Object.keys(MONTH_INDEX);

/** Sort key for "Month YYYY" strings — higher = more recent. */
export function citationDateSortKey(date: string): number {
  const parts = date.trim().split(/\s+/);
  if (parts.length < 2) return 0;
  const [month, yearStr] = parts;
  const year = Number(yearStr);
  const monthIdx = MONTH_INDEX[month] ?? 0;
  if (!Number.isFinite(year)) return 0;
  return year * 12 + monthIdx;
}

export function formatCitationDate(month: string, year: number): string {
  return `${month} ${year}`;
}

/**
 * Insert a citation and re-number `order` so 1 = most recent (reverse-chron).
 * Does not mutate risk fields — caller should leave riskLevel untouched.
 */
export function insertCitationReverseChron(
  existing: Citation[],
  draft: Omit<Citation, "order">
): Citation[] {
  const withDraft = [...existing, { ...draft, order: 0 }];
  const sorted = withDraft.sort(
    (a, b) => citationDateSortKey(b.date) - citationDateSortKey(a.date)
  );
  return sorted.map((citation, index) => ({
    ...citation,
    order: index + 1,
  }));
}

export const SOURCE_TYPE_OPTIONS: {
  value: Citation["sourceType"];
  label: string;
}[] = [
  { value: "social_post", label: "Social post" },
  { value: "article", label: "Article" },
  { value: "ig_story", label: "IG story" },
  { value: "youtube_video", label: "YouTube video" },
  { value: "other", label: "Other" },
];

export function sourceTypeNeedsTitle(
  sourceType: Citation["sourceType"]
): boolean {
  return sourceType === "article" || sourceType === "youtube_video";
}
