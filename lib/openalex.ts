const SELECT = 'id,title,display_name,publication_year,authorships,doi,cited_by_count,primary_location,open_access';

export async function searchWorks(q: string, page = 1) {
  const params = new URLSearchParams({
    search: q,
    'per-page': '10',
    page: String(Math.min(Math.max(page, 1), 1000)),
    select: SELECT,
    // اذا ما لكيت المتغير بـ Vercel، استخدم الايميل مباشرة
    mailto: process.env.OPENALEX_MAILTO || 'abdmazn55@gmail.com',
  });

  const url = `https://api.openalex.org/works?${params}`;
  console.log("Fetching:", url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NoorScholar/1.0 (mailto:abdmazn55@gmail.com)'
      },
      // لا تخزن الفشل، كل بحث جديد
      cache: 'no-store',
      next: { revalidate: 0 },
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("OpenAlex Error:", res.status, text.slice(0, 500));
      throw new Error(`OpenAlex responded ${res.status}`);
    }
    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}

export const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');
export const shortId = (id: string) => id.replace('https://openalex.org/', '');
export function getAuthorNames(work: any): string[] {
  return (work.authorships ?? [])
    .map((a: any) => a?.author?.display_name || a?.raw_author_name)
    .filter(Boolean);
}
