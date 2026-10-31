'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBox({
  initial = '',
  variant = 'compact',
}: {
  initial?: string;
  variant?: 'hero' | 'compact';
}) {
  const router = useRouter();
  const [q, setQ] = useState(initial);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  if (variant === 'hero') {
    return (
      <form role="search" onSubmit={onSubmit} className="relative w-full max-w-3xl mx-auto mb-6">
        <label htmlFor="search-input" className="sr-only">Search scholarly works</label>
        <div className="relative flex items-center">
          <input
            id="search-input"
            type="search"
            value={q}
            maxLength={200}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, author, DOI, or keywords..."
            className="w-full h-16 pr-32 pl-14 text-base sm:text-lg bg-white border-2 border-slate-300 rounded-full shadow-md hover:border-blue-400 focus:border-blue-600 focus:shadow-xl focus:outline-none transition-all"
          />
          <Search className="absolute left-5 w-6 h-6 text-slate-400 pointer-events-none" />
          {q && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQ('')}
              className="absolute right-28 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form role="search" onSubmit={onSubmit} className="w-full max-w-2xl relative flex items-center">
      <label htmlFor="search-input" className="sr-only">Search scholarly works</label>
      <input
        id="search-input"
        type="search"
        value={q}
        maxLength={200}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search papers..."
        className="w-full h-12 pl-5 pr-28 text-sm bg-white border border-slate-300 rounded-full focus:border-blue-600 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute right-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full transition-colors"
      >
        Search
      </button>
    </form>
  );
}
