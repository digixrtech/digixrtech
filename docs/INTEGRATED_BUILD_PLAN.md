# Integrated Build + Claude Code Learning Plan

## Overview

This plan merges `PLATFORM_BUILD_PLAN.md` (what to build) with `CLAUDE_CODE_LEARNING_PLAN.md` (how to learn Claude Code) into a single actionable reference. Each step has a **unified checklist** — build and learning tasks are treated equally. **Do not mark a step complete until ALL checkboxes are checked.**

## Current State (as of 2026-03-12)

### Completed
- [x] Step 0: CLAUDE.md, Next.js 15 scaffold, folder structure, dependencies
- [x] Step 1: Layout shell — Navbar, Footer, globals.css, fonts
- [x] Step 2: Hero Section + Agent Network Canvas (mobile responsiveness deferred to Step 8)
- [x] Step 3: Services Section (lifecycle bar, service panels, offerings accordion, 4 canvas viz, river dividers)
- [x] Step 4: Clients + Blueprints Section (logo grid, tabbed blueprints, canvas viz, pipeline steps)

### Pending learnings from completed steps
> **CATCH-UP REQUIRED** — these learning tasks were skipped and must be done before Step 5 build begins.
- [x] **CATCH-UP:** Run `/simplify` on ServicesSection, ClientsSection, BlueprintsSection (from Step 3)
- [x] **CATCH-UP:** Create `/mockup-extract` skill (replaces brand-audit — see Step 3)
- [x] **CATCH-UP:** Create `/perf-check` skill (canvas performance audit — see Step 3)
- [x] ~~**CATCH-UP:** Install marketplace plugins~~ — N/A (Claude Code has no plugin marketplace; replaced with real tooling at respective steps)
- [x] ~~**CATCH-UP:** Practice `/rewind`~~ — N/A in VS Code extension (CLI-only command)

### In progress
- [ ] Step 5: Purpose Section + Elixir Canvas (all items done, pending commit)
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
- [x] **SETUP:** Create `/mockup-extract` skill — 7-category section extraction workflow ⚠️ REPLACED brand-audit
- [x] **SETUP:** Create `/perf-check` skill — canvas performance audit ⚠️ ADDED
- [x] ~~**SETUP:** Install marketplace plugins~~ — N/A (not a real Claude Code feature)
- [x] **VERIFY:** Scroll-triggered reveals, lifecycle bar follows scroll, cards expand/collapse

---

## Step 4: Clients + Blueprints Section

**Status:** Complete (build done, learnings pending — see catch-up list above)

### Checklist
- [x] **BUILD:** `ClientsSection.tsx` — client logos row
- [x] **BUILD:** `BlueprintsSection.tsx` — tabs, blueprint cards, demo links
- [x] **BUILD:** `viz-blueprint.ts` — blueprint network visualization canvas
- [x] ~~**LEARN:** Practice `/rewind`~~ — N/A in VS Code extension (CLI-only command). Recovery via `git checkout -- <file>` or VS Code Timeline.
- [x] **LEARN:** Use **parallel agents** for independent sub-tasks
- [x] **VERIFY:** Tab switching works, content renders, demo links navigate correctly

---

## Step 5: Purpose Section + Elixir Canvas

**Status:** In progress (build done, learning tasks remaining)
**Sessions:** ~1-2

> **PRE-REQ:** Complete all catch-up items from Steps 3-4 before starting build.

### Checklist
- [x] **CATCH-UP:** Run `/simplify` on existing sections (Step 3)
- [x] **CATCH-UP:** Create `/mockup-extract` skill (replaces brand-audit — Step 3)
- [x] **CATCH-UP:** Create `/perf-check` skill (canvas perf audit — Step 3)
- [x] ~~**CATCH-UP:** Install marketplace plugins~~ — N/A (not a real Claude Code feature)
- [x] ~~**CATCH-UP:** Practice `/rewind`~~ — N/A in VS Code extension (CLI-only). Use git for file recovery.
- [x] **BUILD:** `PurposeSection.tsx` — belief blocks (Vision/Mission/Intent)
- [x] **BUILD:** `elixir-animation.ts` — elixir D canvas animation (solid→logo dissolve, ripples, seeds, brand text)
- [x] **BUILD:** "Digixr. Digital Elixir." title with seed bloom animation
- [x] **SETUP:** `next-sitemap` — auto-generate sitemap.xml + robots.txt for SEO (installed early, runs on `postbuild`)
- [x] **LEARN:** Create `.claude/rules/canvas.md` — canvas animation conventions
- [x] **LEARN:** Run `/perf-check` on elixir-animation.ts — 3 minor issues, no criticals
- [x] **SETUP:** Create `.claude/agents/perf-reviewer.md` — custom agent for performance review
- [x] **VERIFY:** Elixir animation runs, seed bloom works, brand text renders, belief blocks match mockup

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
- [ ] **SETUP:** Install `@axe-core/playwright` — automated WCAG 2.1 accessibility testing via Playwright MCP
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
- [ ] **SETUP:** Install `@lhci/cli` (Lighthouse CI) — SEO, performance, accessibility scoring
- [ ] **SETUP:** Install `@next/bundle-analyzer` — visualize bundle size, catch bloat before deploy
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
- [ ] **BUILD:** Add JSON-LD structured data (Organization schema) to layout for rich search snippets
- [ ] **LEARN:** PR creation via Claude (`gh pr create`)
- [ ] **LEARN:** Git integration workflow
- [ ] **SETUP:** Add **Vercel MCP** server
- [ ] **VERIFY:** Production build succeeds, all pages work, animations smooth, Lighthouse 90+

