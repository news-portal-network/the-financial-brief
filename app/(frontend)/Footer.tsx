import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-newsletter-bar">
        <div className="container">
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
      </div>
      <div className="footer-divider-fullbleed" role="presentation"></div>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo" aria-label="The Financial Brief">
              <img src="/TFB_logo_reverse-stacked.svg" alt="The Financial Brief" className="footer-logo-img" />
            </div>
            <p className="footer-copy">&copy; 2026 The Financial Brief. All rights reserved.</p>
            <div className="footer-social">
              <span className="footer-social-label">Follow us</span>
              <div className="footer-social-icons">
                <a href="#" aria-label="Follow on X / Twitter" className="footer-social-link">
                  <img src="/x-icon.svg" alt="" className="social-icon social-icon--footer" />
                </a>
                <a href="#" aria-label="Follow on LinkedIn" className="footer-social-link">
                  <img src="/linkedin-icon.svg" alt="" className="social-icon social-icon--footer" />
                </a>
                <a href="#" aria-label="Follow on Facebook" className="footer-social-link">
                  <img src="/facebook-icon.svg" alt="" className="social-icon social-icon--footer" />
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
