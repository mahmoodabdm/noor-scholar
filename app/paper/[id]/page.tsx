import { resolvePaper, authorLine, clip } from "@/lib/openalex";

export const dynamic = "force-dynamic";

export default async function PaperPage({ params }: { params: { id: string } }) {
  const paper = await resolvePaper(params.id);
  if (!paper) return <main style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}><h1>Paper not found</h1><a href="/trending">← Back to Trending</a></main>;

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <a href="/trending" style={{ color: "#2563eb" }}>← Back to Trending</a>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16 }}>{paper.title}</h1>
      <p style={{ color: "#666", marginTop: 8 }}>{authorLine(paper)} • {paper.year} • {paper.venue || "Unknown venue"}</p>
      <p style={{ marginTop: 8 }}>📚 {paper.citations} citations • {paper.isOA ? "✅ Open Access" : "🔒 May need access"} • {paper.doi ? `DOI: ${paper.doi}` : ""}</p>

      <h2 style={{ marginTop: 30 }}>Abstract</h2>
      <p style={{ lineHeight: 1.8, background: "#f9fafb", padding: 20, borderRadius: 12 }}>{paper.abstract || "No abstract available for this paper."}</p>

      <h2 style={{ marginTop: 30 }}>Chat with this paper</h2>
      <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 12 }}>
        <p style={{ color: "#666", fontSize: 14 }}>Ask about this paper - answers come from the abstract:</p>
        <ul style={{ marginTop: 10, lineHeight: 2 }}>
          <li>• What did they find?</li>
          <li>• What method did they use?</li>
          <li>• What is the main conclusion?</li>
        </ul>
        <p style={{ marginTop: 10, fontSize: 13, color: "#999" }}>Chat box coming next - for now read the abstract above, it has the answers.</p>
      </div>

      <div style={{ marginTop: 30, display: "flex", gap: 12 }}>
        <a href={paper.url} target="_blank" style={{ padding: "12px 24px", background: "#000", color: "#fff", borderRadius: 20, textDecoration: "none" }}>View Original Paper →</a>
        {paper.oaUrl && <a href={paper.oaUrl} target="_blank" style={{ padding: "12px 24px", background: "#16a34a", color: "#fff", borderRadius: 20, textDecoration: "none" }}>Free PDF</a>}
      </div>
    </main>
  );
}
