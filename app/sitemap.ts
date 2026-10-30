import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noor-scholar-uvk.vercel.app';
  const currentDate = new Date().toISOString();

  const routes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: '/features', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/pricing', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/tools/citation-generator', changeFrequency: 'weekly' as const, priority: 0.95 },
    { path: '/tools/summarizer', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/tools/paraphraser', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/tools/plagiarism-checker', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/tools/translator', changeFrequency: 'weekly' as const, priority: 0.85 },
    { path: '/blog', changeFrequency: 'daily' as const, priority: 0.85 },
    { path: '/blog/best-google-scholar-alternatives-2026', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/blog/how-to-cite-research-paper-apa', changeFrequency: 'monthly' as const, priority: 0.85 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.75 },
    { path: '/privacy', changeFrequency: 'yearly' as const, priority: 0.6 },
    { path: '/terms', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
