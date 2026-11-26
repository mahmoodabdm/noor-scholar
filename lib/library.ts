export interface SavedPaper {
  id: string;
  title: string;
  authors: string;
  year: number | null;
  journal: string | null;
  doi: string | null;
  cited: number;
  savedAt: number;
}

const KEY = "noor-library";

export function getLibrary(): SavedPaper[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as SavedPaper[];
  } catch {
    return [];
  }
}

export function savePaper(paper: Omit<SavedPaper, "savedAt">): SavedPaper[] {
  const lib = getLibrary();
  if (lib.some((p) => p.id === paper.id)) return lib;
  const next = [{ ...paper, savedAt: Date.now() }, ...lib];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("noor-library-changed"));
  return next;
}

export function removePaper(id: string): SavedPaper[] {
  const next = getLibrary().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("noor-library-changed"));
  return next;
}

export function isSaved(id: string): boolean {
  return getLibrary().some((p) => p.id === id);
}

export function clearLibrary() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("noor-library-changed"));
}

export function exportBackup(): string {
  return JSON.stringify(getLibrary(), null, 2);
}

export function importBackup(json: string): SavedPaper[] {
  const parsed = JSON.parse(json);
  if (!Array.isArray(parsed)) throw new Error("Invalid backup file");
  const cleaned: SavedPaper[] = parsed
    .filter((p: any) => p && typeof p.id === "string" && typeof p.title === "string")
    .map((p: any) => ({
      id: p.id,
      title: p.title,
      authors: p.authors ?? "Authors not listed",
      year: p.year ?? null,
      journal: p.journal ?? null,
      doi: p.doi ?? null,
      cited: p.cited ?? 0,
      savedAt: p.savedAt ?? Date.now(),
    }));
  // Remove duplicates
  const seen = new Set<string>();
  const deduped = cleaned.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });
  localStorage.setItem(KEY, JSON.stringify(deduped));
  window.dispatchEvent(new Event("noor-library-changed"));
  return deduped;
}

export function toBibTeX(p: SavedPaper): string {
  const key = `${(p.authors.split(",")[0] ?? "unknown").split(" ").pop() ?? "paper"}${p.year ?? ""}${p.id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6)}`;
  const lines = [
    `@article{${key},`,
    `  title = {${p.title}},`,
    `  author = {${p.authors}},`,
  ];
  if (p.year) lines.push(`  year = {${p.year}},`);
  if (p.journal) lines.push(`  journal = {${p.journal}},`);
  if (p.doi) lines.push(`  doi = {${p.doi}},`);
  lines.push(`}`);
  return lines.join("\n");
}

export function toBibTeXAll(papers: SavedPaper[]): string {
  return papers.map(toBibTeX).join("\n\n");
}

export function toCitation(p: SavedPaper, style: "apa" | "mla" | "chicago" = "apa"): string {
  if (style === "mla") {
    return `${p.authors}. "${p.title}." ${p.journal ?? ""} ${p.year ?? ""}.`;
  }
  if (style === "chicago") {
    return `${p.authors}. "${p.title}." ${p.journal ?? ""} (${p.year ?? "n.d."}).`;
  }
  return `${p.authors} (${p.year ?? "n.d."}). ${p.title}. ${p.journal ?? ""}.`;
}
