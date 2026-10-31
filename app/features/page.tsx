import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Globe2,
  Quote,
  FileText,
  Layers,
  Sparkles,
  Zap,
  ShieldCheck,
  Search,
  Check,
  ArrowRight,
  Database,
  Share2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features - 250M+ Papers, Citations, DOI Access & AI Tools',
  description:
    'Explore Noor Scholar features: 250M+ open-access papers, citation generator (APA/MLA), DOI full-text resolver, AI paper summarizer, and research graph.',
  keywords: [
    'Noor Scholar features',
    'academic search engine features',
    'DOI resolver',
    'APA citation generator',
    'research paper summarizer',
    'OpenAlex integration',
  ],
  openGraph: {
    title: 'Features - 250M+ Papers, Citations, DOI Access & AI Tools | Noor Scholar',
    description: 'Detailed breakdown of Noor Scholar academic discovery engine and researcher workflow tools.',
  },
};

export default function FeaturesPage() {
  const featureList = [
    {
      title: '250M+ Open Literature Index',
      badge: 'Massive Catalog',
      icon: <Database className="w-6 h-6 text-blue-600" />,
      desc: 'Powered directly by OpenAlex, cataloging publications from over 250,000 academic journals, conference proceedings, preprints (ArXiv, BioRxiv), and university repositories.',
      points: [
        'Real-time indexing of newly published peer-reviewed works',
        'Covers biomedical, computer science, physical, and social sciences',
        'Full metadata: abstract, publication year, volume, and issue numbers',
      ],
    },
    {
      title: 'Automated Multi-Style Citation Generator',
      badge: 'Academic Standard',
      icon: <Quote className="w-6 h-6 text-indigo-600" />,
      desc: 'Generate pinpoint bibliographic citations in APA 7th, MLA 9th, Chicago 17th, Harvard, and export clean BibTeX syntax for LaTeX and Overleaf.',
      points: [
        'Zero manual copy-pasting errors',
        'Handles single, multiple, and corporate author guidelines',
        'One-click clipboard copy and citation bookmarking',
      ],
    },
    {
      title: 'Direct DOI & Open Access Full-Text Resolver',
      badge: 'Open Access',
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      desc: 'Stop getting stranded on publisher paywalls. Noor Scholar detects official DOIs and points directly to open-access versions and legal repository mirrors.',
      points: [
        'Direct resolution to CrossRef, PubMed, and ArXiv',
        'Detection of Green and Gold Open Access status',
        'Safe, legal, and verified academic links',
      ],
    },
    {
      title: 'Citation Graph & Impact Metrics',
      badge: 'Bibliometrics',
      icon: <Layers className="w-6 h-6 text-amber-600" />,
      desc: 'See how papers connect. Understand historical context and foundational research through verified citation counts and influence metrics.',
      points: [
        'Accurate citation counters updated from global bibliographies',
        'Track seminal works versus emerging recent breakthroughs',
        'Inspect co-authorship networks and university affiliations',
      ],
    },
    {
      title: 'AI-Powered Research Paper Summarizer',
      badge: 'Workflow Supercharger',
      icon: <Sparkles className="w-6 h-6 text-rose-600" />,
      desc: 'Extract key scientific findings, sample size, methodology, and conclusions from dense 30-page PDF abstracts in seconds.',
      points: [
        'Structured key findings and limitations breakdown',
        'TL;DR one-sentence summary for rapid literature triage',
        '100% private: your text inputs are never shared or trained upon',
      ],
    },
    {
      title: 'Academic Tone Paraphraser & Co-Writer',
      badge: 'Scientific Writing',
      icon: <Zap className="w-6 h-6 text-sky-600" />,
      desc: 'Refine manuscript prose into rigorous, peer-review-grade academic English. Eliminate repetitive phrasing while maintaining precise technical meaning.',
      points: [
        'Multiple academic modes: Formal, Concise, Analytical',
        'Preserves scientific jargon and terminology',
        'Ideal for non-native English scholars submitting to top journals',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Complete Feature Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Everything You Need to Master Scholarly Literature
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Explore the engine under the hood. Noor Scholar combines the largest open bibliographic database with intuitive research tools.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {featureList.map((f, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                  {f.icon}
                </div>
                <span className="text- font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full uppercase tracking-wider">
                  {f.badge}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{f.desc}</p>
              <ul className="space-y-2.5 border-t border-slate-100 pt-5">
                {f.points.map((pt, pti) => (
                  <li key={pti} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA section */}
      <div className="p-10 bg-slate-900 text-white rounded-3xl text-center">
        <h2 className="text-3xl font-bold mb-3">Experience the Features Live</h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8">
          Search over 250 million papers or use any of our free researcher tools right now.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md text-sm inline-flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search 250M+ Papers</span>
          </Link>
          <Link
            href="/tools/citation-generator"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-sm inline-flex items-center gap-2 border border-slate-700"
          >
            <Quote className="w-4 h-4" />
            <span>Free Citation Generator</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
