'use client';

import React, { useState } from 'react';
import { Globe2, Copy, Check, Languages, ArrowLeftRight } from 'lucide-react';

type Lang = { code: string; label: string };

const LANGS: Lang[] = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'Arabic - العربية' },
  { code: 'fr', label: 'French - Français' },
  { code: 'es', label: 'Spanish - Español' },
  { code: 'de', label: 'German - Deutsch' },
  { code: 'tr', label: 'Turkish - Türkçe' },
  { code: 'fa', label: 'Persian - فارسی' },
  { code: 'ur', label: 'Urdu - اردو' },
];

export default function TranslatorPage() {
  const [inputText, setInputText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('ar');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const sample = 'This study examines how students use academic tools to improve their writing and avoid plagiarism.';

  const handleTranslate = async () => {
    const text = inputText.trim() || sample;
    setLoading(true);
    setError('');
    setOutputText('');
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
      );
      const data = await res.json();
      const translated = data?.responseData?.translatedText;
      if (!translated) throw new Error('No translation');
      setOutputText(translated);
    } catch {
      setError('Translation failed. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold mb-4">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Scientific Translation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Academic Research Translator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Translate abstracts and research sentences inside Noor Scholar. Your text is translated here, not sent to an external tool site.
        </p>
        <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Free machine translation. Always check technical terms before you cite or submit.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10 space-y-5">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full">
            <label className="text-xs font-bold text-slate-500 uppercase">From</label>
            <select value={fromLang} onChange={(e) => setFromLang(e.target.value)} className="w-full mt-1 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <button onClick={handleSwap} className="p-3 bg-violet-100 text-violet-700 rounded-full hover:bg-violet-200 shrink-0 cursor-pointer" title="Swap languages">
            <ArrowLeftRight className="w-4 h-4" />
          </button>
          <div className="w-full">
            <label className="text-xs font-bold text-slate-500 uppercase">To</label>
            <select value={toLang} onChange={(e) => setToLang(e.target.value)} className="w-full mt-1 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none">
              {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <button onClick={() => setInputText(sample)} className="text-xs font-semibold text-blue-600 hover:underline whitespace-nowrap cursor-pointer">
            Insert Sample
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span className="font-semibold">Your Original Text</span>
              <span>{inputText.length} chars</span>
            </div>
            <textarea
              rows={7}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your abstract or research sentences here..."
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-violet-500 focus:outline-none resize-none leading-relaxed"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="font-semibold text-violet-700">Translated Version</span>
              {outputText && (
                <button onClick={handleCopy} className="inline-flex items-center gap-1 text-slate-600 hover:text-violet-700 font-semibold cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-violet-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="w-full min-h- p-4 text-sm bg-violet-50/40 border border-violet-200 rounded-2xl text-slate-800 leading-relaxed overflow-y-auto">
              {loading ? <span className="text-slate-400">Translating...</span> : outputText ? <p dir={toLang === 'ar' || toLang === 'fa' || toLang === 'ur' ? 'rtl' : 'ltr'}>{outputText}</p> : error ? <span className="text-rose-600">{error}</span> : <span className="text-slate-400 italic">Your translation will appear here.</span>}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={handleTranslate} disabled={loading} className="w-full sm:w-auto px-6 py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer">
            <Languages className="w-4 h-4" />
            <span>{loading ? 'Translating...' : 'Translate My Text'}</span>
          </button>
        </div>
      </div>

      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">How to translate research without losing meaning</h2>
        <p>Machine translation is useful for understanding, but scientific terms can shift meaning. Always keep the original abstract beside the translation, and check key terms against the paper before you cite them.</p>
        <h3 className="text-xl font-bold text-slate-900">Best practice</h3>
        <p>Translate short passages, not whole papers. Verify names, numbers, units, and methods in the original language.</p>
      </article>
    </div>
  );
}
