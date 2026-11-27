"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Quote, ExternalLink, Bookmark } from "lucide-react";

type Work = {
  id: string;
  display_name: string;
  publication_year: number;
  cited_by_count: number;
  doi?: string;
  primary_location?: { landing_page_url?: string };
  authorships?: { author: { display_name: string } }[];
  open_access?: { oa_url?: string };
};

export default function Trending2026() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://api.openalex.org/works?filter=from_publication_date:2026-01-01,to_publication_date:2026-12-31&sort=cited_by_count:desc&per-page=6"
        );
        const data = await res.json();
        setWorks(data.results || []);
      } catch {}
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">Loading top papers of 2026...</div>
      </section>
    );
  }

  if (works.length === 0) return null;

  const left = works.slice(0, 3);
  const right = works.slice(3, 6);

  const Card = ({ w, color }: { w: Work; color: string }) => {
    const authors = (w.authorships || []).slice(0, 2).map(a => a.author.display_name).join(", ");
    const link = w.open_access?.oa_url || w.doi || w.primary_location?.landing_page_url || "#";
    return (
      <div className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
          <TrendingUp className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 leading-snug line-clamp-3">
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:underline">
            {w.display_name}
          </a>
        </h3>
        <p className="mt-2 text-xs text-slate-500">{authors || "Unknown author"} • 2026</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md">
            Citations: {w.cited_by_count}
          </span>
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            Open paper <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-7 h-7 text-blue-600" />
            Most Cited Papers of 2026
          </h2>
        </div>
        <p className="text-slate-600 text-sm mb-8">
          Live from OpenAlex. Most cited works published in 2026, updated automatically. Click any paper to open it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top 1 - 3</p>
            {left.map((w, i) => (
              <Card key={w.id} w={w} color={i === 0 ? "bg-amber-50 text-amber-600" : i === 1 ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"} />
            ))}
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top 4 - 6</p>
            {right.map((w, i) => (
              <Card key={w.id} w={w} color={i === 0 ? "bg-violet-50 text-violet-600" : i === 1 ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"} />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/search?q=2026" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full">
            <Quote className="w-4 h-4" />
            Search more 2026 papers
          </Link>
        </div>
      </div>
    </section>
  );
}
