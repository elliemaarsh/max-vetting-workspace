# MAX — AI Vetting Workspace
### Product Requirements Document (v1, frontend-only)

---

## 1. Problem & Goals

### Problem
The current Amex creator-vetting process is accurate but heavy on manual overhead: analysts spend ~3 hours per vet largely on research legwork and formatting rather than judgment; status tracking lives in Smartsheet and requires manual double-entry from briefs; reviewers re-do research passes by hand; QA/QC involves manual file renaming and folder management. None of this overhead is where the actual value of the service lives — the value is in human judgment about brand risk and strategic fit.

### Goal
Build a frontend-only proof-of-concept workspace that demonstrates how AI-assisted research, drafting, and formatting can remove mechanical overhead while keeping every judgment call (risk level, final sign-off) explicitly human. Success is measured by whether the demo can walk one fictional case start-to-finish (Received → Submitted) faster and more legibly than the current tool stack, without ever making an AI output look like a final decision.

### Non-goals for v1
- Real backend, real auth, real integrations (Smartsheet, Traackr, OneDrive)
- Real GPT calls — AI Analysis output is mocked/static for this version
- Changing the actual client-facing intake or submission format

---

## 2. Users & Roles

v1 doesn't need real authentication — a simple role switcher is sufficient to demo different views.

| Role | Primary needs |
|---|---|
| Analyst | See assigned queue, run coverage scan, draft scorecard, set risk levels |
| Reviewer | See cases awaiting review, verify AI didn't miss anything, leave section feedback |
| QA/QC | Final compliance check, package for submission |
| Trafficking / PM | Queue overview, workload visibility, deadlines (lighter-weight view, mostly Home/Reports) |

---

## 3. Scope (v1, frontend-only)

**In scope:**
- Four core pages: Home/Queue, Case Workspace, AI Analysis, Reports & Audit
- Full mock data layer, typed, structured to slot in a real backend later without UI changes
- All shared components (status badge, risk selector, citation block, AI output card, data table, social stats module)
- One complete fictional case populated end-to-end for demo purposes

**Out of scope:**
- Real research/API calls
- Real file export/email generation
- Multi-user real-time collaboration
- Admin/settings/rules-configuration screens

---

## 4. Functional Requirements

### 4.1 Home / Queue
- Status summary strip (counts by status)
- Filterable/sortable case table scoped to current role
- Deadline urgency as a visual state, not a separate view
- Empty states preserve column headers/filters

### 4.2 Case Workspace
Left-nav sub-sections within a case:

1. **Overview** — influencer identity, market, language, engagement, re-vet flag, status, assigned team
2. **Evidence** — two parts:
   - **Social Profiles & Audience Stats module** (new — see 4.2.1)
   - Gathered evidence items (posts, articles, screenshots) mapped to scorecard sections
3. **Scorecard Draft** — the seven required sections, each with AI-drafted summary (editable), citation list, and Risk Level selector (AI-suggested → human-confirmed)
4. **Reviewer Notes** — section-scoped feedback thread
5. **Activity** — case-scoped status/change history

#### 4.2.1 Social Profiles & Audience Stats module (new)
Automates what's currently a manual "confirm social channels" checklist step. For each platform the influencer is active on, display:

