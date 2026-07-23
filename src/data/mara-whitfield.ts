import type { Case, Citation, ScorecardSection, SocialProfile } from "@/types";

/** Citations listed reverse-chron; order 1 = most recent in section. */
function c(
  partial: Omit<Citation, "order"> & { order?: number },
  order: number
): Citation {
  return { ...partial, order };
}

const trackRecordCitations: Citation[] = [
  c(
    {
      date: "March 2026",
      sourceType: "article",
      platform: "SwimWorld Daily",
      quote:
        "Whitfield said she felt the review process moved too quickly for an appeal to be meaningfully considered before the medal ceremony.",
      url: "https://example.com/swimworld/whitfield-relay-disqualification",
    },
    1
  ),
  c(
    {
      date: "February 2026",
      sourceType: "social_post",
      platform: "Instagram",
      quote:
        "Still processing this one. Grateful for everyone who's reached out — more to come once I've had time to think it through.",
      url: "https://example.com/instagram/mara.whitfield/post/feb-2026-processing",
    },
    2
  ),
  c(
    {
      date: "January 2025",
      sourceType: "article",
      platform: "Metro Sports Wire",
      quote:
        "Supporters flooded social media in defense of the swimmer, arguing the ruling body's timeline was unfair to athletes.",
      url: "https://example.com/metrosportswire/whitfield-disqualification-reversal",
    },
    3
  ),
];

const politicalCitations: Citation[] = [
  c(
    {
      date: "November 2025",
      sourceType: "ig_story",
      platform: "Instagram",
      quote: "Polls close at 8 — make a plan and go vote today!",
      url: "https://example.com/instagram/mara.whitfield/story/nov-2025-vote",
    },
    1
  ),
];

const competitiveCitations: Citation[] = [
  c(
    {
      date: "April 2026",
      sourceType: "social_post",
      platform: "Instagram",
      quote:
        "So excited to be teaming up with @meridianbank this season — banking that actually works around my training schedule. #MeridianPartner #ad",
      url: "https://example.com/instagram/mara.whitfield/post/apr-2026-meridian",
    },
    1
  ),
  c(
    {
      date: "January 2026",
      sourceType: "ig_story",
      platform: "Instagram",
      quote: "Loving the cash-back rewards from @meridianbank lately #ad",
      url: "https://example.com/instagram/mara.whitfield/story/jan-2026-meridian",
    },
    2
  ),
];

const industryCitations: Citation[] = [
  c(
    {
      date: "March 2026",
      sourceType: "social_post",
      platform: "TikTok",
      quote:
        "This is what's getting me through two-a-days lately @hydropeak #ad",
      url: "https://example.com/tiktok/marawhitfield/mar-2026-hydropeak",
    },
    1
  ),
  c(
    {
      date: "February 2026",
      sourceType: "article",
      platform: "Athletic Weekly",
      quote:
        "Whitfield's technical consistency has made her one of the most reliable relay anchors on the roster.",
      url: "https://example.com/athleticweekly/five-swimmers-to-watch",
    },
    2
  ),
];

const socialContentCitations: Citation[] = [
  c(
    {
      date: "April 2026",
      sourceType: "social_post",
      platform: "Instagram",
      quote:
        "5am practices hit different when the whole team's grinding together 💪",
      url: "https://example.com/instagram/mara.whitfield/post/apr-2026-practice",
    },
    1
  ),
  c(
    {
      date: "March 2026",
      sourceType: "youtube_video",
      platform: "YouTube",
      quote: "A Day in My Life: Pre-Meet Routine.",
      url: "https://example.com/youtube/mara-whitfield/pre-meet-routine",
    },
    2
  ),
];

