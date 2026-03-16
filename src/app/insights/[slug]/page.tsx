import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getArticleBySlug, getAllArticleSlugs, getRelatedArticles, formatDate } from '@/lib/data/articles';
import { JsonLd } from '@/components/JsonLd';

export const revalidate = 60; // Re-fetch from DB every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };

  const title = article.meta_title || article.title;
  const description = article.meta_description || article.excerpt;
  const url = `https://www.digixrtech.com/insights/${article.slug}`;

  return {
    title: `${title} | Digixr Insights`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: article.published_at ?? undefined,
      authors: article.author_name ? [article.author_name] : undefined,
      siteName: 'Digixr Technologies',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug, article.category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published_at,
    author: article.author_name
      ? { '@type': 'Person', name: article.author_name, jobTitle: article.author_role }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Digixr Technologies',
      url: 'https://www.digixrtech.com',
    },
    mainEntityOfPage: `https://www.digixrtech.com/insights/${article.slug}`,
  };

  return (
    <div className="article-page">
      <JsonLd data={jsonLd} />

      {/* Article Hero */}
      <header className="article-hero">
        <Link href="/insights" className="article-back">
          &larr; Back to Insights
        </Link>
        <span className="article-category" data-cat={article.category}>
          {article.category_label}
        </span>
        <h1 className="article-hero-title">{article.title}</h1>
        <div className="article-hero-meta">
          {article.author_name && <span className="article-author">{article.author_name}</span>}
          {article.published_at && <span>{formatDate(article.published_at)}</span>}
          <span>{article.read_time} min read</span>
        </div>
      </header>

      {/* Article Content */}
      <article className="article-content">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {article.content}
        </Markdown>
      </article>

      {/* Author Card */}
      {article.author_name && (
        <div className="article-author-card">
          <div className="author-avatar">
            {article.author_name.charAt(0)}
          </div>
          <div className="author-info">
            <span className="author-name">{article.author_name}</span>
            {article.author_role && <span className="author-role">{article.author_role}</span>}
            {article.author_bio && <p className="author-bio">{article.author_bio}</p>}
          </div>
        </div>
      )}

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="article-related">
          <h2>Related Articles</h2>
          <div className="related-grid">
            {related.map((r) => (
              <Link key={r.id} href={`/insights/${r.slug}`} className="related-card">
                <span className="article-category" data-cat={r.category}>
                  {r.category_label}
                </span>
                <h3>{r.title}</h3>
                <p>{r.excerpt}</p>
                <span className="article-read">Read <span>&rarr;</span></span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Light to Dark Transition */}
      <div className="light-to-dark" />
    </div>
  );
}
