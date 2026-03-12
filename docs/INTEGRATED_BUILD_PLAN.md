# Integrated Build + Claude Code Learning Plan

## Overview

This plan merges `PLATFORM_BUILD_PLAN.md` (what to build) with `CLAUDE_CODE_LEARNING_PLAN.md` (how to learn Claude Code) into a single actionable reference. Each step has a **unified checklist** — build and learning tasks are treated equally. **Do not mark a step complete until ALL checkboxes are checked.**

## Current State (as of 2026-03-11)

### Completed
- [x] Step 0: CLAUDE.md, Next.js 15 scaffold, folder structure, dependencies
- [x] Step 1: Layout shell — Navbar, Footer, globals.css, fonts
- [x] Step 2: Hero Section + Agent Network Canvas (mobile responsiveness deferred to Step 8)
- [x] Step 3: Services Section (lifecycle bar, service panels, offerings accordion, 4 canvas viz, river dividers)
- [x] Step 4: Clients + Blueprints Section (logo grid, tabbed blueprints, canvas viz, pipeline steps)

### Pending learnings from completed steps
> **CATCH-UP REQUIRED** — these learning tasks were skipped and must be done before Step 5 build begins.
- [x] **CATCH-UP:** Run `/simplify` on ServicesSection, ClientsSection, BlueprintsSection (from Step 3)
- [ ] **CATCH-UP:** Create `.claude/skills/brand-audit.md` (from Step 3)
- [ ] **CATCH-UP:** Practice `/rewind` on a safe test change (from Step 4)

### Not started
- [ ] Step 5: Purpose Section + Ripple Field Canvas
- [ ] Step 6: Insights Teaser + Discovery Section
- [ ] Step 7: Chat Widget
- [ ] Step 8: Scroll Transitions + Polish
- [ ] Step 9: Secondary Pages
- [ ] Step 10: Deploy

---

## Session Workflow (repeat for every step)

> **IMPORTANT:** Claude must prompt the user for each unchecked item before moving to the next step. Do not skip learning tasks.

```
1. /plan          → Claude reads mockup section, proposes approach
2. Review plan    → Refine with specific feedback
3. Build          → Claude implements, you verify in browser
4. Learn          → Complete all learning/setup tasks for this step
5. /commit        → Checkpoint progress
6. /clear         → Fresh context for next step
```

---

## Step 1: Complete Layout Shell

**Status:** Complete

### Checklist
- [x] **BUILD:** Navbar scroll behavior matching mockup pixel-for-pixel
- [x] **BUILD:** Footer matching mockup
- [x] **BUILD:** Verify layout.tsx wraps pages correctly
- [x] **LEARN:** Use `/plan` mode — read mockup, design approach, then implement
- [x] **LEARN:** Use `/commit` after verification
- [x] **SETUP:** Create `.claude/rules/components.md` with component conventions
- [x] **SETUP:** Update `.claude/settings.json` with auto-approve for safe commands
- [x] **VERIFY:** `pnpm dev` → Navbar renders, Footer renders, scroll behavior works

---

## Step 2: Hero Section + Agent Network Canvas

**Status:** Complete

### Checklist
- [x] **BUILD:** `HeroSection.tsx` — headline, subtext, CTAs, light background
- [x] **BUILD:** `agent-network.ts` — extract canvas animation as pure TS module
- [x] **BUILD:** Mount canvas via `useRef` + `useEffect`, cleanup on unmount
- [x] **LEARN:** Use **Explore subagents** — launch 2 in parallel (mockup HTML + canvas JS)
- [x] **LEARN:** Use **`@` file references** — reference mockup sections directly
- [x] **SETUP:** Create `.claude/agents/mockup-checker.md` — custom agent to verify component vs mockup
- [x] **VERIFY:** Animation runs, scroll transition works, CTAs scroll to sections

**Note:** Mobile responsive sizing deferred to Step 8 — fix in mockup first, then sync code.

---

## Step 3: Services Section

**Status:** Complete (build done, learnings pending — see catch-up list above)

