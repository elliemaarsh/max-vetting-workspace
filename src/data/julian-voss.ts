import type { Case, Citation, ScorecardSection, SocialProfile } from "@/types";

function c(
  partial: Omit<Citation, "order"> & { order?: number },
  order: number
): Citation {
  return { ...partial, order };
}

const trackRecordCitations: Citation[] = [
  c(
    {
      date: "April 2026",
      sourceType: "article",
      platform: "Daily Culture Wire",
      title: "Voss Addresses 'Nepo' Criticism Amid Cookbook Launch",
      quote:
        "Voss pushed back on commenters questioning whether his family's restaurant background gave him an unfair head start in the industry.",
      url: "https://example.com/dailyculturewire/voss-nepo-criticism",
    },
    1
  ),
  c(
    {
      date: "February 2026",
      sourceType: "social_post",
      platform: "TikTok",
      quote:
        "'must be nice having a chef dad' yeah it is, and also I've worked every station in that kitchen since I was 14 lol",
      url: "https://example.com/tiktok/julianvoss/feb-2026-chef-dad",
    },
    2
  ),
  c(
    {
      date: "January 2025",
      sourceType: "ig_story",
      platform: "Instagram",
      quote: "some of y'all need a hobby fr",
      url: "https://example.com/instagram/julian.voss/story/jan-2025-hobby",
    },
    3
  ),
];

const affiliationsCitations: Citation[] = [
  c(
    {
      date: "March 2025",
      sourceType: "article",
      platform: "Regional Eats Magazine",
      title: "A Family Business, Three Generations Later",
      quote:
        "The chain settled a wage dispute with former staff in 2019, a detail that has occasionally resurfaced in online discussion of the family's public profile.",
      url: "https://example.com/regionaleats/family-business-three-generations",
    },
    1
  ),
];

const politicalCitations: Citation[] = [
  c(
    {
      date: "March 2026",
      sourceType: "social_post",
      platform: "Instagram",
      quote:
        "Half the kitchens in this city would close tomorrow without immigrant labor. Say it louder for the people in the back.",
      url: "https://example.com/instagram/julian.voss/post/mar-2026-immigrant-labor",
    },
    1
  ),
  c(
    {
      date: "November 2025",
      sourceType: "social_post",
      platform: "Threads",
      quote: "Food deserts aren't an accident, they're a policy choice.",
      url: "https://example.com/threads/julianvoss/nov-2025-food-deserts",
    },
    2
  ),
];

const competitiveCitations: Citation[] = [
  c(
    {
      date: "May 2026",
      sourceType: "social_post",
      platform: "Instagram",
      quote:
        "Teaming up with @prospercard because good food deserves good rewards 🍴 #ProsperPartner #ad",
      url: "https://example.com/instagram/julian.voss/post/may-2026-prosper",
    },
    1
  ),
];

const industryCitations: Citation[] = [
  c(
    {
      date: "April 2026",
      sourceType: "social_post",
      platform: "Instagram",
      quote:
        "This pan has genuinely changed my weeknight cooking @coppertopcookware #ad",
      url: "https://example.com/instagram/julian.voss/post/apr-2026-coppertop",
    },
    1
  ),
  c(
    {
      date: "February 2026",
      sourceType: "article",
      platform: "Bite Magazine",
      title: "Rising Stars in Food Media",
      quote:
        "Voss is among a cohort of creators bridging cookbook publishing with short-form recipe video.",
      url: "https://example.com/bitemagazine/rising-stars-food-media",
    },
    2
  ),
];

const socialContentCitations: Citation[] = [
  c(
    {
      date: "May 2026",
      sourceType: "social_post",
      platform: "TikTok",
      quote: "weeknight pasta that takes 12 minutes and tastes like a whole Sunday",
      url: "https://example.com/tiktok/julianvoss/may-2026-pasta",
    },
    1
  ),
  c(
    {
      date: "March 2026",
      sourceType: "social_post",
      platform: "Instagram",
      quote: "back in my dad's kitchen for the day, feels like being 16 again",
      url: "https://example.com/instagram/julian.voss/post/mar-2026-dad-kitchen",
    },
    2
  ),
  c(
    {
      date: "January 2026",
      sourceType: "social_post",
      platform: "Instagram",
      quote: "if one more person asks me if I 'actually cook' I'm gonna lose my sh*t",
      url: "https://example.com/instagram/julian.voss/post/jan-2026-profanity",
    },
    3
  ),
];

