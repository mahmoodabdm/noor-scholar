import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';
import AffiliateBox from '@/components/AffiliateBox';

export const metadata: Metadata = {
  title: 'Free Academic Plagiarism Checker Guide & Similarity Tools',
  description:
    'Detect similarity, avoid accidental plagiarism, and protect your academic manuscript before submission to peer-reviewed journals.',
  keywords: [
    'plagiarism checker',
    'academic plagiarism checker',
    'Turnitin alternative',
    'research paper similarity score',
    'iThenticate check',
  ],
  openGraph: {
    title: 'Free Academic Plagiarism Checker Guide | Noor Scholar',
    description: 'Ensure 100% academic originality and citation compliance before peer-review submission.',
  },
};

export default function PlagiarismCheckerPage() {
  const tools = [
    {
      name: '【entity-Grammarly¦canonical_name=Grammarly】 Plagiarism & Originality Checker',
      rating: '4.9/5',
      bestFor: 'Proactive draft checking & instant APA citation suggestions',
      features: ['Checks against ProQuest database & 16B web pages', 'Flags missing quotes', 'Integrated writing assistant'],
      url: 'https://grammarly.com',
      badge: 'Editor Choice',
      cta: 'Check Paper on 【entity-Grammarly¦canonical_name=Grammarly】',
      color: 'border-emerald-200 bg-emerald-50/50',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      name: 'QuillBot Plagiarism Scanner',
      rating: '4.8/5',
      bestFor: 'Multilingual students & rapid similarity scoring',
      features: ['Scans 100+ languages', 'Detailed side-by-side match reports', 'Seamless paraphrasing integration'],
      url: 'https://quillbot.com',
      badge: 'Best Value',
      cta: 'Try QuillBot Scanner',
      color: 'border-teal-200 bg-teal-50/50',
      btnColor: 'bg-teal-600 hover:bg-teal-700 text-white',
    },
    {
      name: 'Turnitin & iThenticate',
      rating: '4.9/5',
      bestFor: 'Official university submissions & publisher pre-checks',
      features: ['Industry gold standard for scientific journals', 'Comprehensive student paper repository', 'Strict similarity percentage index'],
      url: 'https://turnitin.com',
      badge: 'Publisher Standard',
      cta: 'Explore Turnitin Institutional',
      color: 'border-blue-200 bg-blue-50/50',
      btnColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Research Integrity & Ethics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Academic Plagiarism Checker & Originality Guide
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Safeguard your academic reputation. Learn how peer-reviewed journals evaluate similarity scores, avoid accidental self-plagiarism, and select the best scanner for your thesis.
        </p>
      </div>

      {/* Recommended Checker Comparison Cards */}
      <div className="space-y-6 mb-16">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Top Verified Academic Plagiarism Scanners</h2>
          <span className="text-xs text-slate-500">2026 Academic Benchmark</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((t, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border ${t.color} flex flex-col justify-between bg-white shadow-2xs hover:shadow-md transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text- font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {t.badge}
                  </span>
                  <span className="text-xs font-bold text-amber-500">{t.rating}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{t.name}</h3>
                <p className="text-xs text-slate-500 mb-4">{t.bestFor}</p>

                <ul className="space-y-2 mb-6 border-t border-slate-100 pt-3">
                  {t.features.map((f, fi) => (
                    <li key={fi} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={`w-full py-2.5 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-2xs transition-colors ${t.btnColor}`}
              >
                <span>{t.cta}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <AffiliateBox partner="all" />

      {/* In-depth educational guide */}
      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          What Is an Acceptable Similarity Percentage in Academic Publishing?
        </h2>
        <p>
          A common misconception among graduate students is that a similarity score of 0% is required. In reality, academic papers naturally include standardized methodology descriptions, chemical compound formulas, formal legal statutes, and bibliographic citations that trigger algorithmic match indicators.
        </p>
        <p>
          Most major publishers (including Elsevier, IEEE, Springer Nature, and Wiley) utilize <strong>Crossref Similarity Check (powered by iThenticate)</strong> during editorial triage:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Under 15% Overall Similarity:</strong> Generally considered safe, assuming no single source accounts for more than 2-3% of matching text and all direct quotes are properly enclosed in quotation marks with exact page numbers.
          </li>
          <li>
            <strong>15% to 25% Similarity:</strong> Requires editorial inspection. Frequently occurs in review articles or methodology sections with heavy standardized protocols.
          </li>
          <li>
            <strong>Above 25% Similarity:</strong> Triggers immediate desk-rejection or formal inquiry by the editor-in-chief for potential duplicate publishing or uncredited text lifting.
          </li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900">Beware of &ldquo;Self-Plagiarism&rdquo; (Text Recycling)</h3>
        <p>
          Publishing identical paragraphs from your prior conference proceedings or master&apos;s thesis in a new journal manuscript without explicit cross-citation constitutes self-plagiarism. While the ideas are your own, publisher copyright transfer agreements typically prohibit republishing copyrighted prose. Always disclose previous workshop or preprint appearances in your cover letter.
        </p>
      </article>
    </div>
  );
}
    </div>
  );
}
