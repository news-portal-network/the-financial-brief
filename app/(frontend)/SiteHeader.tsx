'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/' || pathname === '/preview-home'
  const [menuOpen, setMenuOpen] = useState(false)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <header className="site-header" role="banner">
        <div className="site-header__top">
          <div className="container site-header__top-inner">
            <div className="site-header__left">
              <span className="site-header__date">{today}</span>
            </div>
            {!isHome && (
              <Link href="/" className="site-header__logo site-header__logo--desktop" aria-label="The Financial Brief — Home">
                <img src="/TFB_logo_reverse-horz.svg" alt="The Financial Brief" className="site-header__logo-img" />
              </Link>
            )}
            <div className="site-header__right">
              <div className="site-header__social site-header__social--desktop">
                <a href="#" aria-label="Follow on X / Twitter" className="site-header__social-link">
                  <img src="/x-icon.svg" alt="" className="social-icon social-icon--header" />
                </a>
                <a href="#" aria-label="Follow on LinkedIn" className="site-header__social-link">
                  <img src="/linkedin-icon.svg" alt="" className="social-icon social-icon--header" />
                </a>
                <a href="#" aria-label="Follow on Facebook" className="site-header__social-link">
                  <img src="/facebook-icon.svg" alt="" className="social-icon social-icon--header" />
                </a>
              </div>
              <button className="site-header__subscribe site-header__subscribe--desktop">Subscribe</button>
              <button
                className="site-header__hamburger"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <span className="site-header__hamburger-line"></span>
                <span className="site-header__hamburger-line"></span>
                <span className="site-header__hamburger-line"></span>
              </button>
            </div>
          </div>
        </div>
        <nav className="site-header__nav site-header__nav--desktop" role="navigation" aria-label="Main navigation">
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

      {menuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-top">
            <Link href="/" onClick={() => setMenuOpen(false)} aria-label="The Financial Brief — Home">
              <img src="/TFB_logo_reverse-horz.svg" alt="The Financial Brief" className="mobile-menu-top-logo" />
            </Link>
            <button
              className="mobile-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <div className="mobile-menu-body">
            <nav className="mobile-menu-nav" role="navigation" aria-label="Mobile navigation">
              <Link href="/category/markets" onClick={() => setMenuOpen(false)}>Markets</Link>
              <Link href="/category/economy" onClick={() => setMenuOpen(false)}>Economy</Link>
              <Link href="/category/investing" onClick={() => setMenuOpen(false)}>Investing</Link>
              <Link href="/category/crypto" onClick={() => setMenuOpen(false)}>Crypto</Link>
              <Link href="/category/real-estate" onClick={() => setMenuOpen(false)}>Real Estate</Link>
              <Link href="/category/banking" onClick={() => setMenuOpen(false)}>Banking</Link>
              <Link href="/category/personal-finance" onClick={() => setMenuOpen(false)}>Personal Finance</Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>Tools</Link>
            </nav>
            <button className="mobile-menu-subscribe" onClick={() => setMenuOpen(false)}>Subscribe</button>
            <div className="mobile-menu-social">
              <a href="#" aria-label="Follow on X / Twitter">
                <img src="/x-icon.svg" alt="" className="social-icon social-icon--mobile" />
              </a>
              <a href="#" aria-label="Follow on LinkedIn">
                <img src="/linkedin-icon.svg" alt="" className="social-icon social-icon--mobile" />
              </a>
              <a href="#" aria-label="Follow on Facebook">
                <img src="/facebook-icon.svg" alt="" className="social-icon social-icon--mobile" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
