import React from 'react'
import './styles.css'
import GoogleAnalytics from './GoogleAnalytics'

export const metadata = {
  description: 'Clear financial insights. No noise. No jargon.',
  title: 'The Financial Brief',
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
