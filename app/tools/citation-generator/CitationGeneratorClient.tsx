"use client";
import { useState } from 'react';

type Meta = { title: string; authors: string[]; year: string; journal: string; volume: string; issue: string; pages: string; doi: string; publisher: string; };
type Faq = { q: string; a: string };

function formatAuthorsAPA(authors: string[]) {
  if (!authors.length) return '';
  const formatted = authors.map(a => {
    const parts = a.trim().split(' ');
    if (parts.length === 1) return a;
    const last = parts[parts.length-1];
    const initials = parts.slice(0,-1).map(p=>p[0]+'.').join(' ');
    return `${last}, ${initials}`;
  });
  if (formatted.length === 1) return formatted[0];
  if (formatted.length === 2) return formatted.join(' & ');
  return formatted.slice(0,-1).join(', ') + ', & ' + formatted[formatted.length-1];
}
function formatAuthorsMLA(authors: string[]) {
  if (!authors.length) return '';
  if (authors.length === 1) {
    const p = authors[0].split(' '); return `${p[p.length-1]}, ${p.slice(0,-1).join(' ')}`;
  }
  if (authors.length === 2) return `${authors[0].split(' ').slice(-1)} , ${authors[0].split(' ').slice(0,-1).join(' ')} and ${authors[1]}`;
  return `${authors[0].split(' ').slice(-1)}, ${authors[0].split(' ').slice(0,-1).join(' ')}, et al.`;
}

