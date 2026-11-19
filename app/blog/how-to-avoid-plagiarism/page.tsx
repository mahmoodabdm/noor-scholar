import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Avoid Plagiarism in Academic Writing (2026 Complete Guide)',
  description: 'Learn how to avoid plagiarism in academic writing with practical paraphrasing, citing, and checking strategies. Real examples for students and researchers in 2026.',
};

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
      <span className="font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">Academic Writing</span>
      <h1 className="text-4xl font-black text-slate-900 mt-4 mb-4 leading-tight">How to Avoid Plagiarism in Academic Writing (2026 Complete Guide)</h1>
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
        <span className="flex items-center gap-1"><User className="w-4 h-4" /> Editorial Team</span>
        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> November 29, 2026</span>
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</span>
      </div>

      <div className="rounded-3xl overflow-hidden mb-8">
        <Image src="/blog/plagiarism-hero.jpg" alt="Student writing original academic paper to avoid plagiarism" width={1200} height={700} className="w-full object-cover" />
      </div>

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-">
        <p>Plagiarism is not always intentional. Most students are flagged not because they copied on purpose, but because they paraphrased badly, forgot a citation, or reused their own old work without realizing it is also plagiarism.</p>
        <p>In 2026, universities use AI-powered checkers like Turnitin and iThenticate that catch even clever paraphrasing. This guide shows you how to write 100% original work, step by step.</p>

        <h2 className="text-2xl font-bold text-slate-900 pt-4">What Is Plagiarism?</h2>
        <p>Plagiarism is presenting someone else&apos;s ideas, words, or data as your own without credit. It includes: copying text, paraphrasing without citation, using AI text without editing, reusing your previous assignment (self-plagiarism), and using images or data without source.</p>

        <h2 className="text-2xl font-bold text-slate-900 pt-4">5 Rules to Avoid Plagiarism</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>1. Paraphrase properly:</b> Read, close the source, write in your own words, then cite.</li>
          <li><b>2. Cite everything that is not your idea:</b> If you did not invent it, cite it.</li>
          <li><b>3. Use quotes for exact words:</b> If you copy 3+ words in a row, use quotation marks.</li>
          <li><b>4. Keep a source log:</b> Save every link and page number while researching.</li>
          <li><b>5. Check before you submit:</b> Use a plagiarism checker to find accidental matches.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 pt-4">Example: Bad vs Good Paraphrasing</h2>
        <p><b>Original:</b> Artificial intelligence improves student feedback speed.</p>
        <p><b>Bad:</b> Artificial intelligence improves student feedback speed. (Just copied)</p>
        <p><b>Good:</b> According to Smith (2024), AI tools allow teachers to give feedback faster than manual grading.</p>

        <h2 className="text-2xl font-bold text-slate-900 pt-4">FAQ</h2>
        <p><b>Is using AI plagiarism?</b><br/>Using AI to generate your whole essay is academic misconduct in most universities. Using it to brainstorm, outline, and check grammar is allowed if you disclose it.</p>
        <p><b>How much similarity is allowed?</b><br/>Most universities allow 10-15% similarity, but only for citations and common phrases. Anything higher is risky.</p>

        <div className="bg-blue-50 p-6 rounded-2xl">
          <h3 className="font-bold text-slate-900 mb-2">Check your work before submitting</h3>
          <p className="text-sm mb-4">Use our free tools to paraphrase correctly and check for plagiarism.</p>
          <div className="flex gap-3">
            <Link href="/tools/plagiarism-checker" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">Check Plagiarism</Link>
            <Link href="/tools/paraphraser" className="bg-white border px-4 py-2 rounded-full text-sm font-bold">Try Paraphraser</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
