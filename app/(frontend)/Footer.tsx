import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-newsletter-bar">
          <div className="footer-newsletter-text">
            <span className="footer-newsletter-label" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Get the Weekend Reading every Friday</span>
            <span className="footer-newsletter-sub">Deep analysis and explainers. Free.</span>
          </div>
          <form className="footer-newsletter-form" aria-label="Subscribe to Weekend Reading">
            <label htmlFor="footer-email" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Email address</label>
            <input type="email" id="footer-email" className="footer-newsletter-input" placeholder="your@email.com" required />
            <button type="submit" className="footer-newsletter-btn">Subscribe</button>
          </form>
        </div>
        <div className="footer-divider" role="presentation"></div>
        <div className="footer-inner">
          <div>
            <div className="footer-logo logo-text" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }} aria-label="The Financial Brief">
              <span className="footer-logo-the">The</span>
              <span className="footer-logo-financial">Financial</span>
              <span className="footer-logo-brief">Brief</span>
            </div>
            <p className="footer-copy">&copy; 2026 The Financial Brief. All rights reserved.</p>
            <div className="footer-social">
              <span className="footer-social-label">Follow us</span>
              <div className="footer-social-icons">
                <a href="#" aria-label="Follow on X / Twitter" className="footer-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" aria-label="Follow on LinkedIn" className="footer-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" aria-label="Follow on Facebook" className="footer-social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <nav className="footer-cols" aria-label="Footer navigation">
            <div className="footer-col">
              <span className="footer-col-label">Sections</span>
              <Link href="/category/markets">Markets</Link>
              <Link href="/category/economy">Economy</Link>
              <Link href="/category/investing">Investing</Link>
              <Link href="/category/crypto">Crypto</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Company</span>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </div>
            <div className="footer-col">
              <span className="footer-col-label">Connect</span>
              <Link href="#">X / Twitter</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">Facebook</Link>
              <Link href="#">Newsletter</Link>
            </div>
          </nav>
        </div>
        <div className="footer-divider" role="presentation"></div>
        <p className="footer-bottom">This is not financial advice. Always consult a professional before making investment decisions.</p>
      </div>
    </footer>
  )
}
