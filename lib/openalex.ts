
// lib/openalex.ts
// Shared OpenAlex helpers (works on the server; the Paper type is also imported by client components).

const OPENALEX = "https://api.openalex.org";
const MAILTO = process.env.OPENALEX_EMAIL || "abdmazn55@gmail.com";

const SELECT = [
  "id",
  "doi",
  "display_name",
  "publication_year",
  "publication_date",
  "cited_by_count",
  "fwci",
  "abstract_inverted_index",
  "authorships",
  "primary_location",
  "open_access",
  "primary_topic",
  "keywords",
].join(",");

export type Paper = {
  id: string;
  title: string;
  year: number | null;
  authors: string[];
  venue: string | null;
  citations: number;
  fwci: number | null;
  abstract: string;
  doi: string | null;
  url: string;
  oaUrl: string | null;
  isOA: boolean;
  field: string | null;
  subfield: string | null;
  tags: string[];
};

export type Category = { slug: string; label: string; fieldId: number | null };

export const CATEGORIES: Category[] = [
  { slug: "computer-science", label: "Computer Science", fieldId: 17 },
  { slug: "physics", label: "Physics", fieldId: 31 },
  { slug: "chemistry", label: "Chemistry", fieldId: 16 },
  { slug: "mathematics", label: "Mathematics", fieldId: 26 },
  { slug: "social-sciences", label: "Social Sciences", fieldId: 33 },
  { slug: "medicine", label: "Medicine", fieldId: 27 },
  { slug: "engineering", label: "Engineering", fieldId: 22 },
  { slug: "all", label: "All", fieldId: null },
];

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function abstractFromIndex(inv: Record<string, number[]> | null | undefined): string {
  if (!inv) return "";
  const words: string[] = [];
  for (const [word, positions] of Object.entries(inv)) {
    for (const p of positions) words[p] = word;
  }
  return stripTags(words.filter(Boolean).join(" "));
}

export function toHashtag(name: string): string {
  return "#" + name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
}

export function authorLine(p: Paper, max = 3): string {
  if (!p.authors.length) return "Unknown authors";
  const shown = p.authors.slice(0, max).join(", ");
  return p.authors.length > max ? `${shown} et al.` : shown;
}

export function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  if (lastStop > max * 0.6) return cut.slice(0, lastStop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + "…";
}

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 86400000);
  return d.toISOString().slice(0, 10);
}

function daysSinceEpoch(): number {
  return Math.floor(Date.now() / 86400000);
}

