tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Quote,
  Shield,
  Zap,
  Globe2,
  FileText,
  Layers,
  Check,
  Clock,
  ChevronDown,
} from 'lucide-react';
import SearchBox from '@/components/SearchBox';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Noor Scholar',
    locale: 'en_US',
    title: 'Noor Scholar – Free Academic Search Engine',
    description: 'Search 250M+ scholarly works from OpenAlex for free.',
  },
};

const POPULAR_SEARCHES = [
  'Deep Learning Transformers',
  'CRISPR Gene Editing',
  'Quantum Computing Algorithms',
  'Renewable Energy Storage',
  'Microplastics in Marine Biology',
  'Alzheimer Disease Biomarkers',
];

const FAQS = [
  {
    q: 'What is Noor Scholar?',
    a: 'Noor Scholar is a free academic search engine built on OpenAlex, an open catalog of more than 250 million scholarly works including journal articles, conference papers, preprints, and datasets.',
  },
  {
    q: 'How is Noor Scholar different from Google Scholar?',
    a: 'Noor Scholar searches the open OpenAlex catalog and shows citation counts, DOIs, and links to open-access versions when they are available. It also includes a citation generator. It is an independent project and is not affiliated with Google Scholar or OpenAlex.',
  },
  {
    q: 'Is Noor Scholar free to use?',
    a: 'Yes. Searching and the citation generator are free, and no registration is required. We display ads to help cover running costs. Paid plans are planned but not available yet.',
  },
  {
    q: 'How many research papers are indexed in Noor Scholar?',
    a: 'Search results come from OpenAlex, which currently lists more than 250 million scholarly works. Coverage and metadata quality vary by field and publisher, and the catalog is updated on OpenAlex’s own schedule.',
  },
  {
    q: 'Can I download full-text PDFs directly?',
    a: 'When OpenAlex lists an open-access version or a publisher DOI, we link to it. Many papers are behind publisher paywalls and are not available for free.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

function ComingSoonBadge() {
  return (
    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase tracking-wide align-middle">
      <Clock className="w-3 h-3" />
      Coming soon
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero Section */}
      <section
        id="search"
        className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center scroll-mt-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Powered by OpenAlex open scholarly data</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-4">
          Free Academic Search Engine
          <span className="block text-blue-600">250M+ Research Papers</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          An open alternative to Google Scholar. Search scholarly works, find open-access versions, and generate citations for your research.
        </p>

        <SearchBox variant="hero" />

        {/* Trending topics: crawlable links */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="text-xs font-semibold text-slate-400">Trending Topics:</span>
          {POPULAR_SEARCHES.map((topic) => (
            <Link
              key={topic}
              href={`/search?q=${encodeURIComponent(topic)}`}
              className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-full text-xs font-medium transition-colors border border-transparent hover:border-blue-200"
            >
              {topic}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div>
            <div className="text-3xl font-black text-blue-600">250M+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Scholarly Works</div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">90M+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Authors</div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900">100K+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Institutions</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-600">Free</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">To Search &amp; Cite</div>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-slate-400">Figures reflect the OpenAlex catalog and may change over time.</p>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Why Noor Scholar</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
              Built for Students, Academics, and Scientists
            </h2>
            <p className="text-slate-600">
              Tools to help you find literature and keep track of your sources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">250M+ Works via OpenAlex</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Search articles, conference papers, preprints, and more across medicine, computer science, physics, economics, and the humanities, using the open OpenAlex catalog.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Quote className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Citation Generator</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Generate APA 7th, MLA 9th, and Chicago citations from paper metadata. Always check the result against your style guide before submitting.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Find Open-Access Versions</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Follow links to publisher DOIs and to open-access copies in repositories and preprint servers, where OpenAlex lists them.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Citation Counts</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                See how often a work has been cited, based on OpenAlex data, to help you gauge its reach. Counts differ between databases.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-300 transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Paper Summarizer
                <ComingSoonBadge />
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We are working on AI-assisted summaries and writing tools. They are not available yet.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Privacy</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We respect your privacy. See our{' '}
                <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">
                  Privacy Policy
                </Link>{' '}
                for what data is collected and how advertising cookies are used.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Pricing</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-3">
              Free Today. Paid Plans Coming Later.
            </h2>
            <p className="text-slate-600 text-sm">
              Search and citations are free. Paid plans are planned but not yet available, and the features below are not live.{' '}
              <Link href="/contact" className="text-blue-600 underline hover:text-blue-800">
                Contact us
              </Link>{' '}
              for updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="p-8 bg-white rounded-2xl border-2 border-blue-600 flex flex-col justify-between shadow-md">
              <div>
                <div className="text-sm font-bold text-blue-600 uppercase">Scholar Free</div>
                <div className="text-4xl font-black text-slate-900 my-4">
                  $0 <span className="text-sm font-normal text-slate-500">/ available now</span>
                </div>
                <p className="text-xs text-slate-600 mb-6">Literature search and citations for students and researchers.</p>
                <ul className="space-y-3 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Search across 250M+ works</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> APA, MLA &amp; Chicago generator</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> DOI &amp; open-access links</li>
                </ul>
              </div>
              <a
                href="#search"
                className="w-full py-3 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
              >
                Start Searching
              </a>
            </div>

            {/* Pro */}
            <div className="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-slate-500 uppercase">Scholar Pro</div>
                <div className="text-sm font-bold text-amber-700 my-4">Coming soon</div>
                <p className="text-xs text-slate-600 mb-6">Planned for active researchers and PhD candidates.</p>
                <ul className="space-y-3 text-xs text-slate-500 mb-8">
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400 shrink-0" /> Everything in Free</li>
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400 shrink-0" /> AI paper summaries (planned)</li>
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400 shrink-0" /> Academic paraphraser (planned)</li>
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400 shrink-0" /> Bulk BibTeX export (planned)</li>
                </ul>
              </div>
              <span
                aria-disabled="true"
                className="w-full py-3 text-center text-xs font-bold text-slate-400 bg-slate-200 rounded-xl cursor-not-allowed"
              >
                Not available yet
              </span>
            </div>

            {/* Team */}
            <div className="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-slate-500 uppercase">Lab / Institution</div>
                <div className="text-sm font-bold text-amber-700 my-4">Coming soon</div>
                <p className="text-xs text-slate-600 mb-6">Planned for research groups and institutions.</p>
                <ul className="space-y-3 text-xs text-slate-500 mb-8">
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400 shrink-0" /> Team seats (planned)</li>
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400 shrink-0" /> Shared reading lists (planned)</li>
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400 shrink-0" /> API access (planned)</li>
                </ul>
              </div>
              <span
                aria-disabled="true"
                className="w-full py-3 text-center text-xs font-bold text-slate-400 bg-slate-200 rounded-xl cursor-not-allowed"
              >
                Not available yet
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Frequently Asked Questions</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Everything You Need to Know</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                open={i === 0}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                <summary className="w-full p-5 font-bold text-slate-900 flex items-center justify-between cursor-pointer list-none hover:bg-slate-50 transition-colors [&::-webkit-details-marker]:hidden">
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600" />
                </summary>
                <div className="p-5 pt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Search the Literature?</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Search 250M+ scholarly works for free. No registration required.
          </p>
          <a
            href="#search"
            className="px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-full shadow-lg transition-colors inline-flex items-center gap-2"
          >
            <span>Search Papers Now</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
