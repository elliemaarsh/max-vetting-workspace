# AGENTS.md

## Cursor Cloud specific instructions

### What this project is
`MAX — AI Vetting Workspace` is a **frontend-only** proof-of-concept: Next.js 14 (App Router)
+ TypeScript + Tailwind CSS v3 + shadcn/ui. It has **no backend, database, auth, or external
integrations** — all data is typed mock data and all "AI" output is hardcoded (see
`max-vetting-workspace-prd.md`). There is exactly one runtime service: the Next.js dev server.

The repository began as spec-only Markdown docs. The Next.js app was scaffolded per **Step 1**
of `max-cursor-build-steps.md`; Steps 2–17 in that doc describe the remaining product build
(design tokens, pages, state wiring, deploy) and are not yet implemented.

### Running / linting / building
Standard scripts in `package.json` (package manager: **npm**, `package-lock.json` committed):
- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — ESLint (`next lint`)
- `npm run build` — production build
There are no automated tests configured yet.

### Non-obvious gotchas
- **shadcn/ui CLI must be pinned to v2.x** (e.g. `npx shadcn@2.3.0 add <component>`). Do NOT use
  `shadcn@latest`: the current CLI targets Tailwind **v4** and emits incompatible output for this
  Tailwind **v3** project (imports from `@base-ui/react`, `oklch()` CSS vars, v4-only utilities),
  which breaks the build.
- **Theme colors use HSL-triplet CSS variables** in `src/app/globals.css` (e.g. `--primary: 240 5.9% 10%`)
  because `tailwind.config.ts` wraps them as `hsl(var(--...))`. If you add shadcn components whose
  generator writes `oklch()` values, convert them to HSL triplets or the colors/opacity modifiers
  (`bg-primary/90`) will silently break.
- **Fonts are local** (`src/app/fonts/GeistVF.woff`, `GeistMonoVF.woff`) to avoid a network fetch at
  build time. Do not switch `src/app/layout.tsx` to `Geist` from `next/font/google` — that font only
  exists in Next.js 15, not the Next.js 14 used here.
