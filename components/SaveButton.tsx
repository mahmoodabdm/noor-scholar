"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

type Paper = {
  id: string;
  title: string;
  authors: string;
  year: number | string;
  doi?: string;
  url?: string;
};

const KEY = "noor-library";

function getSavedIds(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return list.map((p: any) => p.id);
  } catch {
    return [];
  }
}

export default function SaveButton({ paper }: { paper: Paper }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getSavedIds().includes(paper.id));
  }, [paper.id]);

  function toggle() {
    try {
      const raw = localStorage.getItem(KEY);
      let list: Paper[] = [];
      try {
        list = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(list)) list = [];
      } catch {
        list = [];
      }

      if (saved) {
        list = list.filter((p) => p.id !== paper.id);
        setSaved(false);
      } else {
        list = [paper, ...list].slice(0, 200);
        setSaved(true);
      }

      localStorage.setItem(KEY, JSON.stringify(list));
      window.dispatchEvent(new Event("noor-library-changed"));
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-colors ${
        saved
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-amber-50 hover:bg-amber-100 text-amber-700"
      }`}
    >
      {saved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
      {saved ? "Saved" : "Save"}
    </button>
  );
}
