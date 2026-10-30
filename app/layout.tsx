import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const APP_URL = 'https://noor-scholar-uvk.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Noor Scholar - Free Academic Search Engine | 250M+ Papers',
    template: '%s | Noor Scholar',
  },
  description:
    'Explore 250M+ research papers with Noor Scholar, the leading free Google Scholar alternative. Search literature, generate citations & summarize findings.',
  verification: {
    google: 'ETPfVPigvC2gkq5AC_ny9R9Shc4Zq2LMgoGQKQt1UN4',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Noor Scholar',
    title: 'Noor Scholar - Free Academic Search Engine | 250M+ Papers',
    description:
      'Search 250M+ academic papers, scientific articles, and citations with Noor Scholar. The modern, fast Google Scholar alternative.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noor Scholar - Free Academic Search Engine | 250M+ Papers',
    description:
      'Search 250M+ academic papers, scientific articles, and citations with Noor Scholar.',
  },
  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Noor Scholar',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free academic search engine indexing over 250 million research papers.',
  };

  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-slate-900`}>
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
