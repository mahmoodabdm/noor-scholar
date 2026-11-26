"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

type Mode = "find" | "paste";

type LookupInput =
  | { kind: "doi"; doi: string }
  | { kind: "openalex"; id: string }
  | { kind: "title"; title: string };

interface OpenAlexWork {
  id: string;
  doi?: string | null;
  title?: string | null;
  display_name?: string | null;
  publication_year?: number | null;
  cited_by_count?: number;
  authorships?: { author?: { display_name?: string | null } | null }[];
  primary_location?: { source?: { display_name?: string | null } | null } | null;
  locations?: { source?: { display_name?: string | null } | null }[];
  abstract_inverted_index?: Record<string, number[]> | null;
}

interface PaperMeta {
  title: string;
  authors: string;
  year: number | null;
  journal: string | null;
  cited: number;
  doiUrl: string | null;
  shortId: string;
  matchNote: string | null;
}

interface Summary {
  researchQuestion: string[];
  method: string[];
  findings: string[];
  keySentences: string[];
  abstract: string;
}

interface ResultState {
  meta: PaperMeta | null;
  summary: Summary;
}

const OPENALEX_API = "https://api.openalex.org";
const CONTACT_EMAIL = "abdmazn55@gmail.com";
const REQUEST_TIMEOUT_MS = 15000;
const MIN_PASTE_CHARS = 100;
const MAX_PASTE_CHARS = 20000;

const MIN_SENTENCE_CHARS = 15;
const MIN_KEY_CHARS = 40;
const MIN_KEY_WORDS = 8;
const MAX_METHOD = 3;
const MAX_KEYWORD_FINDINGS = 3;

const DOT = "\u0001";
const ABBREVIATIONS = [
  "e.g.",
  "i.e.",
  "et al.",
  "vs.",
  "fig.",
  "figs.",
  "approx.",
  "cf.",
  "eq.",
  "dr.",
  "prof.",
];

const METHOD_PATTERN =
  /\b(methods?|methodolog(?:y|ies)|approach(?:es)?|we (?:used|use)|samples?|participants?|data(?:sets?)?)\b/i;

const FINDINGS_PATTERN =
  /\b(results (?:show|showed|shown)|found|significantly|increased|decreased)\b/i;

const BOILERPLATE_PATTERN =
  /©|\ball rights reserved\b|\bcopyright\b|\blicensee\b/i;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const ABBREVIATION_PATTERNS = ABBREVIATIONS.map(
  (abbr) => new RegExp(`\\b${escapeRegExp(abbr)}`, "gi")
);

function reconstructAbstract(
  index: Record<string, number[]> | null | undefined
): string {
  if (!index) return "";
  const words: string[] = [];
  for (const [word, positions] of Object.entries(index)) {
    for (const position of positions) {
      words[position] = word;
    }
  }
  return words.filter((w) => typeof w === "string").join(" ");
}

