import React from 'react'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import HideHeaderFooter from './HideHeaderFooter'
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

export default async function ComingSoonPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}
         style={{
           fontFamily: 'var(--font-dm-sans), -apple-system, sans-serif',
           background: 'var(--bg-dark)',
           color: 'var(--text-on-dark)',
           minHeight: '100vh',
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'center',
           justifyContent: 'center',
           textAlign: 'center',
           padding: '2rem',
         }}>
      <HideHeaderFooter />
      <div style={{ maxWidth: '640px' }}>
        <div className="logo-text" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', marginBottom: '3rem' }} aria-label="The Financial Brief">
          <span style={{ fontSize: '18px', display: 'block', color: 'var(--text-on-dark)' }}>The</span>
          <span style={{ fontSize: '56px', display: 'block', letterSpacing: '-2px', color: 'var(--text-on-dark)' }}>Financial</span>
          <span style={{ fontSize: '56px', display: 'block', letterSpacing: '-2px', fontStyle: 'italic', color: 'var(--text-on-dark)' }}>Brief</span>
        </div>
        <p style={{
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--gold-on-black)',
          marginBottom: '1.5rem',
        }}>Coming Soon</p>
        <p style={{
          fontSize: '20px',
          color: 'var(--text-on-dark-secondary)',
          lineHeight: '1.6',
          marginBottom: '3rem',
        }}>Clear financial insights. No noise. No jargon.</p>
        <form style={{
          display: 'flex',
          gap: '10px',
          maxWidth: '420px',
          margin: '0 auto',
        }} aria-label="Subscribe to newsletter">
          <label htmlFor="email-cs" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Email address</label>
          <input
            type="email"
            id="email-cs"
            placeholder="your@email.com"
            required
            style={{
              flex: 1,
              border: '1px solid var(--border-dark)',
              padding: '14px 18px',
              fontSize: '16px',
              color: 'var(--text-on-dark)',
              background: 'transparent',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <button type="submit" style={{
            background: 'var(--gold-on-black)',
            color: 'var(--bg-dark)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            padding: '14px 28px',
            cursor: 'pointer',
            border: 'none',
            fontFamily: 'inherit',
          }}>Notify Me</button>
        </form>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-on-dark-tertiary)',
          marginTop: '4rem',
        }}>© 2026 The Financial Brief. All rights reserved.</p>
      </div>
    </div>
  )
}
