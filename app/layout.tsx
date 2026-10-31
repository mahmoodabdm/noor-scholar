import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdSenseLoader from '@/components/AdSenseLoader';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

const APP_URL = 'https://noor-scholar.vercel.app'; // CHANGE THIS to your custom domain when you buy it

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Noor Scholar – Free Academic Search Engine 250M+ Papers',
    template: '%s | Noor Scholar',
  },
  description:
    'Search 250M+ research papers for free. Find open-access literature, generate APA/MLA citations, and explore citation metrics. The best free Google Scholar alternative.',
  verification: { 
    google: 'ETPfVPigvC2gkq5AC_ny9R9Shc4Zq2LMgoGQKQt1UN4' 
  },
  alternates: {
    canonical: './',
  },
  openGraph: { 
    type: 'website', 
    siteName: 'Noor Scholar', 
    locale: 'en_US',
    url: APP_URL,
    images: [
      {
        url: '/og-image.png', // CREATE this image 1200x630
        width: 1200,
        height: 630,
        alt: 'Noor Scholar - Free Academic Search Engine',
      },
    ],
  },
  twitter: { 
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { 
      '@type': 'WebSite', 
      name: 'Noor Scholar', 
      url: APP_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${APP_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      }
    },
    { 
      '@type': 'Organization', 
      name: 'Noor Scholar', 
      url: APP_URL,
      logo: `${APP_URL}/logo.png`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`min-h-screen flex flex-col bg-white text-slate-900 antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        {/* Load AdSense lazy to avoid CLS */}
        <AdSenseLoader />
      </body>
    </html>
  );
}
