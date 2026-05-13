import type { MetadataRoute } from 'next';
import { getAllOperations } from '@/lib/openapi';
import { apiReferences, guides, site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...guides.map((guide) => ({
      url: `${site.url}/${guide.slug}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...apiReferences.map((api) => ({
      url: `${site.url}/${api.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ];

  const endpoints = getAllOperations().map((operation) => ({
    url: `${site.url}/${operation.apiSlug}/${operation.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...endpoints];
}
