'use client';

import { useState, useMemo } from 'react';
import { ShieldCheck, CheckCircle, AlertTriangle, Copy, RotateCcw, FileText } from 'lucide-react';

type SentenceResult = {
  text: string;
  words: number;
  status: 'ok' | 'long' | 'duplicate' | 'risk';
  reason: string;
};

function splitSentences(text: string): string[] {
  return text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2);
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\u0600-\u06FF\s]/gi, '').replace(/\s+/g, ' ').trim();
}

export default function PlagiarismCheckerPage() {
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(false);

  const analysis = useMemo(() => {
    if (!text.trim()) return null;
    const sentences = splitSentences(text);
    const seen = new Map<string, number>();
    const results: SentenceResult[] = sentences.map((s) => {
      const key = normalize(s);
      const count = (seen.get(key) || 0) + 1;
      seen.set(key, count);
      const words = s.split(/\s+/).length;

      if (count > 1) {
        return { text: s, words, status: 'duplicate', reason: 'Repeated sentence - rewrite it or delete the duplicate.' };
      }
      if (words > 35) {
        return { text: s, words, status: 'long', reason: 'Very long sentence - split it into 2 shorter sentences.' };
      }
      if (words > 25) {
        return { text: s, words, status: 'risk', reason: 'Long sentence - check if you copied the structure from the source.' };
      }
      return { text: s, words, status: 'ok', reason: 'Looks original in structure.' };
    });

    const totalWords = text.trim().split(/\s+/).length;
    const duplicates = results.filter((r) => r.status === 'duplicate').length;
    const longOnes = results.filter((r) => r.status === 'long' || r.status === 'risk').length;

    // Honest internal score: not Turnitin, only internal repetition + structure risk
    let riskScore = 0;
    if (sentences.length > 0) {
      riskScore = Math.min(100, Math.round((duplicates / sentences.length) * 100 + (longOnes / sentences.length) * 35));
    }
    const originality = 100 - riskScore;

    let verdict = 'Low risk - good draft';
    let verdictColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (riskScore >= 40) {
      verdict = 'High risk - rewrite before submitting';
      verdictColor = 'text-rose-700 bg-rose-50 border-rose-200';
    } else if (riskScore >= 20) {
      verdict = 'Medium risk - fix the flagged sentences';
      verdictColor = 'text-amber-700 bg-amber-50 border-amber-200';
    }

    return { sentences: results, totalWords, sentenceCount: sentences.length, duplicates, longOnes, riskScore, originality, verdict, verdictColor };
  }, [text]);

  const copyReport = () => {
    if (!analysis) return;
    const report = `Noor Scholar - Internal Originality Check\nSentences: ${analysis.sentenceCount}\nWords: ${analysis.totalWords}\nDuplicate sentences: ${analysis.duplicates}\nOriginality estimate: ${analysis.originality}%\nVerdict: ${analysis.verdict}\n\nNote: This is an internal draft check. It does NOT search the internet or compare with Turnitin database.`;
    navigator.clipboard.writeText(report);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Internal Tool - No External Links</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Academic Plagiarism Checker
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          Paste your draft below. This tool checks it inside your browser for repeated sentences, very long sentences, and risky structure. Your text never leaves your device.
        </p>
        <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 inline-block">
          Important: This is an internal draft check. It does NOT search the internet and is NOT a replacement for Turnitin or iThenticate.
        </p>
      </div>

      {/* Tool */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <FileText className="w-4 h-4 text-rose-600" />
            Paste your text here
          </div>
          <button
            onClick={() => { setText(''); setChecked(false); }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setChecked(false); }}
          placeholder="Example: Artificial intelligence improves student feedback speed. Teachers can use AI tools to give faster feedback..."
          className="w-full min-h- p-5 text-sm leading-relaxed text-slate-800 outline-none resize-y"
        />
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {text.trim() ? `${text.trim().split(/\s+/).length} words` : '0 words'} • Your text stays in your browser
          </span>
          <button
            onClick={() => setChecked(true)}
            disabled={!text.trim()}
            className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 text-white text-sm font-bold"
          >
            Check My Draft Now
          </button>
        </div>
      </div>

      {/* Results */}
      {checked && analysis && (
        <div className="space-y-6 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
              <div className="text-2xl font-black text-slate-900">{analysis.originality}%</div>
              <div className="text-xs text-slate-500 mt-1">Internal Originality</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
              <div className="text-2xl font-black text-slate-900">{analysis.sentenceCount}</div>
              <div className="text-xs text-slate-500 mt-1">Sentences</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
              <div className="text-2xl font-black text-rose-600">{analysis.duplicates}</div>
              <div className="text-xs text-slate-500 mt-1">Duplicate Sentences</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center">
              <div className="text-2xl font-black text-amber-600">{analysis.longOnes}</div>
              <div className="text-xs text-slate-500 mt-1">Need Rewriting</div>
            </div>
          </div>

          <div className={`p-4 rounded-2xl border font-bold text-sm flex items-center justify-between gap-3 ${analysis.verdictColor}`}>
            <span>{analysis.verdict}</span>
            <button onClick={copyReport} className="flex items-center gap-1.5 text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700">
              <Copy className="w-3.5 h-3.5" /> Copy Report
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">Sentence by Sentence</h2>
            {analysis.sentences.map((s, i) => (
              <div key={i} className={`p-4 rounded-xl border text-sm ${s.status === 'ok' ? 'bg-white border-slate-200' : s.status === 'duplicate' ? 'bg-rose-50 border-rose-200' : 'bg-amber-50 border-amber-200'}`}>
                <p className="text-slate-800 leading-relaxed">{s.text}</p>
                <p className="mt-2 text-xs flex items-start gap-1.5 text-slate-600">
                  {s.status === 'ok' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />}
                  <span>{s.reason} • {s.words} words</span>
                </p>
                {s.status !== 'ok' && (
                  <p className="mt-2 text-xs text-slate-500">Tip: Read it, close the source, write it in your own words, then add the citation.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guide - keep SEO content */}
      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">What Is an Acceptable Similarity Percentage?</h2>
        <p>Many students think 0% similarity is required. In reality, citations, common phrases, and standard methodology descriptions can trigger matches. Universities do not use one fixed number for all journals.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Under 15%:</strong> Usually considered safe, if citations are correct.</li>
          <li><strong>15% to 25%:</strong> Usually needs editorial inspection.</li>
          <li><strong>Above 25%:</strong> Often needs major rewriting before submission.</li>
        </ul>
        <p className="text-xs text-slate-500">This guide is general information, not a rule for your university. Always check your university&apos;s policy.</p>
      </article>
    </div>
  );
}
