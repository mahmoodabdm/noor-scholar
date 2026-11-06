import type { Metadata } from 'next';
import CitationGeneratorClient from './CitationGeneratorClient';

export const metadata: Metadata = {
  title: 'Free APA Citation Generator - Noor Scholar',
  description: 'Generate free APA 7th, MLA 9th, and 【entity-Chicago¦canonical_name=Chicago】 citations in seconds. Paste a DOI, title, or URL and copy your citation.',
  alternates: { canonical: '/tools/citation-generator' },
  openGraph: {
    type: 'website',
    url: '/tools/citation-generator',
    siteName: 'Noor Scholar',
    locale: 'en_US',
    title: 'Free APA Citation Generator - Noor Scholar',
    description: 'Generate APA 7th, MLA 9th, and 【entity-Chicago¦canonical_name=Chicago】 citations from DOI, title, or URL. Free, no account needed.',
  },
};

const FAQS = [
  { q: 'How do I generate an APA citation?', a: 'Paste a DOI, title, or URL, click Generate, then copy the APA 7th result. Always check it against your style guide before submitting.' },
  { q: 'Is this citation generator free?', a: 'Yes. It is free, no account and no credit card required.' },
  { q: 'Where does the metadata come from?', a: 'Metadata is fetched from OpenAlex and CrossRef when available. If metadata is missing, you can edit the fields manually.' },
];

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <CitationGeneratorClient faqs={FAQS} />
    </>
  );
}
