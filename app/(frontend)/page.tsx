import React from 'react'
import Link from 'next/link'
import { Playfair_Display, DM_Sans } from 'next/font/google'
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

export default async function HomePage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={`${playfair.variable} ${dmSans.variable}`}
         style={{ fontFamily: 'var(--font-dm-sans), -apple-system, sans-serif' }}>

      <div className="container">
        <nav className="nav-top" role="navigation" aria-label="Main navigation">
          <div className="nav-links">
            <Link href="#">Markets</Link>
            <Link href="#">Economy</Link>
            <Link href="#">Investing</Link>
            <Link href="#">Crypto</Link>
            <Link href="#">Tools</Link>
          </div>
          <button className="btn-subscribe">Subscribe</button>
        </nav>
      </div>

      <div className="container">
        <header className="masthead">
          <div className="logo-text" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }} aria-label="The Financial Brief">
            <span className="logo-the">The</span>
            <span className="logo-financial">Financial</span>
            <span className="logo-brief">Brief</span>
          </div>
          <div className="masthead-meta">
            <span>Clear financial insights · No noise · No jargon</span>
            <span>{today} · Toronto</span>
          </div>
        </header>
      </div>

      <div className="container">
        <div className="ad-slot ad-leaderboard" role="complementary" aria-label="Advertisement">
          <span>Ad slot 1 — Leaderboard 728×90 / 970×250</span>
        </div>
      </div>

      <div className="container">
        <main>
          <section className="hero-grid" aria-label="Top stories">
            <article className="hero-main">
              <span className="hero-breaking" aria-label="Breaking news">Breaking</span>
              <p className="hero-cat">Markets · 5 min read</p>
              <h1 className="hero-title" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                Fed holds rates steady as inflation data sends mixed signals
              </h1>
              <p className="hero-desc">
                The Federal Reserve kept rates unchanged for the sixth consecutive meeting, citing persistent inflation alongside a cooling labor market.
              </p>
            </article>
            <div className="hero-side">
              <article>
                <p className="hero-side-cat">Economy</p>
                <h2><Link className="hero-side-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Canada&apos;s housing starts jump 12% — what it means for buyers</Link></h2>
                <p className="hero-side-time">3 min read</p>
              </article>
              <div className="divider" role="presentation"></div>
              <article>
                <p className="hero-side-cat">Crypto</p>
                <h2><Link className="hero-side-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Bitcoin breaks $95K as institutional demand surges</Link></h2>
                <p className="hero-side-time">4 min read</p>
              </article>
              <div className="divider" role="presentation"></div>
              <article>
                <p className="hero-side-cat">Investing</p>
                <h2><Link className="hero-side-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Why smart money is moving into energy ETFs this quarter</Link></h2>
                <p className="hero-side-time">5 min read</p>
              </article>
            </div>
          </section>

          <div className="editorial-ad-row">
            <article>
              <p className="editorial-pick-label">Editor&apos;s pick</p>
              <h2><Link className="editorial-pick-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>The hidden power of compound interest — and why starting now matters more than starting big</Link></h2>
              <p className="editorial-pick-desc">Most people wait for the &quot;right amount&quot; to start investing. The math says they&apos;re wrong. Here&apos;s what $50 a month can actually do over 20 years.</p>
              <Link className="editorial-pick-link" href="#">Read the full story →</Link>
            </article>
            <aside>
              <div className="ad-slot ad-rectangle" role="complementary" aria-label="Advertisement">
                <span>Ad slot 2 — Rectangle 300×250</span>
              </div>
            </aside>
          </div>

          <section className="section" aria-label="Today briefings">
            <div className="section-header">
              <span className="label">Today&apos;s briefings</span>
              <div className="section-line" role="presentation"></div>
            </div>
            <div className="briefings-grid">
              <article>
                <p className="briefing-num"><span className="gold">01</span> · Markets</p>
                <h3><Link className="briefing-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>S&amp;P 500 closes flat amid tech earnings uncertainty</Link></h3>
                <p className="briefing-time">3 min read</p>
              </article>
              <article>
                <p className="briefing-num"><span className="gold">02</span> · Economy</p>
                <h3><Link className="briefing-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>UK inflation drops to 2.1% — Bank of England weighs next move</Link></h3>
                <p className="briefing-time">4 min read</p>
              </article>
              <article>
                <p className="briefing-num"><span className="gold">03</span> · Personal finance</p>
                <h3><Link className="briefing-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>The 3 savings accounts actually worth opening in 2026</Link></h3>
                <p className="briefing-time">5 min read</p>
              </article>
              <div className="ad-slot ad-infeed" role="complementary" aria-label="Advertisement">
                <span>Ad slot 3 — In-feed native ad</span>
              </div>
              <article>
                <p className="briefing-num"><span className="gold">04</span> · Real estate</p>
                <h3><Link className="briefing-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Toronto condo market shows first signs of recovery</Link></h3>
                <p className="briefing-time">4 min read</p>
              </article>
              <article>
                <p className="briefing-num"><span className="gold">05</span> · Banking</p>
                <h3><Link className="briefing-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>RBC and TD raise mortgage rates — here&apos;s what changed</Link></h3>
                <p className="briefing-time">3 min read</p>
              </article>
              <article>
                <p className="briefing-num"><span className="gold">06</span> · Global</p>
                <h3><Link className="briefing-title" href="#" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>China&apos;s manufacturing PMI beats expectations for third month</Link></h3>
                <p className="briefing-time">4 min read</p>
              </article>
            </div>
          </section>
        </main>
      </div>

      <section className="dark-block" aria-label="Weekend reading">
        <div className="container">
          <p className="label" style={{ marginBottom: '1.5rem', color: 'var(--text-on-dark-secondary)' }}>Weekend reading</p>
          <h2 className="wr-title" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Should you invest in index funds vs individual stocks in 2026?</h2>
          <p className="wr-desc">A deep dive into what actually makes sense for your portfolio this year.</p>
          <Link className="wr-link" href="#">Read the full analysis →</Link>
        </div>
      </section>

      <div className="container">
        <section className="section" aria-label="Financial tools">
          <div className="section-header">
            <span className="label">Financial tools</span>
            <div className="section-line" role="presentation"></div>
          </div>
          <div className="tools-grid">
            <div>
              <h3 className="tool-title" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Compound interest calculator</h3>
              <p className="tool-desc">See how your money grows over time.</p>
              <Link className="tool-link" href="#">Try it →</Link>
            </div>
            <div>
              <h3 className="tool-title" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Inflation calculator</h3>
              <p className="tool-desc">Track your real purchasing power.</p>
              <Link className="tool-link" href="#">Try it →</Link>
            </div>
            <div>
              <h3 className="tool-title" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Mortgage rates today</h3>
              <p className="tool-desc">Compare rates across CA, US, UK.</p>
              <Link className="tool-link" href="#">Try it →</Link>
            </div>
          </div>
        </section>
      </div>

      <div className="container">
        <div className="ad-slot-4-wrapper">
          <div className="ad-slot ad-banner" role="complementary" aria-label="Advertisement">
            <span>Ad slot 4 — Banner 728×90 / 970×250</span>
          </div>
        </div>
      </div>

      <section className="cta-block" aria-label="Newsletter signup">
        <div className="container">
          <h2 className="cta-title" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>Get the Weekend Reading<br />every Friday</h2>
          <p className="cta-desc">Deep analysis and explainers. Delivered free to your inbox.</p>
          <form className="cta-form" aria-label="Subscribe to newsletter">
            <label htmlFor="email-input" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Email address</label>
            <input type="email" id="email-input" className="cta-input" placeholder="your@email.com" required />
            <button type="submit" className="cta-btn">Subscribe</button>
          </form>
        </div>
      </section>

      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-inner">
            <div>
              <div className="footer-logo logo-text" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }} aria-label="The Financial Brief">
                <span className="logo-the">The</span>
                <span className="logo-financial">Financial</span>
                <span className="logo-brief">Brief</span>
              </div>
              <p className="footer-copy">© 2026 The Financial Brief. All rights reserved.</p>
            </div>
            <nav className="footer-cols" aria-label="Footer navigation">
              <div className="footer-col">
                <span className="footer-col-label">Sections</span>
                <Link href="#">Markets</Link><Link href="#">Economy</Link><Link href="#">Investing</Link><Link href="#">Crypto</Link>
              </div>
              <div className="footer-col">
                <span className="footer-col-label">Company</span>
                <Link href="#">About</Link><Link href="#">Contact</Link><Link href="#">Privacy</Link><Link href="#">Terms</Link>
              </div>
              <div className="footer-col">
                <span className="footer-col-label">Connect</span>
                <Link href="#">X / Twitter</Link><Link href="#">LinkedIn</Link><Link href="#">Newsletter</Link>
              </div>
            </nav>
          </div>
          <div className="footer-divider" role="presentation"></div>
          <p className="footer-bottom">This is not financial advice. Always consult a professional before making investment decisions.</p>
        </div>
      </footer>
    </div>
  )
}
