import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://noor-scholar.vercel.app';
  const now = new Date();
  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog/how-to-avoid-plagiarism`, lastModified: new Date('2026-11-28'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/mla-vs-apa-vs-chicago`, lastModified: new Date('2026-11-13'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/how-to-write-a-literature-review`, lastModified: new Date('2026-11-10'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/how-to-cite-research-paper-apa`, lastModified: new Date('2026-11-05'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/how-to-read-research-paper`, lastModified: new Date('2026-11-02'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog/best-google-scholar-alternatives-2026`, lastModified: new Date('2026-11-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/tools/plagiarism-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/summarizer`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/tools/citation-generator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
