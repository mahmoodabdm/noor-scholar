import type { Metadata } from 'next';
import { Suspense } from 'react';
import CitationTool from '@/components/CitationTool';
import AffiliateBox from '@/components/AffiliateBox';
import { Quote } from 'lucide-react';

const SITE = 'https://noor-scholar.vercel.app';
const OG_IMAGE = `${SITE}/og-image.jpg`;
const PAGE_URL = '/tools/citation-generator';

export const metadata: Metadata = {
  title: 'Free Citation Generator – APA 7th, MLA 9th, Chicago & 【entity-Harvard¦canonical_name=Harvard】',
  description:
    'Free online citation generator. Create APA 7th, MLA 9th, Chicago, and 【entity-Harvard¦canonical_name=Harvard】 references from paper metadata in seconds.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'Noor Scholar',
    locale: 'en_US',
    title: 'Free Citation Generator – APA, MLA, Chicago & 【entity-Harvard¦canonical_name=Harvard】',
    description: 'Create APA, MLA, Chicago, and 【entity-Harvard¦canonical_name=Harvard】 references from paper metadata.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Noor Scholar citation generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Citation Generator – APA, MLA, Chicago & 【entity-Harvard¦canonical_name=Harvard】',
    description: 'Create APA, MLA, Chicago, and 【entity-Harvard¦canonical_name=Harvard】 references from paper metadata.',
    images: [OG_IMAGE],
  },
};

export default function CitationGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <Quote className="w-3.5 h-3.5" />
          <span>100% Free Academic Utility</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Free Citation Generator (APA, MLA, Chicago)
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Create formatted bibliographic references for your thesis, journal manuscripts, and term papers.
        </p>
      </div>

      {/* Interactive Tool */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading citation generator...</div>}>
        <CitationTool />
      </Suspense>

      {/* Affiliate */}
      <AffiliateBox partner="grammarly" />

      {/* SEO Content */}
      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          Why You Need an Accurate Academic Citation Generator
        </h2>
        <p>
          Accurate bibliographic citation is the cornerstone of scholarly integrity. Whether you are drafting a doctoral dissertation or completing an undergraduate term paper, improper citations can lead to plagiarism issues.
        </p>
        <p>
          The <strong>Noor Scholar citation generator</strong> provides a fast, distraction-free reference builder that generates formatted references in APA 7th, MLA 9th, Chicago 17th, and Harvard formats. Check the output against your style guide before submitting.
        </p>
      </article>
    </div>
  );
}
