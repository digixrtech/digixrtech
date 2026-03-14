import { ImageResponse } from 'next/og';
import { getArticleBySlug, getAllArticleSlugs } from '@/lib/data/articles';

export const alt = 'Digixr Insights';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

const CATEGORY_COLORS: Record<string, string> = {
  context: '#4CC9D0',
  agent: '#3BBFA6',
  security: '#FFB84D',
  assurance: '#42C68B',
  industry: '#718096',
};

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return new ImageResponse(
      (
        <div style={{ display: 'flex', width: '100%', height: '100%', background: '#0a0a12', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 48 }}>Digixr Insights</span>
        </div>
      ),
      size
    );
  }

  const catColor = CATEGORY_COLORS[article.category] || '#718096';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a12 0%, #141428 100%)',
          padding: '60px 80px',
          justifyContent: 'space-between',
        }}
      >
        {/* Top: Logo + Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontSize: 28, fontWeight: 700, letterSpacing: '0.05em' }}>
            DIGIXR
          </span>
          <span
            style={{
              color: catColor,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: `2px solid ${catColor}`,
              borderRadius: 100,
              padding: '6px 20px',
            }}
          >
            {article.category_label}
          </span>
        </div>

        {/* Center: Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, justifyContent: 'center' }}>
          <span
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {article.title}
          </span>
          <span style={{ fontSize: 20, color: '#a0aec0', lineHeight: 1.5, maxWidth: 800 }}>
            {article.excerpt.length > 150 ? article.excerpt.slice(0, 150) + '...' : article.excerpt}
          </span>
        </div>

        {/* Bottom: Author + Read time */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#718096', fontSize: 16 }}>
            {article.author_name ? `By ${article.author_name}` : 'Digixr Technologies'}
          </span>
          <span style={{ color: '#718096', fontSize: 16 }}>
            {article.read_time} min read
          </span>
        </div>
      </div>
    ),
    size
  );
}
