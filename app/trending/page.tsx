import { getTrending, getSpotlight, getHiddenGems, CATEGORIES, authorLine, clip, toHashtag } from "@/lib/openalex";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TrendingPage({ searchParams }: { searchParams: { cat?: string } }) {
  const slug = searchParams.cat || "all";
  const cat = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[7];
  const [spotlight, trending, gems] = await Promise.all([
    getSpotlight(cat),
    getTrending(cat, 12),
    getHiddenGems(cat, 6)
  ]);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 20, minHeight: "60vh" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>🔥 Trending Research</h1>
      <p style={{ color: "#666" }}>What researchers are reading today - live from OpenAlex</p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        {CATEGORIES.map(c => (
          <a key={c.slug} href={`/trending?cat=${c.slug}`} style={{ padding: "8px 14px", borderRadius: 20, background: c.slug === slug ? "#000" : "#eee", color: c.slug === slug ? "#fff" : "#000", textDecoration: "none", fontSize: 14 }}>{c.label}</a>
        ))}
      </div>

      {spotlight ? (
        <section style={{ marginTop: 30, padding: 20, background: "#fef9e7", borderRadius: 12, border: "1px solid #f5d76e" }}>
          <span style={{ fontWeight: 700 }}>#1 Spotlight - Breakthrough</span>
          <h2>{spotlight.title}</h2>
          <p>{authorLine(spotlight)} • {spotlight.year} • {spotlight.citations} citations</p>
          <p>{clip(spotlight.abstract, 400)}</p>
          <a href={spotlight.url} target="_blank">View Paper →</a>
        </section>
      ) : (
        <p style={{ marginTop: 20, padding: 16, background: "#f8f8f8", borderRadius: 8 }}>Loading spotlight... If this stays empty, OpenAlex is slow - refresh the page.</p>
      )}

      <h2 style={{ marginTop: 40 }}>Trending</h2>
      {trending.length === 0 ? (
        <p style={{ padding: 20, background: "#fff3cd", borderRadius: 8 }}>No trending papers found right now - OpenAlex may be slow. Refresh after 10 seconds.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
          {trending.map(p => (
            <div key={p.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12, background: "#fff" }}>
              <h3 style={{ fontSize: 16 }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: "#666" }}>{authorLine(p)} • {p.year}</p>
              <p style={{ fontSize: 14 }}>{clip(p.abstract, 220)}</p>
              <p style={{ fontSize: 12, color: "#2563eb" }}>{p.tags.map(t => toHashtag(t)).join(" ")}</p>
              <a href={p.url} target="_blank">View Paper →</a>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ marginTop: 40 }}>Hidden Gems</h2>
      {gems.length === 0 ? (
        <p style={{ padding: 20, background: "#f8f8f8", borderRadius: 8 }}>Loading hidden gems...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
          {gems.map(p => (
            <div key={p.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
              <h3 style={{ fontSize: 16 }}>{p.title}</h3>
              <p style={{ fontSize: 14 }}>{clip(p.abstract, 220)}</p>
              <a href={p.url} target="_blank">View Paper →</a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
