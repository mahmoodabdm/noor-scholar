import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Noor Scholar: An Independent Project Built on OpenAlex",
  description:
    "Noor Scholar is an independent project by one founder, built on OpenAlex. Learn what it does, what it does not do, and how to contact us.",
  openGraph: {
    title: "About Noor Scholar | Independent Project Built on OpenAlex",
    description:
      "An independent project by one founder, built on OpenAlex. What it does, what it does not do, and how to reach us.",
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
    title: "About Noor Scholar | Independent Project Built on OpenAlex",
    description:
      "An independent project by one founder, built on OpenAlex. What it does, what it does not do, and how to reach us.",
    images: ["https://noor-scholar.vercel.app/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      {/* Intro */}
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        About
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        An independent search tool built on OpenAlex
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-600">
        Noor Scholar lets you search scholarly works and copy a formatted
        citation without creating an account.
      </p>

      {/* Who runs this */}
      <section className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Who runs this</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          Independent project by one founder, built on OpenAlex. Contact by
          email, reply in 2-3 days.
        </p>
        <p className="mt-3 leading-relaxed text-gray-700">
          OpenAlex includes journal articles, preprints and datasets, not all
          peer-reviewed.
        </p>
      </section>

      {/* What it does */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">What it does</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
          <li>
            Searches the OpenAlex catalog, which OpenAlex describes as more
            than 250 million scholarly works.
          </li>
          <li>
            Shows citation counts, DOIs, and links to publisher pages or
            open-access copies when OpenAlex lists them.
          </li>
          <li>
            Generates APA, MLA, and Chicago citations from paper metadata
            through the{" "}
            <Link
              href="/tools/citation-generator"
              className="text-blue-600 underline hover:text-blue-700"
            >
              citation generator
            </Link>
            .
          </li>
        </ul>
      </section>

      {/* Limits */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          What to keep in mind
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
          <li>
            Coverage and metadata quality vary by field and publisher, and the
            catalog updates on OpenAlex&apos;s own schedule.
          </li>
          <li>
            Many papers are behind publisher paywalls. We link to a free copy
            only when OpenAlex lists one.
          </li>
          <li>
            Generated citations come from metadata and can contain errors.
            Check them against your style guide before you submit.
          </li>
          <li>
            AI summaries and other writing tools are planned and are not
            available yet.
          </li>
          <li>
            Noor Scholar is not affiliated with OpenAlex, Google Scholar, or
            any publisher.
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">Contact</h2>
        <p className="mt-3 leading-relaxed text-gray-700">
          Email{" "}
          <a
            href="mailto:abdmazn55@gmail.com"
            className="text-blue-600 underline hover:text-blue-700"
          >
            abdmazn55@gmail.com
          </a>
          . Replies take 2-3 days. See our{" "}
          <Link
            href="/privacy"
            className="text-blue-600 underline hover:text-blue-700"
          >
            Privacy Policy
          </Link>{" "}
          for what data is collected.
        </p>
      </section>
    </main>
  );
}
