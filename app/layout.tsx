import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const APP_URL = 'https://noor-scholar.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Noor Scholar – Free Academic Search Engine 250M+ Papers',
    template: '%s | Noor Scholar',
  },
  description: 'Search 250M+ scholarly works from OpenAlex for free. Free academic search engine with open-access links and citation generator.',
  verification: { google: 'ETPfVPigvC2gkq5AC_ny9R9Shc4Zq2LMgoGQKQt1UN4' },
  alternates: { canonical: '/' },
  openGraph: { 
    type: 'website', 
    siteName: 'Noor Scholar', 
    locale: 'en_US',
    url: APP_URL,
    title: 'Noor Scholar – Free Academic Search Engine',
    description: 'Search 250M+ scholarly works from OpenAlex for free.',
    images: [{ 
      url: `${APP_URL}/og-image.jpg`,
      width: 1200, 
      height: 630,
      alt: 'Noor Scholar - Free Academic Search Engine'
    }],
  },
  twitter: { 
    card: 'summary_large_image', 
    title: 'Noor Scholar – Free Academic Search Engine',
    description: 'Search 250M+ scholarly works from OpenAlex for free.',
    images: [`${APP_URL}/og-image.png`] 
  },
};

export const viewport: Viewport = { themeColor: '#ffffff' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', name: 'Noor Scholar', url: APP_URL, potentialAction: { '@type': 'SearchAction', target: `${APP_URL}/search?q={search_term_string}`, 'query-input': 'required name=search_term_string' } },
    { '@type': 'Organization', name: 'Noor Scholar', url: APP_URL, logo: { '@type': 'ImageObject', url: `${APP_URL}/og-image.png` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-slate-900`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
