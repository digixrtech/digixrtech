export type ArticleCategory = 'context' | 'security' | 'assurance' | 'agent' | 'industry';

export interface Article {
  id: string;
  category: ArticleCategory;
  categoryLabel: string;
  title: string;
  excerpt: string;
  slug: string;
}

export const articles: Article[] = [
  {
    id: 'context-engineering',
    category: 'context',
    categoryLabel: 'Context Engineering',
    title: 'Context Engineering Is the New Prompt Engineering',
    excerpt:
      'Prompt engineering was never enough. The real leverage is in orchestrating the layers of context that surround every agent decision — system, domain, task, and interaction.',
    slug: 'context-engineering-is-the-new-prompt-engineering',
  },
  {
    id: 'agent-security-blind-spot',
    category: 'security',
    categoryLabel: 'Agent Security',
    title: 'The Agent Security Blind Spot Most Teams Ignore',
    excerpt:
      'One prompt injection can undo months of agent engineering. We break down why security must be a dedicated lifecycle stage, not an afterthought bolted on before launch.',
    slug: 'agent-security-blind-spot-most-teams-ignore',
  },
  {
    id: 'ai-equity-engineering',
    category: 'assurance',
    categoryLabel: 'AI Assurance',
    title: "AI Equity Is Not Optional — It's an Engineering Decision",
    excerpt:
      "From hospital scheduling to college navigation, the agents we build encode our values. Bias detection and fairness validation aren't features — they're responsibilities.",
    slug: 'ai-equity-is-not-optional',
  },
];
