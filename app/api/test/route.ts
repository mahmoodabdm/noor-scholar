export async function GET() {
  const url = "https://api.openalex.org/works?filter=type:article&sort=cited_by_count:desc&per-page=3&select=id,display_name,publication_year,cited_by_count,abstract_inverted_index&mailto=abdmazn55@gmail.com";
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();
  return new Response(JSON.stringify({ status: res.status, ok: res.ok, body: text.slice(0, 2000) }), { headers: { "Content-Type": "application/json" } });
}
