"use client";

import { useState, useEffect, useRef } from "react";

type Faq = { q: string; a: string };

export default function CitationGeneratorClient({ faqs, initialId }: { faqs?: Faq[]; initialId?: string }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);
  const [style, setStyle] = useState<"APA" | "MLA" | "【entity-Chicago¦canonical_name=Chicago】">("APA");
  const autoRan = useRef(false);

  async function runLookup(raw: string) {
    const q = raw.trim();
    if (!q) { setError("Enter a DOI, title, or OpenAlex ID."); return; }
    setLoading(true); setError(null); setMeta(null);
    try {
      let url = "";
      if (/^W\d+$/i.test(q)) {
        url = `https://api.openalex.org/works/${q}?mailto=abdmazn55@gmail.com`;
      } else if (q.includes("10.")) {
        const doi = q.match(/10\.\d{4,9}\/\S+/)?.[0]?.replace(/[.,;]+$/, "") || q;
        url = `https://api.openalex.org/works/https://doi.org/${encodeURIComponent(doi)}?mailto=abdmazn55@gmail.com`;
      } else {
        url = `https://api.openalex.org/works?search=${encodeURIComponent(q)}&per_page=1&mailto=abdmazn55@gmail.com`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error("not found");
      const data = await res.json();
      const w = data.results ? data.results[0] : data;
      if (!w) throw new Error("not found");
      setMeta(w);
    } catch {
      setError("Paper not found. Try pasting DOI or title.");
    } finally { setLoading(false); }
  }

  useEffect(() => {
    if (initialId && !autoRan.current) {
      autoRan.current = true;
      setQuery(initialId);
      runLookup(initialId);
    }
  }, [initialId]);

  function getAuthors() {
    if (!meta?.authorships) return "";
    return meta.authorships.map((a: any) => a.author?.display_name).filter(Boolean);
  }

  function formatAPA() {
    if (!meta) return "";
    const authors = getAuthors();
    const year = meta.publication_year || "n.d.";
    const title = meta.title || meta.display_name || "";
    const journal = meta.primary_location?.source?.display_name || "";
    const doi = meta.doi ? meta.doi.replace("https://doi.org/", "") : "";
    let a = "";
    if (authors.length === 1) a = `${authors[0].split(" ").slice(-1)} , ${authors[0][0]}.`;
    else if (authors.length > 1) a = authors.map((n: string) => `${n.split(" ").slice(-1)} , ${n[0]}.`).join(", ");
    return `${a} (${year}). ${title}. ${journal ? `${journal}. ` : ""}${doi ? `https://doi.org/${doi}` : ""}`.trim();
  }

  function formatMLA() {
    if (!meta) return "";
    const authors = getAuthors();
    const title = meta.title || meta.display_name || "";
    const journal = meta.primary_location?.source?.display_name || "";
    const year = meta.publication_year || "";
    const doi = meta.doi || "";
    return `${authors.join(", ")}. "${title}." ${journal}, ${year}${doi ? `, ${doi}.` : "."}`;
  }

  function formatChicago() {
    if (!meta) return "";
    const authors = getAuthors();
    const title = meta.title || meta.display_name || "";
    const journal = meta.primary_location?.source?.display_name || "";
    const year = meta.publication_year || "";
    const doi = meta.doi || "";
    return `${authors.join(", ")}. "${title}." ${journal} (${year})${doi ? `: ${doi}.` : "."}`;
  }

  const citation = style === "APA" ? formatAPA() : style === "MLA" ? formatMLA() : formatChicago();

  async function copy() {
    try { await navigator.clipboard.writeText(citation); alert("Copied!"); } catch {}
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Free tool</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">Citation Generator</h1>
      <p className="mt-4 text-gray-600">Paste a DOI, title, or OpenAlex ID. Get APA 7th, MLA 9th, and 【entity-Chicago¦canonical_name=Chicago】 citations.</p>

      <form onSubmit={(e) => { e.preventDefault(); runLookup(query); }} className="mt-8">
        <label className="block text-sm font-medium text-gray-700">DOI, title, or OpenAlex ID</label>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. 10.1038/nature14539 or W2741809807" className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-600 focus:outline-none" />
        <button disabled={loading} className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{loading ? "Looking up..." : "Generate Citation"}</button>
      </form>

      {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}

      {meta && (
        <section className="mt-8 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-semibold">{meta.title || meta.display_name}</h2>
            <p className="mt-2 text-sm text-gray-600">{getAuthors().join(", ")} • {meta.publication_year}</p>
          </div>
          <div className="flex gap-2">
            {(["APA", "MLA", "Chicago"] as const).map((s) => (
              <button key={s} onClick={() => setStyle(s)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${style === s ? "bg-blue-600 text-white" : "bg-gray-100"}`}>{s}</button>
            ))}
          </div>
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-6">
            <p className="leading-relaxed text-gray-900">{citation}</p>
            <button onClick={copy} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Copy Citation</button>
            <p className="mt-3 text-xs text-gray-500">Always check against your style guide before submitting.</p>
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">FAQ</h2>
          {faqs.map((f, i) => (
            <details key={i} className="mt-3 rounded-xl border p-4"><summary className="cursor-pointer font-semibold">{f.q}</summary><p className="mt-2 text-gray-700">{f.a}</p></details>
          ))}
        </section>
      )}
    </main>
  );
}
