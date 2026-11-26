"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  ChevronDown,
  Quote,
  Sparkles,
  Menu,
  X,
  Bookmark,
} from 'lucide-react';
import { getLibrary } from '@/lib/library';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [libraryCount, setLibraryCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function updateCount() {
      setLibraryCount(getLibrary().length);
    }
    updateCount();
    window.addEventListener("noor-library-changed", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("noor-library-changed", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, [pathname]);

  const tools = [
    {
      name: 'Citation Generator',
      desc: 'Instant APA, MLA, Chicago citations',
      href: '/tools/citation-generator',
      icon: <Quote className="w-4 h-4 text-blue-600" />,
    },
    {
      name: 'Paper Summarizer',
      desc: 'Extractive summary from abstract',
      href: '/tools/summarizer',
      icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:bg-blue-700 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Noor Scholar
              </span>
              <span className="text-[11px] text-slate-500 -mt-1 font-medium tracking-wide">
                250M+ Academic Papers
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}>
              Search
            </Link>
            <Link href="/features" className={`text-sm font-medium transition-colors ${pathname === '/features' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}>
              Features
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer ${pathname.startsWith('/tools') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}
              >
                <span>Free Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>
              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Free Research Tools
                  </div>
                  {tools.map((tool) => (
                    <Link key={tool.href} href={tool.href} onClick={() => setToolsDropdownOpen(false)} className="flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-xl transition-colors mx-1">
                      <div className="p-2 bg-slate-100 rounded-lg shrink-0 mt-0.5">{tool.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {tool.name}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">{tool.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/my-library" className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${pathname === '/my-library' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}>
              <Bookmark className="w-4 h-4" />
              My Library
              {libraryCount > 0 && <span className="px-1.5 py-0.5 text-[11px] font-bold bg-blue-600 text-white rounded-full">{libraryCount}</span>}
            </Link>

            <Link href="/blog" className={`text-sm font-medium transition-colors ${pathname.startsWith('/blog') ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}>
              Blog
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors ${pathname === '/about' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}>
              About
            </Link>
            <Link href="/contact" className={`text-sm font-medium transition-colors ${pathname === '/contact' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}>
              Contact
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/my-library" className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
              <Bookmark className="w-3.5 h-3.5" />
              My Library {libraryCount > 0 && `(${libraryCount})`}
            </Link>
            <Link href="/#search" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors">
              <span>Search Papers</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/my-library" className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg">
              Library {libraryCount > 0 && `(${libraryCount})`}
            </Link>
            <Link href="/#search" className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg">
              Search
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 hover:text-slate-900 rounded-lg" aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-8 space-y-3">
          <nav className="flex flex-col space-y-1">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Academic Search</Link>
            <Link href="/features" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Features</Link>
            <Link href="/my-library" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">My Library {libraryCount > 0 && `(${libraryCount})`}</Link>
            <div className="pt-2 pb-1 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Free Research Tools</div>
            {tools.map((t) => (
              <Link key={t.href} href={t.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                {t.icon}
                <span>{t.name}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100"></div>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Blog & Guides</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">About Noor Scholar</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
