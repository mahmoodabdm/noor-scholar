const SELECT = 'id,title,display_name,publication_year,authorships,doi,cited_by_count,primary_location,open_access';

export async function searchWorks(q: string, page = 1) {
  const params = new URLSearchParams({
    search: q,
    'per-page': '10',
    page: String(Math.min(Math.max(page, 1), 1000)),
    select: SELECT,
  });
  if (process.env.OPENALEX_MAILTO) params.set('mailto', process.env.OPENALEX_MAILTO);
  const res = await fetch(`https://api.openalex.org/works?${params}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`OpenAlex responded ${res.status}`);
  return res.json();
}

export const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');
export const shortId = (id: string) => id.replace('https://openalex.org/', '');
export function getAuthorNames(work: any): string[] {
  return (work.authorships ?? [])
    .map((a: any) => a?.author?.display_name || a?.raw_author_name)
    .filter(Boolean);
}
