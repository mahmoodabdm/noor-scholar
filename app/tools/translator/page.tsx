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
    } catch {
      // fallback
    }
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
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10 space-y-5">
        {/* Language & Discipline bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="h-10 px-3 bg-slate-50 border border-slate-
