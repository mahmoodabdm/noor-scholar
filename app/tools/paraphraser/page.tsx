'use client';

import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Sparkles } from 'lucide-react';

type Mode = 'formal' | 'concise' | 'fluent';

// Real rule-based paraphrasing: transforms the USER's text, not a canned sentence.
// Honest limitation: this is a synonym + structure helper, not AI rewriting.
const SYNONYMS: Record<string, string> = {
  'show': 'demonstrate',
  'shows': 'demonstrates',
  'showed': 'demonstrated',
  'use': 'utilize',
  'uses': 'utilizes',
  'used': 'utilized',
  'using': 'utilizing',
  'important': 'significant',
  'big': 'substantial',
  'many': 'numerous',
  'a lot of': 'a substantial number of',
  'get': 'obtain',
  'got': 'obtained',
  'find': 'identify',
  'found': 'identified',
  'finds': 'identifies',
  'help': 'facilitate',
  'helps': 'facilitates',
  'helped': 'facilitated',
  'need': 'require',
  'needs': 'requires',
  'needed': 'required',
  'make': 'produce',
  'makes': 'produces',
  'made': 'produced',
  'look at': 'examine',
  'looks at': 'examines',
  'about': 'regarding',
  'also': 'furthermore',
  'but': 'however',
  'so': 'therefore',
  'because': 'due to the fact that',
  'very': 'highly',
  'really': 'genuinely',
  'good': 'effective',
  'bad': 'problematic',
  'thing': 'factor',
  'things': 'factors',
  'way': 'approach',
  'ways': 'approaches',
  'people': 'research participants',
  'study': 'investigation',
  'studies': 'investigations',
  'paper': 'study',
  'idea': 'concept',
  'ideas': 'concepts',
};

function replaceSynonyms(text: string, mode: Mode): string {
  let out = text;
  // Long phrases first so "a lot of" is replaced before "a"
  const keys = Object.keys(SYNONYMS).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    const replacement = mode === 'concise' && ['furthermore', 'therefore', 'due to the fact that'].includes(SYNONYMS[key])
      ? key // in concise mode keep short connectors
      : SYNONYMS[key];
    const regex = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    out = out.replace(regex, (match) => {
      // Keep first letter capitalisation
      if (match[0] === match[0].toUpperCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }
  return out;
}

function paraphraseUserText(input: string, mode: Mode): string {
  const sentences = input
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const transformed = sentences.map((sentence) => {
    let s = replaceSynonyms(sentence, mode);

    if (mode === 'formal') {
      // "We show that X" -> "This study demonstrates that X"
      s = s.replace(/^We\s+/i, 'This study ');
      s = s.replace(/^I\s+think\s+/i, 'It is argued that ');
      if (!/^(This|It|The|Furthermore|However|Therefore|In|According|Based)/i.test(s)) {
        s = `It is evident that ${s[0].toLowerCase() + s.slice(1)}`;
      }
    }
    if (mode === 'concise') {
      s = s.replace(/\b(in order to)\b/gi, 'to');
      s = s.replace(/\b(due to the fact that)\b/gi, 'because');
      s = s.replace(/\b(a substantial number of)\b/gi, 'many');
      s = s.replace(/\b(it is evident that)\b/gi, '');
    }
    if (mode === 'fluent') {
      s = s.replace(/^This study /i, 'In this study, ');
    }
    return s.trim();
  });

  return transformed.join(' ');
}

export default function ParaphraserPage() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<Mode>('formal');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const sampleText =
    'Many studies show that students use AI tools to help them write. It is important to cite sources because plagiarism is bad for academic work.';

  const handleParaphrase = () => {
    const textToUse = inputText.trim() || sampleText;
    const result = paraphraseUserText(textToUse, mode);
    setOutputText(result);
    setWordCount(result.split(/\s+/).filter(Boolean).length);
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Scientific Writing Assistant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Free Academic Paraphraser for Researchers
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Paste your own sentences. This tool rewrites <b>your text</b> with academic synonyms and structure - not a canned example.
        </p>
        <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Rule-based helper, not AI rewriting. Always check the meaning and cite the original source.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tone &amp; Mode:</span>
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
            onClick={() => setInputText(sampleText)}
            className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Insert Sample Text
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
              placeholder="Paste YOUR draft sentences here..."
              className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-emerald-500 focus:outline-none transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="font-semibold text-emerald-700">Paraphrased Version {wordCount > 0 && `• ${wordCount} words`}</span>
              {outputText && (
                <button onClick={handleCopy} className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 font-semibold cursor-pointer">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
            <div className="w-full min-h- p-4 text-sm bg-emerald-50/40 border border-emerald-200 rounded-2xl text-slate-800 leading-relaxed overflow-y-auto">
              {outputText ? <p>{outputText}</p> : <span className="text-slate-400 italic">Paste your text, choose a mode, and click Paraphrase. The output will be YOUR text rewritten.</span>}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleParaphrase}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Paraphrase My Text</span>
          </button>
        </div>
      </div>

      <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">The Role of Academic Paraphrasing</h2>
        <p>True academic paraphrasing is not substituting synonyms mechanically. You must absorb the idea, then re-articulate it with clarity and precision, and always cite the original source.</p>
        <h3 className="text-xl font-bold text-slate-900">Ethical Paraphrasing vs. Academic Misconduct</h3>
        <p>Paraphrasing an idea still requires a citation. Restating findings in your own words without a citation remains plagiarism under university ethics codes.</p>
      </article>
    </div>
  );
}
