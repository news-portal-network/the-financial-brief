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
            <Link href="/" className="site-header__logo" aria-label="The Financial Brief — Home">
              <img src="/TFB_logo_reverse-horz.svg" alt="The Financial Brief" className="site-header__logo-img" />
            </Link>
          )}
          <div className="site-header__right">
            <div className="site-header__social">
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