const scorecardSections: ScorecardSection[] = [
  {
    sectionName: "Track Record & Personal Conduct",
    summary:
      "Voss's platform is not built on controversial issues, but he has faced recurring criticism online related to family-connection commentary and has used strong language in response.",
    citations: trackRecordCitations,
    riskLevel: "ai_suggested",
    riskValue: "red",
    riskReasoning:
      "Recurring 'nepo' criticism coverage plus combative replies (3 items) form a consistent personal-conduct pattern above the yellow band.",
    reviewerNotes: [],
  },
  {
    sectionName: "Brand Values",
    summary:
      "Voss has not shared hate-based, discriminatory, or exclusionary content, nor spoken negatively about American Express.",
    citations: [],
    riskLevel: "ai_suggested",
    riskValue: "green",
    riskReasoning:
      "No hate-based or exclusionary content; no negative Amex mentions in the pull.",
    reviewerNotes: [],
  },
  {
    sectionName: "Affiliations",
    summary:
      "Voss is a food and lifestyle creator connected to his family's regional restaurant group.",
    citations: affiliationsCitations,
    riskLevel: "ai_suggested",
    riskValue: "yellow",
    riskReasoning:
      "Family restaurant affiliation with a resurfaced 2019 wage-dispute detail warrants yellow for human review of client sensitivity.",
    reviewerNotes: [],
  },
  {
    sectionName: "Political Involvement",
    summary:
      "Voss has commented publicly on food-access policy and immigration-related labor issues in the restaurant industry.",
    citations: politicalCitations,
    riskLevel: "ai_suggested",
    riskValue: "red",
    riskReasoning:
      "Two explicit policy-position posts (immigration labor + food deserts as policy) meet political-involvement red criteria pending human confirm.",
    reviewerNotes: [],
  },
  {
    sectionName: "Competitive Partnerships",
    summary:
      "Voss is associated with a direct Amex competitor within the last 18 months.",
    citations: competitiveCitations,
    riskLevel: "ai_suggested",
    riskValue: "red",
    riskReasoning:
      "Prosper Card paid partnership (May 2026) is a direct financial-services competitor within the 18-month window.",
    reviewerNotes: [],
  },
  {
    sectionName: "Industry & Branded Content",
    summary:
      "Voss has published sponsored content for kitchenware and grocery-delivery brands, plus press coverage for his cookbook.",
    citations: industryCitations,
    riskLevel: "ai_suggested",
    riskValue: "yellow",
    riskReasoning:
      "On-category kitchenware sponsorship plus press coverage — GREEN/YELLOW dual rating; yellow until human confirms brand-fit comfort.",
    reviewerNotes: [],
  },
  {
    sectionName: "Social Content & Customer Relevance",
    summary:
      "Voss posts recipe content, family-restaurant features, and lifestyle vlogging.",
    citations: socialContentCitations,
    riskLevel: "ai_suggested",
    riskValue: "yellow",
    riskReasoning:
      "Strong kitchenware relevance via recipes/lifestyle, offset by occasional profanity (Jan 2026) — GREEN/YELLOW dual rating defaulting to yellow.",
    reviewerNotes: [
      {
        author: "Sam Okonkwo",
        timestamp: "2026-07-21T16:40:00Z",
        text: "Flag the Jan 2026 profanity post for client tone guidelines before we confirm this section.",
      },
    ],
  },
];

