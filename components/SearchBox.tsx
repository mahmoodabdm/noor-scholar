// components/SearchBox.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearchBox({ initial = '' }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  return (
    <form role="search" onSubmit={(e) => {
      e.preventDefault();
      if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    }}>
      <label htmlFor="q" className="sr-only">Search papers</label>
      <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search 250M+ papers..." className="w-full h-14 px-6 border rounded-full" />
      <button type="submit" className="sr-only">Search</button>
    </form>
  );
}