- Follower/subscriber count, following count, post count
- Posting frequency (posts per week/month)
- Engagement rate (total, and broken out by content type where available)
- Average likes/comments/shares, video view rate where applicable
- **Audience credibility score** (a single %, e.g. "80.6% credible") with a breakdown of audience type: real influencers / mass followers / suspicious-or-bot accounts
- **Audience reachability** breakdown (follower-count bands of the influencer's own audience — helps gauge whether their audience skews toward genuine engaged accounts vs. large passive followings)
- **Audience growth trend** — simple time-series chart, follower count and engagement rate over recent months
- **Content type tags** — auto-categorized (e.g. personal milestones, lifestyle, travel, brand content)
- **Brand mentions** — split into organically mentioned vs. paid/sponsored collaborations
- **AI-generated narrative summary** ("Creator Insights") — a short paragraph characterizing posting behavior and themes, clearly labeled as AI-generated inference, with a thumbs up/down feedback control (never presented as verified fact)

This module feeds the **Strategic Fit → Social Content & Customer Relevance** section of the scorecard — analysts should be able to pull a stat or the AI summary directly into that section's draft rather than re-describing it from scratch.

**Mock data note:** all numbers/handles used in the demo should be fully fictional, structurally similar to real analytics tools but not reproducing any real creator's actual data.

### 4.3 AI Analysis
- Mode toggle: Coverage Scan / Scorecard Assembly
- Prompt chips including "Suggest risk levels" (per Analysis Engine spec)
- Every output: mode label, timestamp/run ID, section content, citations, gaps checked, contradictions flagged, suggested risk level + reasoning (Assembly mode), single "Insert into case" action

### 4.4 Reports & Audit
- Turnaround time distribution
- Volume vs. threshold tracking
- Immutable audit table: actor, timestamp, action, before/after
- Filters: human actions / AI runs / specific case

---

## 5. Data Model (mock, typed)

```ts
type CaseSummary = {
  id: string;
  influencerName: string;
  market: string;
  language: string;
  status: CaseStatus;
  deadline: string;
  isRevet: boolean;
  effort: 1 | 2 | 3 | 4 | 5;
  assignedAnalyst: string;
  assignedReviewer: string;
}

type CaseStatus =
  | 'received' | 'assigned' | 'vetting_in_progress' | 'vetting_in_review'
  | 'revisions_in_progress' | 'vetting_complete' | 'qaqc_complete'
  | 'hold' | 'submitted';

type ScorecardSection = {
  sectionName: string;
  summary: string;
  citations: Citation[];
  riskLevel: 'unset' | 'ai_suggested' | 'confirmed';
  riskValue?: 'green' | 'yellow' | 'red';
  riskReasoning?: string;
  reviewerNotes: Note[];
}

type Citation = {
  date: string;
  sourceType: 'social_post' | 'article' | 'ig_story' | 'youtube_video' | 'other';
  platform: string;
  quote: string;
  url: string;
  order: number;
}

type SocialProfile = {
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
  audienceCredibility: number;              // %
  audienceType: { influencers: number; massFollowers: number; suspicious: number };
  audienceReachability: Record<string, number>;
  growthSeries: { month: string; followers: number; engagementRate: number }[];
  contentTags: string[];
  brandsOrganic: string[];
  brandsPaid: string[];
  aiInsightSummary: string;                 // clearly AI-generated, labeled as such in UI
}

type Note = {
  author: string;
  timestamp: string;
  text: string;
}
```

---

## 6. AI Behavior Spec (theoretical for v1 — mocked output)

See MAX Analysis Engine spec for full detail. Summary of governing rules:
- AI drafts, gathers, and formats; never sets final risk level
- Risk suggestions use the playbook's existing thresholds (2-3 examples green, 3-5 yellow, 3-5+ consistent-pattern red) and always show reasoning
- Every AI output labeled with mode, timestamp, and an explicit human "insert" action
- Gaps and contradictions surfaced, not hidden by a clean-looking empty section

---

## 7. Design System Reference

Base: Dub's token set and component architecture (border-first elevation, compact density, status badges, table rows, sidebar nav). One accent color may be swapped from Dub's default electric blue if desired; all spacing/radius/typography tokens stay as-is.

---

## 8. Non-Goals / Explicit Exclusions

- Intake and Submission remain import/export boundaries, not reimagined client-facing flows (per earlier decision)
- No real creator or case data — all demo content fictional
- No real GPT/API calls in v1
- No admin/config screens

---

## 9. Open Questions

- Should the Social Profiles module support manual stat override (in case a platform's numbers look wrong), or is it read-only in v1?
- Does the audience credibility score need a visual explainer (e.g., what counts as "suspicious"), or is a number + label sufficient for the demo?
- Should risk-level override require a reason field, or stay one-click (current default: one-click, no justification required)?
- For the pitch narrative, is one fictional case enough, or does the demo benefit from 2-3 cases at different pipeline stages to show queue variety?
