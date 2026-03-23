import { supabase } from '@/lib/supabase';

export type ArticleCategory = 'context' | 'security' | 'assurance' | 'agent' | 'industry' | 'engineering' | 'leadership' | 'tutorial';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  category_label: string;
  author_name: string | null;
  author_role: string | null;
  author_bio: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  read_time: number;
  meta_title: string | null;
  meta_description: string | null;
}

export interface ArticleListItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string;
  category: ArticleCategory;
  category_label: string;
  published_at: string | null;
  read_time: number;
}

// Category filter definitions for the insights page
export const articleFilters: { key: ArticleCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'context', label: 'Context Engineering' },
  { key: 'agent', label: 'Agent Engineering' },
  { key: 'security', label: 'Agent Security' },
  { key: 'assurance', label: 'AI Assurance' },
  { key: 'industry', label: 'Industry' },
  { key: 'engineering', label: 'Engineering' },
  { key: 'leadership', label: 'Leadership' },
  { key: 'tutorial', label: 'Tutorial' },
];

/** Fetch all published articles for the listing page */
export async function getArticles(category?: ArticleCategory): Promise<ArticleListItem[]> {
  let query = supabase
    .from('articles')
    .select('id, slug, title, subtitle, excerpt, category, category_label, published_at, read_time')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return (data ?? []) as ArticleListItem[];
}

/** Fetch a single article by slug (with author info) */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data: articleData, error: articleError } = await supabase
    .from('articles')
    .select('id, slug, title, subtitle, excerpt, content, category, category_label, author_id, cover_image_url, published_at, read_time, meta_title, meta_description')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (articleError || !articleData) {
    return null;
  }

  // Fetch author separately if author_id exists
  let authorName: string | null = null;
  let authorRole: string | null = null;
  let authorBio: string | null = null;

  if (articleData.author_id) {
    const { data: authorData } = await supabase
      .from('authors')
      .select('name, role, bio')
      .eq('id', articleData.author_id)
      .single();

    if (authorData) {
      authorName = authorData.name;
      authorRole = authorData.role;
      authorBio = authorData.bio;
    }
  }

  return {
    id: articleData.id,
    slug: articleData.slug,
    title: articleData.title,
    subtitle: articleData.subtitle ?? null,
    excerpt: articleData.excerpt,
    content: articleData.content,
    category: articleData.category as ArticleCategory,
    category_label: articleData.category_label,
    author_name: authorName,
    author_role: authorRole,
    author_bio: authorBio,
    cover_image_url: articleData.cover_image_url,
    published_at: articleData.published_at,
    read_time: articleData.read_time,
    meta_title: articleData.meta_title,
    meta_description: articleData.meta_description,
  };
}

/** Fetch all published article slugs (for generateStaticParams) */
export async function getAllArticleSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('published', true);

  if (error || !data) return [];
  return data.map((a) => a.slug);
}

/** Full-text search articles */
export async function searchArticles(query: string): Promise<ArticleListItem[]> {
  const { data, error } = await supabase
    .rpc('search_articles', { search_query: query });

  if (error) {
    console.error('Error searching articles:', error);
    return [];
  }

  return ((data ?? []) as Array<Record<string, unknown>>).map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    subtitle: (row.subtitle as string) ?? null,
    excerpt: row.excerpt as string,
    category: row.category as ArticleCategory,
    category_label: row.category_label as string,
    published_at: row.published_at as string | null,
    read_time: row.read_time as number,
  }));
}

/** Get related articles (same category, excluding current) */
export async function getRelatedArticles(slug: string, category: ArticleCategory, limit = 3): Promise<ArticleListItem[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('id, slug, title, subtitle, excerpt, category, category_label, published_at, read_time')
    .eq('published', true)
    .eq('category', category)
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data as ArticleListItem[];
}

/** Format published_at date for display */
export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
