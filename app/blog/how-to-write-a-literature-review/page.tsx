import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Write a Literature Review in 2026 (Step-by-Step Guide)',
  description:
    'Learn how to write a literature review step-by-step in 2026. From finding sources to structuring, synthesizing, and citing correctly, with examples for thesis and research papers.',
};

export default function LiteratureReviewPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>
      <span className="font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">Academic Writing</span>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-4 mb-4 leading-tight">
        How to Write a Literature Review in 2026 (Step-by-Step Guide for Students)
      </h1>
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10">
        <span className="flex items-center gap-1"><User className="w-4 h-4" /> Editorial Team</span>
        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> November 11, 2026</span>
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 9 min read</span>
      </div>
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-[17px]">
        <p>A literature review is not a summary of everything you read. It is the story of what researchers already know about your topic, where they disagree, and where there is still a gap for your research to fill.</p>
        <p>In 2026, with over 5 million new papers published every year, no one expects you to read everything. Examiners expect you to show that you can search smartly, select the right studies, and synthesize them into a clear argument.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">What Is a Literature Review?</h2>
        <p>A literature review is a critical evaluation of existing scholarly sources related to your research question. Its purpose is to show what is already known, identify patterns and contradictions, find the research gap, and justify why your research is needed.</p>
        <p>A weak literature review lists papers one by one: Smith said X. Jones said Y. A strong literature review groups papers by theme, compares their findings, and builds an argument.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Step 1: Define a Narrow Research Question</h2>
        <p>Do not start with a broad topic like artificial intelligence in education. Narrow it down: How does AI-based feedback affect writing accuracy among undergraduate students? A narrow question makes searching, selecting, and writing 10x easier.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Step 2: Search for Sources Strategically</h2>
        <p>Use Noor Scholar, Google Scholar, PubMed, and Semantic Scholar. Use the cited by feature: find one excellent review paper from 2024 or 2025, then check all papers that cited it. This is the fastest way to find the most current research. Aim for 30-50 sources for a thesis chapter, and 15-25 for a course assignment.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Step 3: Organize Your Sources Before You Write</h2>
        <p>Create a simple table with Author, Research Question, Method, Key Finding, and Limitation. After you fill this table, patterns will appear on their own. You will see that most studies focused on undergraduates and ignored postgraduates. That gap is your research opportunity.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Step 4: Structure Your Literature Review</h2>
        <p>Do not organize by author. Organize by theme:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Introduction:</b> State your question, why it matters, and how you searched.</li>
          <li><b>Theme 1:</b> The main debate in the field.</li>
          <li><b>Theme 2:</b> The methods previous studies used.</li>
          <li><b>Theme 3:</b> What is missing - the gap.</li>
          <li><b>Conclusion:</b> Summarize and state how your research fills the gap.</li>
        </ul>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Step 5: Write With Synthesis, Not Summary</h2>
        <p>Do not write: Smith found X. Jones found Y. Write like this: While Smith (2024) found that AI feedback improved accuracy by 22%, Jones (2023) argues that this improvement disappears without teacher guidance. This disagreement suggests effectiveness depends on human support, a factor not tested in postgraduate settings.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Step 6: Cite Correctly and Avoid Plagiarism</h2>
        <p>Every claim that is not your own idea must be cited. Paraphrase in your own words, do not just change 2-3 words. Use APA 7th edition for social sciences unless your university says otherwise. Use our free <Link href="/tools/citation-generator" className="text-blue-600 font-bold">Citation Generator</Link> to format APA and MLA correctly.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Common Mistakes to Avoid</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Listing papers instead of themes - the #1 mistake.</li>
          <li>Using old sources only - include at least 70% from the last 5 years.</li>
          <li>No critical evaluation - say if the method was strong or weak.</li>
          <li>No research gap - if you do not identify a gap, your review has no purpose.</li>
        </ul>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">FAQ</h2>
        <p><b>Can I use AI to write my literature review?</b><br/>You can use AI to summarize papers and find themes, but you must write the final analysis yourself. Use AI as an assistant, not as an author.</p>
        <p><b>How many sources do I need?</b><br/>For a Bachelor thesis, 30-40 sources are enough. For a Master thesis, aim for 50-70. For a PhD, 100+ is normal.</p>
        <p><b>What is the difference between a literature review and a systematic review?</b><br/>A literature review is narrative and thematic. A systematic review follows a strict protocol (PRISMA) with clear inclusion criteria.</p>
        <div className="bg-blue-50 p-6 rounded-2xl mt-8">
          <h3 className="font-bold text-slate-900 mb-2">Need help with your research?</h3>
          <p className="text-sm mb-4">Try our free academic tools to summarize, paraphrase, and cite your sources correctly.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/summarizer" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">Try Summarizer</Link>
            <Link href="/tools/paraphraser" className="bg-white border px-4 py-2 rounded-full text-sm font-bold">Try Paraphraser</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