const socialProfiles: SocialProfile[] = [
  {
    platform: "Instagram",
    handle: "@julian.voss",
    followerCount: 615_000,
    followingCount: 528,
    postCount: 2_140,
    postingFrequency: "1.1 posts/day",
    engagementRate: { total: 1.8, image: 1.6, video: 2.2 },
    avgLikes: 9_800,
    avgComments: 210,
    audienceCredibility: 71.3,
    audienceType: {
      influencers: 14.2,
      massFollowers: 34.1,
      suspicious: 12.6,
    },
    audienceReachability: {
      "<1K": 16,
      "1K–10K": 30,
      "10K–100K": 33,
      "100K–1M": 17,
      "1M+": 4,
    },
    growthSeries: [
      { month: "Dec 2025", followers: 548_000, engagementRate: 1.7 },
      { month: "Jan 2026", followers: 562_000, engagementRate: 1.8 },
      { month: "Feb 2026", followers: 578_000, engagementRate: 1.9 },
      { month: "Mar 2026", followers: 592_000, engagementRate: 1.8 },
      { month: "Apr 2026", followers: 604_000, engagementRate: 1.7 },
      { month: "May 2026", followers: 615_000, engagementRate: 1.8 },
    ],
    contentTags: ["Recipes", "Lifestyle", "Family business", "Cookbook"],
    brandsOrganic: ["Voss Family Restaurants"],
    brandsPaid: ["Prosper Card", "CopperTop Cookware"],
    aiInsightSummary:
      "AI inference: Voss’s Instagram blends high-frequency recipe posts with family-restaurant storytelling. Paid financial and cookware partners sit next to organic family-brand mentions; suspicious audience share is elevated vs. sport creators. Treat as AI-generated characterization, not verified fact.",
  },
  {
    platform: "TikTok",
    handle: "@julianvoss",
    followerCount: 780_000,
    followingCount: 210,
    postCount: 612,
    postingFrequency: "1.6 posts/day",
    engagementRate: { total: 2.9, video: 2.9 },
    avgLikes: 21_400,
    avgComments: 640,
    videoViewRate: 34.2,
    // audienceCredibility / audienceType / audienceReachability omitted — source N/A
    growthSeries: [
      { month: "Dec 2025", followers: 690_000, engagementRate: 2.7 },
      { month: "Jan 2026", followers: 712_000, engagementRate: 2.8 },
      { month: "Feb 2026", followers: 735_000, engagementRate: 3.0 },
      { month: "Mar 2026", followers: 752_000, engagementRate: 2.9 },
      { month: "Apr 2026", followers: 768_000, engagementRate: 2.8 },
      { month: "May 2026", followers: 780_000, engagementRate: 2.9 },
    ],
    contentTags: ["Recipes", "Quick tips"],
    brandsOrganic: [],
    brandsPaid: [],
    aiInsightSummary:
      "AI inference: TikTok is Voss’s largest audience — short recipe and tip formats drive the highest engagement rate across his platforms. Credibility breakdown unavailable in this mock pull. Treat as AI-generated characterization, not verified fact.",
  },
  {
    platform: "YouTube",
    handle: "@JulianVossCooks",
    followerCount: 44_000,
    followingCount: 42,
    postCount: 86,
    postingFrequency: "Weekly",
    engagementRate: { total: 2.0, video: 2.0 },
    avgLikes: 1_120,
    avgComments: 94,
    videoViewRate: 18.6,
    // audienceCredibility / audienceType / audienceReachability omitted — source N/A
    growthSeries: [
      { month: "Dec 2025", followers: 38_500, engagementRate: 1.9 },
      { month: "Jan 2026", followers: 39_800, engagementRate: 2.0 },
      { month: "Feb 2026", followers: 41_000, engagementRate: 2.1 },
      { month: "Mar 2026", followers: 42_200, engagementRate: 2.0 },
      { month: "Apr 2026", followers: 43_100, engagementRate: 1.9 },
      { month: "May 2026", followers: 44_000, engagementRate: 2.0 },
    ],
    contentTags: ["Longer-form cooking", "Cookbook"],
    brandsOrganic: [],
    brandsPaid: ["CopperTop Cookware"],
    aiInsightSummary:
      "AI inference: YouTube is the long-form cooking channel — weekly cadence, modest subscriber base, steady growth around cookbook launch weeks. Treat as AI-generated characterization, not verified fact.",
  },
];

export const julianVossCase: Case = {
  id: "case-julian-voss",
  influencerName: "Julian Voss",
  market: "United States",
  language: "English",
  status: "vetting_in_review",
  vettingDeadline: "2026-07-20",
  reviewDeadline: "2026-07-23",
  qaqcDeadline: "2026-07-25",
  submissionDeadline: "2026-07-28",
  isRevet: false,
  effort: 5,
  assignedAnalyst: "Morgan Blake",
  assignedReviewer: "Sam Okonkwo",
  assignedQAQC: "Casey Nguyen",
  engagement: "Kitchenware brand ambassador consideration",
  scorecardSections,
  socialProfiles,
};