export function normalizeWork(w: any): Paper {
  const shortId = String(w.id || "").split("/").pop() || "";
  const authors: string[] = (w.authorships || []).map((a: any) => a?.author?.display_name).filter(Boolean);
  const topic = w.primary_topic || null;
  const keywordNames: string[] = (w.keywords || []).map((k: any) => k?.display_name).filter(Boolean);
  const tagPool = [...keywordNames.slice(0, 2), topic?.subfield?.display_name, topic?.field?.display_name].filter(Boolean) as string[];
  const seen = new Set<string>();
  const tags = tagPool.filter((t) => {
    const key = toHashtag(t);
    if (key.length < 3 || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 4);
  const doi: string | null = w.doi || null;
  const landing: string | null = w.primary_location?.landing_page_url || null;
  const oaUrl: string | null = w.open_access?.oa_url || null;
  return {
    id: shortId,
    title: stripTags(w.display_name || "Untitled"),
    year: w.publication_year ?? null,
    authors,
    venue: w.primary_location?.source?.display_name || null,
    citations: w.cited_by_count ?? 0,
    fwci: typeof w.fwci === "number" ? Math.round(w.fwci * 10) / 10 : null,
    abstract: abstractFromIndex(w.abstract_inverted_index),
    doi,
    url: doi || landing || oaUrl || `https://openalex.org/${shortId}`,
    oaUrl,
    isOA: Boolean(w.open_access?.is_oa),
    field: topic?.field?.display_name || null,
    subfield: topic?.subfield?.display_name || null,
    tags,
  };
}

async function oaFetch(path: string, params: Record<string, string>, revalidate: number) {
  const qs = new URLSearchParams({ ...params, mailto: MAILTO });
  const res = await fetch(`${OPENALEX}${path}?${qs.toString()}`, {
    headers: { Accept: "application/json" },
    next: { revalidate },
  });
  return res;
}

function fieldFilter(cat: Category): string {
  return cat.fieldId ? `,primary_topic.field.id:${cat.fieldId}` : "";
}

const BASE_FILTER = "has_abstract:true,type:article,language:en,is_retracted:false";

export async function getTrending(cat: Category, limit = 12): Promise<Paper[]> {
  try {
    const res = await oaFetch("/works", { filter: `${BASE_FILTER},from_publication_date:${isoDaysAgo(120)}${fieldFilter(cat)}`, sort: "cited_by_count:desc", "per-page": String(limit + 10), select: SELECT }, 3600);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map(normalizeWork).filter((p: Paper) => p.abstract.length >= 200).slice(0, limit);
  } catch { return []; }
}

export async function getSpotlight(cat: Category): Promise<Paper | null> {
  try {
    const res = await oaFetch("/works", { filter: `${BASE_FILTER},from_publication_date:${isoDaysAgo(365)}${fieldFilter(cat)}`, sort: "cited_by_count:desc", "per-page": "20", select: SELECT }, 3600);
    if (!res.ok) return null;
    const data = await res.json();
    const pool: Paper[] = (data.results || []).map(normalizeWork).filter((p: Paper) => p.abstract.length >= 300).slice(0, 10);
    if (!pool.length) return null;
    return pool[daysSinceEpoch() % pool.length];
  } catch { return null; }
}

export async function getHiddenGems(cat: Category, limit = 6): Promise<Paper[]> {
  try {
    const res = await oaFetch("/works", { filter: `${BASE_FILTER},is_oa:true,cited_by_count:<16,from_publication_date:${isoDaysAgo(1095)},to_publication_date:${isoDaysAgo(180)}${fieldFilter(cat)}`, sample: "60", seed: String(daysSinceEpoch()), "per-page": "60", select: SELECT }, 3600);
    if (!res.ok) return [];
    const data = await res.json();
    const papers: Paper[] = (data.results || []).map(normalizeWork).filter((p: Paper) => p.abstract.length >= 500);
    papers.sort((a, b) => b.citations - a.citations);
    return papers.slice(0, limit);
  } catch { return []; }
}

export async function resolvePaper(raw: string): Promise<Paper | null> {
  const q = raw.trim();
  if (!q) return null;
  const oaMatch = q.match(/^(?:https?:\/\/(?:www\.)?openalex\.org\/(?:works\/)?)?(W\d{4,})$/i);
  if (oaMatch) return fetchOne(`/works/${oaMatch[1].toUpperCase()}`);
  const arxivMatch = q.match(/^(?:arxiv:\s*|https?:\/\/(?:www\.)?arxiv\.org\/(?:abs|pdf)\/)?(\d{4}\.\d{4,5}|[a-z-]+(?:\.[a-z]{2})?\/\d{7})(?:v\d+)?(?:\.pdf)?$/i);
  if (arxivMatch) return fetchOne(`/works/https://doi.org/10.48550/arxiv.${arxivMatch[1].toLowerCase()}`);
  const doiMatch = q.match(/(10\.\d{4,9}\/[^\s"<>]+)/i);
  if (doiMatch) {
    const doi = doiMatch[1].replace(/[.,;)\]]+$/, "").replace(/[?#]/g, (c) => encodeURIComponent(c));
    return fetchOne(`/works/https://doi.org/${doi.toLowerCase()}`);
  }
  const res = await oaFetch("/works", { search: q, "per-page": "5", select: SELECT }, 3600);
  if (!res.ok) throw new Error(`OpenAlex ${res.status}`);
  const data = await res.json();
  const results: Paper[] = (data.results || []).map(normalizeWork);
  if (!results.length) return null;
  return results.find((p) => p.abstract.length > 0) || results[0];
}

async function fetchOne(path: string): Promise<Paper | null> {
  const res = await oaFetch(path, { select: SELECT }, 3600);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`OpenAlex ${res.status}`);
  return normalizeWork(await res.json());
}
