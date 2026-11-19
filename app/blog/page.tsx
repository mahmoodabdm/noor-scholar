import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Noor Scholar | Academic Writing Guides',
  description: 'Learn how to write, cite, and research better with our guides for students and researchers.',
};

const posts = [
  {
    slug: 'how-to-avoid-plagiarism',
    title: 'How to Avoid Plagiarism in Academic Writing (2026 Complete Guide)',
    excerpt: 'Learn how to avoid plagiarism with proper paraphrasing, citing, and checking strategies. Real examples for students.',
    date: 'November 29, 2026',
    readTime: '8 min read',
    category: 'Academic Writing',
    image: '/blog/plagiarism-hero.jpg',
  },
  {
    slug: 'mla-vs-apa-vs-chicago',
    title: 'MLA vs APA vs Chicago: Which Citation Style Should You Use? (2026 Guide)',
    excerpt: 'Confused between MLA, APA, and Chicago? This complete guide compares formatting, citations, and when to use each style.',
    date: 'November 13, 2026',
    readTime: '8 min read',
    category: 'Citations & Style',
    image: '/blog/plagiarism-hero.jpg',
  },
  {
    slug: 'how-to-write-literature-review',
    title: 'How to Write a Literature Review in 2026',
    excerpt: 'Step-by-step guide to writing a strong literature review, with structure, examples, and common mistakes to avoid.',
    date: 'November 10, 2026',
    readTime: '9 min read',
    category: 'Academic Writing',
    image: '/blog/plagiarism-hero.jpg',
  },
  {
    slug: 'how-to-cite-research-paper-apa',
    title: 'How to Cite a Research Paper in APA 7th Edition',
    excerpt: 'Learn APA 7th edition citations with real examples for books, journals, and websites.',
    date: 'November 5, 2026',
    readTime: '7 min read',
    category: 'Citations & Style',
    image: '/blog/plagiarism-hero.jpg',
  },
  {
    slug: 'google-scholar-alternatives',
    title: '10 Best Google Scholar Alternatives in 2026',
    excerpt: 'Discover the best free alternatives to Google Scholar for finding academic papers.',
    date: 'November 1, 2026',
    readTime: '8 min read',
    category: 'Research Tools',
    image: '/blog/plagiarism-hero.jpg',
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-slate-900 mb-2">Blog</h1>
      <p className="text-slate-500 mb-10">Guides for students and researchers to write, cite, and research better.</p>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="border rounded-3xl overflow-hidden hover:shadow-lg transition bg-white">
            <div className="h-48 bg-slate-100 overflow-hidden">
              <Image src={post.image} alt={post.title} width={800} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <span className="font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">{post.category}</span>
              <h2 className="text-xl font-bold text-slate-900 mt-3 leading-snug">{post.title}</h2>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-4">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