function cleanAbstract(raw: string): string {
  return raw
    .replace(/<\/?[a-zA-Z][^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .replace(/^\s*abstract\s*[:.\-–—]?\s+/i, "")
    .trim();
}

function splitSentences(text: string): string[] {
  let t = text.replace(/\s+/g, " ").trim();
  for (const pattern of ABBREVIATION_PATTERNS) {
    t = t.replace(pattern, (match) => match.replace(/\./g, DOT));
  }
  const parts = t.split(/([.!?]+["'”’)\]]*)\s+(?=["“‘'(\[]?[A-Z0-9])/);
  const sentences: string[] = [];
  for (let i = 0; i < parts.length; i += 2) {
    const body = parts[i] ?? "";
    const end = parts[i + 1] ?? "";
    const sentence = (body + end).split(DOT).join(".").trim();
    if (sentence) sentences.push(sentence);
  }
  return sentences;
}

function summarize(abstract: string): Summary | null {
  const sentences = splitSentences(abstract).filter(
    (s) => s.length >= MIN_SENTENCE_CHARS && !BOILERPLATE_PATTERN.test(s)
  );
  if (sentences.length === 0) return null;
  const taken = new Set<number>();
  const take = (indexes: number[]) => indexes.forEach((i) => taken.add(i));
  const allIdx = sentences.map((_, i) => i);
  const questionIdx = allIdx.slice(0, 2);
  take(questionIdx);
  const lastTwoIdx = [sentences.length - 2, sentences.length - 1].filter(
    (i) => i >= 0 && !taken.has(i)
  );
  take(lastTwoIdx);
  const methodIdx = allIdx
    .filter((i) => !taken.has(i) && METHOD_PATTERN.test(sentences[i]))
    .slice(0, MAX_METHOD);
  take(methodIdx);
  const keywordFindingIdx = allIdx
    .filter((i) => !taken.has(i) && FINDINGS_PATTERN.test(sentences[i]))
    .slice(0, MAX_KEYWORD_FINDINGS);
  const findingsIdx = [...lastTwoIdx, ...keywordFindingIdx].sort((a, b) => a - b);
  const keySentences = sentences
    .map((text, i) => ({ text, i }))
    .filter(
      ({ text }) =>
        text.length >= MIN_KEY_CHARS && text.split(" ").length >= MIN_KEY_WORDS
    )
    .sort((a, b) => b.text.length - a.text.length)
    .slice(0, 5)
    .sort((a, b) => a.i - b.i)
    .map(({ text }) => text);
  const pick = (idx: number[]) => idx.map((i) => sentences[i]);
  return {
    researchQuestion: pick(questionIdx),
    method: pick(methodIdx),
    findings: pick(findingsIdx),
    keySentences,
    abstract,
  };
}

class LookupError extends Error {
  code: "not_found" | "rate_limit" | "network";
  constructor(code: "not_found" | "rate_limit" | "network") {
    super(code);
    this.code = code;
  }
}

function parseLookup(raw: string): LookupInput | { error: string } {
  const input = raw.trim();
  if (!input) {
    return { error: "Enter a DOI, an OpenAlex link, or a paper title." };
  }
  const openAlexMatch =
    input.match(/openalex\.org\/(?:works\/)?(W\d+)/i) ??
    input.match(/^(W\d+)$/i);
  if (openAlexMatch) {
    return { kind: "openalex", id: openAlexMatch[1].toUpperCase() };
  }
  const doiMatch = input.match(/10\.\d{4,9}\/\S+/);
  if (doiMatch) {
    let doi = doiMatch[0].replace(/[.,;]+$/, "");
    try {
      doi = decodeURIComponent(doi);
    } catch {}
    return { kind: "doi", doi };
  }
  if (/^https?:\/\//i.test(input)) {
    return {
      error:
        "Only doi.org and openalex.org links are supported. Paste the DOI, an OpenAlex link, or the paper title instead.",
    };
  }
  if (input.length < 5) {
    return {
      error: "Enter a DOI, an OpenAlex link, or a paper title (5+ characters).",
    };
  }
  return { kind: "title", title: input };
}

function normalizeTitle(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/gi, "");
}

async function getJson(url: string, signal: AbortSignal): Promise<unknown> {
  let res: Response;
  try {
    res = await fetch(url, { signal });
  } catch {
    throw new LookupError("network");
  }
  if (res.status === 404 || res.status === 400) throw new LookupError("not_found");
  if (res.status === 429) throw new LookupError("rate_limit");
  if (!res.ok) throw new LookupError("network");
  try {
    return await res.json();
  } catch {
    throw new LookupError("network");
  }
}

async function lookupWork(
  input: LookupInput,
  signal: AbortSignal
): Promise<{ work: OpenAlexWork; exact: boolean }> {
  const mailto = `mailto=${encodeURIComponent(CONTACT_EMAIL)}`;
  if (input.kind === "title") {
    const url = `${OPENALEX_API}/works?search=${encodeURIComponent(
      input.title
    )}&per_page=5&${mailto}`;
    const data = (await getJson(url, signal)) as { results?: OpenAlexWork[] };
    const results = data.results ?? [];
    if (results.length === 0) throw new LookupError("not_found");
    const target = normalizeTitle(input.title);
    const exactMatch = target
      ? results.find(
          (w) => normalizeTitle(w.title ?? w.display_name ?? "") === target
        )
      : undefined;
    return { work: exactMatch ?? results[0], exact: Boolean(exactMatch) };
  }
  const path =
    input.kind === "doi"
      ? `https://doi.org/${input.doi
          .split("/")
          .map(encodeURIComponent)
          .join("/")}`
      : input.id;
  const work = (await getJson(
    `${OPENALEX_API}/works/${path}?${mailto}`,
    signal
  )) as OpenAlexWork;
  return { work, exact: true };
}

function toPaperMeta(work: OpenAlexWork, matchNote: string | null): PaperMeta {
  const names = (work.authorships ?? [])
    .map((a) => a.author?.display_name)
    .filter((n): n is string => Boolean(n));
  const authors =
    names.length === 0
      ? "Authors not listed"
      : names.length > 6
        ? `${names.slice(0, 6).join(", ")}, et al. (${names.length} authors)`
        : names.join(", ");
  const journal =
    work.primary_location?.source?.display_name ??
    work.locations?.find((l) => l.source?.display_name)?.source?.display_name ??
    null;
  return {
    title: work.title ?? work.display_name ?? "Untitled work",
    authors,
    year: work.publication_year ?? null,
    journal,
    cited: work.cited_by_count ?? 0,
    doiUrl: work.doi ?? null,
    shortId: (work.id ?? "").split("/").pop() ?? "",
    matchNote,
  };
}

function errorMessage(err: unknown): string {
  if (err instanceof LookupError) {
    if (err.code === "not_found") {
      return "Paper not found in OpenAlex. Try pasting abstract directly.";
    }
    if (err.code === "rate_limit") {
      return "OpenAlex is limiting requests right now. Wait a moment and try again, or paste the abstract directly.";
    }
  }
  return "Could not reach OpenAlex (network error or timeout). Try again, or paste the abstract directly.";
}

function buildCopyText({ meta, summary }: ResultState): string {
  const lines: string[] = [];
  if (meta) {
    lines.push(meta.title, meta.authors);
    lines.push(
      [
        meta.year,
        meta.journal,
        `Cited by ${meta.cited.toLocaleString("en-US")} (OpenAlex)`,
      ]
        .filter(Boolean)
        .join(" | ")
    );
    if (meta.doiUrl) lines.push(meta.doiUrl);
  } else {
    lines.push("Summary of pasted text");
  }
  lines.push("");
  const section = (label: string, items: string[]) => {
    lines.push(`${label}:`);
    lines.push(items.length ? items.join(" ") : "Nothing matched in the abstract.");
    lines.push("");
  };
  section("Research Question", summary.researchQuestion);
  section("Method", summary.method);
  section("Key Findings", summary.findings);
  lines.push("Top 5 Key Sentences:");
  summary.keySentences.forEach((s, i) => lines.push(`${i + 1}. ${s}`));
  lines.push("");
  lines.push(
    "Extractive summary from the paper's own abstract. Not AI-generated. Made with Noor Scholar."
  );
  return lines.join("\n");
}

function toggleClass(active: boolean): string {
  return `rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
    active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
  }`;
}

function SummarySection({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  const ListTag = ordered ? "ol" : "ul";
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          No sentences in the abstract matched this section.
        </p>
      ) : (
        <ListTag
          className={`mt-3 space-y-2 pl-5 leading-relaxed text-gray-700 ${
            ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      )}
    </div>
  );
}

export default function SummarizerPage() {
  const [mode, setMode] = useState<Mode>("find");
  const [query, setQuery] = useState("");
  const [pasted, setPasted] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  function switchMode(next: Mode) {
    if (loading || next === mode) return;
    setMode(next);
    setError(null);
    setResult(null);
    setCopyState("idle");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setResult(null);
    setCopyState("idle");
    if (mode === "paste") {
      const text = pasted.trim();
      if (text.length < MIN_PASTE_CHARS) {
        setError("Paste at least a few sentences (about 100 characters or more). An abstract works best.");
        return;
      }
      if (text.length > MAX_PASTE_CHARS) {
        setError("That text is too long. Paste only the abstract (up to 20,000 characters).");
        return;
      }
      const summary = summarize(cleanAbstract(text));
      if (!summary) {
        setError("Could not split that text into sentences. Paste a plain-text abstract.");
        return;
      }
      setResult({ meta: null, summary });
      return;
    }
    const parsed = parseLookup(query);
    if ("error" in parsed) {
      setError(parsed.error);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    setLoading(true);
    try {
      const { work, exact } = await lookupWork(parsed, controller.signal);
      const title = work.title ?? work.display_name ?? "Untitled work";
      const abstract = cleanAbstract(reconstructAbstract(work.abstract_inverted_index));
      if (!abstract) {
        setError(`Found "${title}" in OpenAlex, but it has no abstract on record. Paste the abstract directly.`);
        return;
      }
      const summary = summarize(abstract);
      if (!summary) {
        setError(`Found "${title}", but its abstract could not be split into sentences. Paste the abstract directly.`);
        return;
      }
      const matchNote =
        parsed.kind === "title" && !exact
          ? "Matched by title search, not an exact title match. Check that this is the paper you meant."
          : null;
      setResult({ meta: toPaperMeta(work, matchNote), summary });
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(buildCopyText(result));
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    setTimeout(() => setCopyState("idle"), 2500);
  }

  const citationHref = result?.meta?.shortId
    ? `/tools/citation-generator?id=${result.meta.shortId}`
    : "/tools/citation-generator";

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Free tool</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Paper Summarizer (Abstract-based)
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        Look up a paper by DOI, OpenAlex link, or title, or paste an abstract. The tool pulls sentences out of the abstract and sorts them with simple keyword rules.
      </p>
      <section className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Read this first</h2>
        <p className="mt-2 font-medium leading-relaxed text-gray-800">
          This is an extractive summary from the paper&apos;s own abstract. Not AI-generated.
        </p>
        <p className="mt-2 leading-relaxed text-gray-700">
          Sentences are copied, not rewritten, and the sorting is keyword-based, so a sentence can land in the wrong box. Read the original paper before you cite it.
        </p>
      </section>
      <form onSubmit={handleSubmit} className="mt-10">
        <div role="group" aria-label="Input type" className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
          <button type="button" aria-pressed={mode === "find"} onClick={() => switchMode("find")} disabled={loading} className={toggleClass(mode === "find")}>
            Find a paper
          </button>
          <button type="button" aria-pressed={mode === "paste"} onClick={() => switchMode("paste")} disabled={loading} className={toggleClass(mode === "paste")}>
            Paste an abstract
          </button>
        </div>
        {mode === "find" ? (
          <div className="mt-4">
            <label htmlFor="paper-query" className="block text-sm font-medium text-gray-700">DOI, OpenAlex link, or paper title</label>
            <input id="paper-query" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. 10.1038/nature14539 or https://openalex.org/W2741809807" autoComplete="off" className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20" />
          </div>
        ) : (
          <div className="mt-4">
            <label htmlFor="paper-abstract" className="block text-sm font-medium text-gray-700">Abstract text</label>
            <textarea id="paper-abstract" rows={8} value={pasted} onChange={(e) => setPasted(e.target.value)} placeholder="Paste the abstract here (plain text, up to 20,000 characters)." className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 leading-relaxed text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20" />
          </div>
        )}
        <button type="submit" disabled={loading} aria-busy={loading} className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Summarizing..." : "Summarize"}
        </button>
      </form>
      {loading && (
        <p role="status" className="mt-6 text-sm text-gray-600">Looking up the paper in OpenAlex...</p>
      )}
      {error && (
        <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800">{error}</div>
      )}
      {result && (
        <section className="mt-10 space-y-6" aria-label="Summary results">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            {result.meta ? (
              <>
                <h2 className="text-xl font-semibold text-gray-900">{result.meta.title}</h2>
                <p className="mt-2 leading-relaxed text-gray-600">{result.meta.authors}</p>
                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="font-medium text-gray-500">Year</dt>
                    <dd className="mt-1 text-gray-900">{result.meta.year ?? "Not listed"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Journal</dt>
                    <dd className="mt-1 text-gray-900">{result.meta.journal ?? "Not listed"}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">Citations (OpenAlex)</dt>
                    <dd className="mt-1 text-gray-900">{result.meta.cited.toLocaleString("en-US")}</dd>
                  </div>
                </dl>
                {result.meta.matchNote && (
                  <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{result.meta.matchNote}</p>
                )}
                {result.meta.doiUrl && (
                  <p className="mt-4 text-sm">
                    <a href={result.meta.doiUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700">Open the paper (DOI)</a>
                  </p>
                )}
              </>
            ) : (
              <h2 className="text-xl font-semibold text-gray-900">Summary of pasted text</h2>
            )}
            <p className="mt-4 text-sm text-gray-500">Extractive summary. Sentences are copied from the abstract, not rewritten.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleCopy} className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy Summary"}
            </button>
            <Link href={citationHref} className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50">Generate Citation</Link>
          </div>
          <SummarySection title="Research Question" items={result.summary.researchQuestion} />
          <SummarySection title="Method" items={result.summary.method} />
          <SummarySection title="Key Findings" items={result.summary.findings} />
          <SummarySection title="Top 5 Key Sentences" items={result.summary.keySentences} ordered />
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">{result.meta ? "Full abstract" : "Pasted text"}</h2>
            <p className="mt-3 leading-relaxed text-gray-700">{result.summary.abstract}</p>
          </div>
        </section>
      )}
      <details className="mt-12 rounded-xl border border-gray-200 p-5">
        <summary className="cursor-pointer font-semibold text-gray-900">How the sections are chosen</summary>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
          <li><strong>Research Question:</strong> the first two sentences of the abstract.</li>
          <li><strong>Method:</strong> up to 3 sentences containing words such as method, approach, we used, sample, participants, or data.</li>
          <li><strong>Key Findings:</strong> the last two sentences, plus up to 3 sentences containing results show, found, significantly, increased, or decreased.</li>
          <li><strong>Top 5 Key Sentences:</strong> the five longest sentences (at least 8 words), shown in their original order.</li>
          <li>A sentence appears in only one of the first three sections. Copyright notices are ignored.</li>
          <li>Paper details and abstracts come from the OpenAlex API.</li>
        </ul>
      </details>
    </main>
  );
}
