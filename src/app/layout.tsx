import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { cn } from '@/lib/utils';
import Providers from './providers';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Broadhill Estate - Award winning estate agent',
  description:
    'Broadhill Estate – Award-winning estate agents in London. Buy, sell, or rent properties with expert guidance and exceptional service. Find your perfect home today.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, 'min-h-screen flex flex-col')}>
        <Providers>
          <Navigation />
          <main className="flex flex-col grow pt-[72px] md:pt-[88px] bg-neutral-800 items-center">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
