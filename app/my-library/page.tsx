"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Trash2, ExternalLink, Search } from "lucide-react";

type SavedPaper = {
  id: string;
  title: string;
  authors: string;
  year: number | string;
  doi?: string;
  url?: string;
};

const KEY = "noor-library";

export default function MyLibraryPage() {
  const [papers, setPapers] = useState<SavedPaper[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const list = raw ? JSON.parse(raw) : [];
      setPapers(Array.isArray(list) ? list : []);
    } catch {
      setPapers([]);
    }
    setLoaded(true);
  }, []);

  function removeOne(id: string) {
    const next = papers.filter((p) => p.id !== id);
    setPapers(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("noor-library-changed"));
  }

  function clearAll() {
    setPapers([]);
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("noor-library-changed"));
  }

  if (!loaded) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-sm text-slate-500">Loading your library...</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bookmark className="w-7 h-7 text-blue-600" />
            My Library
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {papers.length === 0
              ? "No saved papers yet."
              : `${papers.length} saved paper${papers.length === 1 ? "" : "s"} in your browser. No account needed.`}
          </p>
        </div>
        {papers.length > 0 && (
          <button
            onClick={clearAll}
            className="px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg"
          >
            Clear all
          </button>
        )}
      </div>

      {papers.length === 0 ? (
        <div className="mt-10 p-8 rounded-2xl border border-slate-200 bg-white text-center">
          <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h2 className="font-bold text-slate-900">Your library is empty</h2>
          <p className="mt-1 text-sm text-slate-600">
            Search for a paper and click <span className="font-semibold">Save</span> to keep it here.
          </p>
          <Link
            href="/#search"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full"
          >
            <Search className="w-4 h-4" />
            Search papers
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {papers.map((p) => (
            <article key={p.id} className="p-5 rounded-2xl border border-slate-200 bg-white">
              <h2 className="font-bold text-slate-900 leading-snug">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:underline">
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{p.authors}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-slate-100 rounded-md font-semibold">{p.year}</span>
                {p.doi && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md font-mono">
                    DOI: {p.doi.replace("https://doi.org/", "")}
                  </span>
                )}
                <div className="ml-auto flex items-center gap-2">
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md font-medium flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </a>
                  )}
                  <Link
                    href={`/tools/citation-generator?id=${encodeURIComponent(p.id)}`}
                    className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md font-medium"
                  >
                    Cite
                  </Link>
                  <button
                    onClick={() => removeOne(p.id)}
                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md font-medium flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
