import { getArticles, formatDate } from '@/lib/data/articles';

const SITE_URL = process.env.SITE_URL || 'https://www.digixrtech.com';

export async function GET() {
  const articles = await getArticles();

  const items = articles
    .slice(0, 20)
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/insights/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <category>${article.category_label}</category>
      <pubDate>${article.published_at ? new Date(article.published_at).toUTCString() : ''}</pubDate>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Digixr Insights</title>
    <link>${SITE_URL}/insights</link>
    <description>Perspectives on Agentic AI from the team building production-grade agents.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
