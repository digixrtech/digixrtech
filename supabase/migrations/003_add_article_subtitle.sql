-- ============================================
-- Add subtitle column to articles
-- Renames titles to catchy hooks + adds value-proposition subtitles
-- ============================================

-- 1. Add subtitle column
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS subtitle text;

-- 2. Regenerate FTS vector to include subtitle
ALTER TABLE public.articles DROP COLUMN fts;
ALTER TABLE public.articles ADD COLUMN fts tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(subtitle, '') || ' ' ||
      coalesce(excerpt, '') || ' ' ||
      coalesce(content, '')
    )
  ) STORED;
CREATE INDEX IF NOT EXISTS idx_articles_fts ON public.articles USING gin(fts);

-- 3. Backfill: rename titles + add subtitles
UPDATE public.articles SET
  title = 'The Demo That Lied',
  subtitle = 'Learn the context engineering framework — Write, Select, Compress, Isolate — and three techniques to stop your agent from breaking past turn five'
WHERE slug = 'context-engineering-is-the-new-prompt-engineering';

UPDATE public.articles SET
  title = 'The Unguarded Agent',
  subtitle = 'Build a security lifecycle stage that catches prompt injection, tool misuse, and data exfiltration before launch'
WHERE slug = 'agent-security-blind-spot-most-teams-ignore';

UPDATE public.articles SET
  title = 'The Bias You Ship',
  subtitle = 'From hospital scheduling to college navigation, every agent encodes your values — bias detection isn''t a feature, it''s a responsibility'
WHERE slug = 'ai-equity-is-not-optional';

UPDATE public.articles SET
  title = 'The Orchestration Leap',
  subtitle = 'Why the jump from one agent to many isn''t linear — and the patterns that make multi-agent systems actually work'
WHERE slug = 'from-single-agents-to-multi-agent-orchestration';

UPDATE public.articles SET
  title = 'Beyond the Chatbot',
  subtitle = 'Real-world examples of autonomous agents transforming scheduling, procurement, and customer service across industries'
WHERE slug = 'how-agentic-ai-is-reshaping-enterprise-operations';

UPDATE public.articles SET
  title = 'The Retrieval Dilemma',
  subtitle = 'A practical guide to choosing the right context retrieval strategy — knowledge graphs vs. vector RAG — for your agent architecture'
WHERE slug = 'knowledge-graphs-vs-vector-rag';

UPDATE public.articles SET
  title = 'The Compliance Minefield',
  subtitle = 'A security checklist for PHI boundaries, PII redaction, and audit trails in production healthcare agents'
WHERE slug = 'building-hipaa-compliant-ai-agents';

UPDATE public.articles SET
  title = 'The Hallucination Tax',
  subtitle = 'How to validate agent outputs at scale using LLM-as-a-Judge pipelines — because hallucinations aren''t bugs, they''re features of probabilistic systems'
WHERE slug = 'hallucination-detection-in-production-agents';

UPDATE public.articles SET
  subtitle = 'A decision framework for choosing the right review strategy for your AI agent'
WHERE slug = 'the-reviewer-paradox';

UPDATE public.articles SET
  subtitle = 'Map your agent to the right autonomy level — from guardrailed copilot to self-correcting pipeline'
WHERE slug = 'the-art-of-agent-autonomy';
