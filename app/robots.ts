import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://noor-scholar.vercel.app/sitemap.xml',
    host: 'https://noor-scholar.vercel.app',
  };
}
