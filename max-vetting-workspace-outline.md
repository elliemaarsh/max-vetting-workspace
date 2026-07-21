# MAX — AI Vetting Workspace
### Product Outline (v1 scope, frontend-first)

---

## 1. Premise

MAX is an internal operations platform that replaces the current Smartsheet + Brief + Custom GPT + manual-formatting workflow with one connected system. It does not remove human judgment from vetting — it removes the *mechanical* overhead around judgment (data entry, research legwork, formatting, file shuffling) so analysts, reviewers, and QA/QC spend their time on the part only a person can do: deciding what a piece of evidence actually means for the client relationship.

**Core rule that governs every screen:** AI can gather, draft, and format. AI cannot decide. Risk Level is always human-entered. This should be visually enforced, not just a policy — e.g., a Risk Level field that is literally unfillable by the AI panel and requires a human click.

**Boundary of the system:** MAX owns everything from "brief has arrived" to "scorecard is client-ready." Intake (brief in) and Submission (package out) are import/export points, not places where MAX changes the actual client relationship or deliverable format.

---

## 2. What gets automated vs. what stays human

| Step | v1 today (manual) | MAX (automated) | Still human |
|---|---|---|---|
| Brief → tracker entry | Retype into Smartsheet 2x/day | Parse uploaded brief, pre-fill case record | Confirm parse is correct |
| Assignment | Cross-reference workload reports manually | Suggest analyst/reviewer/QA based on bandwidth + language/market rules | One-click confirm or override |
| Research | Traackr + Google News + manual platform check | AI coverage scan across all required sections, with lookback windows applied automatically | Confirm nothing was missed, judge borderline items |
| Scorecard drafting | Manual formatting, hyperlinking, reverse-chron ordering | Auto-drafted from evidence in required section format | Write/edit summary framing, set Risk Level |
| Review pass 1 | Manual spelling/grammar/link check | Automated lint (broken links, format compliance, missing sections) | — |
| Review pass 2 | Manual re-scan of influencer's socials | AI diff: "here's what changed since analyst's pull" | Judge whether anything was actually missed |
| QA/QC | Manual file rename + folder move + compile | Auto-package, auto-rename, auto-compile submission list | Final sign-off |
| Submission | Manual email compile | Draft email + client-ready package generated | Human sends |

---

## 3. Information Architecture (v1)

Trimmed to four functional areas — no settings/admin/rules-config screens in v1, they don't demo well and aren't needed to prove the concept.

```
├── Home / Queue          → what needs my attention right now
├── Case Workspace         → the actual vetting unit — one influencer, one case
├── AI Analysis            → coverage scan + scorecard draft generation
└── Reports & Audit        → what shipped, what changed, turnaround stats
```

Left sidebar (persistent), Dub-style: compact nav items, active state as a subtle tinted background, no icons required beyond simple monoline glyphs.

---

## 4. Page-by-Page Breakdown

### 4.1 Home / Queue

