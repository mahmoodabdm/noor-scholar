"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Paper = { id: string; title: string; year: number; authors: string[]; citations: number; abstract: string; url: string };

const CATS = [
  { slug: "all", label: "All", q: "" },
  { slug: "computer-science", label: "Computer Science", q: "computer science" },
  { slug: "physics", label: "Physics", q: "physics" },
  { slug: "chemistry", label: "Chemistry", q: "chemistry" },
  { slug: "mathematics", label: "Mathematics", q: "mathematics" },
  { slug: "social-sciences", label: "Social Sciences", q: "social sciences" },
  { slug: "medicine", label: "Medicine", q: "medicine" },
  { slug: "engineering", label: "Engineering", q: "engineering" },
];

function getAbstract(inv: any): string {
  if (!inv) return "No abstract available.";
  const words: string[] = [];
  for (const [w, pos] of Object.entries(inv as any)) for (const p of pos as number[]) words[p] = w;
  return words.filter(Boolean).join(" ") || "No abstract available.";
}

async function fetchPapers(search: string, sort: string, perPage: number): Promise<Paper[]> {
  const url = `https://api.openalex.org/works?filter=has_abstract:true,type:article,from_publication_date:2025-08-01&search=${encodeURIComponent(search)}&sort=${sort}&per-page=${perPage}&select=id,doi,display_name,publication_year,cited_by_count,abstract_inverted_index,authorships,primary_location,open_access&mailto=abdmazn55@gmail.com`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("OpenAlex failed " + res.status);
  const data = await res.json();
  return (data.results || []).map((w: any) => ({
    id: String(w.id).split("/").pop(),
    title: w.display_name?.replace(/<[^>]+>/g, "") || "Untitled",
    year: w.publication_year,
    authors: (w.authorships || []).map((a: any) => a.author?.display_name).filter(Boolean),
    citations: w.cited_by_count || 0,
    abstract: getAbstract(w.abstract_inverted_index),
    url: w.doi || w.primary_location?.landing_page_url || `https://openalex.org/${String(w.id).split("/").pop()}`,
  }));
}

export default function TrendingPage() {
  const sp = useSearchParams();
  const cat = sp.get("cat") || "all";
  const current = CATS.find(c => c.slug === cat) || CATS[0];
  const [trending, setTrending] = useState<Paper[]>([]);
  const [gems, setGems] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true); setError("");
    Promise.all([
      fetchPapers(current.q, "cited_by_count:desc", 12),
      fetchPapers(current.q, "cited_by_count:asc", 6),
    ]).then(([t, g]) => { setTrending(t); setGems(g); setLoading(false); })
    .catch(e => { setError(String(e)); setLoading(false); });
  }, [cat]);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 20, minHeight: "60vh" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>🔥 Trending Research</h1>
      <p style={{ color: "#666" }}>What researchers are reading today - live from OpenAlex</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        {CATS.map(c => (
          <a key={c.slug} href={`/trending?cat=${c.slug}`} style={{ padding: "8px 14px", borderRadius: 20, background: c.slug === cat ? "#000" : "#eee", color: c.slug === cat ? "#fff" : "#000", textDecoration: "none", fontSize: 14 }}>{c.label}</a>
        ))}
      </div>

      {loading && <p style={{ marginTop: 30, padding: 20, background: "#f0f9ff", borderRadius: 8 }}>⏳ Loading from OpenAlex... wait 3 seconds...</p>}
      {error && <p style={{ marginTop: 30, padding: 20, background: "#fee", borderRadius: 8 }}>Error: {error} - check your internet</p>}

      {!loading && !error && (
        <>
          {trending[0] && (
            <section style={{ marginTop: 30, padding: 20, background: "#fef9e7", borderRadius: 12, border: "1px solid #f5d76e" }}>
              <span style={{ fontWeight: 700 }}>#1 Spotlight - Breakthrough</span>
              <h2>{trending[0].title}</h2>
              <p>{trending[0].authors.slice(0, 3).join(", ")} • {trending[0].year} • {trending[0].citations} citations</p>
              <p>{trending[0].abstract.slice(0, 400)}</p>
              <a href={trending[0].url} target="_blank">View Paper →</a>
            </section>
          )}
          <h2 style={{ marginTop: 40 }}>Trending</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
            {trending.map(p => (
              <div key={p.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12, background: "#fff" }}>
                <h3 style={{ fontSize: 16 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: "#666" }}>{p.authors.slice(0, 3).join(", ")} • {p.year} • {p.citations} citations</p>
                <p style={{ fontSize: 14 }}>{p.abstract.slice(0, 220)}...</p>
                <a href={p.url} target="_blank">View Paper →</a>
              </div>
            ))}
          </div>
          <h2 style={{ marginTop: 40 }}>Hidden Gems</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
            {gems.map(p => (
              <div key={p.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
                <h3 style={{ fontSize: 16 }}>{p.title}</h3>
                <p style={{ fontSize: 14 }}>{p.abstract.slice(0, 220)}...</p>
                <a href={p.url} target="_blank">View Paper →</a>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
