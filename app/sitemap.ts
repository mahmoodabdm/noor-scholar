import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noor-scholar.vercel.app'

  const routes = [
    '', '/features', '/pricing', '/tools/citation-generator',
    '/tools/summarizer', '/tools/paraphraser', '/tools/plagiarism-checker',
    '/tools/translator', '/blog', '/blog/best-google-scholar-alternatives-2026',
    '/blog/how-to-cite-research-paper-apa',
    '/blog/how-to-write-a-literature-review',
    '/blog/mla-vs-apa-vs-chicago',
    '/about', '/contact', '/privacy', '/terms'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-11-29'),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
