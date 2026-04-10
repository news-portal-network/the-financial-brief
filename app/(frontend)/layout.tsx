import React from 'react'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import GoogleAnalytics from './GoogleAnalytics'
import SiteHeader from './SiteHeader'
import Footer from './Footer'
import './styles.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata = {
  title: 'The Financial Brief — Clear financial insights. No noise. No jargon.',
  description: 'Daily financial news and analysis for US, Canada, and UK readers. Markets, economy, investing, crypto, and personal finance — explained simply.',
  openGraph: {
    title: 'The Financial Brief',
    description: 'Clear financial insights. No noise. No jargon.',
    url: 'https://thefinancialbrief.com',
    siteName: 'The Financial Brief',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Financial Brief',
    description: 'Clear financial insights. No noise. No jargon.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable}`} style={{ fontFamily: 'var(--font-dm-sans), -apple-system, sans-serif' }}>
        <GoogleAnalytics />
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
