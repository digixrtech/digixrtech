'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { articles, articleFilters } from '@/lib/data/articles';
import type { ArticleCategory } from '@/lib/data/articles';

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState<ArticleCategory | 'all'>('all');
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  const setCardRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) cardRefs.current.set(id, el);
    else cardRefs.current.delete(id);
  }, []);

  // Reveal hero elements
  useEffect(() => {
    const reveals = heroRef.current?.querySelectorAll('.reveal');
    if (!reveals || reveals.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Reveal article cards — tracked in React state to survive re-renders
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newlyVisible: string[] = [];
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.id;
            if (id) newlyVisible.push(id);
            observer.unobserve(e.target);
          }
        });
        if (newlyVisible.length > 0) {
          setRevealed((prev) => {
            const next = new Set(prev);
            newlyVisible.forEach((id) => next.add(id));
            return next;
          });
        }
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === 'all'
    ? articles
    : articles.filter((a) => a.category === activeFilter);

  return (
    <div>
      {/* Hero */}
      <section className="insights-hero" ref={heroRef}>
        <h1 className="reveal">Insights</h1>
        <p className="reveal">
          Perspectives on Agentic AI from the team building production-grade agents.
        </p>
      </section>

      {/* Filter Bar */}
      <div className="filter-bar">
        {articleFilters.map((filter) => (
          <button
            key={filter.key}
            className={`filter-btn${activeFilter === filter.key ? ' active' : ''}`}
            data-filter={filter.key}
            onClick={() => setActiveFilter(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="articles-grid">
        {filtered.map((article) => (
          <article
            key={article.id}
            ref={(el) => setCardRef(article.id, el)}
            data-id={article.id}
            className={`article-card${revealed.has(article.id) ? ' visible' : ''}`}
            data-category={article.category}
          >
            <span className="article-category" data-cat={article.category}>
              {article.categoryLabel}
            </span>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-excerpt">{article.excerpt}</p>
            <div className="article-meta">
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
            <Link href={`/insights/${article.slug}`} className="article-read">
              Read <span>&rarr;</span>
            </Link>
          </article>
        ))}
      </div>

      {/* Light to Dark Transition */}
      <div className="light-to-dark" />
    </div>
  );
}
