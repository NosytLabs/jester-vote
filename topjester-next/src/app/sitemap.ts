import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all nominees for dynamic routes (with fallback for build time)
  let allNominees: { id: number | string }[] = [];
  try {
    if (db && db.query) {
      allNominees = await db.query.nominees.findMany();
    }
  } catch (error) {
    console.warn('Database not available for sitemap, using empty nominee list');
  }

  // Static routes - all pages included
  const staticRoutes = [
    {
      url: 'http://192.168.2.221:3013',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'http://192.168.2.221:3013/about',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'http://192.168.2.221:3013/leaderboard',
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: 'http://192.168.2.221:3013/login',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'http://192.168.2.221:3013/categories',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'http://192.168.2.221:3013/submit',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: 'http://192.168.2.221:3013/privacy',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'http://192.168.2.221:3013/terms',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: 'http://192.168.2.221:3013/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic nominee routes
  const nomineeRoutes = allNominees.map((nominee) => ({
    url: `http://192.168.2.221:3013/nominee/${nominee.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...nomineeRoutes];
}
