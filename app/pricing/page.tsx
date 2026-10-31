import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Zap, HelpCircle, Shield, Award, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing Plans - Free $0, Pro Coming Soon | Noor Scholar',
  description:
    'Choose the right plan for your academic research. Free $0 for all students, Pro and Team coming soon.',
  keywords: [
    'Noor Scholar pricing',
    'academic search pricing',
    'research paper summarizer',
    'university lab license',
  ],
  openGraph: {
    title: 'Pricing Plans - Free $0, Pro Coming Soon | Noor Scholar',
    description: 'Explore Noor Scholar plans with transparent pricing.',
  },
};

function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-800 text- font-bold rounded-full uppercase tracking-wider border border-amber-200">
      Coming Soon
    </span>
  );
}

export default function PricingPage() {
  const plans = [
    {
      name: 'Scholar Free',
      price: '$0',
      period: 'forever free',
      desc: 'Complete literature search and essential citation tools for students and casual researchers.',
      badge: 'Basic Tier',
      highlight: false,
      btnText: 'Start Searching Free',
      btnHref: '/',
      comingSoon: false,
      features: [
        'Search across 250M+ scholarly papers',
        'Instant APA 7th, MLA 9th, Chicago citations',
        'Direct links to DOIs and open-access PDFs',
        'Basic keyword & author filtering',
        'Community support',
      ],
    },
    {
      name: 'Scholar Pro',
      price: '$19',
      period: 'per month',
      desc: 'Power tools for PhD candidates, researchers, and professors who need to synthesize literature quickly.',
      badge: 'Most Popular',
      highlight: true,
      btnText: 'Coming Soon - $19/mo',
      btnHref: '#',
      comingSoon: true,
      features: [
        'Everything in Scholar Free',
        'Unlimited AI Research Paper Summaries',
        'Unlimited Academic Paraphraser',
        'Bulk BibTeX & EndNote reference export',
        'Literature citation graph visualization',
        'Priority 24/7 researcher email support',
        'Ad-free clean academic interface',
      ],
    },
    {
      name: 'Lab & Team',
      price: '$49',
      period: 'per month',
      desc: 'For university departments, research laboratories, and co-author teams collaborating on grants.',
      badge: 'Collaboration',
      highlight: false,
      btnText: 'Coming Soon - $49/mo',
      btnHref: '#',
      comingSoon: true,
      features: [
        'Up to 10 user seats included',
        'Shared lab reference libraries & reading lists',
        'Dedicated high-throughput Literature API key',
        'Institutional IP authentication support',
        'Dedicated account manager',
        'Custom invoice & university purchase order billing',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Simple, Honest, Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Invest in Your Academic Productivity
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          No hidden fees. Free tier forever. Pro plans coming soon with 14-day money-back guarantee.
        </p>
      </div>

      {/* Pricing Cards */}
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
              {p.highlight && (
                <div className="inline-block px-3 py-1 bg-blue-600 text-white text- font-bold rounded-full uppercase tracking-wider mb-4">
                  {p.badge}
                </div>
              )}
              {!p.highlight && (
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  {p.badge}
                </div>
              )}

              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2 flex-wrap">
                {p.name} {p.comingSoon && <ComingSoonBadge />}
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
                  className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors block"
                >
                  {p.btnText}
                </Link>
              )}
              <div className="text- text-center text-slate-400 mt-2.5">
                {p.comingSoon ? 'Launching soon - join waitlist' : 'No credit card needed'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison Matrix */}
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
                <th className="p-4 text-center bg-blue-50/50 text-blue-900">Scholar Pro (Coming Soon)</th>
                <th className="p-4 text-center">Lab Team (Coming Soon)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-4 font-semibold text-slate-900">250M+ Open Literature Search</td>
                <td className="p-4 text-center">Unlimited</td>
                <td className="p-4 text-center bg-blue-50/30 font-semibold text-blue-700">Unlimited</td>
                <td className="p-4 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Citation Generator (APA/MLA/Chicago)</td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                <td className="p-4 text-center bg-blue-50/30"><Check className="w-4 h-4 text-blue-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">AI Paper Summarizer</td>
                <td className="p-4 text-center">3 / day</td>
                <td className="p-4 text-center bg-blue-50/30 font-semibold text-blue-700">Unlimited</td>
                <td className="p-4 text-center font-semibold">Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Academic Paraphraser</td>
                <td className="p-4 text-center">Basic</td>
                <td className="p-4 text-center bg-blue-50/30 font-semibold text-blue-700">Advanced 7 Modes</td>
                <td className="p-4 text-center font-semibold">Advanced 7 Modes</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Bulk Reference Export (BibTeX / EndNote)</td>
                <td className="p-4 text-center text-slate-300">—</td>
                <td className="p-4 text-center bg-blue-50/30"><Check className="w-4 h-4 text-blue-600 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-900">Seats Included</td>
                <td className="p-4 text-center">1</td>
                <td className="p-4 text-center bg-blue-50/30">1</td>
                <td className="p-4 text-center font-bold text-slate-900">10 Seats</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Security & Guarantee Box */}
      <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
        <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
          <Shield className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">14-Day No-Questions-Asked Money Back Guarantee</h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            If Scholar Pro does not save you at least 5 hours in your research every month, simply email our team at <strong>abdmazn55@gmail.com</strong> within 14 days and we will refund your payment immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
