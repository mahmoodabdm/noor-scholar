import { MetadataRoute } from 'next';

export default function sitemap() {
  return [
    { url: 'https://noor-scholar-uvk.vercel.app', lastModified: new Date() },
    { url: 'https://noor-scholar-uvk.vercel.app/about', lastModified: new Date() },
    { url: 'https://noor-scholar-uvk.vercel.app/privacy', lastModified: new Date() },
    { url: 'https://noor-scholar-uvk.vercel.app/contact', lastModified: new Date() },
  ]
}
