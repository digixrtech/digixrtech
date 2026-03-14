export type ArticleCategory = 'context' | 'security' | 'assurance' | 'agent' | 'industry';

export interface Article {
  id: string;
  category: ArticleCategory;
  categoryLabel: string;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readTime: string;
}

// Category filter definitions for the insights page
export const articleFilters: { key: ArticleCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'context', label: 'Context Engineering' },
  { key: 'agent', label: 'Agent Engineering' },
  { key: 'security', label: 'Agent Security' },
  { key: 'assurance', label: 'AI Assurance' },
  { key: 'industry', label: 'Industry' },
];

// Externalized article data — replace with API fetch in Phase 2
export const articles: Article[] = [
  {
    id: 'context-engineering',
    category: 'context',
    categoryLabel: 'Context Engineering',
    title: 'Context Engineering Is the New Prompt Engineering',
    excerpt:
      'Prompt engineering was never enough. The real leverage is in orchestrating the layers of context that surround every agent decision — system, domain, task, and interaction.',
    slug: 'context-engineering-is-the-new-prompt-engineering',
    date: 'Feb 28, 2026',
    readTime: '6 min read',
  },
  {
    id: 'agent-security-blind-spot',
    category: 'security',
    categoryLabel: 'Agent Security',
    title: 'The Agent Security Blind Spot Most Teams Ignore',
    excerpt:
      'One prompt injection can undo months of agent engineering. We break down why security must be a dedicated lifecycle stage, not an afterthought bolted on before launch.',
    slug: 'agent-security-blind-spot-most-teams-ignore',
    date: 'Feb 15, 2026',
    readTime: '8 min read',
  },
  {
    id: 'ai-equity-engineering',
    category: 'assurance',
    categoryLabel: 'AI Assurance',
    title: "AI Equity Is Not Optional — It's an Engineering Decision",
    excerpt:
      "From hospital scheduling to college navigation, the agents we build encode our values. Bias detection and fairness validation aren't features — they're responsibilities.",
    slug: 'ai-equity-is-not-optional',
    date: 'Feb 5, 2026',
    readTime: '5 min read',
  },
  {
    id: 'multi-agent-orchestration',
    category: 'agent',
    categoryLabel: 'Agent Engineering',
    title: 'From Single Agents to Multi-Agent Orchestration',
    excerpt:
      'The jump from one agent to many is not linear. Supervisor patterns, swarm architectures, and MCP tool integration change everything about how you design agent systems.',
    slug: 'from-single-agents-to-multi-agent-orchestration',
    date: 'Jan 22, 2026',
    readTime: '7 min read',
  },
  {
    id: 'agentic-ai-enterprise',
    category: 'industry',
    categoryLabel: 'Industry',
    title: 'How Agentic AI Is Reshaping Enterprise Operations',
    excerpt:
      'Beyond chatbots. Real-world examples of autonomous agents transforming scheduling, procurement, and customer service workflows across industries.',
    slug: 'how-agentic-ai-is-reshaping-enterprise-operations',
    date: 'Jan 10, 2026',
    readTime: '6 min read',
  },
  {
    id: 'knowledge-graphs-vs-rag',
    category: 'context',
    categoryLabel: 'Context Engineering',
    title: 'Knowledge Graphs vs. Vector RAG: When to Use What',
    excerpt:
      'Both retrieve context, but for very different reasons. A practical guide to choosing the right retrieval strategy for your agent architecture.',
    slug: 'knowledge-graphs-vs-vector-rag',
    date: 'Dec 18, 2025',
    readTime: '9 min read',
  },
  {
    id: 'hipaa-compliant-agents',
    category: 'security',
    categoryLabel: 'Agent Security',
    title: 'Building HIPAA-Compliant AI Agents',
    excerpt:
      'Healthcare agents handle the most sensitive data. Here is our security checklist for PHI boundaries, PII redaction, and audit trails in production agent systems.',
    slug: 'building-hipaa-compliant-ai-agents',
    date: 'Dec 5, 2025',
    readTime: '7 min read',
  },
  {
    id: 'hallucination-detection',
    category: 'assurance',
    categoryLabel: 'AI Assurance',
    title: 'Hallucination Detection in Production Agents',
    excerpt:
      'Hallucinations are not bugs — they are features of probabilistic systems. Here is how we validate agent outputs at scale using LLM-as-a-Judge pipelines.',
    slug: 'hallucination-detection-in-production-agents',
    date: 'Nov 20, 2025',
    readTime: '8 min read',
  },
];
