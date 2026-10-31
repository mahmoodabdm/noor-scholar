export const stripTags = (s: string) => s.replace(/<[^>]+>/g, '');

export const shortId = (id: string) => id.replace('https://openalex.org/', '');

export function getAuthorNames(work: any): string[] {
  return (work.authorships ?? [])
    .map((a: any) => a?.author?.display_name || a?.raw_author_name)
    .filter(Boolean);
}
