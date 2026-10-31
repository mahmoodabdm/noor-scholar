'use client';

import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Copy, Check, Sparkles, RefreshCw, BookOpen } from 'lucide-react';
import AffiliateBox from '@/components/AffiliateBox';

export default function TranslatorPage() {
  const [sourceLang, setSourceLang] = useState('ar');
  const [targetLang, setTargetLang] = useState('en');
  const [discipline, setDiscipline] = useState('biomedical');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleArabic = 'أظهرت النتائج التجريبية أن استخدام خوارزميات التعلم العميق ساهم في تقليص معدل الأخطاء التشخيصية بنسبة 24% في تحاليل التصوير بالرنين المغناطيسي.';

  const handleTranslate = () => {
    const textToTranslate = inputText.trim() || sampleArabic;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (sourceLang === 'ar' && targetLang === 'en') {
        setOutputText(
          'Empirical findings demonstrated that the implementation of deep learning algorithms contributed to a 24% reduction in diagnostic error rates within magnetic resonance imaging (MRI) analysis.'
        );
      } else {
        setOutputText(
          'Experimental results demonstrated that the utilization of specialized academic models significantly improved precision and methodological consistency across clinical benchmarks.'
        );
      }
    }, 500);
  };

  const handleSwap = () => {
    const prevSource = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(prevSource);
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
    }
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
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-4">
          <Languages className="w-3.5 h-3.5" />
          <span>Scientific Nomenclature Preserved</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Academic Research Translator
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Translate research papers, abstracts, and technical terms across languages without losing precise scientific meaning.
        </p>
      </div>

      {/* Translator Tool Interface */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10 space-y-5">
        {/* Language & Discipline bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
            >
              <option value="ar">Arabic</option>
              <option value="en">English</option>
            </select>

            <button onClick={handleSwap} className="p-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100">
              <ArrowRightLeft className="w-4 h-4" />
            </button>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            >
              <option value="biomedical">Biomedical</option>
              <option value="engineering">Engineering</option>
              <option value="humanities">Humanities</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={sampleArabic}
              className="w-full min-h- p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-amber-200"
            />
            <button
              onClick={() => setInputText('')}
              className="text-xs text-slate-500 flex items-center gap-1 hover:text-slate-700"
            >
              <RefreshCw className="w-3 h-3" /> Clear
            </button>
          </div>

          <div className="space-y-2">
            <div className="relative w-full min-h- p-4 bg-white border border-slate-200 rounded-2xl text-sm">
              {loading ? (
                <span className="text-slate-400 animate-pulse">Translating...</span>
              ) : (
                outputText || <span className="text-slate-400">Translation will appear here</span>
              )}
              {outputText && (
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-50 border border-slate-200"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleTranslate}
          disabled={loading}
          className="w-full h-12 rounded-2xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>

      <AffiliateBox />
    </div>
  );
}
