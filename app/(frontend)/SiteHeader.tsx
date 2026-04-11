'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === '/preview-home'

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="site-header" role="banner">
      <div className="site-header__top">
        <div className="container site-header__top-inner">
          <div className="site-header__left">
            <span className="site-header__date">{today}</span>
          </div>
          {!isHome && (
            <Link href="/" className="site-header__logo" aria-label="The Financial Brief — Home" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              <span className="site-header__logo-the">The</span>
              <span className="site-header__logo-name">Financial</span>
              <span className="site-header__logo-brief">Brief</span>
            </Link>
          )}
          <div className="site-header__right">
            <div className="site-header__social">
              <a href="#" aria-label="Follow on X / Twitter" className="site-header__social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="Follow on LinkedIn" className="site-header__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1S4.98 2.12 4.98 3.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"/></svg>
              </a>
              <a href="#" aria-label="Follow on Facebook" className="site-header__social-link">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"/></svg>
              </a>
            </div>
            <button className="site-header__subscribe">Subscribe</button>
          </div>
        </div>
      </div>
      <nav className="site-header__nav" role="navigation" aria-label="Main navigation">
        <div className="container site-header__nav-inner">
          <Link href="/category/markets">Markets</Link>
          <Link href="/category/economy">Economy</Link>
          <Link href="/category/investing">Investing</Link>
          <Link href="/category/crypto">Crypto</Link>
          <Link href="/category/real-estate">Real Estate</Link>
          <Link href="/category/banking">Banking</Link>
          <Link href="/category/personal-finance">Personal Finance</Link>
          <Link href="#">Tools</Link>
        </div>
      </nav>
      <div className="site-header__accent" aria-hidden="true"></div>
    </header>
  )
}
