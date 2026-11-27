// lib/paper-qa.ts
// Free, key-less "chat with a paper". It answers from the paper's abstract and OpenAlex metadata
// by picking the abstract sentences that best match the question. It does not generate new text.

import type { Paper } from "./openalex";

const STOP = new Set(
  "a an the and or but if of to in on for with by at from as is are was were be been being this that these those it its into than then so such can could should would may might will do does did not no we our they their there here which who whom what when where why how about over under between across also more most very using used use paper study work tell me please explain".split(" ")
);

function stem(w: string): string {
  const s = w.replace(/(ations?|ings?|ed|es|s)$/, "");
  return s.length >= 3 ? s : w;
}

function tokens(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)).map(stem);
}

export function splitSentences(text: string): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const parts = clean.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g) || [clean];
  return parts.map((s) => s.trim()).filter((s) => s.length >= 25);
}

const CUES = {
  method: /\b(method|approach|propos|we (?:use|develop|introduce|present|design|conduct|perform|analy[sz]e)|using|framework|model|algorithm|experiment|survey|trial|cohort|simulat|dataset|sample)/i,
  result: /\b(result|find|found|show|demonstrat|reveal|achiev|outperform|improv|conclu|evidence|significant|increase|decrease|reduc)/i,
  problem: /\b(problem|challenge|however|despite|lack|limited|gap|aim|goal|objective|investigat|question|motivat|remain)/i,
  impact: /\b(implication|application|enable|future|potential|impact|provide|suggest|could)/i,
};

type Intent = keyof typeof CUES | "summary" | null;

function detectIntent(q: string): Intent {
  if (/\b(summar|tl;?dr|overview|main (point|idea)|in short|what is it about|what('| i)s this)\b/i.test(q)) return "summary";
  if (/\b(method|how did|how do|approach|technique|design|data(set)?|sample)\b/i.test(q)) return "method";
  if (/\b(result|finding|found|conclusion|outcome|show|discover|learn)\b/i.test(q)) return "result";
  if (/\b(problem|why|motivation|gap|aim|goal|purpose|question|background)\b/i.test(q)) return "problem";
  if (/\b(implication|application|impact|future|useful|matter|so what)\b/i.test(q)) return "impact";
  return null;
}

function bestBy(sentences: string[], cue: RegExp, skip: Set<number> = new Set()): number {
  let best = -1;
  let bestScore = 0;
  sentences.forEach((s, i) => {
    if (skip.has(i)) return;
    const hits = (s.match(new RegExp(cue.source, "gi")) || []).length;
    if (hits > bestScore) { bestScore = hits; best = i; }
  });
  return best;
}

export function summarize(paper: Paper): string {
  const sents = splitSentences(paper.abstract);
  if (!sents.length) return "No abstract is available for this paper in OpenAlex.";
  if (sents.length <= 3) return sents.join(" ");
  const picked = new Set<number>([0]);
  const r = bestBy(sents, CUES.result, picked);
  if (r >= 0) picked.add(r);
  const m = bestBy(sents, CUES.method, picked);
  if (m >= 0 && picked.size < 3) picked.add(m);
  if (picked.size < 3) picked.add(sents.length - 1);
  return Array.from(picked).sort((a, b) => a - b).map((i) => sents[i]).join(" ");
}

function metaAnswer(paper: Paper, q: string): string | null {
  if (/\b(who (wrote|are|is)|authors?|written by|researchers?)\b/i.test(q)) {
    return paper.authors.length ? `Authors: ${paper.authors.slice(0, 12).join(", ")}${paper.authors.length > 12 ? ` and ${paper.authors.length - 12} more` : ""}.` : "OpenAlex doesn’t list authors for this paper.";
  }
  if (/\b(journal|venue|conference|publisher|where (was|is) (it )?published)\b/i.test(q)) {
    return paper.venue ? `It was published in ${paper.venue}.` : "OpenAlex doesn’t list a journal or venue for this paper.";
  }
  if (/\b(what year|which year|when (was|is)|publication (date|year)|published (when|in))\b|\byear\b/i.test(q)) {
    return paper.year ? `It was published in ${paper.year}.` : "OpenAlex doesn’t list a publication year for this paper.";
  }
  if (/\b(cited|citations?|influential|fwci)\b/i.test(q)) {
    const fw = paper.fwci !== null ? ` Its field-weighted citation impact (FWCI) is ${paper.fwci}.` : "";
    return `OpenAlex counts ${paper.citations.toLocaleString()} citations.${fw} Counts differ between databases.`;
  }
  if (/\b(doi|link|pdf|download|open.?access|full text|url|read (it|the paper))\b/i.test(q)) {
    const parts = [paper.doi ? `DOI link: ${paper.doi}` : `Link: ${paper.url}`];
    parts.push(paper.oaUrl ? `Open-access copy: ${paper.oaUrl}` : "No open-access copy is listed in OpenAlex.");
    return parts.join("\n");
  }
  if (/\b(topic|field|subject|discipline|keywords?|tags?)\b/i.test(q)) {
    const bits = [paper.field, paper.subfield].filter(Boolean).join(" › ");
    return bits ? `Field: ${bits}.${paper.tags.length ? ` Tags: ${paper.tags.join(", ")}.` : ""}` : "OpenAlex doesn’t list a field for this paper.";
  }
  return null;
}

export function answerQuestion(paper: Paper, question: string): string {
  const q = question.trim();
  if (!q) return "Type a question about the paper.";
  const meta = metaAnswer(paper, q);
  if (meta) return meta;
  if (!paper.abstract) return "OpenAlex has no abstract for this paper, so I can only answer questions about its authors, year, journal, citations, and links. Open the paper to read the full text.";
  const intent = detectIntent(q);
  if (intent === "summary") return `Summary from the abstract: ${summarize(paper)}`;
  const sents = splitSentences(paper.abstract);
  const qTokens = new Set(tokens(q));
  const scored = sents.map((s, i) => {
    const sTokens = new Set(tokens(s));
    let score = 0;
    qTokens.forEach((t) => { if (sTokens.has(t)) score += 2; });
    if (intent && CUES[intent].test(s)) score += 1.5;
    if (intent === "problem" && i === 0) score += 1;
    if (intent === "result" && i >= sents.length - 2) score += 1;
    return { i, s, score };
  });
  const top = scored.filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 2).sort((a, b) => a.i - b.i);
  if (!top.length) return "I couldn’t find that in the abstract. I only see the abstract and basic details (not the full text), so try asking about the main finding, method, authors, year, or citations — or open the paper to read it in full.";
  return `From the abstract: ${top.map((x) => x.s).join(" ")}`;
}

export const SUGGESTED_QUESTIONS = [
  "Summarize this paper",
  "What did they find?",
  "What method did they use?",
  "Why does it matter?",
  "Who wrote it?",
  "How many citations does it have?",
];
