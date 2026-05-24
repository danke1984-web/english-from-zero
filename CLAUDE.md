# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server — localhost:3000
npm run build        # Production build (Turbopack)
npm run lint         # ESLint
npx tsc --noEmit     # Type check — run before every commit
```

No test suite in v1.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript** strict mode
- **Tailwind CSS v4** — design tokens in `app/globals.css` under `@theme` (not tailwind.config)
- **Framer Motion** — `AnimatePresence` + `motion.div` for question transitions, skill bars
- **Zustand** — test state + result, persisted to `sessionStorage` (not localStorage)
- **next/font** — Inter (`--font-inter`) + Bricolage Grotesque (`--font-bricolage`)

## Architecture

### Data flow
```
Question bank (lib/questions.ts)
  → TestShell renders current question via QuestionRenderers
  → answers saved to Zustand testStore
  → computeResult() scores all skills → result stored in Zustand
  → redirect to /ket-qua → ResultsPage reads from store
  → CTA → /lo-trinh (roadmap, not yet built)
```

### Key files
- `lib/questions.ts` — all questions + `SKILL_META` + `LEVEL_META` constants. Edit here first.
- `lib/types.ts` — all TypeScript interfaces (Question, Answer, SkillScore, RoadmapConfig, etc.)
- `store/testStore.ts` — Zustand store. Handles navigation between skills/questions, scoring, reset.
- `components/test/TestShell.tsx` — main `"use client"` orchestrator for the entire test flow
- `components/test/QuestionRenderers.tsx` — 4 renderers: `MCQRenderer`, `FillRenderer`, `ListenMCQRenderer`, `SelfRateRenderer`
- `components/test/ProgressBar.tsx` — step indicators (skill steps + per-question fill bar)
- `components/test/ResultsPage.tsx` — score breakdown with animated progress bars

### Skill types and their renderers
| Skill | Question types | Special behavior |
|---|---|---|
| Nghe | `listen-mcq` | Web Speech API TTS (`speechSynthesis`), waveform animation |
| Đọc | `mcq`, `fill` | Standard MCQ and fill-in-blank with inline input |
| Viết | `fill`, `mcq` | Same renderers as Đọc |
| Nói | `self-rate` | `MediaRecorder` API for voice recording, 5-level self-assessment |

### Scoring
- MCQ/ListenMCQ: binary (correct = full points)
- Fill: case-insensitive match against `correctAnswers[]` array
- Self-rate: linear scale: rating 1→0%, 5→100% of `points`
- Level thresholds: ≤40% = Sơ Cấp, 41–70% = Cơ Bản, 71%+ = Trung Cấp

## Design tokens (from `app/globals.css @theme`)

| Token | Value | Usage |
|---|---|---|
| `bg-[#f8f9fa]` | light gray | page/section bg |
| `text-[#0d0d0d]` | near-black | primary text |
| `text-[#52525b]` | gray | secondary text |
| `text-[#a1a1aa]` | muted | labels, captions |
| `bg-[#2563eb]` | blue | primary CTA |
| `bg-[#eff6ff]` | blue-light | selected state bg |
| Skill colors | see SKILL_META | each skill has `color` + `bgColor` |

## Font usage

Reference fonts in Tailwind with inline style (not utility class):
```tsx
style={{ fontFamily: "var(--font-bricolage)" }}   // headings
style={{ fontFamily: "var(--font-inter)" }}        // body (default on body element)
```

## Conventions

- `"use client"` only when using browser APIs, Framer Motion, Zustand, or event handlers
- Tailwind only — no inline styles except `fontFamily` and dynamic colors from `SKILL_META`
- All text content in Vietnamese
- No `console.log`, no commented-out code
- `next/image` for all images — `width`/`height` or `fill` + `alt` + `sizes`

## Mandatory rules

1. **Screenshot after every major UI change** — compare with design intent
2. **Mobile-first** — test at 375px width, then scale up
3. **Scroll animation on every section** — use `whileInView={{ opacity: 1, y: 0 }}` + `initial={{ opacity: 0, y: 24 }}` + `viewport={{ once: true }}`
