/** Data model per max-vetting-workspace-prd.md §5 — keep in sync with PRD. */

export type CaseStatus =
  | "received"
  | "assigned"
  | "vetting_in_progress"
  | "vetting_in_review"
  | "revisions_in_progress"
  | "vetting_complete"
  | "qaqc_complete"
  | "hold"
  | "submitted";

export type CaseSummary = {
  id: string;
  influencerName: string;
  market: string;
  language: string;
  status: CaseStatus;
  vettingDeadline: string;
  reviewDeadline: string;
  qaqcDeadline: string;
  submissionDeadline: string;
  isRevet: boolean;
  /** ISO date of prior vet — only set when isRevet is true */
  revetDate?: string;
  effort: 1 | 2 | 3 | 4 | 5;
  assignedAnalyst: string;
  assignedReviewer: string;
  assignedQAQC: string;
};

export type Note = {
  author: string;
  timestamp: string;
  text: string;
};

export type Citation = {
  date: string;
  sourceType: "social_post" | "article" | "ig_story" | "youtube_video" | "other";
  platform: string;
  /** Article/video/post title — distinct from the quote body. */
  title?: string;
  quote: string;
  url: string;
  order: number;
};

export type ScorecardSection = {
  sectionName: string;
  summary: string;
  citations: Citation[];
  riskLevel: "unset" | "ai_suggested" | "confirmed";
  riskValue?: "green" | "yellow" | "red";
  riskReasoning?: string;
  reviewerNotes: Note[];
};

export type SocialProfile = {
  platform: string;
  handle: string;
  followerCount: number;
  followingCount?: number;
  postCount?: number;
  postingFrequency: string;
  engagementRate: { total: number; video?: number; image?: number };
  avgLikes?: number;
  avgComments?: number;
  videoViewRate?: number;
  /** Omit when source marks credibility as N/A — do not use 0 as a stand-in. */
  audienceCredibility?: number;
  audienceType?: {
    influencers: number;
    massFollowers: number;
    suspicious: number;
  };
  audienceReachability?: Record<string, number>;
  growthSeries: {
    month: string;
    followers: number;
    engagementRate: number;
  }[];
  contentTags: string[];
  brandsOrganic: string[];
  brandsPaid: string[];
  aiInsightSummary: string;
};

/** Full case record used by Case Workspace (composes PRD types). */
export type Case = CaseSummary & {
  engagement: string;
  lastVetDate?: string;
  scorecardSections: ScorecardSection[];
  socialProfiles: SocialProfile[];
};

export const SCORECARD_SECTION_NAMES = [
  "Track Record & Personal Conduct",
  "Brand Values",
  "Affiliations",
  "Political Involvement",
  "Competitive Partnerships",
  "Industry & Branded Content",
  "Social Content & Customer Relevance",
] as const;

export type ScorecardSectionName = (typeof SCORECARD_SECTION_NAMES)[number];
