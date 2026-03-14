-- ============================================
-- Digixr Insights: Articles & Authors Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================

-- 1. Authors table
create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  avatar_url text,
  bio text,
  created_at timestamptz default now()
);

-- 2. Articles table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null default '',
  category text not null check (category in ('context', 'security', 'assurance', 'agent', 'industry')),
  category_label text not null,
  author_id uuid references public.authors(id) on delete set null,
  cover_image_url text,
  published boolean default false,
  published_at timestamptz,
  read_time integer not null default 5,
  meta_title text,
  meta_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Indexes
create index if not exists idx_articles_slug on public.articles(slug);
create index if not exists idx_articles_published on public.articles(published, published_at desc);
create index if not exists idx_articles_category on public.articles(category);

-- 4. Full-text search index (for Step 7)
alter table public.articles add column if not exists fts tsvector
  generated always as (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))) stored;
create index if not exists idx_articles_fts on public.articles using gin(fts);

-- 5. Full-text search function
create or replace function public.search_articles(search_query text)
returns setof public.articles
language sql
stable
as $$
  select *
  from public.articles
  where published = true
    and fts @@ plainto_tsquery('english', search_query)
  order by ts_rank(fts, plainto_tsquery('english', search_query)) desc;
$$;

-- 6. Auto-update updated_at timestamp
create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_updated_at
  before update on public.articles
  for each row
  execute function public.update_updated_at();

-- 7. Row Level Security
alter table public.authors enable row level security;
alter table public.articles enable row level security;

-- Public read access for published articles
create policy "Public can read published articles"
  on public.articles for select
  using (published = true);

-- Public can read authors
create policy "Public can read authors"
  on public.authors for select
  using (true);

-- Authenticated users can manage articles
create policy "Authenticated users can insert articles"
  on public.articles for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update articles"
  on public.articles for update
  to authenticated
  using (true);

create policy "Authenticated users can delete articles"
  on public.articles for delete
  to authenticated
  using (true);

-- Authenticated users can manage authors
create policy "Authenticated users can insert authors"
  on public.authors for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update authors"
  on public.authors for update
  to authenticated
  using (true);

-- ============================================
-- 8. Seed data: Authors
-- ============================================
insert into public.authors (id, name, role, bio) values
  ('a1000000-0000-0000-0000-000000000002', 'Saravanakumar D', 'Co-Founder', '17+ years in IT, GCT Coimbatore, ex-Robert Bosch. Patent holder and Enterprise Architect.')
on conflict do nothing;

