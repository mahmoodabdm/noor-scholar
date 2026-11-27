import { getTrending, getSpotlight, getHiddenGems, CATEGORIES, authorLine, clip, toHashtag } from "@/lib/openalex";
export const revalidate = 3600;
export default async function TrendingPage({ searchParams }: { searchParams: { cat?: string } }) {
  const slug = searchParams.cat || "all";
  const cat = CATEGORIES.find(c => c.slug === slug) || CATEGORIES[7];
  const [spotlight, trending, gems] = await Promise.all([getSpotlight(cat), getTrending(cat, 12), getHiddenGems(cat, 6)]);
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
      <h1>🔥 Trending Research</h1>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {CATEGORIES.map(c => (<a key={c.slug} href={`/trending?cat=${c.slug}`} style={{ padding: "8px 14px", borderRadius: 20, background: c.slug === slug ? "#000" : "#eee", color: c.slug === slug ? "#fff" : "#000" }}>{c.label}</a>))}
      </div>
      {spotlight && (<section style={{ marginTop: 30, padding: 20, background: "#fef9e7", borderRadius: 12 }}><span>#1 Spotlight</span><h2>{spotlight.title}</h2><p>{authorLine(spotlight)} • {spotlight.year} • {spotlight.citations} citations</p><p>{clip(spotlight.abstract, 400)}</p><a href={spotlight.url} target="_blank">View Paper →</a></section>)}
      <h2 style={{ marginTop: 40 }}>Trending - {trending.length} papers</h2>
      {trending.length === 0 && <p style={{ background: "#fee", padding: 16 }}>Still loading - OpenAlex budget may be resetting. Try again in 5 minutes.</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
        {trending.map(p => (<div key={p.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}><h3>{p.title}</h3><p>{authorLine(p)} • {p.year}</p><p>{clip(p.abstract, 220)}</p><p>{p.tags.map(t => toHashtag(t)).join(" ")}</p><a href={p.url} target="_blank">View Paper</a></div>))}
      </div>
      <h2 style={{ marginTop: 40 }}>Hidden Gems</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
        {gems.map(p => (<div key={p.id} style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}><h3>{p.title}</h3><p>{clip(p.abstract, 220)}</p><a href={p.url} target="_blank">View Paper</a></div>))}
      </div>
    </main>
  );
}
