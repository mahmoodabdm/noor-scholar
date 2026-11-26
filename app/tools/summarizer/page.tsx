import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paper Summarizer - Coming Soon",
  description:
    "The Noor Scholar Paper Summarizer is not available yet. See what we plan to build and how to get an email when it launches.",
  openGraph: {
    title: "Paper Summarizer - Coming Soon | Noor Scholar",
    description:
      "The Paper Summarizer is not available yet. See what we plan to build and how to get an email when it launches.",
    type: "website",
    siteName: "Noor Scholar",
    locale: "en_US",
    images: [
      {
        url: "https://noor-scholar.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Noor Scholar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paper Summarizer - Coming Soon | Noor Scholar",
    description:
      "The Paper Summarizer is not available yet. See what we plan to build and how to get an email when it launches.",
    images: ["https://noor-scholar.vercel.app/og-image.jpg"],
  },
};

export default function SummarizerComingSoonPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      {/* 1. Title */}
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Paper Summarizer - Coming Soon
      </h1>

      {/* 2. Honest message */}
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        This tool is not available yet. We are working on it. It will be free
        when it launches.
      </p>

      {/* 3. What it will do */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          What it will do
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
          <li>
            Summarize an abstract or excerpt that you paste in, covering the
            research question, the method, and the main findings.
          </li>
          <li>
            Offer a one-sentence version and a longer structured version of the
            same summary.
          </li>
          <li>
            Serve as a starting point only. AI summaries can contain mistakes,
            so you will still need to check them against the original paper.
          </li>
        </ul>
      </section>

      {/* 4. Email box */}
      <section className="mt-12 rounded-xl border border-blue-100 bg-blue-50 p-6">
        <a
          href="mailto:abdmazn55@gmail.com?subject=Notify%20me%20when%20the%20Paper%20Summarizer%20launches"
          className="text-lg font-semibold text-blue-600 underline hover:text-blue-700"
        >
          Notify me when it launches
        </a>
      </section>

      {/* 5. Working buttons */}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Search Research Papers
        </Link>
        <Link
          href="/tools/citation-generator"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50"
        >
          Open Citation Generator
        </Link>
      </div>
    </main>
  );
}