### Checklist
- [x] **BUILD:** `ServicesSection.tsx` — lifecycle bar, service cards, expand/collapse
- [x] **BUILD:** 4 canvas visualizations (context/build/secure/assure)
- [x] **BUILD:** River dividers between service panels
- [x] **BUILD:** Intersection Observer scroll triggers
- [x] **LEARN:** `/clear` between Hero and Services (fresh context)
- [x] **LEARN:** Run `/simplify` after building — review for unnecessary complexity
- [ ] **SETUP:** Create `.claude/skills/brand-audit.md` — brand consistency skill ⚠️ SKIPPED
- [x] **VERIFY:** Scroll-triggered reveals, lifecycle bar follows scroll, cards expand/collapse

---

## Step 4: Clients + Blueprints Section

**Status:** Complete (build done, learnings pending — see catch-up list above)

### Checklist
- [x] **BUILD:** `ClientsSection.tsx` — client logos row
- [x] **BUILD:** `BlueprintsSection.tsx` — tabs, blueprint cards, demo links
- [x] **BUILD:** `viz-blueprint.ts` — blueprint network visualization canvas
- [ ] **LEARN:** Practice `/rewind` — recovery if something breaks ⚠️ SKIPPED
- [x] **LEARN:** Use **parallel agents** for independent sub-tasks
- [x] **VERIFY:** Tab switching works, content renders, demo links navigate correctly

---

## Step 5: Purpose Section + Ripple Field Canvas

**Status:** Not started
**Sessions:** ~1-2

> **PRE-REQ:** Complete all catch-up items from Steps 3-4 before starting build.

### Checklist
- [x] **CATCH-UP:** Run `/simplify` on existing sections (Step 3)
- [ ] **CATCH-UP:** Create `.claude/skills/brand-audit.md` (Step 3)
- [ ] **CATCH-UP:** Practice `/rewind` on a safe test change (Step 4)
- [ ] **BUILD:** `PurposeSection.tsx` — belief blocks (Vision/Mission/Intent)
- [ ] **BUILD:** `ripple-field.ts` — ripple field canvas animation
- [ ] **BUILD:** "Digixr. Digital Elixir." title with seed bloom animation
- [ ] **LEARN:** Create `.claude/rules/canvas.md` — canvas animation conventions
- [ ] **SETUP:** Create `.claude/agents/perf-reviewer.md` — custom agent for performance review
- [ ] **VERIFY:** Ripple animation runs, seed bloom works, brand text renders correctly

---

## Step 6: Insights Teaser + Discovery Section

**Status:** Not started
**Sessions:** ~2

### Checklist
- [ ] **BUILD:** `InsightsTeaser.tsx` — article cards
- [ ] **BUILD:** `DiscoverySection.tsx` — guided discovery agent flow
- [ ] **BUILD:** `discovery-flow.ts` — conversation logic
- [ ] **BUILD:** `architecture-templates.ts` — template data
- [ ] **LEARN:** Use `/compact` — long session, compact with focus directive
- [ ] **LEARN:** Use `/rename` — name session for `/resume` later
- [ ] **SETUP:** Create `.claude/agents/a11y-checker.md` — accessibility checker agent
- [ ] **VERIFY:** Full discovery flow works (industry → challenge → proposal → lead form)

---

## Step 7: Chat Widget

**Status:** Not started
**Sessions:** ~1

### Checklist
- [ ] **BUILD:** `ChatWidget.tsx` — floating chat, portal rendering, quick actions
- [ ] **BUILD:** Toggle open/close, message rendering
- [ ] **LEARN:** Set up **hooks** — auto-format with Prettier after edits (PostToolUse hook)
- [ ] **LEARN:** Set up **hooks** — block force push (PreToolUse hook)
- [ ] **LEARN:** Set up **hooks** — desktop notification when task completes
- [ ] **SETUP:** Create `.claude/rules/api.md` — API/security conventions for later phases
- [ ] **VERIFY:** Toggle open/close, messages render, quick actions work