---

## Claude Code Setup Checklist

### Rules (create during build)
- [x] `.claude/rules/components.md` — component conventions (Step 1)
- [x] `.claude/rules/canvas.md` — canvas animation conventions (Step 5)
- [ ] `.claude/rules/api.md` — API/security conventions (Step 7)

### Custom Agents (create during build)
- [x] `.claude/agents/mockup-checker.md` — verify component vs mockup (Step 2)
- [x] `.claude/agents/perf-reviewer.md` — performance review (Step 5)
- [ ] `.claude/agents/a11y-checker.md` — accessibility checker (Step 6)

### Custom Skills (create during build)
- [x] `.claude/skills/mockup-extract/SKILL.md` — 7-category section extraction workflow (Step 3, done)
- [x] `.claude/skills/perf-check/SKILL.md` — canvas performance audit (Step 3, done)

### SEO / Accessibility / Performance Tooling (install during build)
- [x] `next-sitemap` — auto-generate sitemap.xml + robots.txt (Step 5, installed)
- [ ] `@axe-core/playwright` — WCAG 2.1 accessibility testing via Playwright (Step 6)
- [ ] `@lhci/cli` — Lighthouse CI for SEO, performance, a11y scoring (Step 8)
- [ ] `@next/bundle-analyzer` — bundle size visualization (Step 8)
- [ ] JSON-LD structured data (Organization schema) — rich search snippets (Step 10)

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
| `/rewind` | CLI only — in VS Code, use git or Timeline |
| `/memory` | When Claude seems confused |
| `/compact "focus on [X]"` | When conversation gets long |
| `/rename "step-N-name"` | Name important sessions |
| `/resume` | Continue previous work |
| `/simplify` | After building components |

---

## Phase 2: LangGraph/LangChain Agent Development (Future)

> Create these skills and rules when Python agent development begins.

### Custom Skills (Phase 2)
- [ ] `.claude/skills/langgraph-scaffold/SKILL.md` — generate agent graph boilerplate (State, nodes, edges, checkpointer, tests)
- [ ] `.claude/skills/test-agent/SKILL.md` — create test harness (InMemorySaver, interrupt_before, mock tools, state validation)
- [ ] `.claude/skills/audit-graph/SKILL.md` — validate graph against production best practices

### Rules (Phase 2)
- [ ] `.claude/rules/langgraph.md` — LangGraph conventions:
  - State must use TypedDict/Pydantic (not raw dicts)
  - No print() — structured logging only (logging.getLogger + JSON)
  - Supervisor agents explicitly list subagents
  - All nodes must have error handling
  - LangSmith instrumentation required for production
  - State size tracked (warn if >100KB per execution)
  - Node names must be descriptive (`validate_user_input` not `step1`)

### Key Patterns to Enforce
- **Subagents pattern** — supervisor coordinates specialized stateless subagents
- **Human-in-the-loop** — `interrupt_before` for critical decision gates
- **Testing** — InMemorySaver checkpointer, test individual nodes via `graph.nodes`, mock tools
- **Context engineering** — each agent sees only the information it needs

### MCP Servers & Tooling (Phase 2)
- [ ] Sentry MCP — error tracking (project scope)
- [ ] Supabase MCP — database (project scope)
- [ ] `pyright` — Python type checking (dev dependency)

---

## Source Documents
- `docs/PLATFORM_BUILD_PLAN.md` — detailed build plan with code patterns
- `docs/CLAUDE_CODE_LEARNING_PLAN.md` — full Claude Code feature learning guide
- `CLAUDE.md` — project brain (auto-loaded every session)
