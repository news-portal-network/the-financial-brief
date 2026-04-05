import React from 'react'
import GoogleAnalytics from './GoogleAnalytics'

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
      <body>
        <GoogleAnalytics />
        <main>{children}</main>
      </body>
    </html>
  )
}