export default function CitationGeneratorClient({ faqs = [] }: { faqs?: Faq[] }) {
  const [input, setInput] = useState('');
  const [style, setStyle] = useState<'APA'|'MLA'|'Chicago'>('APA');
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);

  async function fetchMeta() {
    setError(''); setLoading(true); setMeta(null);
    const q = input.trim();
    if (!q) { setError('Paste a DOI, title, or URL first.'); setLoading(false); return; }
    try {
      let url = '';
      const doiMatch = q.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
      if (doiMatch) url = `https://api.openalex.org/works/https://doi.org/${doiMatch[0]}`;
      else if (q.startsWith('http')) {
        const doi2 = q.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
        url = doi2 ? `https://api.openalex.org/works/https://doi.org/${doi2[0]}` : `https://api.openalex.org/works?search=${encodeURIComponent(q)}&per-page=1`;
      } else url = `https://api.openalex.org/works?search=${encodeURIComponent(q)}&per-page=1`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      const work = data.results ? data.results[0] : data;
      if (!work || !work.title) throw new Error('Not found');
      setMeta({
        title: work.title || '',
        authors: (work.authorships || []).map((a:any)=>a.author?.display_name).filter(Boolean),
        year: work.publication_year ? String(work.publication_year) : '',
        journal: work.primary_location?.source?.display_name || work.host_venue?.display_name || '',
        volume: work.biblio?.volume || '',
        issue: work.biblio?.issue || '',
        pages: work.biblio?.first_page && work.biblio?.last_page ? `${work.biblio.first_page}-${work.biblio.last_page}` : work.biblio?.first_page || '',
        doi: work.doi?.replace('https://doi.org/','') || '',
        publisher: work.primary_location?.source?.host_organization_name || '',
      });
    } catch(e) {
      setError('Could not fetch metadata. You can fill the fields manually below.');
      setManual(true);
      setMeta({ title: '', authors: [], year: '', journal: '', volume: '', issue: '', pages: '', doi: '', publisher: '' });
    } finally { setLoading(false); }
  }

  function buildCitation() {
    if (!meta) return '';
    const { title, authors, year, journal, volume, issue, pages, doi } = meta;
    const doiUrl = doi ? `https://doi.org/${doi}` : '';
    if (style === 'APA') {
      let s = '';
      if (authors.length) s += formatAuthorsAPA(authors) + ' ';
      if (year) s += `(${year}). `;
      if (title) s += `${title}. `;
      if (journal) s += `${journal}`;
      if (volume) s += `, ${volume}`;
      if (issue) s += `(${issue})`;
      if (pages) s += `, ${pages}`;
      s += '.';
      if (doiUrl) s += ` ${doiUrl}`;
      return s;
    }
    if (style === 'MLA') {
      let s = '';
      if (authors.length) s += formatAuthorsMLA(authors) + '. ';
      if (title) s += `"${title}." `;
      if (journal) s += `${journal}`;
      if (volume) s += `, vol. ${volume}`;
      if (issue) s += `, no. ${issue}`;
      if (year) s += `, ${year}`;
      if (pages) s += `, pp. ${pages}`;
      s += '.';
      if (doiUrl) s += ` ${doiUrl}`;
      return s;
    }
    let s = '';
    if (authors.length) s += formatAuthorsAPA(authors) + ' ';
    if (year) s += `${year}. `;
    if (title) s += `"${title}." `;
    if (journal) s += `${journal} ${volume}`;
    if (issue) s += `, no. ${issue}`;
    if (year) s += ` (${year})`;
    if (pages) s += `: ${pages}`;
    s += '.';
    if (doiUrl) s += ` ${doiUrl}`;
    return s;
  }

  const citation = buildCitation();

  return (
    <div className="flex-1 bg-white">
      <section className="max-w-3xl mx-auto px-4 py-14 text-center">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">FREE TOOL - NO ACCOUNT NEEDED</span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mt-4 leading-tight">Free APA Citation Generator</h1>
        <p className="text-slate-600 mt-4 text-lg">Paste a DOI, title, or URL. Get APA 7th, MLA 9th, and Chicago in seconds.</p>
      </section>
      <div className="max-w-3xl mx-auto px-4 pb-10">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <label className="block text-left text-sm font-bold text-slate-900 mb-2">DOI, Title, or URL</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="e.g. 10.1038/nature12345 or Deep Learning Transformers" className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-500" />
            <button onClick={fetchMeta} disabled={loading} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl disabled:opacity-50">{loading ? 'Searching...' : 'Generate'}</button>
          </div>
          {error && <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mt-3 text-left">{error}</p>}
          <button onClick={()=>{setManual(!manual); if(!meta) setMeta({title:input,authors:[],year:'',journal:'',volume:'',issue:'',pages:'',doi:'',publisher:''});}} className="text-xs text-blue-600 font-semibold mt-3 underline">Or fill manually →</button>
        </div>
        {(meta || manual) && (
          <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-5 text-left space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input placeholder="Title" value={meta?.title||''} onChange={e=>setMeta({...meta!, title:e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="Authors (comma separated)" value={meta?.authors.join(', ')||''} onChange={e=>setMeta({...meta!, authors:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} className="px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="Year" value={meta?.year||''} onChange={e=>setMeta({...meta!, year:e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="Journal" value={meta?.journal||''} onChange={e=>setMeta({...meta!, journal:e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="Volume" value={meta?.volume||''} onChange={e=>setMeta({...meta!, volume:e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="Issue" value={meta?.issue||''} onChange={e=>setMeta({...meta!, issue:e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="Pages e.g. 123-135" value={meta?.pages||''} onChange={e=>setMeta({...meta!, pages:e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
              <input placeholder="DOI" value={meta?.doi||''} onChange={e=>setMeta({...meta!, doi:e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
            </div>
            <div className="flex gap-2">
              {(['APA','MLA','Chicago'] as const).map(s=>(
                <button key={s} onClick={()=>setStyle(s)} className={`px-4 py-2 rounded-full text-sm font-bold ${style===s ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>{s}{s==='APA'?' 7th':s==='MLA'?' 9th':''}</button>
              ))}
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm leading-relaxed text-slate-800 min-h-[70px]">{citation || 'Fill fields above to see citation.'}</div>
            <div className="flex gap-2">
              <button onClick={()=>{navigator.clipboard.writeText(citation); setCopied(true); setTimeout(()=>setCopied(false),2000);}} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl">{copied ? 'Copied ✓' : 'Copy Citation'}</button>
              <span className="text-xs text-slate-500 self-center">Always check against your style guide before submitting.</span>
            </div>
          </div>
        )}
      </div>
      {faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 py-10 text-left">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How to use it</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-sm">{f.q}</h3>
                <p className="text-slate-600 text-sm mt-1">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-6">Data source: OpenAlex / CrossRef. Coverage and metadata quality vary by publisher.</p>
        </section>
      )}
    </div>
  );
}
