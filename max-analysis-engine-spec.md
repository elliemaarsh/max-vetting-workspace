# MAX Analysis Engine — Upgraded AI Spec
### Successor to the Coverage Scan GPT + Generator GPT

---

## 1. Why consolidate

The current two-GPT setup (Coverage Scan → Generator) works, but splitting research and formatting into separate tools means:
- Evidence gets re-typed/re-pasted between them
- Neither tool sees the whole picture at once, so neither can reason about risk across sections
- EMEA/GDPR handling exists in one tool but not the other — every other market gets no equivalent compliance awareness

MAX Analysis Engine keeps both functions but as **two modes of one engine that shares context**, so evidence gathered in Scan mode is immediately available to Assemble mode without a copy-paste step, and both modes can see the full case (market, re-vet status, existing evidence) at once.

---

## 2. Mode 1: Coverage Scan (upgraded)

**What it keeps from the current Coverage Scan GPT:**
- Scans all required sections every time, not just obvious controversies
- Subsection-specific keyword framework
- Public/hyperlinkable sources only
- Lookback windows (10yr Brand Safety, 18mo Competitive, 3yr other Strategic Fit)
- Reverse-chronological citation ordering

**What's new:**
- **Market-aware compliance, not just EMEA.** Data privacy handling should key off the case's actual market field (already captured at intake) and apply that market's specific restricted-data rules, not default to a single region's standard. This directly matches the current guide's own instruction that "each market has unique data compliance requirements."
- **Gap flagging.** Instead of silently returning "nothing to cite" when a section is thin, the engine states *what it checked and didn't find* — e.g., "Searched Instagram, X, TikTok, and Google News for political content; no results in the 10-year window." This gives the reviewer something to actually verify against, rather than trusting an empty section blindly.
- **Contradiction detection.** If two pieces of evidence conflict (e.g., an affiliation claimed in one post and denied in another), flag it explicitly rather than picking one.
- **Multilingual handling.** If content appears in a language other than the case's assigned language, flag it for translation/second-analyst review rather than silently including or excluding it.

---

## 3. Mode 2: Scorecard Assembly (upgraded)

**What it keeps from the current Generator GPT:**
- All formatting rules: hyperlink platform/publication name, `[…]` ellipses, reverse-chron order, full-name-then-last-name convention, names-only-inside-quotes rule
- Preserves analyst's existing evidence placement; only reassigns uncategorized items
- Section default/variant language patterns (the clean-record defaults, minor-exception variants, etc.)
- Re-vet mode: only cites since last vet date, same section logic

**What's new — Risk Suggestion Module:**

This is the core addition. For each section, after assembling the narrative and citations, the engine proposes a risk level using the **same thresholds already defined in the playbook** — it doesn't invent new criteria:

| Level | Rule applied |
|---|---|
| Green | 2–3 distinct examples where applicable, no pattern of hate/controversy |
| Yellow | 3–5 distinct examples, worthy of client review, platform not built on controversy |
| Red | 3–5+ examples showing a consistent pattern, platform substantially built on hate/controversy |

The suggestion always shows its reasoning in plain terms — e.g., *"Suggested: Yellow. 4 examples of political content across 3 platforms spanning 2022–2025; no single-issue pattern, platform not centered on controversy."* — never a bare color or number.

**This suggestion is never final.** It renders as a distinct, clearly-labeled "AI-suggested" state in the UI (per the Risk Level component we already spec'd) until a reviewer or analyst explicitly confirms or overrides it. Overriding should take one click and shouldn't require justification — the human's judgment is the point, not a formality to route around.

---

## 4. Output anatomy (both modes)

Every result returned includes:

1. Mode label (`Coverage Scan` / `Scorecard Assembly`)
2. Timestamp + run ID
3. Section-by-section content
4. Citations (formatted per existing rules)
5. What was checked but yielded nothing (for Scan mode)
6. Contradictions or ambiguities flagged
7. Suggested Risk Level + reasoning (Assembly mode only)
8. A single explicit action: "Insert into case" — nothing writes to the case record without this click

---

## 5. What stays explicitly out of scope for the AI

- Final risk level (suggestion only)
- Any interpretation of political ideology or intent beyond what's stated
- Any inclusion of restricted data elements — the engine should refuse and flag rather than guess when market rules are unclear
- Final submission — always a human action

---

## 6. Notes for build

- This maps to **inline Case Workspace actions** — "Run Coverage Scan" on Evidence and "Suggest Risk Level" per section on Scorecard Draft (the standalone AI Analysis page was cut; past runs surface under Reports & Audit → AI runs filter)
- The Risk Level component (Section 5 of the product outline) should be revised: instead of "blank until human sets it," it now renders as **AI-suggested (visually distinct, e.g. dashed border + "Suggested" label) → human confirms → becomes solid/final state**. This preserves the original trust principle while actually using the model's read of the evidence.
