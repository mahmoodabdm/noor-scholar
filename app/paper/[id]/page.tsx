import { resolvePaper, authorLine } from "@/lib/openalex";
export const revalidate = 3600;
export default async function PaperPage({ params }: { params: { id: string } }) {
  const paper = await resolvePaper(params.id);
  if (!paper) return <main style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}><h1>Paper not found</h1><a href="/trending">← Back to Trending</a></main>;
  const imgId = (paper.id.charCodeAt(0) + paper.id.length * 7) % 1000;
  const cover = `https://picsum.photos/seed/${paper.id}/1200/400`;
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <a href="/trending" style={{ color: "#2563eb" }}>← Back to Trending</a>
      <div style={{ marginTop: 16, borderRadius: 16, overflow: "hidden", background: "linear-gradient(135deg,#0f172a,#2563eb,#06b6d4)", color: "#fff" }}>
        <img src={cover} alt="" style={{ width: "100%", height: 220, objectFit: "cover", opacity: 0.9 }} />
        <div style={{ padding: 24 }}>
          <span style={{ background: "#fbbf24", color: "#000", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Research Paper</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 12, lineHeight: 1.3 }}>{paper.title}</h1>
          <p style={{ marginTop: 8, opacity: 0.9 }}>{authorLine(paper)} • {paper.year} • {paper.venue || "Journal"}</p>
          <p style={{ marginTop: 8 }}>📚 {paper.citations} citations • {paper.isOA ? "✅ Open Access" : "🔒 Publisher"} • DOI: {paper.doi || "N/A"}</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
        <div style={{ background: "#eff6ff", padding: 16, borderRadius: 12, textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 800 }}>{paper.citations}</div><div style={{ fontSize: 12, color: "#666" }}>Citations</div></div>
        <div style={{ background: "#f0fdf4", padding: 16, borderRadius: 12, textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 800 }}>{paper.year}</div><div style={{ fontSize: 12, color: "#666" }}>Year</div></div>
        <div style={{ background: "#fefce8", padding: 16, borderRadius: 12, textAlign: "center" }}><div style={{ fontSize: 24, fontWeight: 800 }}>{paper.isOA ? "Free" : "Paid"}</div><div style={{ fontSize: 12, color: "#666" }}>Access</div></div>
      </div>
      <h2 style={{ marginTop: 30 }}>📄 Abstract</h2>
      <p style={{ lineHeight: 1.8, background: "#f9fafb", padding: 20, borderRadius: 12 }}>{paper.abstract || "No abstract available."}</p>
      <h2 style={{ marginTop: 30 }}>🎥 Video Summary</h2>
      <div style={{ background: "#000", color: "#fff", padding: 40, borderRadius: 12, textAlign: "center" }}>
        <p style={{ fontSize: 40 }}>▶️</p>
        <p>Video summary coming soon - read the abstract above for now!</p>
        <p style={{ fontSize: 12, color: "#999", marginTop: 8 }}>MapleScholar uses AI to generate this - we will add it after the page works!</p>
      </div>
      <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
        <a href={paper.url} target="_blank" style={{ padding: "12px 24px", background: "#000", color: "#fff", borderRadius: 20, textDecoration: "none" }}>View Original Paper →</a>
        {paper.oaUrl && <a href={paper.oaUrl} target="_blank" style={{ padding: "12px 24px", background: "#16a34a", color: "#fff", borderRadius: 20, textDecoration: "none" }}>Free PDF</a>}
      </div>
    </main>
  );
}
