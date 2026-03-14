'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { ArticleListItem } from '@/lib/data/articles';

interface InsightsSectionProps {
  articles: ArticleListItem[];
}

export function InsightsSection({ articles }: InsightsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    if (!reveals || reveals.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="insights-teaser" id="insights" ref={sectionRef}>
      <div className="section-header reveal">
        <div className="section-label">Insights</div>
        <h2 className="section-title">
          Perspectives on <span className="gradient">Agentic AI</span>
        </h2>
        <p className="section-subtitle">
          Practical perspectives on building, securing, and scaling AI agents in production — so you can build smarter.
        </p>
      </div>

      <div className="insights-grid">
        {articles.map((article) => (
          <article key={article.id} className="insight-card reveal">
            <span className="insight-category" data-cat={article.category}>
              {article.category_label}
            </span>
            <h3 className="insight-title">{article.title}</h3>
            <p className="insight-excerpt">{article.excerpt}</p>
            <Link href={`/insights/${article.slug}`} className="insight-read">
              Read <span>→</span>
            </Link>
          </article>
        ))}
      </div>

      <div className="insights-cta reveal">
        <Link href="/insights" className="btn-view-all">
          View All Insights →
        </Link>
      </div>
    </section>
  );
}
