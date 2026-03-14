'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { articleFilters, formatDate } from '@/lib/data/articles';
import type { ArticleCategory, ArticleListItem } from '@/lib/data/articles';

interface InsightsClientProps {
  articles: ArticleListItem[];
}

export function InsightsClient({ articles }: InsightsClientProps) {
  const [activeFilter, setActiveFilter] = useState<ArticleCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
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

  const filtered = articles.filter((a) => {
    const matchesCategory = activeFilter === 'all' || a.category === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="insights-hero" ref={heroRef}>
        <h1 className="reveal">Insights</h1>
        <p className="reveal">
          Perspectives on Agentic AI from the team building production-grade agents.
        </p>
        {/* Search Bar — prominent, inside hero */}
        <div className="insights-search reveal">
          <svg className="insights-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search articles by topic, keyword, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="insights-search-input"
          />
          {searchQuery && (
            <button
              className="insights-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
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
        {filtered.length === 0 && (
          <div className="no-results">
            <p>No articles found{searchQuery ? ` for "${searchQuery}"` : ''}.</p>
          </div>
        )}
        {filtered.map((article) => (
          <article
            key={article.id}
            ref={(el) => setCardRef(article.id, el)}
            data-id={article.id}
            className={`article-card${revealed.has(article.id) ? ' visible' : ''}`}
            data-category={article.category}
          >
            <span className="article-category" data-cat={article.category}>
              {article.category_label}
            </span>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-excerpt">{article.excerpt}</p>
            <div className="article-meta">
              <span>{formatDate(article.published_at)}</span>
              <span>{article.read_time} min read</span>
            </div>
            <Link href={`/insights/${article.slug}`} className="article-read">
              Read <span>&rarr;</span>
            </Link>
          </article>
        ))}
      </div>

      {/* Light to Dark Transition */}
      <div className="light-to-dark" />
    </>
  );
}