---

## Step 8: Scroll Transitions + Polish

**Status:** Not started
**Sessions:** ~1-2

### Checklist
- [ ] **BUILD:** Scroll-driven background color interpolation (light #FAFCFD → dark #0a0a12)
- [ ] **BUILD:** Section reveal animations via Intersection Observer
- [ ] **BUILD:** Navbar color interpolation on scroll
- [ ] **BUILD:** Mobile responsiveness pass (including Hero deferred from Step 2)
- [ ] **LEARN:** Use `/batch` for multi-file polish edits
- [ ] **LEARN:** Use **worktrees** — experiment with animation variants in isolation
- [ ] **SETUP:** Add **Playwright MCP** server for visual testing
- [ ] **VERIFY:** Smooth transitions, mobile responsive, Lighthouse 90+ performance

---

## Step 9: Secondary Pages

**Status:** Not started
**Sessions:** ~1

### Checklist
- [ ] **BUILD:** `src/app/insights/page.tsx` — insights listing
- [ ] **BUILD:** `src/app/blueprint-demo/healthcare/page.tsx`
- [ ] **BUILD:** `src/app/blueprint-demo/education/page.tsx`
- [ ] **LEARN:** Use `/resume` — continue from previous session
- [ ] **LEARN:** PR review workflow
- [ ] **VERIFY:** Navigation between pages, shared layout works, content matches mockups

---

## Step 10: Deploy

**Status:** Not started
**Sessions:** ~1

### Checklist
- [ ] **BUILD:** Push to GitHub
- [ ] **BUILD:** Connect repo to Vercel
- [ ] **BUILD:** Configure domain
- [ ] **BUILD:** Tag `v1.0.0-static`
- [ ] **LEARN:** PR creation via Claude (`gh pr create`)
- [ ] **LEARN:** Git integration workflow
- [ ] **SETUP:** Add **Vercel MCP** server
- [ ] **VERIFY:** Production build succeeds, all pages work, animations smooth, Lighthouse 90+

---

## Claude Code Setup Checklist

### Rules (create during build)
- [x] `.claude/rules/components.md` — component conventions (Step 1)
- [ ] `.claude/rules/canvas.md` — canvas animation conventions (Step 5)
- [ ] `.claude/rules/api.md` — API/security conventions (Step 7)

### Custom Agents (create during build)
- [x] `.claude/agents/mockup-checker.md` — verify component vs mockup (Step 2)
- [ ] `.claude/agents/perf-reviewer.md` — performance review (Step 5)
- [ ] `.claude/agents/a11y-checker.md` — accessibility checker (Step 6)

### Custom Skills (create during build)
- [ ] `.claude/skills/brand-audit.md` — brand consistency audit (Step 3)

### Hooks (set up during build)
- [ ] PostToolUse: Auto-format with Prettier after Edit/Write (Step 7)
- [ ] PreToolUse: Block force push (Step 7)
- [ ] Notification: Desktop notify when task completes (Step 7)

### MCP Servers (connect during build)
- [ ] Playwright — visual testing (Step 8)
- [ ] Vercel — deployment (Step 10)
- [ ] Supabase — database (Phase 2, future)
- [ ] Sentry — error tracking (Phase 3, future)

---

## Quick Reference

| Command | When |
|---------|------|
| `/plan` | Before each component |
| `/commit` | After each working milestone |
| `/clear` | Between unrelated tasks |
| `/rewind` | When something goes wrong |
| `/memory` | When Claude seems confused |
| `/compact "focus on [X]"` | When conversation gets long |
| `/rename "step-N-name"` | Name important sessions |
| `/resume` | Continue previous work |
| `/simplify` | After building components |

---

## Source Documents
- `docs/PLATFORM_BUILD_PLAN.md` — detailed build plan with code patterns
- `docs/CLAUDE_CODE_LEARNING_PLAN.md` — full Claude Code feature learning guide
- `CLAUDE.md` — project brain (auto-loaded every session)
