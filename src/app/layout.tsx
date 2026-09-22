import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastNotifier } from '@/components/ui/ToastNotifier';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rutujaflorals.demo'),
  title: 'Rutuja Florals — Artisanal Floral Studio | Demo Work for Rutuja',
  description:
    'Handcrafted floral arrangements designed to turn every moment into a lasting memory. Demo Work for Rutuja — bespoke bouquets sourced daily with care.',
  keywords: [
    'Rutuja Florals',
    'demo work for rutuja',
    'flower delivery',
    'luxury bouquet',
    'roses',
    'wedding flowers',
    'birthday flowers',
    'anniversary flowers',
    'floral gifts',
  ],
  openGraph: {
    title: 'Rutuja Florals — Artisanal Floral Studio (Demo Work)',
    description: 'Made on Earth, designed with you in mind.',
    url: 'https://rutujaflorals.demo',
    siteName: 'Rutuja Florals',
    images: [
      {
        url: '/images/hero-bg-desktop.jpg',
        width: 1200,
        height: 630,
        alt: 'Rutuja Florals Studio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#4A4545] font-sans selection:bg-[#FCE3E7] selection:text-[#B75C68]">
        <CartProvider>
          <Header />
          <CartDrawer />
          <ToastNotifier />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
