import React from 'react'
import Link from 'next/link'

export default function Nav() {
  return (
    <div className="container">
      <nav className="nav-top" role="navigation" aria-label="Main navigation">
        <div className="nav-left">
          <Link href="/" className="nav-logo" aria-label="The Financial Brief — Home" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
            <span className="nav-logo-the">The</span>
            <span className="nav-logo-name">Financial Brief</span>
          </Link>
          <div className="nav-links">
            <Link href="/category/markets">Markets</Link>
            <Link href="/category/economy">Economy</Link>
            <Link href="/category/investing">Investing</Link>
            <Link href="/category/crypto">Crypto</Link>
            <Link href="#">Tools</Link>
          </div>
        </div>
        <button className="btn-subscribe">Subscribe</button>
      </nav>
    </div>
  )
}