const scorecardSections: ScorecardSection[] = [
  {
    sectionName: "Track Record & Personal Conduct",
    summary:
      "Whitfield was involved in a widely covered scoring dispute at a recent international competition, and has spoken publicly about the fallout.",
    citations: trackRecordCitations,
    riskLevel: "ai_suggested",
    riskValue: "yellow",
    riskReasoning:
      "Public dispute coverage plus athlete commentary (3 items spanning 2025–2026) rises above green threshold; no pattern of misconduct that would warrant red.",
    reviewerNotes: [],
  },
  {
    sectionName: "Brand Values",
    summary:
      "Whitfield does not have a non-inclusive platform and has not spoken negatively about American Express.",
    citations: [],
    riskLevel: "ai_suggested",
    riskValue: "green",
    riskReasoning:
      "No hate-based, discriminatory, or exclusionary content found; no negative Amex mentions.",
    reviewerNotes: [],
  },
  {
    sectionName: "Affiliations",
    summary:
      "Whitfield is a competitive swimmer and NCAA graduate known for her national team career. Based on research, she has no affiliations or associations to talent, third-party groups, or brands that could be deemed problematic.",
    citations: [],
    riskLevel: "ai_suggested",
    riskValue: "green",
    riskReasoning:
      "Career affiliations limited to sport/NCAA; no problematic third-party associations identified.",
    reviewerNotes: [],
  },
  {
    sectionName: "Political Involvement",
    summary:
      "Whitfield has shared limited civic content encouraging voter participation.",
    citations: politicalCitations,
    riskLevel: "ai_suggested",
    riskValue: "yellow",
    riskReasoning:
      "Single civic GOTV story (Nov 2025) is limited but still political-adjacent — yellow pending human judgment on client sensitivity.",
    reviewerNotes: [],
  },
  {
    sectionName: "Competitive Partnerships",
    summary:
      "Whitfield has an active partnership with a competing financial services brand within the last 18 months.",
    citations: competitiveCitations,
    riskLevel: "ai_suggested",
    riskValue: "red",
    riskReasoning:
      "Two Meridian Bank paid posts within the last 18 months (Jan + Apr 2026) meet the competing-financial-services red threshold.",
    reviewerNotes: [],
  },
  {
    sectionName: "Industry & Branded Content",
    summary:
      "Whitfield has published promotional content for a hydration brand and been featured in sports press for her competitive career.",
    citations: industryCitations,
    riskLevel: "ai_suggested",
    riskValue: "yellow",
    riskReasoning:
      "Mix of benign sports press (green) and paid HydroPeak promo (yellow-adjacent); dual GREEN/YELLOW assessment — defaulting to yellow for human confirm.",
    reviewerNotes: [],
  },
  {
    sectionName: "Social Content & Customer Relevance",
    summary:
      "Whitfield posts content focused on training, competition prep, and behind-the-scenes team life.",
    citations: socialContentCitations,
    riskLevel: "ai_suggested",
    riskValue: "yellow",
    riskReasoning:
      "Content is on-brand for sportswear consideration (training/team life) with no major red flags; GREEN/YELLOW dual rating — yellow until human confirms fit strength.",
    reviewerNotes: [],
  },
];

