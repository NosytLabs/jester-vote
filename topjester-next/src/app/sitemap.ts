import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all nominees for dynamic routes (with fallback for build time)
  let allNominees: { id: number | string }[] = [];
  try {
    allNominees = await db.query.nominees.findMany();
  } catch (error) {
    console.warn('Database not available for sitemap, using empty nominee list');
  }

  // Static routes - all pages included
  const staticRoutes = [
    {
      url: 'https://topjester.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://topjester.com/about',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://topjester.com/leaderboard',
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: 'https://topjester.com/login',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://topjester.com/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://topjester.com/submit',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: 'https://topjester.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'https://topjester.com/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Dynamic nominee routes
  const nomineeRoutes = allNominees.map((nominee) => ({
    url: `https://topjester.com/nominee/${nominee.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...nomineeRoutes];
}
