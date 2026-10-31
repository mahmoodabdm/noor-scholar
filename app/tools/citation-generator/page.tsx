import type { Metadata } from 'next';
import { Suspense } from 'react';
import CitationTool from '@/components/CitationTool';
import AffiliateBox from '@/components/AffiliateBox';
import { Quote, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Citation Generator - APA 7th, MLA 9th, Chicago & 【entity-Harvard¦canonical_name=Harvard】',
  description:
    'Free online citation generator for academic researchers. Generate accurate APA 7th, MLA 9th, Chicago 17th, and 【entity-Harvard¦canonical_name=Harvard】 references in seconds.',
  keywords: [
    'citation generator',
    'APA citation generator',
    'MLA citation generator',
    'Chicago citation generator',
    'free citation machine',
    'BibTeX generator',
  ],
  openGraph: {
    title: 'Free Citation Generator - APA 7th, MLA 9th, Chicago & 【entity-Harvard¦canonical_name=Harvard】 | Noor Scholar',
    description: 'Instant citation generator for research papers, journals, books, and preprints.',
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
          Create error-free bibliographic references for your thesis, journal manuscripts, and term papers.
        </p>
      </div>

      {/* Interactive Tool with Suspense boundary */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading citation generator...</div>}>
        <CitationTool />
      </Suspense>

      {/* Affiliate Tool Recommendations */}
      <AffiliateBox partner="【entity-grammarly¦canonical_name=grammarly】" />

      {/* 400+ Words SEO Content Targeting 'citation generator' */}
      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          Why You Need an Accurate Academic Citation Generator
        </h2>
        <p>
          Accurate bibliographic citation is the cornerstone of scholarly integrity and academic writing. Whether you are drafting a doctoral dissertation, submitting a peer-reviewed manuscript to Elsevier or Springer, or completing an undergraduate term paper, improper citations can lead to accidental plagiarism charges and manuscript rejection.
        </p>
        <p>
          The <strong>Noor Scholar citation generator</strong> was created by researchers to eliminate the frustrating hours spent formatting periods, italics, hanging indents, and author rosters across differing academic style guides. Unlike bloated legacy citation machines cluttered with intrusive pop-up ads, our tool provides an instantaneous, distraction-free reference builder that generates accurate entries in APA 7th, MLA 9th, Chicago 17th, and Harvard formats.
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          Understanding the Major Academic Citation Styles
        </h3>
        <p>
          Different academic disciplines mandate specific style manuals to standardize how evidence and intellectual precedence are attributed:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>APA 7th Edition (American Psychological Association):</strong> Predominantly utilized in psychology, neuroscience, education, nursing, business, and the behavioral sciences. APA style emphasizes the publication year immediately following the author&apos;s name (e.g., <em>Smith, J. (2024)</em>) to underscore the recency of scientific evidence.
          </li>
          <li>
            <strong>MLA 9th Edition (Modern Language Association):</strong> Standard across the humanities, comparative literature, linguistics, cultural studies, and philosophy. MLA prioritizes authorship and page numbers for direct textual quotation (e.g., <em>Smith, John. &quot;Title.&quot; pp. 12-14</em>).
          </li>
          <li>
            <strong>Chicago Manual of Style (17th Edition):</strong> Heavily favored in history, art history, and theology, utilizing both author-date systems and notes-and-bibliography formats.
          </li>
          <li>
            <strong>BibTeX / Overleaf:</strong> The universal markup standard for computer science, mathematics, statistics, and physics researchers drafting in LaTeX.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900">
          Best Practices for Formatting Digital Object Identifiers (DOIs)
        </h3>
        <p>
          Both APA 7th and MLA 9th guidelines dictate that all electronic research articles must include an active digital object identifier (DOI) formatted as an accessible hyperlink (e.g., <code>https://doi.org/10.xxxx/xxxxx</code>). If a DOI is not available, the stable permalink from the institutional repository should be substituted.
        </p>
      </article>
    </div>
  );
}
