import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const APP_URL = 'https://noor-scholar.vercel.app';

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
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Noor Scholar',
    title: 'Noor Scholar - Free Academic Search Engine | 250M+ Papers',
    description: 'Search 250M+ academic papers with Noor Scholar.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noor Scholar - Free Academic Search Engine | 250M+ Papers',
    description: 'Search 250M+ academic papers with Noor Scholar.',
  },
  alternates: { canonical: APP_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3673154819131367"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Noor Scholar',
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'All',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            }),
          }}
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
