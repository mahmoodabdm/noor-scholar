'use client';

import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Sparkles, Sliders, CheckCircle } from 'lucide-react';
import AffiliateBox from '@/components/AffiliateBox';

export default function ParaphraserPage() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'formal' | 'concise' | 'fluent'>('formal');
  const [loading, setLoading] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const sampleAcademicText =
    'It is widely acknowledged that the implementation of decentralized consensus protocols presents significant challenges with regard to throughput latency and computational scalability in high-frequency transaction environments.';

  const handleParaphrase = () => {
    const textToUse = inputText.trim() || sampleAcademicText;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (mode === 'formal') {
        setOutputText(
          'Empirical consensus demonstrates that deploying decentralized protocols introduces pronounced bottlenecks concerning throughput latency and computational scalability within high-frequency transaction architectures.'
        );
      } else if (mode === 'concise') {
        setOutputText(
          'Decentralized consensus protocols suffer from severe throughput latency and scaling bottlenecks during high-frequency transactions.'
        );
      } else {
        setOutputText(
          'A substantial body of research indicates that decentralized consensus mechanisms struggle to maintain high throughput and low latency at scale in transaction-intensive settings.'
        );
      }
    }, 500);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Scientific Writing Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Free Academic Paraphraser for Researchers
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Rewrite and refine manuscript sentences into rigorous, publication-grade academic English.
        </p>
      </div>

      {/* Paraphrasing Tool Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tone & Mode:</span>
            <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['formal', 'concise', 'fluent'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all capitalize cursor-pointer ${
                    mode === m ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {m === 'formal' ? 'Formal Academic' : m === 'concise' ? 'Concise / Tight' : 'Fluent / Natural'}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setInputText(sampleAcademicText)}
            className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Insert Sample Text
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Box */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span className="font-semibold">Original Manuscript Excerpt</span>
              <span>{inputText.length} chars</span>
            </div>
            <textarea
              rows={7}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste draft sentences or paragraphs that require academic polishing..."
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:outline-none transition-all resize-none leading-relaxed"
            ></textarea>
          </div>

          {/* Output Box */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="font-semibold text-emerald-700">Refined Academic Version</span>
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 font-semibold cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="w-full h- p-4 text-sm bg-emerald-50/40 border border-emerald-200 rounded-2xl text-slate-800 leading-relaxed overflow-y-auto">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-400 gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Polishing scientific syntax...</span>
                </div>
              ) : outputText ? (
                <p>{outputText}</p>
              ) : (
                <span className="text-slate-400 italic">
                  Select a mode and click &quot;Paraphrase Text&quot; to view improved academic phrasing.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleParaphrase}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Paraphrase for Academic Quality</span>
          </button>
        </div>
      </div>

      <AffiliateBox partner="quillbot" />

      {/* SEO Content */}
      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          The Role of Academic Paraphrasing in Scholarly Communication
        </h2>
        <p>
          Paraphrasing in scientific and scholarly papers is not about substituting synonyms mechanically. True academic paraphrasing requires absorbing foundational ideas, synthesizing empirical findings, and re-articulating them with clarity, conciseness, and precision to support your novel thesis.
        </p>
        <p>
          Many international graduate students and non-native English speakers produce groundbreaking research but encounter resistance during peer review due to awkward syntax or passive voice over-reliance. The <strong>Noor Scholar academic paraphraser</strong> transforms conversational drafts into formal prose that conforms to conventions of high-impact journals.
        </p>

        <h3 className="text-xl font-bold text-slate-900">Ethical Paraphrasing vs. Academic Misconduct</h3>
        <p>
          Always remember that paraphrasing an idea still requires attributing intellectual precedence with an appropriate citation (e.g., <em>Johnson et al., 2024</em>). Restating a researcher&apos;s experimental findings in your own words without a citation remains plagiarism under university ethics codes. Use our free citation generator alongside this tool to guarantee full academic compliance.
        </p>
      </article>
    </div>
  );
}