const socialProfiles: SocialProfile[] = [
  {
    platform: "Instagram",
    handle: "@mara.whitfield",
    followerCount: 892_000,
    followingCount: 412,
    postCount: 1_084,
    postingFrequency: "1.4 posts/week",
    engagementRate: { total: 2.1, image: 1.9, video: 2.6 },
    avgLikes: 18_400,
    avgComments: 312,
    audienceCredibility: 84.2,
    audienceType: {
      influencers: 8.1,
      massFollowers: 27.4,
      suspicious: 6.9,
    },
    audienceReachability: {
      "<1K": 18,
      "1K–10K": 34,
      "10K–100K": 29,
      "100K–1M": 14,
      "1M+": 5,
    },
    growthSeries: [
      { month: "Nov 2025", followers: 810_000, engagementRate: 2.0 },
      { month: "Dec 2025", followers: 828_000, engagementRate: 2.1 },
      { month: "Jan 2026", followers: 846_000, engagementRate: 2.0 },
      { month: "Feb 2026", followers: 861_000, engagementRate: 2.3 },
      { month: "Mar 2026", followers: 878_000, engagementRate: 2.2 },
      { month: "Apr 2026", followers: 892_000, engagementRate: 2.1 },
    ],
    contentTags: ["Training", "Competition", "Lifestyle", "Team life"],
    brandsOrganic: ["Arena Swim", "National Swim Federation"],
    brandsPaid: ["Meridian Bank", "HydroPeak"],
    aiInsightSummary:
      "AI inference: Whitfield’s Instagram skews toward high-credibility training and competition content, with engagement spikes around meet weeks. Paid financial and hydration partnerships sit alongside organic sport-federation mentions. Treat as AI-generated characterization, not verified fact.",
  },
  {
    platform: "TikTok",
    handle: "@marawhitfield",
    followerCount: 410_000,
    followingCount: 188,
    postCount: 246,
    postingFrequency: "2.0 posts/week",
    engagementRate: { total: 3.4, video: 3.4 },
    avgLikes: 12_100,
    avgComments: 420,
    videoViewRate: 28.5,
    // audienceCredibility / audienceType / audienceReachability omitted — source N/A
    growthSeries: [
      { month: "Nov 2025", followers: 355_000, engagementRate: 3.1 },
      { month: "Dec 2025", followers: 368_000, engagementRate: 3.2 },
      { month: "Jan 2026", followers: 381_000, engagementRate: 3.3 },
      { month: "Feb 2026", followers: 392_000, engagementRate: 3.5 },
      { month: "Mar 2026", followers: 402_000, engagementRate: 3.4 },
      { month: "Apr 2026", followers: 410_000, engagementRate: 3.4 },
    ],
    contentTags: ["Training", "Behind-the-scenes", "Quick tips"],
    brandsOrganic: [],
    brandsPaid: ["HydroPeak"],
    aiInsightSummary:
      "AI inference: TikTok is Whitfield’s higher-engagement surface — short training clips and BTS team content. Credibility breakdown unavailable for this platform in the mock pull. Treat as AI-generated characterization, not verified fact.",
  },
  {
    platform: "X",
    handle: "@MaraWhitfield",
    followerCount: 62_000,
    followingCount: 290,
    postCount: 1_420,
    postingFrequency: "Infrequent",
    engagementRate: { total: 1.2 },
    avgLikes: 480,
    avgComments: 36,
    // audienceCredibility / audienceType / audienceReachability omitted — source N/A
    growthSeries: [
      { month: "Nov 2025", followers: 58_200, engagementRate: 1.1 },
      { month: "Dec 2025", followers: 58_900, engagementRate: 1.0 },
      { month: "Jan 2026", followers: 59_600, engagementRate: 1.2 },
      { month: "Feb 2026", followers: 60_400, engagementRate: 1.4 },
      { month: "Mar 2026", followers: 61_200, engagementRate: 1.3 },
      { month: "Apr 2026", followers: 62_000, engagementRate: 1.2 },
    ],
    contentTags: ["Competition updates"],
    brandsOrganic: [],
    brandsPaid: [],
    aiInsightSummary:
      "AI inference: X is used sparingly for competition updates; low posting frequency and modest engagement. Treat as AI-generated characterization, not verified fact.",
  },
];

export const maraWhitfieldCase: Case = {
  id: "case-mara-whitfield",
  influencerName: "Mara Whitfield",
  market: "United States",
  language: "English",
  status: "vetting_in_progress",
  vettingDeadline: "2026-07-25",
  reviewDeadline: "2026-07-29",
  qaqcDeadline: "2026-07-31",
  submissionDeadline: "2026-08-01",
  isRevet: false,
  effort: 4,
  assignedAnalyst: "Alex Rivera",
  assignedReviewer: "Sam Okonkwo",
  assignedQAQC: "Jordan Lee",
  engagement: "Sportswear brand ambassador consideration",
  scorecardSections,
  socialProfiles,
};
