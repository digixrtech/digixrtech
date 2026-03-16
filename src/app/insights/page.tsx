import type { Metadata } from 'next';
import { getArticles } from '@/lib/data/articles';
import { JsonLd } from '@/components/JsonLd';
import { InsightsClient } from './InsightsClient';

export const revalidate = 60; // Re-fetch from DB every 60 seconds

export const metadata: Metadata = {
  title: 'Insights | Digixr Technologies',
  description: 'Perspectives on Agentic AI from the team building production-grade agents. Context Engineering, Agent Security, AI Assurance, and more.',
  alternates: { canonical: 'https://www.digixrtech.com/insights' },
  openGraph: {
    title: 'Insights | Digixr Technologies',
    description: 'Perspectives on Agentic AI from the team building production-grade agents.',
    url: 'https://www.digixrtech.com/insights',
    type: 'website',
    siteName: 'Digixr Technologies',
  },
};

export default async function InsightsPage() {
  const articles = await getArticles();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Digixr Insights',
    description: 'Perspectives on Agentic AI from the team building production-grade agents.',
    url: 'https://www.digixrtech.com/insights',
    publisher: {
      '@type': 'Organization',
      name: 'Digixr Technologies',
      url: 'https://www.digixrtech.com',
    },
  };

  return (
    <div>
      <JsonLd data={jsonLd} />
      <InsightsClient articles={articles} />
    </div>
  );
}
