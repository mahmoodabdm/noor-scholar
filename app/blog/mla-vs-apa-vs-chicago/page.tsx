import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MLA vs APA vs Chicago: Which Citation Style Should You Use? (2026 Guide)',
  description: 'Confused between MLA, APA, and Chicago? This complete 2026 guide compares formatting, in-text citations, reference lists, and when to use each style with real examples.',
};

export default function MlaVsApaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 mb-8"><ArrowLeft className="w-4 h-4" /> Back to Blog</Link>
      <span className="font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">Citations & Style</span>
      <h1 className="text-4xl font-black text-slate-900 tracking-tight mt-4 mb-4 leading-tight">MLA vs APA vs Chicago: Which Citation Style Should You Use? (2026 Guide)</h1>
      <div className="flex items-center gap-4 text-sm text-slate-500 mb-10">
        <span className="flex items-center gap-1"><User className="w-4 h-4" /> Editorial Team</span>
        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> November 13, 2026</span>
        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 8 min read</span>
      </div>
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-[17px]">
        <p>Every student has faced this moment: your professor says format your paper in APA, your friend says MLA, and Google says Chicago. Which one is correct?</p>
        <p>The truth is simple: there is no best style. There is only the right style for your subject. Using the wrong style can cost you marks even if your research is perfect. This guide will show you the exact differences, with examples, so you never get confused again.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Quick Comparison Table</h2>
        <p><b>APA (American Psychological Association):</b> Used in Psychology, Education, Business, Social Sciences. Focuses on date, because recent research matters.</p>
        <p><b>MLA (Modern Language Association):</b> Used in Literature, Languages, Arts, Humanities. Focuses on author and page, because the exact text matters.</p>
        <p><b>Chicago:</b> Used in History, Philosophy, Religion, and some Social Sciences. Uses footnotes, because historians love detailed notes.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">1. In-Text Citation - The Biggest Difference</h2>
        <p><b>APA:</b> (Smith, 2024, p. 45) - Always includes the year.</p>
        <p><b>MLA:</b> (Smith 45) - No year, no comma. Just author and page.</p>
        <p><b>Chicago (Notes-Bibliography):</b> A small number in the text like this¹, and the full citation at the bottom of the page as a footnote.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">2. Reference List Name</h2>
        <p><b>APA calls it:</b> References</p>
        <p><b>MLA calls it:</b> Works Cited</p>
        <p><b>Chicago calls it:</b> Bibliography</p>
        <p>Same idea, different name. Always start it on a new page, alphabetical order by author last name.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">3. Real Example: Same Book, Three Styles</h2>
        <p><b>APA:</b> Smith, J. (2024). How AI Changes Learning. Oxford University Press.</p>
        <p><b>MLA:</b> Smith, John. How AI Changes Learning. Oxford UP, 2024.</p>
        <p><b>Chicago:</b> Smith, John. How AI Changes Learning. Oxford: Oxford University Press, 2024.</p>
        <p>See how APA puts the year right after the author, MLA shortens the publisher, and Chicago adds the city?</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">4. Formatting Rules</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>APA:</b> Title page required, Running head, Headings have 5 levels, Double-spaced, Times New Roman 12pt.</li>
          <li><b>MLA:</b> No title page (name at top left), No running head, Only first page header, Double-spaced, Times New Roman 12pt.</li>
          <li><b>Chicago:</b> Title page required, Footnotes single-spaced, Bibliography single-spaced with blank line between entries.</li>
        </ul>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Which Style Should YOU Use?</h2>
        <p>Ask yourself two questions:</p>
        <p><b>1. What did your professor ask for?</b> This beats everything. If they said APA, use APA even if you love MLA.</p>
        <p><b>2. What is your major?</b> Psychology, Nursing, Education, Business = APA. English, Literature, Art = MLA. History, Theology, Philosophy = Chicago.</p>
        <p>If you are writing a thesis, check your university guide first. Many Iraqi and Arab universities use APA 7th edition for all scientific colleges, and MLA for English departments.</p>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">Common Mistakes to Avoid</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mixing styles in one paper - Pick one and stick to it.</li>
          <li>Forgetting the hanging indent in the reference list - Second line must be indented.</li>
          <li>Using old editions - Use APA 7th (not 6th) and MLA 9th (not 8th) in 2026.</li>
          <li>Forgetting DOI - In APA, always add DOI for journal articles if available.</li>
        </ul>
        <h2 className="text-2xl font-bold text-slate-900 pt-4">FAQ</h2>
        <p><b>Can I use a citation generator?</b><br/>Yes. Use our free <Link href="/tools/citation-generator" className="text-blue-600 font-bold">Citation Generator</Link> to format APA, MLA, and Chicago correctly in seconds. Always double-check the output.</p>
        <p><b>What is Chicago Author-Date style?</b><br/>Chicago has two systems. Notes-Bibliography uses footnotes (for History). Author-Date uses (Smith 2024) like APA, and is used in sciences. Ask your professor which one they want.</p>
        <p><b>Do I need to cite in every paragraph?</b><br/>If the idea is not yours, yes. When in doubt, cite. It is better to over-cite than to be accused of plagiarism.</p>
        <div className="bg-blue-50 p-6 rounded-2xl mt-8">
          <h3 className="font-bold text-slate-900 mb-2">Still confused about citations?</h3>
          <p className="text-sm mb-4">Paste your source and get a perfect APA, MLA, or Chicago citation instantly.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/citation-generator" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">Try Citation Generator</Link>
            <Link href="/blog/how-to-cite-research-paper-apa" className="bg-white border px-4 py-2 rounded-full text-sm font-bold">Read APA Guide</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
