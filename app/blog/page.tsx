import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, ArrowRight, User, Sparkles } from 'lucide-react';
import AffiliateBox from '@/components/AffiliateBox';

export const metadata: Metadata = {
  title: 'Academic Research Blog & Literature Discovery Guides',
  description:
    'Actionable guides on academic search engines, literature review strategies, APA/MLA citations, and Google Scholar alternatives for modern researchers.',
  keywords: [
    'academic research blog',
    'Google Scholar alternatives 2026',
    'how to cite research paper APA',
    'literature review guide',
    'PhD research tips',
  ],
  openGraph: {
    title: 'Academic Research Blog | Noor Scholar',
    description: 'Practical guides and reviews for researchers, graduate students, and university faculties.',
  },
};

export default function BlogIndexPage() {
  const articles = [
    {
      slug: 'best-google-scholar-alternatives-2026',
      title: '10 Best Google Scholar Alternatives in 2026 (Free & Open Access)',
      excerpt:
        'Explore the top 10 academic search engines competing with Google Scholar in 2026, comparing catalog size, citation graphs, AI summarization, and open-access full text.',
      category: 'Search Engines',
      readTime: '8 min read',
      date: 'October 20, 2026',
      author: 'Editorial Team',
      highlight: true,
    },
    {
      slug: 'how-to-cite-research-paper-apa',
      title: 'How to Cite a Research Paper in APA 7th Edition (2026 Complete Guide)',
      excerpt:
        'Master APA 7th edition citation rules for journal articles, preprints, conference papers, and online databases with real-world examples and DOI formatting.',
      category: 'Citations & Style',
      readTime: '6 min read',
      date: 'October 15, 2026',
      author: 'Editorial Team',
      highlight: false,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Research Insights & Tutorials</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          The Noor Scholar Research Blog
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Comprehensive guides on scholarly literature search, bibliographic citation standards, and academic research tools.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {articles.map((art) => (
          <article
            key={art.slug}
            className={`p-8 rounded-3xl border transition-all flex flex-col justify-between bg-white ${
              art.highlight
                ? 'border-blue-300 shadow-md hover:shadow-xl'
                : 'border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                  {art.category}
                </span>
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {art.readTime}
                  </span>
                  <span>{art.date}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug mb-3">
                <Link href={`/blog/${art.slug}`}>{art.title}</Link>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span>{art.author}</span>
              </div>

              <Link
                href={`/blog/${art.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:translate-x-0.5 transition-all"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AffiliateBox partner="all" />
    </div>
  );
}
