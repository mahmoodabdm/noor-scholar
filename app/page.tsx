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
  ChevronDown,
  Search,
  BookOpen,
  TrendingUp,
  MessageCircle,
  Heart,
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
    description: 'Search 250M+ scholarly works for free and generate APA, MLA, and 【entity-Chicago¦canonical_name=Chicago】 citations in seconds.',
    images: [{ url: 'https://noor-scholar.vercel.app/og-image.jpg', width: 1200, height: 630, alt: 'Noor Scholar - free academic search engine' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noor Scholar – Free Academic Search Engine',
    description: 'Search 250M+ scholarly works for free and generate APA, MLA, and 【entity-Chicago¦canonical_name=Chicago】 citations in seconds.',
    images: ['https://noor-scholar.vercel.app/og-image.jpg'],
  },
};

const POPULAR_SEARCHES = ['Deep Learning Transformers','CRISPR Gene Editing','Quantum Computing Algorithms','Renewable Energy Storage','Microplastics in Marine Biology','Alzheimer Disease Biomarkers'];

const FAQS = [
  { q: 'What is Noor Scholar?', a: 'Noor Scholar is a free academic search engine built on OpenAlex, an open catalog of more than 250 million scholarly works including journal articles, conference papers, preprints, and datasets.' },
  { q: 'How is Noor Scholar different from Google Scholar?', a: 'Noor Scholar searches the open OpenAlex catalog and shows citation counts, DOIs, and links to open-access versions when they are available. It also includes a citation generator. It is an independent project and is not affiliated with Google Scholar or OpenAlex.' },
  { q: 'Is Noor Scholar free to use?', a: 'Yes. Searching, saving papers to your library, and generating citations are completely free, with no account or registration required.' },
  { q: 'How many research papers are indexed in Noor Scholar?', a: 'Search results come from OpenAlex, which currently lists more than 250 million scholarly works. Coverage and metadata quality vary by field and publisher, and the catalog is updated on OpenAlex’s own schedule.' },
  { q: 'Can I download full-text PDFs directly?', a: 'When OpenAlex lists an open-access version or a publisher DOI, we link to it. Many papers are behind publisher paywalls and are not available for free.' },
];

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })) };

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />

      {/* Donation Banner - No Ads, Free Forever */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center">
        <p className="text-sm text-slate-700">
          <Heart className="inline w-4 h-4 text-red-500 mr-1" />
          <span className="font-semibold">Noor Scholar is free forever.</span> Help us keep research free for everyone.
          <a href="https://ko-fi.com/noorscholar" target="_blank" className="ml-3 px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-slate-700">Donate $5 ❤️</a>
          <a href="/trending" className="ml-2 px-4 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-full hover:bg-slate-50">Trending Research →</a>
        </p>
      </div>

      {/* Hero Section */}
      <section id="search" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center scroll-mt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Free to search. No account needed.</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight mb-4">
          Free Academic Search Engine
          <span className="block text-blue-600">250M+ Research Papers</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          An open alternative to Google Scholar. Search scholarly works, find open-access versions, and generate citations for your research.
        </p>
        <SearchBox variant="hero" />
        <p className="mt-4 mb-6 text-sm text-slate-500">
          Free to use, no account required.{' '}
          <Link href="/tools/citation-generator" className="text-blue-600 font-medium hover:underline">Or generate a citation</Link>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="text-xs font-semibold text-slate-400">Trending Topics:</span>
          {POPULAR_SEARCHES.map((topic) => (
            <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`} className="px-3 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 rounded-full text-xs font-medium transition-colors border border-transparent hover:border-blue-200">{topic}</Link>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div><div className="text-3xl font-black text-blue-600">250M+</div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Scholarly Works</div></div>
          <div><div className="text-3xl font-black text-slate-900">90M+</div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Authors</div></div>
          <div><div className="text-3xl font-black text-slate-900">100K+</div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Institutions</div></div>
          <div><div className="text-3xl font-black text-emerald-600">Free</div><div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">To Search &amp; Cite</div></div>
        </div>
        <p className="mt-3 text-xs text-slate-400">Figures are approximate and may change over time.</p>
      </section>

      {/* Trending + Chat Teaser - NEW */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/trending" className="p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all block">
            <TrendingUp className="w-6 h-6 text-blue-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">Trending Research</h3>
            <p className="text-sm text-slate-600">See what researchers are reading today - Trending, Hidden Gems and Breakthrough Discoveries.</p>
            <span className="text-blue-600 text-sm font-semibold">Explore Trending →</span>
          </Link>
          <Link href="/trending" className="p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all block">
            <MessageCircle className="w-6 h-6 text-emerald-600 mb-3" />
            <h3 className="font-bold text-slate-900 mb-1">Chat with any paper</h3>
            <p className="text-sm text-slate-600">Paste a DOI or title and ask questions - what did they find? What method did they use?</p>
            <span className="text-blue-600 text-sm font-semibold">Chat with a paper →</span>
          </Link>
        </div>
      </section>

      <section aria-label="Supported citation styles" className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm">
          <span className="text-slate-500">Cite in the styles your professors ask for:</span>
          <ul className="flex flex-wrap items-center justify-center gap-2 font-semibold text-slate-700">
            {['APA 7th', 'MLA 9th', 'Chicago'].map((style) => (<li key={style} className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">{style}</li>))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12"><h2 className="text-3xl font-extrabold text-slate-900 mb-3">How it works</h2><p className="text-slate-600">From a search to a finished reference list in three steps.</p></div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="p-6 rounded-2xl border border-slate-200 bg-white"><div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4"><Search className="w-5 h-5" /></div><h3 className="font-bold text-slate-900 mb-1">1. Search</h3><p className="text-sm text-slate-600 leading-relaxed">Find papers by topic, title, or author. See citation counts, DOIs, and open-access links.</p></li>
            <li className="p-6 rounded-2xl border border-slate-200 bg-white"><div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4"><Sparkles className="w-5 h-5" /></div><h3 className="font-bold text-slate-900 mb-1">2. Summarize</h3><p className="text-sm text-slate-600 leading-relaxed">Get the research question, method, and key findings from the abstract.{' '}<Link href="/tools/summarizer" className="text-blue-600 font-medium hover:underline">Try the Summarizer →</Link></p></li>
            <li className="p-6 rounded-2xl border border-slate-200 bg-white"><div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4"><Quote className="w-5 h-5" /></div><h3 className="font-bold text-slate-900 mb-1">3. Cite</h3><p className="text-sm text-slate-600 leading-relaxed">Click Cite on any result to generate APA, MLA, or Chicago. Check it against your style guide before you submit.</p></li>
          </ol>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16"><span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Why Noor Scholar</span><h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Built for Students, Academics, and Scientists</h2><p className="text-slate-600">Tools to help you find literature and keep track of your sources.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"><div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5"><Globe2 className="w-6 h-6" /></div><h3 className="text-lg font-bold text-slate-900 mb-2">250M+ Scholarly Works</h3><p className="text-sm text-slate-600 leading-relaxed">Search articles, conference papers, preprints, and more across medicine, computer science, physics, economics, and the humanities.</p></div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"><div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5"><Quote className="w-6 h-6" /></div><h3 className="text-lg font-bold text-slate-900 mb-2">Citation Generator</h3><p className="text-sm text-slate-600 leading-relaxed">Generate APA 7th, MLA 9th, and Chicago citations from paper metadata. Always check the result against your style guide before submitting.</p></div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"><div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5"><FileText className="w-6 h-6" /></div><h3 className="text-lg font-bold text-slate-900 mb-2">Find Open-Access Versions</h3><p className="text-sm text-slate-600 leading-relaxed">Follow links to publisher DOIs and to open-access copies in repositories and preprint servers, where OpenAlex lists them.</p></div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"><div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5"><Layers className="w-6 h-6" /></div><h3 className="text-lg font-bold text-slate-900 mb-2">Citation Counts</h3><p className="text-sm text-slate-600 leading-relaxed">See how often a work has been cited, based on OpenAlex data, to help you gauge its reach. Counts differ between databases.</p></div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"><div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-5"><Zap className="w-6 h-6" /></div><h3 className="text-lg font-bold text-slate-900 mb-2">Paper Summarizer</h3><p className="text-sm text-slate-600 leading-relaxed">Paste a DOI or an abstract to get the research question, method, and key findings. Extractive summary, not AI-generated.{' '}<Link href="/tools/summarizer" className="text-blue-600 font-medium hover:underline">Try it →</Link></p></div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"><div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5"><Shield className="w-6 h-6" /></div><h3 className="text-lg font-bold text-slate-900 mb-2">Privacy</h3><p className="text-sm text-slate-600 leading-relaxed">We respect your privacy. See our{' '}<Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">Privacy Policy</Link>{' '}for what data is collected and how it is used.</p></div>
            <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"><div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5"><BookOpen className="w-6 h-6" /></div><h3 className="text-lg font-bold text-slate-900 mb-2">My Library</h3><p className="text-sm text-slate-600 leading-relaxed">Save papers you find and come back to them later. No account needed, saved in your browser.{' '}<Link href="/my-library" className="text-blue-600 font-medium hover:underline">View my library →</Link></p></div>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 mb-8"><h2 className="text-3xl font-extrabold text-slate-900">From the blog</h2><Link href="/blog" className="text-sm font-semibold text-blue-600 hover:underline">All articles</Link></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ href: '/blog/how-to-cite-research-paper-apa', title: 'How to cite a research paper in APA 7th', blurb: 'Formats and examples for journal articles, books, and web sources.' },{ href: '/blog/how-to-avoid-plagiarism', title: 'How to avoid plagiarism in academic writing', blurb: 'Practical paraphrasing, quoting, and source-tracking rules for students.' }].map((post) => (
              <Link key={post.href} href={post.href} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all"><BookOpen className="w-5 h-5 text-blue-600 mb-3" /><h3 className="font-bold text-slate-900 mb-1">{post.title}</h3><p className="text-sm text-slate-600">{post.blurb}</p></Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12"><span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Frequently Asked Questions</span><h2 className="text-3xl font-extrabold text-slate-900 mt-2">Everything You Need to Know</h2></div>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={faq.q} open={i === 0} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <summary className="w-full p-5 font-bold text-slate-900 flex items-center justify-between cursor-pointer list-none hover:bg-slate-50 transition-colors [&::-webkit-details-marker]:hidden"><span className="text-base">{faq.q}</span><ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 group-open:text-blue-600" /></summary>
                <div className="p-5 pt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Search the Literature?</h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-8">Search 250M+ scholarly works for free. No registration required.</p>
          <a href="#search" className="px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-full shadow-lg transition-colors inline-flex items-center gap-2"><span>Search Papers Now</span><ArrowRight className="w-4 h-4" /></a>
        </div>
      </section>
    </div>
  );
}
