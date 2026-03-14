-- ============================================
-- Expand article categories + add co-founder author
-- ============================================

-- 1. Expand category CHECK constraint to support new content types
ALTER TABLE public.articles DROP CONSTRAINT articles_category_check;
ALTER TABLE public.articles ADD CONSTRAINT articles_category_check
  CHECK (category IN ('context', 'security', 'assurance', 'agent', 'industry', 'engineering', 'leadership', 'tutorial'));

-- 2. Add Dineshkumar Duraisamy as author
INSERT INTO public.authors (id, name, role, bio) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Dineshkumar Duraisamy', 'Co-Founder', '20+ years in IT, IIM Bangalore, ex-Unisys/Cognizant. Agentic AI specialist.')
ON CONFLICT DO NOTHING;
