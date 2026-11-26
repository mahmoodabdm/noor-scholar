import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Zap, HelpCircle, Shield, Award, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing - Free $0, Paid Plans Planned | Noor Scholar',
  description:
    'Noor Scholar is free today. Paid plans are planned but not yet available, with no prices yet.',
  keywords: [
    'Noor Scholar pricing',
    'academic search pricing',
    'free paper summarizer',
  ],
  openGraph: {
    title: 'Pricing - Free $0, Paid Plans Planned | Noor Scholar',
    description: 'Search and citations are free. Paid plans are planned, no prices yet.',
  },
};

function PlannedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider border border-amber-200">
      Planned
    </span>
  );
}

export default function PricingPage() {
  const plans = [
    {
      name: 'Scholar Free',
      price: '$0',
      period: 'forever free',
      desc: 'Literature search, citation tools, and paper summarizer for students and researchers.',
      badge: 'Available now',
      highlight: false,
      btnText: 'Start Searching Free',
      btnHref: '/',
      comingSoon: false,
      features: [
        'Search across 250M+ scholarly papers',
        'Instant APA 7th, MLA 9th, Chicago citations',
        'Direct links to DOIs and open-access PDFs',
        'Paper Summarizer (extractive, from abstract)',
        'Basic keyword & author filtering',
      ],
    },
    {
      name: 'Scholar Pro',
      price: 'Planned',
      period: 'no price yet',
      desc: 'Planned for active researchers. Features and price are not decided yet.',
      badge: 'Planned',
      highlight: false,
      btnText: 'Not available yet',
      btnHref: '#',
      comingSoon: true,
      features: [
        'Everything in Scholar Free',
        'Bulk BibTeX export (planned)',
        'Saved searches (planned)',
      ],
    },
    {
      name: 'Lab & Team',
      price: 'Planned',
      period: 'no price yet',
      desc: 'Planned for research groups. Features and price are not decided yet.',
      badge: 'Planned',
      highlight: false,
      btnText: 'Not available yet',
      btnHref: '#',
      comingSoon: true,
      features: [
        'Shared reading lists (planned)',
        'Team seats (planned)',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Simple, Honest, Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Free Today. Paid Plans Planned.
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Search, citations, and summarizer are free. Paid plans are planned but not yet available, and no prices have been set.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto items-stretch">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all ${
              p.highlight
                ? 'bg-white border-2 border-blue-600 shadow-xl relative scale-102 lg:-translate-y-2'
                : 'bg-white border border-slate-200 shadow-xs hover:border-slate-300'
            }`}
          >
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                {p.badge}
              </div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 flex-wrap">
                {p.name} {p.comingSoon && <PlannedBadge />}
              </h2>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-5xl font-black text-slate-900">{p.price}</span>
                <span className="text-sm font-medium text-slate-500">/ {p.period}</span>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">{p.desc}</p>
              <div className="border-t border-slate-100 pt-6 mb-8">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Included Features:
                </div>
                <ul className="space-y-3">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.highlight ? 'text-blue-600' : 'text-emerald-600'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {p.comingSoon ? (
                <button
                  disabled
                  className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-sm bg-slate-100 text-slate-400 cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200"
                >
                  <span>{p.btnText}</span>
                </button>
              ) : (
                <Link
                  href={p.btnHref}
                  className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors block"
                >
                  {p.btnText}
                </Link>
              )}
              <div className="text-xs text-center text-slate-400 mt-2.5">
                {p.comingSoon ? 'Planned - no price yet' : 'No credit card needed'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="mb-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Detailed Feature Comparison
        </h2>
        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-4">Feature</th>
                <th className="p-4 text-center">Scholar Free ($0)</th>
                <th className="p-4 text-center bg-blue-50/50 text-blue-900">Scholar Pro (Planned)</th>
                <th className="p-4 text-center">Lab Team (Planned)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-4 font-semibold text-slate-900">250M+ Open Literature Search</td>
                <td className="p-4 text-center">Unlimited</td>
                <td className="p-4 text-center bg-blue-50/30">Planned</td>
                <td className="p-4 text-center">Planned</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Citation Generator (APA/MLA/Chicago)</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center bg-blue-50/30"><Check className="w-4 h-4 text-blue-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Paper Summarizer (extractive)</td>
                <td className="p-4 text-center">Available</td>
                <td className="p-4 text-center bg-blue-50/30">Available</td>
                <td className="p-4 text-center">Available</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Bulk Reference Export (BibTeX)</td>
                <td className="p-4 text-center text-slate-300">—</td>
                <td className="p-4 text-center bg-blue-50/30">Planned</td>
                <td className="p-4 text-center">Planned</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">No payment, no guarantee needed</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Everything available today is free. There are no payments to refund. If you have questions, contact us at <strong>abdmazn55@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
