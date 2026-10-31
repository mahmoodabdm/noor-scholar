// app/search/page.tsx (server component)
import type { Metadata } from 'next';
import Link from 'next/link';
import SearchBox from '@/components/SearchBox';
import { searchWorks } from '@/lib/openalex';

export const metadata: Metadata = { robots: { index: false, follow: true } };

const stripTags = (s: string) => s.replace(/<[^>]*>/g, '');

export default async function SearchPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {
  const q = (searchParams.q ?? '').trim().slice(0, 200);
  const page = Number(searchParams.page) || 1;
  if (!q) return <SearchBox />;

  let data: any = null;
  let failed = false;
  try {
    data = await searchWorks(q, page);
  } catch {
    failed = true;
  }
  const works = data?.results ?? [];
  const total = data?.meta?.count ?? 0;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <SearchBox initial={q} />
      <h1 className="mt-6 text-slate-500">
        {failed ? 'Search is unavailable right now. Please retry.' : `${total.toLocaleString()} results for "${q}"`}
      </h1>
      {works.map((w: any) => (
        <article key={w.id} className="mt-5 p-6 border rounded-2xl">
          <h2 className="text-lg font-bold">{stripTags(w.title ?? w.display_name ?? 'Untitled')}</h2>
          <Link href={`/tools/citation-generator?id=${encodeURIComponent(w.id)}`}>Cite</Link>
        </article>
      ))}
    </main>
  );
}
