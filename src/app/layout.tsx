import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from './components/navigation'
import { Footer } from './components/footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Broadhill Estate',
  description: 'Rent, buy or sell your property in London',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, 'min-h-screen flex flex-col')}>
        <Navigation />
        <main className="flex flex-col grow p-4 md:p-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
