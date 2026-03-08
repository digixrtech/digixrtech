# Claude Code Mastery — Practical Learning Plan for Digixr Platform Build

## Context

You want to learn how to harness Claude Code effectively while building the Digixr platform. This plan maps every major Claude Code feature to a practical exercise you'll perform during the actual platform build — so you learn by doing, not by reading.

## Implementation

Mark items with `[x]` as completed each day.

---

## Phase 1: Foundation Setup (Do Once, Benefit Forever)

### 1.1 CLAUDE.md — Your Project Brain [x]

Already created at project root. Key learning:
- CLAUDE.md loads automatically in every conversation — no need to re-explain your project
- Keep it under 200 lines — focused, not exhaustive
- Update it as patterns emerge (after building first component, add component conventions)

**Next step:** After building Navbar + Footer, update CLAUDE.md with the component pattern that emerged.

### 1.2 Path-Specific Rules (`.claude/rules/`)

**What:** Rules that only apply when Claude is working on specific file paths. More targeted than CLAUDE.md.

**Exercise — Create these during the build:**

```
.claude/rules/components.md     → "All components must match the mockup pixel-for-pixel.
                                   Read the corresponding section in mockups/services-section-mockup.html
                                   before writing any component."

.claude/rules/canvas.md         → "Canvas animations are pure JS/TS modules.
                                   Never use React state for animation logic.
                                   Mount via useRef + useEffect, cleanup on unmount."

.claude/rules/api.md            → "API routes must validate input.
                                   Never expose API keys client-side.
                                   Use Vercel AI SDK for LLM streaming."
```

These load on-demand — no context wasted when you're not in those directories.

### 1.3 Auto-Memory [x]

**What:** Claude automatically saves learnings across conversations in `~/.claude/projects/.../memory/MEMORY.md`.

**Already active.** Key practices:
- Say "remember that we use pnpm" → Claude saves it permanently
- Say "forget that" → Claude removes incorrect memories
- Run `/memory` to audit what Claude has memorized
- If Claude gives wrong info from memory, correct it — Claude updates the source

### 1.4 Settings Configuration

**Exercise — Set up these settings in `.claude/settings.json`:**

```json
{
  "permissions": {
    "allow": [
      "Bash(pnpm dev)",
      "Bash(pnpm build)",
      "Bash(pnpm lint)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Bash(git log *)",
      "Bash(git add *)",
      "Read",
      "Glob",
      "Grep"
    ],
    "deny": [
      "Bash(git push --force *)",
      "Bash(rm -rf *)"
    ]
  }
}
```

This reduces permission fatigue — safe commands auto-approve, dangerous ones are blocked.

---

## Phase 2: The Build Loop (Learn With Every Component)

### 2.1 Plan Mode — Explore Before You Code

**What:** Read-only mode where Claude researches before implementing. Toggle with `Shift+Tab` (twice) or type `/plan`.

**When to use:**
- Before each new section component (Hero, Services, Blueprints, etc.)
- Before any refactoring
- When unsure how something should work

**Exercise — For every section component:**
1. Enter Plan Mode
2. Ask: "Read the [section name] in `mockups/services-section-mockup.html` and plan the React conversion. Identify all CSS, HTML structure, and JS behavior."
3. Review the plan — does it capture all interactive behaviors?
4. Edit the plan directly with `Ctrl+G` if needed
5. Approve, switch to Normal Mode, implement

### 2.2 Subagents — Parallel Research

**What:** Specialized child agents that work in isolated contexts.

**Built-in types:**
| Type | Speed | Tools | Use when |
|------|-------|-------|----------|
| `Explore` | Fast | Read-only | Searching codebase, finding patterns |
| `Plan` | Normal | Read-only | Designing implementation |
| `General-purpose` | Normal | All | Complex multi-step tasks |
| `claude-code-guide` | Normal | Read + Web | Questions about Claude Code itself |

**Exercise — During the Services Section build:**
- Launch 2 Explore agents in parallel:
  - Agent 1: "Find all CSS for `.services-section` in the mockup"
  - Agent 2: "Find all JS behavior for service cards (expand/collapse, scroll triggers)"

**Exercise — Create a custom subagent:**

Create `.claude/agents/mockup-checker.md` (see Phase 5.5 below)

### 2.3 Slash Commands — Your Toolkit

| Command | When to use | Exercise |
|---------|-------------|----------|
| `/plan` | Before each component | Enter plan mode for Hero Section |
| `/commit` | After each working component | Commit Navbar + Footer |
| `/clear` | Between unrelated tasks | Clear after finishing layout, before starting Hero |
| `/memory` | When Claude seems confused | Check what it remembers about your project |
| `/rewind` | When something goes wrong | If a component breaks, rewind to last good state |
| `/compact` | When conversation gets long | Compact with "keep focus on Services Section" |
| `/rename` | Name important sessions | `/rename navbar-footer-build` |
| `/resume` | Continue previous work | Resume yesterday's session |

### 2.4 Context Management — Your Most Valuable Resource

**Key insight:** Context window fills up. When it does, Claude gets slower and less accurate.

**Practices:**
- **Start fresh for each major component:** `/clear` between Hero and Services
- **Use subagents for heavy reads:** Don't read 3800-line mockups in main context — send an Explore agent
- **Reference files with `@`:** Type `@src/components/Navbar.tsx` instead of pasting code
- **Compact strategically:** `/compact Keep focus on the current component. Preserve CLAUDE.md and project structure.`
- **Monitor usage:** Check context consumption with `/cost`

---

## Phase 3: Hooks — Automation That Always Runs

### 3.1 Auto-Format After Edits

