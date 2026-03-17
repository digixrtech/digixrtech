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

### Step 1A: Ask the user (STOP and wait for response)

If the user provided a topic in the slash command arguments, acknowledge it. Then ASK the user the following before doing any research:

- **Intent / storyline brief** (optional) — what angle, argument, or key message do you want to convey? Any specific points you want covered?
- **Target audience** (optional) — who should find this most valuable? (e.g., CTOs, senior engineers, AI teams starting out)
- **Author** (optional) — defaults to Saravanakumar D

**IMPORTANT: Do NOT proceed to Step 1B until the user has responded.** Do not web search, do not read files. Just ask and wait.

### Step 1B: Research the landscape (after user responds)

Once the user has provided their intent (or explicitly said to proceed without one):

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
**Digixr Take:** [The opinionated closing stance — 1-2 sentences]
**Suggested category:** [category key] / [category label]
```

**Rules for storyline options:**
- Each option must take a genuinely different angle on the topic — not just reworded versions of the same idea
- Hooks must be counterintuitive or challenge a common assumption
- Section names must be memorable and encode the insight (not "Introduction", "Best Practices", "Conclusion")
- The Digixr Take must be an actual opinion that someone could disagree with

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
- 3-5 sections total (excluding opening hook and Digixr Take)

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
4. **Image briefs** — as `[IMAGE: detailed description]` inline where the image should appear. These are placeholders that MUST be replaced with generated images in Step 4B.
5. **In Production callouts** — as blockquotes: `> **In Production:** anecdote text`
6. **The Digixr Take** — final section, always titled "The Digixr Take". This is a position, not a summary.
7. **Word count** — 1500-2500 words
8. **Read time** — calculate as `ceil(wordCount / 250)`

### After Writing, Self-Check Against Quality Rubric

Before presenting the article, verify ALL of the following. If any check fails, revise before presenting:

1. Does the opening hook compel reading? (not generic, not "In today's world...")
2. Is there at least 1 Mermaid diagram and 1 image brief?
3. Does every section teach something specific — not generic advice?
4. Would a senior engineer find this valuable, not obvious?
5. Does the Digixr Take give a clear, defensible opinion someone could disagree with?
6. Is the word count between 1500-2500?

### Step 4B-1: Choose Image Theme (STOP — wait for user input)

Before generating any images, present the following visual theme options and ask the user to pick one. The chosen theme will be applied consistently to ALL images in the article.

```
🎨 Choose a visual theme for this article's images:

A) **Dark Tech / Blueprint**
   Deep navy/black background, glowing cyan/teal circuit lines and geometry.
   Feels: Engineering precision, agentic systems, technical depth.

B) **Gradient Abstract**
   Soft gradient washes (cyan → teal → emerald), flowing shapes, light particles.
   Feels: Modern, optimistic, innovation-forward.

C) **Minimal Isometric**
   Clean white/light grey backgrounds, flat isometric 3D shapes in brand colors.
   Feels: Clear, diagrammatic, enterprise-friendly.

D) **Cinematic Macro**
   Photorealistic close-ups: circuit boards, server racks, data flows rendered as light trails.
   Feels: High-production, editorial, premium.

E) **Human + Machine**
   People working alongside glowing interfaces or AI systems, warm lighting.
   Feels: Approachable, business audience, ROI-focused.

Or describe your own theme.
```

**STOP and wait for the user to pick a theme before generating any images.**

Record the chosen theme as `{ARTICLE_THEME}`. Every image prompt in Step 4B-2 must include the theme descriptor appended to the brief.

---

### Step 4B-2: Per-Image Generation Loop (mandatory, interactive)

**Folder convention:** Each article's images live in their own subfolder: `public/images/insights/{article-slug}/`

For each `[IMAGE: description]` in the article, run this loop — one image at a time, fully resolved before moving to the next:

1. **Generate 2 variations** of the image:
   - Use ToolSearch to find the image generation tool: query `"image-gen generate"`
   - **Variation A:** The brief as written, with `{ARTICLE_THEME}` appended. Save to `public/images/insights/{slug}/{filename}-a.png`
   - **Variation B:** A reframed interpretation of the same concept — different composition, perspective, or metaphor — with `{ARTICLE_THEME}` appended. Save to `public/images/insights/{slug}/{filename}-b.png`

2. **STOP and present both variations to the user:**
   ```
   Image [N] of [total] — [brief summary of what this image illustrates]

   **Variation A:** ![A](/images/insights/{slug}/{filename}-a.png)
   **Variation B:** ![B](/images/insights/{slug}/{filename}-b.png)

   Pick A or B, request changes, or describe a new direction.
   ```

3. **Wait for user input**, then:
   - If user picks A or B → rename the chosen file to `{filename}.png`, delete the other, move to next image
   - If user requests changes → regenerate both variations incorporating the feedback, re-present
   - If user describes a new direction → regenerate with the new prompt, re-present

4. After all images are selected, replace each `[IMAGE: ...]` placeholder in the article with the chosen image: `![descriptive alt text](/images/insights/{slug}/filename.png)`

**IMPORTANT:** Do not output `[IMAGE: ...]` briefs in the final article. Process one image at a time — do not batch-generate all images upfront. If a generation call fails, report the error and retry once.

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
- **The Digixr Take.** Every article ends with "The Digixr Take" — Digixr's opinionated stance. Not a summary. A position.
- **No fluff intros.** Never start with "In today's fast-paced world", "As AI continues to evolve", or "In the rapidly changing landscape of". Start with the interesting thing.
- **Concrete over abstract.** "Your agent will hallucinate 12% more on multi-hop queries" beats "agents can sometimes produce inaccurate results".

---

## Anti-Patterns — What NOT to Do

- **Generic advice.** "Use monitoring" is not insight. "Monitor token-per-second variance because it predicts cascading failures 4 minutes before they hit" is insight.
- **Listicles disguised as thought leadership.** Give sections memorable names that encode the insight, not "Tip 1, Tip 2, Tip 3".
- **Missing the "so what".** Every section must answer: why should the reader change what they're doing tomorrow?
- **Undifferentiated from ChatGPT output.** If removing the Digixr branding makes this indistinguishable from generic AI-generated content, rewrite.
- **Jargon soup.** "Leverage RAG-augmented HITL pipelines for agentic orchestration" teaches nothing. Unpack it.
- **Weak Digixr Take.** "AI is important and companies should invest in it" is not an opinion. "Build your evaluation framework before you build your agent" is an opinion.
- **Summary conclusions.** "In this article we covered..." is lazy. The Digixr Take should push the reader's thinking forward, not recap what they just read.

---

## Notes

- **Mermaid rendering:** If Mermaid is not yet supported on the article detail page, note this in the output. Diagrams will render as code blocks until `rehype-mermaid` is added.
- **Image briefs:** `[IMAGE: ...]` markers are temporary placeholders written during Phase 3 outline. They must be replaced with actual generated images in Step 4B — never left in the final article output.
- **SQL escaping:** All single quotes in content must be doubled (`''`) for valid SQL. The existing seed data in `001_create_articles_schema.sql` shows this pattern.
