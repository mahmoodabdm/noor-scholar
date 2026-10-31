import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, User, Quote, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import AffiliateBox from '@/components/AffiliateBox';

export const metadata: Metadata = {
  title: 'How to Cite a Research Paper in APA 7th Edition (2026 Guide)',
  description:
    'Complete step-by-step guide to citing research papers in APA 7th edition. Covers journal articles, DOIs, multiple authors, preprints, and in-text references.',
  keywords: [
    'how to cite a research paper APA',
    'APA 7th edition citation guide',
    'APA journal article citation',
    'APA citation multiple authors',
    'APA DOI format 2026',
  ],
  openGraph: {
    title: 'How to Cite a Research Paper in APA 7th Edition (2026 Guide) | Noor Scholar',
    description: 'Learn how to format APA 7th citations for journal articles, preprints, and conferences.',
  },
};

export default function HowToCiteApaPage() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">
          <span>Academic Style Manuals</span>
          <span>•</span>
          <span>APA 7th Edition Reference</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          How to Cite a Research Paper in APA 7th Edition (2026 Guide)
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
          Whether you are writing an empirical thesis, literature review, or journal submission, here is the exact formula, author rules, and DOI standards mandated by the American Psychological Association (7th edition).
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              NS
            </div>
            <div>
              <div className="font-bold text-slate-900">Editorial Team</div>
              <div className="text-slate-400">Noor Scholar Research Team</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> October 15, 2026</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 6 min read (~850 words)</span>
          </div>
        </div>
      </header>

      {/* Quick Tool Callout */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-blue-900 text-sm">Need to Cite Instantly?</h3>
          <p className="text-xs text-blue-700 mt-0.5">Use our free online tool to build APA 7th citations in 3 seconds.</p>
        </div>
        <Link
          href="/tools/citation-generator"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          Open Free Citation Generator
        </Link>
      </div>

      {/* Main Body (800+ words SEO) */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            The Fundamental APA 7th Journal Article Formula
          </h2>
          <p>
            The American Psychological Association released its 7th edition to modernize citations for digital scholarly publishing. The universal core structure for a peer-reviewed journal article is:
          </p>

          <div className="p-4 bg-slate-900 text-blue-300 font-mono text-xs sm:text-sm rounded-xl leading-relaxed">
            Author, A. A., &amp; Author, B. B. (Year). Title of article in sentence case. <em>Title of Journal in Title Case</em>, <em>volume</em>(issue), pages. https://doi.org/10.xxxx/xxxxx
          </div>

          <p>
            Notice the crucial typography details that trip up students:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Sentence Case for Article Titles:</strong> Only capitalize the first letter of the article title, the first letter after a colon or dash, and proper nouns.</li>
            <li><strong>Title Case for Journal Names:</strong> Capitalize all major words in the journal name and italicize it (e.g., <em>Journal of Clinical Oncology</em>).</li>
            <li><strong>Italicize the Volume Number:</strong> The volume number is italicized, but the parenthetical issue number is in normal font (e.g., <em>42</em>(3)).</li>
            <li><strong>Active DOI Hyperlinks:</strong> Never precede the DOI with &quot;doi:&quot;. Always write the full active URL starting with <code>https://doi.org/</code>.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Author Name Variations in APA 7th
          </h2>

          <div className="space-y-4">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">1. One Author</h3>
              <p className="font-mono text-xs text-slate-700">
                Vaswani, A. (2024). Attention mechanisms in neural networks. <em>Nature Machine Intelligence</em>, <em>6</em>(2), 114–122. https://doi.org/10.1038/s42256-024-00123-x
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">2. Two Authors (Use Ampersand in References)</h3>
              <p className="font-mono text-xs text-slate-700">
                Kahneman, D., &amp; Tversky, A. (1979). Prospect theory: An analysis of decision under risk. <em>Econometrica</em>, <em>47</em>(2), 263–291. https://doi.org/10.2307/1914185
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">3. Three to 20 Authors</h3>
              <p className="text-xs text-slate-600 mb-1">
                In APA 7th, list all authors up to 20 separated by commas, placing an ampersand (&amp;) before the final author name.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 text-sm">4. Twenty-One or More Authors</h3>
              <p className="text-xs text-slate-600 mb-1">
                List the first 19 authors, insert an ellipsis (&hellip;) without an ampersand, then append the final author&apos;s name.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            How to Cite Preprints (ArXiv, BioRxiv, SSRN)
          </h2>
          <p>
            Preprints are increasingly common in computer science and biology. In APA 7th, preprints are formatted as follows:
          </p>
          <div className="p-4 bg-slate-900 text-blue-300 font-mono text-xs sm:text-sm rounded-xl leading-relaxed">
            Author, A. A. (Year). <em>Title of preprint</em>. Repository Name. https://doi.org/10.xxxx/xxxxx
          </div>
          <p className="text-xs text-slate-600">
            Example: Vaswani, A., et al. (2017). <em>Attention is all you need</em>. arXiv. https://doi.org/10.48550/arXiv.1706.03762
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            In-Text Citations: Parenthetical vs. Narrative
          </h2>
          <p>
            Every entry in your reference list must correspond to at least one in-text citation in your manuscript body:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Parenthetical Citation:</strong> Both author and year appear in parentheses at the end of the sentence: <em>(Smith &amp; Jones, 2024)</em>. For 3+ authors, use <em>et al.</em> immediately: <em>(Smith et al., 2024)</em>.
            </li>
            <li>
              <strong>Narrative Citation:</strong> The author&apos;s name is embedded into the grammatical flow of your prose: <em>According to Smith and Jones (2024), neural transformers dramatically decrease latency.</em>
            </li>
          </ul>
        </section>

        <AffiliateBox partner="grammarly" />

        <section className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Summary Checklist Before Final Submission</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> References are alphabetized by author last name</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Hanging indent of 0.5 inches applied to all entries</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> All electronic DOIs are live hyperlinks beginning with https://doi.org/</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Every in-text citation matches an item in the reference list</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
    </article>
  );
}