**Exercise — Set up via `/hooks`:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{
          "type": "command",
          "command": "npx prettier --write $(jq -r '.tool_input.file_path')"
        }]
      }
    ]
  }
}
```

### 3.2 Block Dangerous Operations

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "echo $INPUT | jq -r '.tool_input.command' | grep -q 'push.*--force' && echo 'Force push blocked' >&2 && exit 2 || exit 0"
        }]
      }
    ]
  }
}
```

### 3.3 Notification When Done

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [{
          "type": "command",
          "command": "notify-send 'Claude Code' 'Task complete — needs your attention'"
        }]
      }
    ]
  }
}
```

---

## Phase 4: Git Workflow Integration

### 4.1 Commit With `/commit`

After each working milestone — Claude reads the diff, drafts a message, you approve.

### 4.2 Worktrees for Experiments

Isolated git worktrees for experimentation without affecting main branch.

### 4.3 PR Creation

When ready to deploy: Claude generates title, description, creates via `gh pr create`.

---

## Phase 5: Plugins, MCP Servers & Skills

### 5.1 Plugins to Install

| Plugin | Purpose | When to Install |
|--------|---------|-----------------|
| **typescript-lsp** | Code intelligence — auto-diagnostics after every edit | **Step 0 (now)** |
| **github** | Create PRs, manage issues | **Step 0 (now)** |
| **commit-commands** | Enhanced git commit workflows | **Step 0 (now)** |
| **pr-review-toolkit** | Automated PR review agents | **Step 10 (deploy)** |

### 5.2 MCP Servers to Connect

| MCP Server | Command | When to Add |
|------------|---------|-------------|
| **Playwright** | `claude mcp add --transport stdio playwright -- npx -y @playwright/mcp@latest` | **Step 8 (polish)** |
| **Vercel** | `claude mcp add --transport http vercel https://mcp.vercel.com/mcp/` | **Step 10 (deploy)** |
| **Supabase** | `claude mcp add --transport http supabase https://mcp.supabase.com/` | **Phase 3** |
| **Sentry** | `claude mcp add --transport http sentry https://mcp.sentry.dev/mcp` | **Phase 3** |

### 5.3 Built-in Skills

| Skill | Command | When to Use |
|-------|---------|-------------|
| **Simplify** | `/simplify` | After building each component |
| **Batch** | `/batch "..."` | Large-scale refactors |
| **Debug** | `/debug` | When Claude Code itself has issues |
| **Loop** | `/loop 5m pnpm build` | Monitor long-running processes |

### 5.4 Custom Skills to Create

**Skill 1: Mockup Fidelity Check** — `.claude/skills/check-mockup.md`
**Skill 2: Brand Consistency Audit** — `.claude/skills/brand-audit.md`

### 5.5 Custom Subagents to Create

**Agent 1: Mockup Checker** — `.claude/agents/mockup-checker.md`
**Agent 2: Accessibility Checker** — `.claude/agents/a11y-checker.md`
**Agent 3: Performance Reviewer** — `.claude/agents/perf-reviewer.md`

---

## Phase 6: Advanced Patterns

### 6.1 Multi-File Editing with `/batch`
### 6.2 Parallel Sessions
### 6.3 CI/CD Integration (Future)

---

## Learning Schedule Mapped to Build Steps

| Build Step | Claude Code Features | Plugins/Skills/MCP |
|---|---|---|
| **Step 0: Foundation** [x] | CLAUDE.md, permissions, settings | Install plugins |
| **Step 1: Layout Shell** [ ] | Plan Mode, `/commit` | Create `.claude/rules/components.md`, `/simplify` |
| **Step 2: Hero Section** [ ] | Explore subagents, `@` file refs | Create `mockup-checker` agent, `/check-mockup` skill |
| **Step 3: Services Section** [ ] | `/clear` between tasks | `/simplify`, `/brand-audit` skill |
| **Step 4: Blueprints** [ ] | `/rewind`, parallel agents | `mockup-checker` verification |
| **Step 5: Purpose Section** [ ] | `.claude/rules/canvas.md` | Create `perf-reviewer` agent |
| **Step 6: Discovery** [ ] | `/compact`, `/rename` | Create `a11y-checker` agent |
| **Step 7: Chat Widget** [ ] | Hooks (auto-format) | Permission rules for API keys |
| **Step 8: Polish** [ ] | `/batch`, worktrees | Add Playwright MCP |
| **Step 9: Secondary Pages** [ ] | `/resume` across sessions | `pr-review-toolkit` plugin |
| **Step 10: Deploy** [ ] | PR creation, Git integration | Add Vercel MCP |

---

## Quick Reference Card

```
BEFORE each component:    /plan → read mockup → design → approve
AFTER each component:     /commit → verify in browser
BETWEEN components:       /clear (fresh context)
WHEN stuck:               /rewind (go back to last good state)
WHEN confused:            /memory (check what Claude remembers)
LONG sessions:            /compact "keep focus on [current task]"
WANT to resume tomorrow:  /rename "descriptive-session-name"
NEXT DAY:                 /resume → pick session
```

---

## Verification Checklist

- [ ] Can explain when to use Plan Mode vs. Normal Mode
- [ ] Installed and used 3+ plugins
- [ ] Created and used 2+ custom skills
- [ ] Created and used 2+ custom subagents
- [ ] Connected 2+ MCP servers
- [ ] Set up at least 1 hook
- [ ] Used `/simplify` after building components
- [ ] Use `/clear` between unrelated tasks naturally
- [ ] Use `/commit` after every working milestone
- [ ] CLAUDE.md has evolved 3+ times during the build
- [ ] Can recover from a bad change using `/rewind`
- [ ] Used `/batch` for at least one multi-file operation
