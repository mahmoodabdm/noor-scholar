// lib/openalex.ts - مثل MapleScholar - فلتر واحد بسيط + API Key
const OPENALEX = "https://api.openalex.org";
const MAILTO = process.env.OPENALEX_EMAIL || "abdmazn55@gmail.com";
const API_KEY = process.env.OPENALEX_API_KEY || "";
const SELECT = "id,display_name,publication_year,authorships,doi,cited_by_count,primary_location,open_access,abstract_inverted_index";
export type Paper = { id: string; title: string; year: number | null; authors: string[]; venue: string | null; citations: number; fwci: number | null; abstract: string; doi: string | null; url: string; oaUrl: string | null; isOA: boolean; field: string | null; subfield: string | null; tags: string[]; };
export type Category = { slug: string; label: string; fieldId: number | null; q: string };
export const CATEGORIES: Category[] = [
  { slug: "computer-science", label: "Computer Science", fieldId: 17, q: "computer science" },
  { slug: "physics", label: "Physics", fieldId: 31, q: "physics" },
  { slug: "chemistry", label: "Chemistry", fieldId: 16, q: "chemistry" },
  { slug: "mathematics", label: "Mathematics", fieldId: 26, q: "mathematics" },
  { slug: "social-sciences", label: "Social Sciences", fieldId: 33, q: "social sciences" },
  { slug: "medicine", label: "Medicine", fieldId: 27, q: "medicine" },
  { slug: "engineering", label: "Engineering", fieldId: 22, q: "engineering" },
  { slug: "all", label: "All", fieldId: null, q: "" },
];
function stripTags(s: string): string { return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }
function abstractFromIndex(inv: Record<string, number[]> | null | undefined): string {
  if (!inv) return "";
  const words: string[] = [];
  for (const [word, positions] of Object.entries(inv)) { for (const p of positions) words[p] = word; }
  return stripTags(words.filter(Boolean).join(" "));
}
export function toHashtag(name: string): string { return "#" + name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, ""); }
export function authorLine(p: Paper, max = 3): string {
  if (!p.authors.length) return "Unknown authors";
  const shown = p.authors.slice(0, max).join(", ");
  return p.authors.length > max ? `${shown} et al.` : shown;
}
export function clip(text: string, max: number): string {
  if (!text) return "No abstract available for this paper.";
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (lastStop > max * 0.6) return cut.slice(0, lastStop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + "…";
}
function isoDaysAgo(days: number): string { const d = new Date(Date.now() - days * 86400000); return d.toISOString().slice(0, 10); }
function daysSinceEpoch(): number { return Math.floor(Date.now() / 86400000); }
export function normalizeWork(w: any): Paper {
  const shortId = String(w.id || "").split("/").pop() || "";
  const authors: string[] = (w.authorships || []).map((a: any) => a?.author?.display_name).filter(Boolean);
  const topic = w.primary_topic || null;
  const doi: string | null = w.doi || null;
  const landing: string | null = w.primary_location?.landing_page_url || null;
  const oaUrl: string | null = w.open_access?.oa_url || null;
  return { id: shortId, title: stripTags(w.display_name || "Untitled"), year: w.publication_year ?? null, authors, venue: w.primary_location?.source?.display_name || null, citations: w.cited_by_count ?? 0, fwci: null, abstract: abstractFromIndex(w.abstract_inverted_index), doi, url: doi || landing || oaUrl || `https://openalex.org/${shortId}`, oaUrl, isOA: Boolean(w.open_access?.is_oa), field: topic?.field?.display_name || null, subfield: topic?.subfield?.display_name || null, tags: [] };
}
async function oaFetch(path: string, params: Record<string, string>) {
  const allParams: Record<string, string> = { ...params, mailto: MAILTO };
  if (API_KEY) allParams.api_key = API_KEY;
  const qs = new URLSearchParams(allParams);
  const res = await fetch(`${OPENALEX}${path}?${qs.toString()}`, { headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
  return res;
}
// مثل المنافس - بدون فلاتر معقدة، بس بحث بالكلمة + ترتيب
export async function getTrending(cat: Category, limit = 12): Promise<Paper[]> {
  try {
    const params: Record<string, string> = { sort: "cited_by_count:desc", "per-page": String(limit), select: SELECT, filter: "type:article" };
    if (cat.q) params.search = cat.q;
    const res = await oaFetch("/works", params);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map(normalizeWork).slice(0, limit);
  } catch { return []; }
}
export async function getSpotlight(cat: Category): Promise<Paper | null> {
  try {
    const params: Record<string, string> = { sort: "cited_by_count:desc", "per-page": "10", select: SELECT, filter: "type:article" };
    if (cat.q) params.search = cat.q;
    const res = await oaFetch("/works", params);
    if (!res.ok) return null;
    const data = await res.json();
    const pool = (data.results || []).map(normalizeWork);
    if (!pool.length) return null;
    return pool[daysSinceEpoch() % pool.length];
  } catch { return null; }
}
export async function getHiddenGems(cat: Category, limit = 6): Promise<Paper[]> {
  try {
    const params: Record<string, string> = { sort: "cited_by_count:asc", "per-page": String(limit), select: SELECT, filter: "type:article,is_oa:true" };
    if (cat.q) params.search = cat.q;
    const res = await oaFetch("/works", params);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map(normalizeWork).slice(0, limit);
  } catch { return []; }
}
export async function resolvePaper(raw: string): Promise<Paper | null> {
  const q = raw.trim(); if (!q) return null;
  const oaMatch = q.match(/^(?:https?:\/\/(?:www\.)?openalex\.org\/(?:works\/)?)?(W\d{4,})$/i);
  if (oaMatch) return fetchOne(`/works/${oaMatch[1].toUpperCase()}`);
  const arxivMatch = q.match(/^(?:arxiv:\s*|https?:\/\/(?:www\.)?arxiv\.org\/(?:abs|pdf)\/)?(\d{4}\.\d{4,5}|[a-z-]+(?:\.[a-z]{2})?\/\d{7})(?:v\d+)?(?:\.pdf)?$/i);
  if (arxivMatch) return fetchOne(`/works/https://doi.org/10.48550/arxiv.${arxivMatch[1].toLowerCase()}`);
  const doiMatch = q.match(/(10\.\d{4,9}\/[^\s"<>]+)/i);
  if (doiMatch) { const doi = doiMatch[1].replace(/[.,;)\]]+$/, "").replace(/[?#]/g, (c) => encodeURIComponent(c)); return fetchOne(`/works/https://doi.org/${doi.toLowerCase()}`); }
  const res = await oaFetch("/works", { search: q, "per-page": "5", select: SELECT });
  if (!res.ok) throw new Error(`OpenAlex ${res.status}`);
  const data = await res.json();
  const results: Paper[] = (data.results || []).map(normalizeWork);
  if (!results.length) return null;
  return results.find((p) => p.abstract.length > 0) || results[0];
}
async function fetchOne(path: string): Promise<Paper | null> {
  const res = await oaFetch(path, { select: SELECT });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`OpenAlex ${res.status}`);
  return normalizeWork(await res.json());
}
export function stripTagsExport(s: string): string { return s.replace(/<[^>]+>/g, ""); }
export { stripTags };
export function shortId(id: string) { return id.replace("https://openalex.org/", ""); }
export function getAuthorNames(work: any): string[] { return (work.authorships ?? []).map((a: any) => a?.author?.display_name || a?.raw_author_name).filter(Boolean); }
export async function searchWorks(q: string, page = 1) {
  const params: Record<string, string> = { search: q, "per-page": "10", page: String(Math.min(Math.max(page, 1), 1000)), select: "id,display_name,publication_year,authorships,doi,cited_by_count,primary_location,open_access,abstract_inverted_index", mailto: MAILTO };
  if (API_KEY) params.api_key = API_KEY;
  const qs = new URLSearchParams(params);
  const res = await fetch(`${OPENALEX}/works?${qs.toString()}`, { headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`OpenAlex responded ${res.status}`);
  return res.json();
}
