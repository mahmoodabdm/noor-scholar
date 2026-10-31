import Link from 'next/link';

type Partner = '【entity-grammarly¦canonical_name=Grammarly】' | 'quillbot' | 'all';

const LINKS: Record<Partner, { label: string; href: string; desc: string }> = {
  【entity-grammarly¦canonical_name=Grammarly】: {
    label: '【entity-Grammarly¦canonical_name=Grammarly】',
    href: 'https://www.grammarly.com', // بدلها برابط الأفلييت مالك
    desc: 'Writing assistant for grammar, clarity and plagiarism detection in some plans.',
  },
  quillbot: {
    label: 'QuillBot',
    href: 'https://quillbot.com', // بدلها برابط الأفلييت مالك
    desc: 'Paraphrasing and grammar tools with plagiarism checker.',
  },
  all: {
    label: 'Writing Tools',
    href: 'https://www.grammarly.com',
    desc: 'Tools to improve academic writing.',
  },
};

export default function AffiliateBox({ partner = 'all' }: { partner?: Partner }) {
  const item = LINKS[partner];

  return (
    <div className="my-8 p-4 bg-slate-50 border border-slate-200 rounded-xl">
      <p className="text-xs text-slate-500 mb-2">
        Disclosure: We may earn a commission if you sign up through this link.
      </p>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-900">{item.label}</p>
          <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
        </div>
        <a
          href={item.href}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="shrink-0 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Visit {item.label}
        </a>
      </div>
    </div>
  );
}
