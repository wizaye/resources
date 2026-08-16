import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages().filter((page) => page.path !== 'README.md');

  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...pages.map((page) => ({
      url: new URL(page.url, siteUrl).href,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