**Purpose:** Landing page. Answers "what do I need to do today" for whichever role is logged in (analyst / reviewer / QA-QC — can be a simple role switcher in v1, doesn't need real auth).

**Contents:**
- Status summary strip: counts by status (Received, Assigned, Vetting In Progress, In Review, Revisions, QA/QC Complete, Submitted) — small stat cards, not charts
- Primary table: all cases assigned to the current user, sortable/filterable
  - Columns: Influencer, Market, Language, Status badge, Deadline, Re-vet (y/n), Est. Effort, Assigned Analyst/Reviewer
- Deadline urgency treated as a visual state (overdue = coral, due today = amber, on track = neutral) — not a separate page
- Empty state should still show column headers/filters (per the design system's empty-state rule)

**Data shape (mock):**
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
```

---

### 4.2 Case Workspace

**Purpose:** The core unit of the product — everything about one influencer's vet lives here. This is where most time is spent, so it should feel calm and dense-but-legible (per the merged design doc's "operational mode").

**Structure:** left-nav sub-sections within the case (per case-workspace pattern from the design doc), not tabs at the top:

1. **Overview** — influencer name, market, language, engagement, re-vet flag + last vet date if applicable, all social channels confirmed, current status, assigned team
2. **Evidence** — the research surface:
   - List of gathered evidence items (social post, article, IG story screenshot, etc.)
   - Each item: source, date, type, which scorecard section it maps to, a link/preview
   - This is where the AI Coverage Scan results land before being placed into the scorecard — evidence exists here *before* it's written into prose
3. **Scorecard Draft** — the actual Brand Safety / Strategic Fit sections:
   - Track Record & Personal Conduct, Brand Values, Affiliations, Political Involvement, Competitive Partnerships, Industry & Branded Content, Social Content & Customer Relevance
   - Each section: generated summary paragraph (editable), citation list (reverse-chron, auto-formatted), and a **Risk Level selector that only a human can set** — this field should be visually distinct (e.g., bordered/highlighted empty state until filled) to reinforce that it's a required human action, not a default
4. **Reviewer Notes** — feedback thread tied to specific sections, mirrors the "feedback in red" convention from the current process
5. **Activity** — status changes, who touched what, when (this feeds Reports & Audit but scoped to one case)

**Data shape (mock):**
```ts
type ScorecardSection = {
  sectionName: string;
  summary: string;              // editable, AI-drafted
  citations: Citation[];
  riskLevel: 'unset' | 'green' | 'yellow' | 'red';  // never AI-set
  reviewerNotes: Note[];
}

type Citation = {
  date: string;                 // "Month Year"
  sourceType: 'social_post' | 'article' | 'ig_story' | 'youtube_video' | 'other';
  platform: string;
  quote: string;
  url: string;
  order: number;                 // for reverse-chron sequencing
}
```

---

### 4.3 AI Analysis

**Purpose:** Where the two existing GPTs' functions live as one integrated panel rather than a separate chatbot tab. Not a general chat window — a structured composer scoped to the current case.

**Contents:**
- Mode toggle: **Coverage Scan** (find evidence) vs. **Scorecard Assembly** (format evidence into prose) — mirrors the two real GPTs
- Prompt chips: "Run full coverage scan," "Draft [section name] only," "Re-vet since [last date]," "Check for missed political content"
- Output always renders with:
  - Output type label (`AI Coverage Scan` / `AI Scorecard Draft`)
  - Timestamp / run ID
  - Section-by-section results with citations attached
  - A clear "Send to Evidence" or "Insert into Scorecard" action — nothing auto-commits to the case record without a human click
- Never show a bare risk score. If the AI flags something, it shows *why* (which section, which evidence) — never a number alone.

---

### 4.4 Reports & Audit

**Purpose:** Program-management view — less about one case, more about throughput and compliance history.

**Contents:**
- Turnaround time distribution (vet → review → QA/QC → submit)
- Volume vs. threshold (daily/weekly US threshold lines, per current playbook numbers)
- Audit table: every status change across every case, actor, timestamp, before/after — this should feel immutable, table-first, monospace timestamps
- Filter by: human actions only / AI runs only / a specific case

---

## 5. Cross-Cutting Components

These get built once and reused everywhere — worth prompting as shared components early rather than rebuilding per-page.

- **Status badge** (New, Vetting in Progress, In Review, Revisions, Complete, Submitted, Hold) — pill, color-coded, text + color together (never color alone)
- **Risk Level selector** — the one component that must visually communicate "unset until a human touches it"
- **Citation block** — renders the Month/Year + hyperlinked source + quote pattern consistently across Evidence and Scorecard Draft
- **AI output card** — wraps any AI-generated content with the label/timestamp/citation/insert-action pattern
- **Data table** — used on Home/Queue and Reports; sortable, filterable, compact rows

---

## 6. v1 Build Sequence (suggested)

1. Shared components (status badge, risk selector, citation block, table)
2. Home/Queue (proves the data model + table pattern)
3. Case Workspace → Overview + Scorecard Draft (the meat of the demo)
4. AI Analysis panel (mocked responses using the Andy Ricker-style format, but with a fictional creator)
5. Evidence tab
6. Reports & Audit (last — least demo-critical, most "nice to have" for the pitch)

---

## 7. Notes for the Notion doc

- Keep a running list of what's mocked vs. real — e.g., "AI Analysis returns static fictional output for [Creator X]; backend integration is a v2 item"
- Every scorecard example content in the demo should use fully fictional creators/quotes, structurally similar to the real process but containing no actual Amex/Edelman data
- If you want a stronger pitch narrative: frame the demo around one fictional case moving start to finish (Received → Submitted) so the story is "watch a vet happen," not "look at empty screens"
