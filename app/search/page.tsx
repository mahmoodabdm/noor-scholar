const names = getAuthorNames(w);                  // string[] (clean, for any later use)
const shown = names.slice(0, 3).join(', ');
const extra = names.length > 3 ? ` +${names.length - 3} more` : '';

<p className="mt-3 text-sm text-slate-700">
  {shown || 'Unknown author'}{extra}
</p>

<Link href={`/tools/citation-generator?id=${encodeURIComponent(shortId(w.id))}`}>
  Cite
</Link>
