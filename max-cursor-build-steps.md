# MAX — Cursor Build Steps
Send these one at a time, in order. Wait for each to complete and review before sending the next.

**Before Step 1:** put `max-vetting-workspace-prd.md`, `max-vetting-workspace-outline.md`, and `max-analysis-engine-spec.md` in the repo root so Cursor can reference them by name in later prompts.

---

## Step 1 — Project scaffold

```
Scaffold a new Next.js 14 app (App Router) with TypeScript and Tailwind CSS.
Install and configure shadcn/ui. Set up a clean src/ directory structure:
src/app, src/components, src/lib, src/types, src/data.
Do not build any pages yet — just the scaffold, config, and folder structure.
```

---

## Step 2 — Design tokens

```
Configure the Tailwind theme to match the Dub design system. Use these tokens
[paste the Dub "Tailwind v4" CSS custom properties block from the style reference doc].
Set up the font families (Satoshi for display, Inter for body, Geist Mono for
technical/IDs) with sensible fallbacks since we don't have the actual font files —
use Inter for both if needed and note where Satoshi would go.
Confirm the theme compiles with a placeholder page showing a heading, body text,
and one button in the new tokens.
```

---

## Step 3 — Types and mock data

```
Read max-vetting-workspace-prd.md, section 5 (Data Model). Create TypeScript
types in src/types for CaseSummary, CaseStatus, ScorecardSection, Citation,
SocialProfile, and Note exactly as specified — note that CaseSummary has four
separate deadline fields (vettingDeadline, reviewDeadline, qaqcDeadline,
submissionDeadline), not a single generic deadline, plus assignedQAQC and an
optional revetDate. Note that SocialProfile's audienceCredibility,
audienceType, and audienceReachability are optional — omit them for a
platform rather than defaulting to 0 when data isn't available.

Then read max-fictional-case-data.md and use it as the source content for mock
data in src/data. Build out two full cases (Mara Whitfield, Julian Voss) with
all 7 scorecard sections populated from that doc, citations parsed into the
Citation type (preserve reverse-chron order), and one SocialProfile per
platform listed in each case's Social Profiles table. Populate all four
deadline fields with reasonable staggered dates, and assign a QA/QC name
alongside the existing analyst/reviewer. Add the five lightweight queue-only
entries from that doc as additional CaseSummary records (no full scorecard
needed for these — just enough to populate the queue view), with the same
full set of fields populated.
Do not introduce any real people, real handles, or real quotes beyond what's
in max-fictional-case-data.md.
```

---

## Step 4 — Shared component: StatusBadge

```
Build a StatusBadge component per Dub's "Status Badge" pattern (pill shape,
tinted background, colored dot + text). Map it to our CaseStatus type — one
color/label per status. Never rely on color alone: always pair with text.
Add it to a component storybook-style test page so I can see all statuses at once.
```

---

## Step 5 — Shared component: RiskLevelSelector

```
Build a RiskLevelSelector component with three states per max-analysis-engine-spec.md:
"unset" (empty, neutral), "ai_suggested" (visually distinct — dashed border,
"AI-suggested" label, shows the riskReasoning text), and "confirmed" (solid,
final-looking). Include green/yellow/red as the selectable values.
Clicking an ai_suggested state should transition it to confirmed with one click,
no confirmation dialog. Add this to the same test page as Step 4.
```

---

## Step 6 — Shared components: CitationBlock and AIOutputCard

```
Build a CitationBlock component that renders a Citation per the format rules:
hyperlinked platform/publication name (not the article title), reverse-chron
order when given a list, Month Year prefix.

Build an AIOutputCard wrapper component: takes a mode label ("Coverage Scan" /
"Scorecard Assembly"), timestamp, and children content. Renders the label,
timestamp/run-id, and a single "Insert into case" button. Add both to the test page.
```

---

## Step 7 — Shared component: DataTable

```
Build a reusable DataTable component (sortable columns, basic filter input,
column show/hide control) using the mock CaseSummary[] data.

Default visible columns: Influencer, Market, Status (use StatusBadge), Next
Deadline, Effort. "Next Deadline" is computed per-row from whichever of
vettingDeadline/reviewDeadline/qaqcDeadline/submissionDeadline corresponds to
the case's current status. Visually flag overdue (coral) vs due-today (amber)
vs on-track (neutral) per the PRD.

Toggleable columns (off by default): Language, the four individual stage
deadlines, Assigned Analyst, Assigned Reviewer, Assigned QA/QC, Re-vet Date
(only meaningful when isRevet is true — show "—" otherwise).
```

