---
name: create-article
description: Interactive 4-phase workflow to create a thought leadership Deep Dive article (1500-2500 words) for Digixr Insights. Guides from topic ideation through storyline refinement to publication-ready output.
---

# Create Article — Digixr Insights Deep Dive

An interactive, iterative creative process for producing thought leadership articles. Each phase requires user approval before advancing. The user can iterate within any phase as many times as needed.

## Author Reference

| Author | ID | Background |
|--------|----|------------|
| Saravanakumar D (default) | `a1000000-0000-0000-0000-000000000002` | Co-Founder, 17+ yrs IT, Enterprise Architect |
| Dineshkumar Duraisamy | `a1000000-0000-0000-0000-000000000001` | Co-Founder, 20+ yrs IT, Agentic AI specialist |

For other Digixr associates, ask the user for name and role — you will need to INSERT into the `authors` table first.

## Category Reference

| Key | Label | Use when |
|-----|-------|----------|
| `context` | Context Engineering | RAG, knowledge management, context orchestration, memory systems |
| `security` | Agent Security | Prompt injection, access control, compliance, threat modeling |
| `assurance` | AI Assurance | Fairness, bias detection, hallucination, evaluation, testing |
| `agent` | Agent Engineering | Multi-agent, orchestration, MCP, tool use, architecture patterns |
| `industry` | Industry | Enterprise use cases, vertical applications, business impact |
| `engineering` | Engineering | Dev practices, MLOps, deployment, infrastructure, CI/CD |
| `leadership` | Leadership | AI strategy, org readiness, CxO perspective, transformation |
| `tutorial` | Tutorial | Hands-on implementation guides, step-by-step builds |

---

## Phase 1: Topic & Intent Gathering

Ask the user for:
- **Topic** (required) — what the article is about
- **Intent / storyline brief** (optional) — the angle, argument, or key message they want to convey
- **Author** (optional) — defaults to Saravanakumar D

Then immediately:
1. **Web search** the topic for latest developments, debates, contrarian views, and gaps in existing coverage (use WebSearch tool)
2. **Check existing articles** — read `supabase/migrations/001_create_articles_schema.sql` to see what Digixr has already published on this or related topics
3. **Present landscape findings** to the user:
   - What's already well-covered elsewhere (don't repeat this)
   - What's missing or underexplored (opportunity space)
   - Where Digixr can add unique practitioner value
   - Any recent developments that make this topic timely

Wait for user acknowledgment before proceeding to Phase 2.

---

## Phase 2: Storyline Options (iterative)

Generate **2-3 distinct storyline options**. Each option includes:

```
### Option [N]: [Working Title]

**Hook:** [The counterintuitive opening claim — 1-2 sentences]
**Core argument:** [The through-line of the article — what the reader will believe by the end]
**Section flow:**
1. [Memorable section name] — [one-line summary]
2. [Memorable section name] — [one-line summary]
3. [Memorable section name] — [one-line summary]
4. [Memorable section name] — [one-line summary]
5. (optional) [Memorable section name] — [one-line summary]
**Elixir Take:** [The opinionated closing stance — 1-2 sentences]
**Suggested category:** [category key] / [category label]
```

**Rules for storyline options:**
- Each option must take a genuinely different angle on the topic — not just reworded versions of the same idea
- Hooks must be counterintuitive or challenge a common assumption
- Section names must be memorable and encode the insight (not "Introduction", "Best Practices", "Conclusion")
- The Elixir Take must be an actual opinion that someone could disagree with

**User interaction loop:**
- Present the options and ask the user to pick one, combine elements from multiple, tweak, or request entirely new options
- Iterate as many times as needed
- Proceed to Phase 3 only when the user explicitly confirms / freezes a storyline

---

## Phase 3: Detailed Outline (iterative)

Expand the frozen storyline into a **detailed section-by-section outline**. For each section:

```
### Section [N]: [Title]

**Key points:**
- [Specific point 1]
- [Specific point 2]
- [Specific point 3]
- [Specific point 4] (optional)
- [Specific point 5] (optional)

**Teaching moment:** [The specific insight or "aha" the reader gets from this section]

**Diagram:** [Mermaid diagram type and what it illustrates — or "None"]
**Image brief:** [IMAGE: detailed description of conceptual illustration — or "None"]
**In Production:** [Brief description of the real-world anecdote for this section — or "None"]
```

**Minimum requirements across the full outline:**
- At least 1 Mermaid diagram placement (flowchart, sequence, or architecture)
- At least 1 `[IMAGE: ...]` brief for a conceptual illustration
- At least 1 "In Production" callout with a real-world anecdote
- 3-5 sections total (excluding opening hook and Elixir Take)

**User interaction loop:**
- Present the detailed outline and ask the user to review
- User can reorder sections, add/remove key points, adjust diagram placements, refine image briefs, change depth
- Iterate as many times as needed
- Proceed to Phase 4 only when the user explicitly approves the outline

---

