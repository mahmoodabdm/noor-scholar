import type { Metadata } from 'next';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import SaveButton from '@/components/SaveButton';
import { searchWorks, stripTags, shortId, getAuthorNames } from '@/lib/openalex';

export const metadata: Metadata = { robots: { index: false, follow: true } };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q ?? '').trim().slice(0, 200);
  const page = Math.max(Number(params.page) || 1, 1);

  if (!q) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <SearchBox />
        <p className="mt-6 text-sm text-slate-500">Enter a search term to find papers.</p>
      </main>
    );
  }

  let data: any = null;
  let failed = false;
  let errorMsg = '';
  try {
    data = await searchWorks(q, page);
  } catch (e: any) {
    console.error("SEARCH FAILED:", e);
    errorMsg = e?.message || 'Unknown error';
    failed = true;
  }

  const works: any[] = data?.results ?? [];
  const total: number = data?.meta?.count ?? 0;

  // Top 3 most cited in this result set - Step 3: Smart results, not just list
  const top3 = [...works].sort((a, b) => (b.cited_by_count || 0) - (a.cited_by_count || 0)).slice(0, 3);

  return (
    <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
      <SearchBox initial={q} />

      <h1 className="mt-6 text-sm text-slate-500">
        {failed
          ? `Search is unavailable right now. Error: ${errorMsg} - Please try again.`
          : `${total.toLocaleString()} results for “${q}”`}
      </h1>

      {!failed && works.length === 0 && (
        <p className="mt-10 text-center text-slate-500">
          No matching papers found. Try broader keywords or check your spelling.
        </p>
      )}

      {/* Top 3 Most Cited - helps student pick best papers instantly */}
      {!failed && page === 1 && top3.length > 0 && (
        <section className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-200">
          <h2 className="text-sm font-black text-amber-900 uppercase tracking-wider mb-3">⭐ Top 3 Most Cited for “{q}” — Start Here</h2>
          <div className="space-y-3">
            {top3.map((w, i) => {
              const title = stripTags(w.title ?? w.display_name ?? 'Untitled');
              const link = w.open_access?.oa_url || w.doi || w.primary_location?.landing_page_url;
              return (
                <div key={w.id} className="flex gap-3 bg-white rounded-xl border border-amber-100 p-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-amber-400 text-slate-900 text-sm font-black flex items-center justify-center">{i + 1}</span>
                  <div>
                    {link ? <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-blue-700 hover:underline leading-snug block">{title}</a> : <span className="text-sm font-bold text-slate-900 leading-snug block">{title}</span>}
                    <span className="text-xs text-slate-500">{w.publication_year} • {w.cited_by_count?.toLocaleString() ?? 0} citations {w.open_access?.is_oa ? '• Free to read' : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-amber-800">These are the most influential papers on this topic. Read these first.</p>
        </section>
      )}

      <div className="mt-4 space-y-5">
        {works.map((w) => {
          const title = stripTags(w.title ?? w.display_name ?? 'Untitled');
          const names = getAuthorNames(w);
          const shown = names.slice(0, 3).join(', ');
          const extra = names.length > 3 ? ` +${names.length - 3} more` : '';
          const link =
            w.open_access?.oa_url || w.doi || w.primary_location?.landing_page_url;
          const isOA = w.open_access?.is_oa;

          return (
            <article key={w.id} className="p-6 rounded-2xl border border-slate-200 bg-white">
              <h2 className="text-lg font-bold text-blue-700 leading-snug">
                {link ? (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {title}
                  </a>
                ) : (
                  title
                )}
              </h2>

              <p className="mt-3 text-sm text-slate-700">
                {shown || 'Unknown author'}
                {extra}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 bg-slate-100 rounded-md font-semibold">
                  {w.publication_year ?? 'Year n/a'}
                </span>
                {w.cited_by_count > 0 && (
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                    Citations: {w.cited_by_count}
                  </span>
                )}
                {isOA && (
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-md font-bold">
                    ✓ Free to Read
                  </span>
                )}
                {w.doi && (
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md font-mono">
                    DOI: {w.doi.replace('https://doi.org/', '')}
                  </span>
                )}
                <div className="ml-auto flex items-center gap-2">
                  <SaveButton
                    paper={{
                      id: shortId(w.id),
                      title,
                      authors: shown || 'Unknown author',
                      year: w.publication_year ?? 'Year n/a',
                      doi: w.doi,
                      url: link,
                    }}
                  />
                  <Link
                    href={`/tools/summarizer?id=${encodeURIComponent(shortId(w.id))}`}
                    className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md font-medium"
                  >
                    Summarize
                  </Link>
                  <Link
                    href={`/tools/citation-generator?id=${encodeURIComponent(shortId(w.id))}`}
                    className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md font-medium"
                  >
                    Cite
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <nav className="mt-8 flex gap-4 text-sm">
        {page > 1 && (
          <Link href={`/search?q=${encodeURIComponent(q)}&page=${page - 1}`} className="text-blue-600 hover:underline">
            ← Previous
          </Link>
        )}
        {works.length === 10 && (
          <Link href={`/search?q=${encodeURIComponent(q)}&page=${page + 1}`} className="text-blue-600 hover:underline">
            Next →
          </Link>
        )}
      </nav>
    </main>
  );
}
