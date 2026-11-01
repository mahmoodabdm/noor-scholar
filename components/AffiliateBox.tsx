import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AffiliateBoxProps {
  partner?: '【entity-grammarly¦canonical_name=Grammarly】' | 'quillbot' | 'all';
  className?: string;
}

export default function AffiliateBox({ partner = 'all', className = '' }: AffiliateBoxProps) {
  const partners = [
    {
      name: '【entity-Grammarly¦canonical_name=Grammarly】 for Researchers',
      badge: 'Academic Writing Assistant',
      desc: 'Fix tone, grammar, and clarity directly in your browser or Word doc. Plagiarism detection availability depends on your plan.',
      cta: 'Visit 【entity-Grammarly¦canonical_name=Grammarly】',
      url: 'https://www.grammarly.com',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
    {
      name: 'QuillBot',
      badge: 'Paraphraser & Co-Writer',
      desc: 'Rewrite paragraphs with different modes. Free-tier limits change, so check the vendor site.',
      cta: 'Visit QuillBot',
      url: 'https://quillbot.com',
      btnColor: 'bg-teal-600 hover:bg-teal-700 text-white',
    },
  ];

  const selected = partner === 'all' ? partners : partners.filter((p) => p.name.toLowerCase().includes(partner));

  return (
    <div className={`my-8 p-5 bg-white rounded-2xl border border-slate-200 ${className}`}>
      <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-900 leading-relaxed">
          <strong>Disclosure:</strong> Some links on this page are affiliate links. If you sign up or buy through them, we may earn a commission at no extra cost to you. Features and pricing change, so check each vendor site for current details.
        </p>
      </div>

      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
        Recommended Academic Research Tools
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selected.map((item, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text- font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 mb-2">
                {item.badge}
              </span>
              <h5 className="font-bold text-slate-900 text-sm">{item.name}</h5>
              <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">{item.desc}</p>
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-colors ${item.btnColor}`}
            >
              <span>{item.cta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
      <p className="mt-3 text- text-slate-400">Noor Scholar is not affiliated with Grammarly or QuillBot.</p>
    </div>
  );
}