## Phase 4: Article Generation & Output

Write the full article following the approved outline. Apply the Voice Guide and Structural Rules below.

### Structural Rules

1. **Opening hook** — 2-3 sentences. Counterintuitive claim or "what everyone gets wrong." No fluff.
2. **Body sections** — 3-5 sections with the approved memorable titles
3. **Mermaid diagrams** — in ` ```mermaid ` fenced code blocks
4. **Image briefs** — as `[IMAGE: detailed description]` inline where the image should appear
5. **In Production callouts** — as blockquotes: `> **In Production:** anecdote text`
6. **The Elixir Take** — final section, always titled "The Elixir Take". This is a position, not a summary.
7. **Word count** — 1500-2500 words
8. **Read time** — calculate as `ceil(wordCount / 250)`

### After Writing, Self-Check Against Quality Rubric

Before presenting the article, verify ALL of the following. If any check fails, revise before presenting:

1. Does the opening hook compel reading? (not generic, not "In today's world...")
2. Is there at least 1 Mermaid diagram and 1 image brief?
3. Does every section teach something specific — not generic advice?
4. Would a senior engineer find this valuable, not obvious?
5. Does the Elixir Take give a clear, defensible opinion someone could disagree with?
6. Is the word count between 1500-2500?

### Output Three Artifacts

**Artifact 1: Article Markdown**
The full article content, ready for the Supabase `content` column.

**Artifact 2: SQL INSERT**
```sql
INSERT INTO public.articles (slug, title, excerpt, content, category, category_label, author_id, published, published_at, read_time, meta_title, meta_description)
VALUES (
  'slug-here',
  'Title Here',
  'Compelling excerpt here — different from meta_description.',
  'Full markdown content here (single quotes doubled as '''')',
  'category_key',
  'Category Label',
  'author-uuid-here',
  false,
  null,
  7,
  'Meta Title Under 60 Chars | Digixr Insights',
  'Meta description 150-160 chars with CTA language.'
);
```

Note: `published = false` and `published_at = null` — articles are created as drafts.

**Artifact 3: SEO Summary**
```
Slug:             the-article-slug
Meta Title:       Under 60 chars | Digixr Insights
Meta Description: 150-160 chars with CTA language
Read Time:        N min
Word Count:       NNNN words
Category:         category_key / Category Label
Author:           Author Name
```

---

## The Digixr Voice Guide

Follow these rules for ALL article content:

- **Practitioner, not pundit.** Write like someone who builds these systems, not someone who comments on them. Specific technical details over hand-wavy advice.
- **Second person.** "You" not "teams" or "organizations". It's a conversation.
- **Lead with counterintuitive claims.** Start with what everyone gets wrong, not what everyone knows.
- **Short paragraphs.** 3-4 sentences max. One idea per paragraph.
- **Punchy sentences.** Vary length. Use fragments for emphasis. Like this.
- **Production reality.** At least one moment describing what actually breaks, fails, or surprises in production. War stories, not theory.
- **Explain relationships, not jargon.** Don't drop acronyms without showing how they connect. The reader is smart but may not share your vocabulary.
- **The Elixir Take.** Every article ends with "The Elixir Take" — Digixr's opinionated stance. Not a summary. A position.
- **No fluff intros.** Never start with "In today's fast-paced world", "As AI continues to evolve", or "In the rapidly changing landscape of". Start with the interesting thing.
- **Concrete over abstract.** "Your agent will hallucinate 12% more on multi-hop queries" beats "agents can sometimes produce inaccurate results".

---

## Anti-Patterns — What NOT to Do

- **Generic advice.** "Use monitoring" is not insight. "Monitor token-per-second variance because it predicts cascading failures 4 minutes before they hit" is insight.
- **Listicles disguised as thought leadership.** Give sections memorable names that encode the insight, not "Tip 1, Tip 2, Tip 3".
- **Missing the "so what".** Every section must answer: why should the reader change what they're doing tomorrow?
- **Undifferentiated from ChatGPT output.** If removing the Digixr branding makes this indistinguishable from generic AI-generated content, rewrite.
- **Jargon soup.** "Leverage RAG-augmented HITL pipelines for agentic orchestration" teaches nothing. Unpack it.
- **Weak Elixir Take.** "AI is important and companies should invest in it" is not an opinion. "Build your evaluation framework before you build your agent" is an opinion.
- **Summary conclusions.** "In this article we covered..." is lazy. The Elixir Take should push the reader's thinking forward, not recap what they just read.

---

## Notes

- **Mermaid rendering:** If Mermaid is not yet supported on the article detail page, note this in the output. Diagrams will render as code blocks until `rehype-mermaid` is added.
- **Image briefs:** `[IMAGE: ...]` markers indicate where a designer should create custom illustrations. They are not rendered as images — they are production instructions.
- **SQL escaping:** All single quotes in content must be doubled (`''`) for valid SQL. The existing seed data in `001_create_articles_schema.sql` shows this pattern.
