import React from 'react';
import Link from 'next/link';
import { BookOpen, Mail, Database, Clock } from 'lucide-react';

export default function Footer() {
  const CONTACT_EMAIL = 'abdmazn55@gmail.com';

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Top Banner with Contact */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">Questions or feedback?</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" /> Email replies in 2-3 days
            </span>
            <span className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-blue-400" /> Data from OpenAlex
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Noor Scholar
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              An independent project by one founder, built on OpenAlex. Search scholarly works
              and generate APA, MLA, and Chicago citations for free. Not affiliated with
              OpenAlex or Google Scholar.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              Contact:{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-blue-400 underline hover:text-blue-300 font-medium"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Core Platform */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Site
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Academic Search
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Tools
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/tools/citation-generator" className="hover:text-white transition-colors">
                  Citation Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/summarizer" className="hover:text-white transition-colors">
                  Paper Summarizer
                </Link>
              </li>
              <li>
                <Link href="/tools/paraphraser" className="hover:text-white transition-colors">
                  Academic Paraphraser
                </Link>
              </li>
              <li>
                <Link href="/tools/plagiarism-checker" className="hover:text-white transition-colors">
                  Plagiarism Checker
                </Link>
              </li>
              <li>
                <Link href="/tools/translator" className="hover:text-white transition-colors">
                  Academic Translator
                </Link>
              </li>
            </ul>
          </div>

          {/* Blog & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Guides & Legal
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/blog/best-google-scholar-alternatives-2026" className="hover:text-white transition-colors">
                  Google Scholar Alternatives
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-cite-research-paper-apa" className="hover:text-white transition-colors">
                  How to Cite in APA 7th
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Noor Scholar. Scholarly data from OpenAlex.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms of Service
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-slate-300">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
