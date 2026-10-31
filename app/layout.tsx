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
  description: 'Search 250M+ research papers for free. Find open-access literature, generate APA/MLA citations.',
  verification: { google: 'ETPfVPigvC2gkq5AC_ny9R9Shc4Zq2LMgoGQKQt1UN4' },
  alternates: { canonical: './' },
  openGraph: { 
    type: 'website', 
    siteName: 'Noor Scholar', 
    locale: 'en_US',
    url: APP_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
};

export const viewport: Viewport = { themeColor: '#ffffff' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', name: 'Noor Scholar', url: APP_URL },
    { '@type': 'Organization', name: 'Noor Scholar', url: APP_URL },
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
