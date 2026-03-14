import type { MetadataRoute } from 'next';
import { getAllArticleSlugs } from '@/lib/data/articles';

const SITE_URL = process.env.SITE_URL || 'https://digixr.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllArticleSlugs();

  const articleEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...articleEntries,
  ];
}