---

## Step 8 — Home / Queue page

```
Build the Home/Queue page per max-vetting-workspace-outline.md section 4.1.
Status summary strip at top (counts per status from mock data), then the
DataTable below. Add the persistent left sidebar nav (Home, Case Workspace,
Reports & Audit) per Dub's Sidebar Nav Item pattern.
```

---

## Step 9 — Social Profiles & Audience Stats module

```
Build the Social Profiles & Audience Stats module per PRD section 4.2.1 and the
SocialProfile type. Include: follower/engagement stat rows, an audience
credibility donut/percentage display, audience type and reachability breakdowns
as horizontal bar rows, a growth trend chart (recharts, line or bar), content
tags as pills, brand mentions split into organic/paid, and the AI-generated
"Creator Insights" summary clearly labeled as AI-generated with thumbs up/down
feedback icons. Use the mock SocialProfile data from Step 3.
```

---

## Step 10 — Case Workspace shell + Overview

```
Build the Case Workspace page shell: a left-side sub-nav (Overview, Evidence,
Scorecard Draft, Reviewer Notes, Activity) within the case, distinct from the
main app sidebar. Build the Overview sub-page: influencer identity, market,
language, engagement, re-vet flag, status, assigned team, using the mock case data.
```

---

## Step 11 — Evidence sub-page

```
Build the Evidence sub-page: render the Social Profiles module from Step 9 at
the top, followed by a list of gathered evidence items (use CitationBlock),
each tagged with which scorecard section it maps to.

Add a "Run Coverage Scan" action (button). Since there's no real backend,
clicking it should render a static, hardcoded AIOutputCard result representative
of a Coverage Scan (mode label, timestamp, section-by-section findings with
citations, gaps checked/nothing-found states, contradictions flagged if any)
using the fictional case data. Include an "Insert into case" action on the
output — no real API call, just demonstrate the pattern per max-analysis-engine-spec.md.
```

---

## Step 12 — Scorecard Draft sub-page

```
Build the Scorecard Draft sub-page: render all 7 ScorecardSection entries from
the mock case. Each section shows the editable summary text, its citations
(CitationBlock list, plus an "Add Citation" button opening a manual-entry
form: date, source type, platform, title (when article/video), quote, link —
inserted into the section's citations in correct reverse-chron position on
submit), and the RiskLevelSelector. Sections should be visually
separated as standard cards per the Dub Dashboard Card pattern.

Add a "Suggest Risk Level" action per section. Since there's no real backend,
clicking it should render a static, representative suggestion (risk value +
plain-language reasoning per the green/yellow/red thresholds in
max-analysis-engine-spec.md) into that section's RiskLevelSelector as the
"ai_suggested" state, ready for one-click human confirm.
```

---

## Step 13 — Reports & Audit page

```
Build the Reports & Audit page: turnaround time distribution chart, volume vs.
threshold chart (recharts), and an audit table (actor, timestamp, action,
before/after, case) using mock activity data. Include filters for human
actions vs AI runs vs a specific case. The AI-runs filter is the history view
for past Coverage Scans and Risk Level suggestions (replacing the removed
standalone AI Analysis page).
```

---

## Step 14 — Wire routing and state

```
Add real client-side routing between all pages using Next.js App Router.
Set up a lightweight global state layer (Zustand) so that confirming a risk
level or inserting an AI output actually updates the underlying case data and
reflects across pages (e.g., queue status updates when a case's stage changes).
```

---

## Step 15 — Polish pass

```
Do a full pass: verify responsive behavior down to tablet width (per the PRD's
desktop-first assumption, define a reasonable tablet fallback), check text
contrast against Dub's token values for WCAG AA, add loading skeletons for the
DataTable and Social Profiles module, and confirm empty states preserve column
headers/filters per the design system rule.
```

---

## Step 16 — Deploy

```
Set up a GitHub repo and connect to Vercel for a live deployment. Confirm the
production build works and share the deployed URL.
```
