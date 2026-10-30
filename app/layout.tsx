import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// تم تصحيح الدومين - هذا كان سبب عدم ظهورك بكوكل
const APP_URL = 'https://noor-scholar-uvk.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Noor Scholar - Free Academic Search Engine | 250M+ Papers',
    template: '%s | Noor Scholar',
  },
  description:
    'Explore 250M+ research papers with Noor Scholar, the leading free Google Scholar alternative. Search literature, generate citations & summarize findings.',
  keywords: [
    'academic search engine',
    'research papers',
    'Google Scholar alternative',
    'citation generator',
    '250M papers',
    'scientific literature',
    'open access papers',
    'APA citation',
    'paper summarizer',
  ],
  authors: [{ name: 'Noor Scholar Team' }],
  creator: 'Noor Scholar',
  publisher: 'Noor Scholar',
  // هذا يحل مشكلة التحقق اللي فشلت بالصورة الثانية
  verification: {
    google: '9d9c055753b5d0e',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      'Search 250M+ academic papers, scientific articles, and citations with Noor Scholar. The modern, fast Google Scholar alternative.',
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
      'Free academic search engine indexing over 250 million research papers, citations, and scholarly articles.',
    featureList: [
      '250M+ Academic Papers Search',
      'Free Citation Generator (APA, MLA, Chicago)',
      'Research Paper Summarizer',
      'Academic Paraphraser',
      'Direct DOI & PDF access',
    ],
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