-- ============================================
-- 9. Seed data: 8 existing articles
-- ============================================
insert into public.articles (slug, title, excerpt, content, category, category_label, author_id, published, published_at, read_time) values
(
  'context-engineering-is-the-new-prompt-engineering',
  'Context Engineering Is the New Prompt Engineering',
  'Prompt engineering was never enough. The real leverage is in orchestrating the layers of context that surround every agent decision — system, domain, task, and interaction.',
  '# Context Engineering Is the New Prompt Engineering

Prompt engineering was never enough. The real leverage is in orchestrating the layers of context that surround every agent decision — system, domain, task, and interaction.

## The Shift from Prompts to Context

When teams first started building with large language models, the focus was almost entirely on crafting the perfect prompt. But as agent systems have grown more sophisticated, we''ve learned that **the prompt is just one layer** in a much deeper stack of context.

## The Four Layers of Context

### 1. System Context
The foundational instructions, guardrails, and persona that define how an agent behaves. This includes role definitions, safety boundaries, and output format specifications.

### 2. Domain Context
Industry-specific knowledge, terminology, regulations, and best practices. A healthcare agent needs different domain context than a financial services agent.

### 3. Task Context
The specific objective, constraints, and success criteria for the current interaction. This is where most teams stop — but it''s only the third layer.

### 4. Interaction Context
The dynamic, evolving state of the conversation — previous turns, user corrections, clarifications, and the accumulated understanding built through dialogue.

## Why Context Engineering Matters

The difference between a demo agent and a production agent is almost always in context engineering. Production agents need:

- **Persistent memory** across sessions
- **Dynamic retrieval** of relevant domain knowledge
- **Graceful degradation** when context windows fill up
- **Context prioritization** to keep the most relevant information active

## Practical Implications

Teams that invest in context engineering see measurably better outcomes:

1. **Fewer hallucinations** — agents with rich domain context are grounded in facts
2. **Better task completion** — clear task context reduces ambiguity
3. **More natural interactions** — interaction context enables continuity
4. **Safer deployments** — system context enforces guardrails consistently

## The Bottom Line

Stop optimizing prompts in isolation. Start engineering the full context stack. The agents that win in production are the ones with the richest, most carefully orchestrated context — not the cleverest prompts.',
  'context',
  'Context Engineering',
  'a1000000-0000-0000-0000-000000000002',
  true,
  '2026-02-28T10:00:00Z',
  6
),
(
  'agent-security-blind-spot-most-teams-ignore',
  'The Agent Security Blind Spot Most Teams Ignore',
  'One prompt injection can undo months of agent engineering. We break down why security must be a dedicated lifecycle stage, not an afterthought bolted on before launch.',
  '# The Agent Security Blind Spot Most Teams Ignore

One prompt injection can undo months of agent engineering. Security must be a dedicated lifecycle stage, not an afterthought bolted on before launch.

## The Problem

Most teams treat agent security the way early web developers treated SQL injection — as an edge case that probably won''t happen. But in agentic AI systems, the attack surface is fundamentally different and far more dangerous.

## Why Agent Security Is Different

Traditional application security focuses on **input validation and access control**. Agent security must also address:

- **Prompt injection** — malicious inputs that hijack agent behavior
- **Tool misuse** — agents being manipulated into calling tools with dangerous parameters
- **Data exfiltration** — agents leaking sensitive information through seemingly innocent outputs
- **Privilege escalation** — agents gaining access to resources beyond their intended scope

## The Dedicated Security Stage

At Digixr, we advocate for security as the third pillar in our lifecycle: Context → Build → **Secure** → Assure. This means:

### Input Sanitization
Every user input must be sanitized before it reaches the agent. This includes detecting prompt injection patterns and stripping potentially dangerous content.

### Output Validation
Agent outputs must be validated before they reach users or downstream systems. This catches hallucinated data, leaked PII, and inappropriate content.

### Tool Access Control
Agents should operate with minimum necessary permissions. Every tool call should be authorized and audited.

### Red Team Testing
Regular adversarial testing against your agents, specifically targeting the unique attack vectors of AI systems.

## Building Security In

The cost of retrofitting security is always higher than building it in from the start. Teams that dedicate a lifecycle stage to security ship more reliable agents and sleep better at night.',
  'security',
  'Agent Security',
  'a1000000-0000-0000-0000-000000000002',
  true,
  '2026-02-15T10:00:00Z',
  8
),
(
  'ai-equity-is-not-optional',
  'AI Equity Is Not Optional — It''s an Engineering Decision',
  'From hospital scheduling to college navigation, the agents we build encode our values. Bias detection and fairness validation aren''t features — they''re responsibilities.',
  '# AI Equity Is Not Optional — It''s an Engineering Decision

From hospital scheduling to college navigation, the agents we build encode our values. Bias detection and fairness validation aren''t features — they''re responsibilities.

## The Stakes Are Real

When an AI agent schedules hospital appointments, it makes decisions that directly impact patient health outcomes. When it guides first-generation college students through applications, it shapes futures. These aren''t abstract concerns — they''re engineering decisions with real consequences.

## Where Bias Enters Agent Systems

Bias can enter at every layer of the context stack:

1. **Training data** — historical patterns that reflect systemic inequities
2. **System prompts** — implicit assumptions baked into agent instructions
3. **Tool selection** — which tools are available and how they''re prioritized
4. **Evaluation criteria** — metrics that optimize for majority outcomes

## The Assurance Framework

Our fourth lifecycle pillar — **Assure** — exists specifically to catch these issues:

### Fairness Audits
Systematic testing across demographic groups to identify disparate outcomes. Not a one-time check, but a continuous monitoring process.

### Bias Detection Pipelines
Automated systems that flag potential bias in agent outputs before they reach users. These run in parallel with production traffic.

### Inclusive Design Reviews
Cross-functional reviews that include diverse perspectives in agent design decisions. Engineering alone cannot solve equity — it requires broader input.

## The Engineering Responsibility

As engineers building agentic AI systems, we have a choice: we can treat equity as someone else''s problem, or we can build it into our engineering process. At Digixr, we choose the latter.',
  'assurance',
  'AI Assurance',
  'a1000000-0000-0000-0000-000000000002',
  true,
  '2026-02-05T10:00:00Z',
  5
),
(
  'from-single-agents-to-multi-agent-orchestration',
  'From Single Agents to Multi-Agent Orchestration',
  'The jump from one agent to many is not linear. Supervisor patterns, swarm architectures, and MCP tool integration change everything about how you design agent systems.',
  '# From Single Agents to Multi-Agent Orchestration

The jump from one agent to many is not linear. Supervisor patterns, swarm architectures, and MCP tool integration change everything about how you design agent systems.

## Beyond the Single Agent

A single agent can be impressive. It can answer questions, complete tasks, and even use tools. But real enterprise workflows require **coordination between multiple specialized agents**, each with their own context, tools, and decision-making capabilities.

## Orchestration Patterns

### Supervisor Pattern
A supervisor agent delegates tasks to worker agents, collects results, and synthesizes final outputs. This works well for structured workflows with clear task decomposition.

### Swarm Architecture
Agents communicate peer-to-peer, with handoffs based on specialization. No single agent controls the flow — instead, the system self-organizes around the problem.

### Pipeline Pattern
Agents are arranged in sequence, each transforming the output of the previous stage. This works for workflows with clear sequential dependencies.

## MCP Tool Integration

The Model Context Protocol (MCP) has changed how we think about agent tooling:

- **Standardized tool interfaces** — agents can discover and use tools without custom integration
- **Dynamic tool loading** — agents can access new capabilities at runtime
- **Cross-agent tool sharing** — multiple agents can share the same tool servers

## Key Challenges

1. **State management** — keeping track of which agent knows what
2. **Error propagation** — handling failures in multi-agent chains
3. **Latency management** — orchestration adds communication overhead
4. **Debugging complexity** — tracing issues across agent boundaries

## Getting Started

Start with the supervisor pattern. It''s the most predictable and easiest to debug. Move to swarms only when you have a genuine need for dynamic task allocation and the observability infrastructure to support it.',
  'agent',
  'Agent Engineering',
  'a1000000-0000-0000-0000-000000000002',
  true,
  '2026-01-22T10:00:00Z',
  7
),
(
  'how-agentic-ai-is-reshaping-enterprise-operations',
  'How Agentic AI Is Reshaping Enterprise Operations',
  'Beyond chatbots. Real-world examples of autonomous agents transforming scheduling, procurement, and customer service workflows across industries.',
  '# How Agentic AI Is Reshaping Enterprise Operations

Beyond chatbots. Real-world examples of autonomous agents transforming scheduling, procurement, and customer service workflows across industries.

## The Enterprise AI Evolution

Enterprise AI has evolved through three distinct phases:

1. **Analytics** (2015-2020) — dashboards, predictions, recommendations
2. **Assistants** (2020-2024) — chatbots, copilots, Q&A systems
3. **Agents** (2024-present) — autonomous systems that take action

The shift from assistants to agents is the most significant because it moves AI from **answering questions to completing tasks**.

## Real-World Agent Deployments

### Healthcare: Appointment Intelligence
Agents that manage scheduling across departments, optimizing for patient urgency, provider availability, and resource constraints. These agents don''t just book appointments — they triage, prioritize, and coordinate.

### Manufacturing: Procurement Agents
Autonomous agents that monitor inventory levels, predict demand, negotiate with suppliers, and place orders. Human oversight at decision thresholds, full autonomy for routine operations.

### Financial Services: Compliance Monitoring
Agents that continuously monitor transactions, flag potential compliance issues, and generate regulatory reports. They reduce manual review burden by 70% while improving detection accuracy.

### Education: Student Success Agents
Personalized agents that track student progress, identify at-risk students, and connect them with appropriate resources. From academic advising to financial aid navigation.

## The Common Thread

Successful enterprise agent deployments share three characteristics:

1. **Clear boundaries** — agents know exactly what they can and cannot do
2. **Human-in-the-loop** — critical decisions always involve human review
3. **Continuous monitoring** — agent behavior is tracked, measured, and improved

## What This Means for Your Organization

The question is no longer whether to deploy AI agents, but where to start. The most successful organizations begin with high-volume, well-defined processes where agents can deliver immediate value while teams build confidence and infrastructure.',
  'industry',
  'Industry',
  'a1000000-0000-0000-0000-000000000002',
  true,
  '2026-01-10T10:00:00Z',
  6
),
(
  'knowledge-graphs-vs-vector-rag',
  'Knowledge Graphs vs. Vector RAG: When to Use What',
  'Both retrieve context, but for very different reasons. A practical guide to choosing the right retrieval strategy for your agent architecture.',
  '# Knowledge Graphs vs. Vector RAG: When to Use What

Both retrieve context, but for very different reasons. A practical guide to choosing the right retrieval strategy for your agent architecture.

## Two Approaches to Context Retrieval

When building agents that need access to large knowledge bases, you have two primary retrieval strategies:

1. **Vector RAG** — embed documents into vector space, retrieve by semantic similarity
2. **Knowledge Graphs** — structure information as entities and relationships, traverse by query

## When to Use Vector RAG

Vector RAG excels when:

- Your knowledge base is **unstructured text** (documents, articles, transcripts)
- Queries are **semantically fuzzy** ("tell me about customer complaints related to shipping")
- You need **fast setup** — embedding pipelines are straightforward
- **Approximate answers** are acceptable

### Limitations
- Struggles with **multi-hop reasoning** ("which customers of supplier X were affected by the recall?")
- No inherent understanding of **relationships** between entities
- Can retrieve **semantically similar but factually irrelevant** content

## When to Use Knowledge Graphs

Knowledge Graphs excel when:

- Your domain has **clear entity relationships** (org charts, supply chains, regulatory frameworks)
- Queries require **precise, structured answers** ("list all medications contraindicated with drug X")
- **Reasoning chains** matter — you need to explain why an answer was reached
- **Consistency** is critical — the same query should always return the same result

### Limitations
- **High upfront cost** — building and maintaining a knowledge graph is significant work
- **Schema rigidity** — adding new entity types or relationships requires schema updates
- **Poor at fuzzy matching** — queries must align with the graph structure

## The Hybrid Approach

The most sophisticated agent architectures use both:

1. **Knowledge graphs for structured reasoning** — entity lookups, relationship traversal, constraint checking
2. **Vector RAG for unstructured context** — finding relevant documents, passages, and examples
3. **An orchestration layer** that decides which retrieval strategy to use based on the query type

## Practical Recommendations

- **Start with Vector RAG** if you''re building your first agent — it''s faster to implement and good enough for many use cases
- **Add Knowledge Graphs** when you hit the limits of semantic similarity — when users need precise answers about relationships
- **Invest in the hybrid approach** when your agents handle both exploratory and precise queries',
  'context',
  'Context Engineering',
  'a1000000-0000-0000-0000-000000000002',
  true,
  '2025-12-18T10:00:00Z',
  9
),
(
  'building-hipaa-compliant-ai-agents',
  'Building HIPAA-Compliant AI Agents',
  'Healthcare agents handle the most sensitive data. Here is our security checklist for PHI boundaries, PII redaction, and audit trails in production agent systems.',
  '# Building HIPAA-Compliant AI Agents

Healthcare agents handle the most sensitive data. Here is our security checklist for PHI boundaries, PII redaction, and audit trails in production agent systems.

## Why Healthcare Agent Security Is Different

Healthcare AI agents operate under strict regulatory requirements. HIPAA (Health Insurance Portability and Accountability Act) mandates specific safeguards for Protected Health Information (PHI). Violations can result in fines up to $1.5 million per incident.

## The Security Checklist

### 1. PHI Boundary Definition
Define clear boundaries for what data the agent can access:

- **Minimum necessary principle** — agents should only access the PHI required for their specific task
- **Role-based access** — different agent roles get different data access levels
- **Time-limited access** — PHI access should expire after the task is complete

### 2. PII Redaction Pipeline
Build automated redaction into your agent pipeline:

- **Pre-processing** — redact PII before it reaches the LLM
- **Post-processing** — scan agent outputs for accidentally leaked PII
- **Logging** — ensure logs never contain unredacted PHI

### 3. Audit Trail Requirements
Every interaction with PHI must be logged:

- **Who** accessed the data (agent ID, user ID)
- **What** data was accessed (data categories, not raw values)
- **When** access occurred (timestamps)
- **Why** access was needed (task context)
- **What was done** with the data (action taken)

### 4. Encryption Standards
- **At rest** — AES-256 encryption for all stored PHI
- **In transit** — TLS 1.3 for all data transmission
- **In processing** — consider confidential computing for sensitive operations

### 5. Business Associate Agreements (BAAs)
Every vendor in your agent pipeline needs a BAA:

- LLM provider (must offer HIPAA-eligible services)
- Cloud infrastructure provider
- Monitoring and logging services
- Any third-party tool providers

## Architecture Recommendations

1. **Isolate PHI processing** — run healthcare agents in dedicated, hardened environments
2. **Use proxy patterns** — agents interact with a PHI proxy, never raw data
3. **Implement circuit breakers** — automatic shutdown if anomalous data access patterns are detected
4. **Regular penetration testing** — specifically targeting PHI exfiltration vectors

## The Bottom Line

Building HIPAA-compliant AI agents is not optional for healthcare — it''s a legal requirement. But beyond compliance, it''s about building trust with patients and providers who entrust their most sensitive information to your systems.',
  'security',
  'Agent Security',
  'a1000000-0000-0000-0000-000000000002',
  true,
  '2025-12-05T10:00:00Z',
  7
),
(
  'hallucination-detection-in-production-agents',
  'Hallucination Detection in Production Agents',
  'Hallucinations are not bugs — they are features of probabilistic systems. Here is how we validate agent outputs at scale using LLM-as-a-Judge pipelines.',
  '# Hallucination Detection in Production Agents

Hallucinations are not bugs — they are features of probabilistic systems. Here is how we validate agent outputs at scale using LLM-as-a-Judge pipelines.

## Understanding Hallucinations

Hallucinations in AI agents fall into three categories:

1. **Factual hallucinations** — stating incorrect facts with confidence
2. **Fabricated references** — citing sources that don''t exist
3. **Logical hallucinations** — drawing conclusions that don''t follow from the premises

Each requires a different detection strategy.

## The LLM-as-a-Judge Pipeline

### Architecture
```
Agent Output → Validation Prompt → Judge LLM → Score/Flag → Decision
```

### How It Works
1. The agent produces an output
2. The output is sent to a separate "judge" LLM with a validation prompt
3. The judge evaluates the output against the source context
4. A confidence score is assigned
5. Outputs below the threshold are flagged for human review

### Key Design Decisions
- **Use a different model** for the judge than the agent — correlated errors are the enemy
- **Provide source context** to the judge — it needs ground truth to evaluate against
- **Design specific rubrics** for different output types (factual claims, recommendations, summaries)

## Detection Strategies by Type

### Factual Hallucinations
- Cross-reference agent claims against knowledge base
- Use entity extraction + fact verification pipelines
- Track confidence scores across similar queries

### Fabricated References
- Validate all cited URLs, papers, and documents
- Maintain an allowlist of verified sources
- Flag any reference not in the knowledge base

### Logical Hallucinations
- Chain-of-thought validation — verify each reasoning step
- Consistency checks — same inputs should produce compatible outputs
- Adversarial probing — rephrase the same question and compare answers

## Production Monitoring

### Metrics to Track
- **Hallucination rate** — percentage of outputs flagged by the judge
- **False positive rate** — judge flags that human reviewers override
- **Detection latency** — time added by the validation pipeline
- **Category distribution** — which types of hallucinations are most common

### Alerting
- Set thresholds for hallucination rate increases
- Alert on new categories of hallucinations
- Track trends over time — increasing rates may indicate model drift

## The Cost-Benefit Calculation

Running a judge LLM doubles your inference costs. But the cost of a hallucinated medical recommendation, financial advice, or legal guidance is orders of magnitude higher. For production agents handling sensitive domains, hallucination detection is not optional.',
  'assurance',
  'AI Assurance',
  'a1000000-0000-0000-0000-000000000002',
  true,
  '2025-11-20T10:00:00Z',
  8
)
on conflict (slug) do nothing;
