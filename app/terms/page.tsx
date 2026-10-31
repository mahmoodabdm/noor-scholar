import type { Metadata } from 'next';
import { Scale, FileCheck, AlertTriangle, BookCheck, ShieldAlert, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Full Terms of Service governing the use of Noor Scholar academic search engine, citation generators, and research workflow tools.',
  keywords: ['terms of service', 'academic fair use', 'user agreement', 'Noor Scholar terms'],
  openGraph: {
    title: 'Terms of Service | Noor Scholar',
    description: 'Read the terms and conditions governing the Noor Scholar academic search platform.',
  },
};

export default function TermsPage() {
  const CONTACT_EMAIL = 'abdmazn55@gmail.com';
  const LAST_UPDATED = 'October 22, 2026';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Last Revised: <strong>{LAST_UPDATED}</strong> | Legal Inquiries: <strong>{CONTACT_EMAIL}</strong>
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Noor Scholar (&ldquo;the Platform&rdquo;, accessible at https://noorscholar.com) or any associated APIs, tools, or mobile interfaces, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;) and our Privacy Policy. If you do not agree to all terms, you must discontinue access immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Description of Academic Service</h2>
          <p>
            Noor Scholar is an open-access bibliographic discovery index. We aggregate scholarly metadata—including paper titles, author rosters, institutional affiliations, abstracts, DOI links, and citation networks—sourced primarily from the OpenAlex dataset and open academic repositories.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>No Paywalled PDF Hosting:</strong> Noor Scholar acts as an indexing index and pointer. We do not host copyrighted full-text manuscripts behind private paywalls; rather, we provide direct links to the official DOI, publisher landing page, or legal green/gold open-access repository.
            </li>
            <li>
              <strong>Fair Academic Use:</strong> Citation metrics, author profiles, and bibliographic citations are provided under international fair use doctrines and open science licenses.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Permitted and Prohibited Conduct</h2>
          <p>You agree to use Noor Scholar solely for legitimate educational, academic, and research purposes. You agree NOT to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Deploy automated scrapers, spiders, or bots that impose unreasonable computational loads on our servers.</li>
            <li>Reverse engineer or misrepresent academic papers, author affiliations, or citation counts.</li>
            <li>Use the tools (Summarizer, Paraphraser) to commit academic dishonesty, plagiarism, or breach university honor codes.</li>
            <li>Interfere with security mechanisms, rate limits, or network integrity.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Intellectual Property Rights</h2>
          <p>
            All trademarks, logos, visual designs, UI component libraries, and proprietary software code comprising Noor Scholar are the property of Noor Scholar. The titles, abstracts, and metadata of academic publications belong to their respective authors and publishers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Subscription & Billing</h2>
          <p>
            While our core search engine and basic research tools are free ($0 forever), advanced Pro and Lab plans are coming soon.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Billing Cycle:</strong> When launched, subscriptions will be billed on a recurring monthly or annual basis as selected during checkout.
            </li>
            <li>
              <strong>Cancellations:</strong> You will be able to cancel your subscription at any time via your billing portal. Cancellation takes effect at the end of the current billing cycle.
            </li>
            <li>
              <strong>Refunds:</strong> We will offer a 14-day money-back guarantee for first-time Pro subscriptions. To request a refund, email <strong>{CONTACT_EMAIL}</strong>.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">6. Disclaimer of Warranties</h2>
          <p>
            Noor Scholar is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. We do not warrant that search results will be error-free, uninterrupted, or that all citations generated are universally compliant with every institutional variation of academic style guides.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Noor Scholar and its operators shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from the use of or inability to use our services, including academic grading decisions or peer-review outcomes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">8. Governing Law & Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">9. Contact and Legal Notices</h2>
          <p>For inquiries, copyright notices, or DMCA communications, contact our legal team at:</p>
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="font-bold text-slate-900">Noor Scholar Legal Department</div>
            <div className="text-blue-600 font-semibold text-sm mt-1">
              Email:{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
