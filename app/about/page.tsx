import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Users, Target, ShieldCheck, ArrowRight, Mail, Globe, Database, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Why We Built a Modern Google Scholar Alternative',
  description:
    'Discover the story behind Noor Scholar. Learn how our mission to open 250M+ academic research papers empowers researchers, students, and institutions.',
  keywords: [
    'about Noor Scholar',
    'Google Scholar alternative',
    'open science mission',
    'academic research search engine',
    'OpenAlex indexing',
  ],
  openGraph: {
    title: 'About Us - Why We Built a Modern Google Scholar Alternative | Noor Scholar',
    description: 'Learn how Noor Scholar indexes 250M+ scientific papers with open citations and modern researcher tools.',
  },
};

export default function AboutPage() {
  const CONTACT_EMAIL = 'abdmazn55@gmail.com';

  const milestones = [
    { value: '250M+', label: 'Indexed Scientific Papers' },
    { value: '90M+', label: 'Global Authors Cataloged' },
    { value: '100K+', label: 'Research Institutions & Universities' },
    { value: '100%', label: 'Commitment to Open Science' },
  ];

  const teamMembers = [
    {
      name: 'Academic Data Architecture',
      role: 'Literature Indexing & Bibliometrics',
      desc: 'Specialists in graph databases, OpenAlex metadata ingestion, and distributed scholarly search.',
    },
    {
      name: 'Researcher Workflow Experience',
      role: 'Citation Tools & AI Summarization',
      desc: 'Dedicated to designing distraction-free, high-speed tools that save researchers hours every week.',
    },
    {
      name: 'Scholarly Integrity & Ethics',
      role: 'Peer-Review Verification',
      desc: 'Ensuring that our indexing surfaces legitimate peer-reviewed journals, verified preprints, and open repositories.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <BookOpen className="w-4 h-4" />
          <span>Our Vision & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Democratizing Global Research for Every Scholar
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Noor Scholar was founded with a singular purpose: to break academic literature out of walled gardens and provide a transparent, lightning-fast alternative to legacy academic search engines.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-slate-50 border border-slate-200 rounded-3xl mb-16 text-center">
        {milestones.map((m, i) => (
          <div key={i}>
            <div className="text-3xl sm:text-4xl font-black text-blue-600">{m.value}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Why we built an alternative to Google Scholar */}
      <section className="mb-20 space-y-6">
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-100">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">The Problem with Legacy Search</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-4">
            Why Google Scholar Needs a Modern Alternative
          </h2>
          <div className="space-y-4 text-slate-700 leading-relaxed text-base">
            <p>
              Google Scholar launched in 2004 and revolutionized how students find papers. But over the last two decades, it has remained largely static: closed algorithms, lack of transparent citation graphs, frequent indexing of predatory journals, and an interface that lacks modern researcher tools like automated citation builders or structured research synthesis.
            </p>
            <p>
              Meanwhile, commercial databases like Elsevier Scopus and Web of Science charge universities tens of thousands of dollars annually, excluding independent researchers, students in developing nations, and public policy makers.
            </p>
            <p>
              <strong>Noor Scholar</strong> bridges this gap by marrying the sheer magnitude of <strong>OpenAlex</strong> (the world&apos;s foremost open bibliographical catalog) with a modern, fast, minimalist search interface.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Our 3 Core Commitments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">100% Open Access First</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We prioritize legal open-access versions of research papers, institutional preprints, and direct DOIs so you never hit an unexpected paywall.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Transparent Data & Citations</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No black-box ranking algorithms. We catalog citation networks openly, attributing authors, affiliations, and funding organizations truthfully.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Integrated Workflow Tools</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Search is just the start. We equip every researcher with free APA/MLA citation generators, paper summarizers, and paraphrasers to accelerate drafting.
            </p>
          </div>
        </div>
      </section>

      {/* Team & Governance */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Our Multidisciplinary Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((m, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-1">{m.name}</h3>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">{m.role}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact box */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl text-center space-y-4">
        <h3 className="text-2xl font-bold">Have Questions or Want to Partner?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          We collaborate with university libraries, open-access journals, and research foundations worldwide. Reach our team directly:
        </p>
        <div className="pt-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>{CONTACT_EMAIL}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
