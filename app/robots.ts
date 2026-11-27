import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search', '/my-library', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://noor-scholar.vercel.app/sitemap.xml',
  };
}
