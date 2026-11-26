import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Read a Research Paper: A Simple Method for Students | Noor Scholar",
  description:
    "Learn how to read a research paper without reading every word. A practical 3-pass method for students to find the question, method, and findings fast.",
  alternates: { canonical: "/blog/how-to-read-research-paper" },
};

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link href="/blog" className="text-sm text-blue-600 hover:underline">
        ← Back to Blog
      </Link>

      <p className="mt-6 text-xs font-bold text-blue-600 uppercase tracking-widest">
        Study Guide
      </p>
      <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
        How to Read a Research Paper Without Reading Every Word
      </h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        Most students try to read a research paper like a textbook, from the first word to the last. That is slow and confusing. Research papers are not written to be read that way. Use this 3-pass method instead.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-slate-900">Pass 1: Decide if it is worth reading (5 minutes)</h2>
      <p className="mt-3 text-slate-600 leading-relaxed">
        Read only the title, abstract, introduction, and conclusion. Then ask yourself:
      </p>
      <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-600">
        <li>What research question does this paper try to answer?</li>
        <li>Is it relevant to my assignment or topic?</li>
        <li>What is the main finding?</li>
      </ul>
      <p className="mt-3 text-slate-600 leading-relaxed">
        If it is not relevant, stop here. Save your time. If it is relevant, save it to{" "}
        <Link href="/my-library" className="text-blue-600 underline">My Library</Link> and go to Pass 2.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-slate-900">Pass 2: Understand the method and findings (15-20 minutes)</h2>
      <p className="mt-3 text-slate-600 leading-relaxed">
        Now read the method and results sections. Do not try to understand every statistic. Focus on:
      </p>
      <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-600">
        <li>Who or what was studied?</li>
        <li>What did the authors do?</li>
        <li>What did they find?</li>
        <li>Look at the tables and figures. The captions often explain the result.</li>
      </ul>
      <p className="mt-3 text-slate-600 leading-relaxed">
        Write 3-4 sentences in your own words: question, method, finding. If you cannot, you did not understand it yet. Read the abstract again.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-slate-900">Pass 3: Read critically (only if you will cite it)</h2>
      <p className="mt-3 text-slate-600 leading-relaxed">
        Only do this pass if you plan to use the paper in your assignment. Read the full paper and ask:
      </p>
      <ul className="mt-3 list-disc pl-6 space-y-2 text-slate-600">
        <li>Are the claims supported by the data?</li>
        <li>What are the limitations the authors mention?</li>
        <li>Does it agree or disagree with other papers you read?</li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-slate-900">How to take notes that you can cite later</h2>
      <p className="mt-3 text-slate-600 leading-relaxed">
        For every paper you keep, write down the DOI, the authors, and the year. Copying a sentence without its source is how accidental plagiarism happens.
      </p>
      <p className="mt-3 text-slate-600 leading-relaxed">
        When you are ready to cite, use the{" "}
        <Link href="/tools/citation-generator" className="text-blue-600 underline">Citation Generator</Link> to create an APA, MLA, or Chicago citation from the paper metadata, and always check it against your style guide.
      </p>

      <div className="mt-10 p-6 rounded-2xl bg-blue-50 border border-blue-200">
        <h3 className="font-bold text-slate-900">Try it now</h3>
        <p className="mt-1 text-sm text-slate-600">
          Search for a paper, save it, and try the 3-pass method on its abstract.
        </p>
        <Link href="/#search" className="mt-4 inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full">
          Search papers →
        </Link>
      </div>

      <p className="mt-8 text-xs text-slate-400">
        Related: <Link href="/blog/how-to-avoid-plagiarism" className="underline">How to avoid plagiarism</Link> · <Link href="/blog/how-to-cite-research-paper-apa" className="underline">How to cite in APA 7th</Link>
      </p>
    </main>
  );
}
