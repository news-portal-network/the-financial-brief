/* ================================================================
   /app/(frontend)/articles/[slug]/page.tsx
   The Financial Brief — Article Template
   Tasks: A1-A5
   ================================================================ */

import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { cache } from 'react'

/* ── Payload query (cached per request) ─────────────────────────── */

const queryArticleBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  return result.docs[0] || null
})

const queryRelatedArticles = cache(async (category: string, currentSlug: string) => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'articles',
    where: {
      category: { equals: category },
      slug: { not_equals: currentSlug },
      status: { equals: 'published' },
    },
    limit: 3,
    sort: '-publishDate',
  })

  return result.docs
})

/* ── Static params for SSG ──────────────────────────────────────── */

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const articles = await payload.find({
    collection: 'articles',
    where: { status: { equals: 'published' } },
    limit: 100,
    select: { slug: true },
  })

  return articles.docs.map((article) => ({
    slug: article.slug,
  }))
}

/* ── Dynamic SEO Metadata (Task A5) ─────────────────────────────── */

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const article = await queryArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Article Not Found — The Financial Brief',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://thefinancialbrief.com'
  const articleUrl = `${siteUrl}/articles/${article.slug}`
  const imageUrl = typeof article.featuredImage === 'object' && article.featuredImage?.url
    ? `${siteUrl}${article.featuredImage.url}`
    : `${siteUrl}/og-default.jpg`

  return {
    title: article.metaTitle || `${article.title} — The Financial Brief`,
    description: article.metaDescription || article.excerpt || '',
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt || '',
      url: articleUrl,
      siteName: 'The Financial Brief',
      type: 'article',
      publishedTime: article.publishDate || undefined,
      authors: [article.author || 'Oliver Hartmann'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt || '',
      images: [imageUrl],
    },
    alternates: {
      canonical: articleUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/* ── Helper: format date ────────────────────────────────────────── */

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/* ── Helper: category label ─────────────────────────────────────── */

const categoryLabels: Record<string, string> = {
  markets: 'Markets',
  economy: 'Economy',
  investing: 'Investing',
  crypto: 'Crypto',
  'real-estate': 'Real Estate',
  banking: 'Banking',
  'personal-finance': 'Personal Finance',
  global: 'Global',
}

/* ── Helper: region label ───────────────────────────────────────── */

const regionLabels: Record<string, string> = {
  US: '🇺🇸 United States',
  CA: '🇨🇦 Canada',
  UK: '🇬🇧 United Kingdom',
  global: '🌍 Global',
}

/* ── Ad Slot Component ──────────────────────────────────────────── */

function AdSlot({
  id,
  label,
  size,
}: {
  id: string
  label: string
  size: string
}) {
  return (
    <aside
      id={id}
      className="ad-slot"
      role="complementary"
      aria-label={`Advertisement: ${label}`}
      data-size={size}
    >
      <div className="ad-slot__inner">
        <span className="ad-slot__label">Advertisement — {size}</span>
      </div>
    </aside>
  )
}

/* ── Schema.org NewsArticle JSON-LD (Task A4) ───────────────────── */

function ArticleJsonLd({ article, url }: { article: any; url: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://thefinancialbrief.com'
  const imageUrl =
    typeof article.featuredImage === 'object' && article.featuredImage?.url
      ? `${siteUrl}${article.featuredImage.url}`
      : `${siteUrl}/og-default.jpg`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.metaDescription || article.excerpt || '',
    image: [imageUrl],
    datePublished: article.publishDate || article.createdAt,
    dateModified: article.updatedAt || article.publishDate || article.createdAt,
    author: {
      '@type': 'Person',
      name: article.author || 'Oliver Hartmann',
      url: `${siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Financial Brief',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo-reverse.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: categoryLabels[article.category] || article.category,
    wordCount: article.readingTime ? article.readingTime * 150 : undefined,
    inLanguage: 'en',
    isAccessibleForFree: true,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/* ── Breadcrumb JSON-LD ─────────────────────────────────────────── */

function BreadcrumbJsonLd({ article }: { article: any }) {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://thefinancialbrief.com'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryLabels[article.category] || article.category,
        item: `${siteUrl}/category/${article.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

/* ── Serialize Lexical richText to HTML ─────────────────────────── */

function serializeLexicalToHTML(node: any): string {
  if (!node) return ''

  if (node.type === 'text') {
    let text = node.text || ''
    if (node.format & 1) text = `<strong>${text}</strong>`
    if (node.format & 2) text = `<em>${text}</em>`
    if (node.format & 4) text = `<s>${text}</s>`
    if (node.format & 8) text = `<u>${text}</u>`
    if (node.format & 16) text = `<code>${text}</code>`
    return text
  }

  const children = (node.children || [])
    .map((child: any) => serializeLexicalToHTML(child))
    .join('')

  switch (node.type) {
    case 'root':
      return children
    case 'paragraph':
      if (!children.trim()) return ''
      return `<p>${children}</p>`
    case 'heading':
      const tag = node.tag || 'h2'
      return `<${tag}>${children}</${tag}>`
    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${listTag}>${children}</${listTag}>`
    case 'listitem':
      return `<li>${children}</li>`
    case 'link':
    case 'autolink':
      const href = node.fields?.url || node.url || '#'
      const rel = node.fields?.newTab || node.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${rel}>${children}</a>`
    case 'quote':
      return `<blockquote>${children}</blockquote>`
    case 'upload':
      const imgUrl = node.value?.url || ''
      const imgAlt = node.value?.alt || node.value?.filename || 'Article image'
      return `<figure class="article-figure"><img src="${imgUrl}" alt="${imgAlt}" loading="lazy" /></figure>`
    default:
      return children
  }
}

function renderRichText(content: any): string {
  if (!content || !content.root) return ''
  return serializeLexicalToHTML(content.root)
}

/* ── Main Page Component ────────────────────────────────────────── */

export default async function ArticlePage({ params }: Args) {
  const { slug } = await params
  const article = await queryArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://thefinancialbrief.com'
  const articleUrl = `${siteUrl}/articles/${article.slug}`
  const imageUrl =
    typeof article.featuredImage === 'object' && article.featuredImage?.url
      ? article.featuredImage.url
      : null
  const imageAlt =
    typeof article.featuredImage === 'object' && article.featuredImage?.alt
      ? article.featuredImage.alt
      : article.title

  const htmlContent = renderRichText(article.content)
  const relatedArticles = await queryRelatedArticles(article.category, article.slug)

  return (
    <>
      <ArticleJsonLd article={article} url={articleUrl} />
      <BreadcrumbJsonLd article={article} />

      <article className="article">
        {/* Breadcrumb */}
        <nav className="article__breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href={`/category/${article.category}`}>{categoryLabels[article.category] || article.category}</a></li>
            <li aria-current="page">{article.title}</li>
          </ol>
        </nav>

        {/* Ad Slot 1: Top leaderboard */}
        <AdSlot id="ad-article-leaderboard" label="Top of article" size="728x90" />

        {/* Header */}
        <header className="article__header">
          <div className="article__meta-top">
            <span className="article__category">{categoryLabels[article.category] || article.category}</span>
            {article.region && article.region !== 'global' && (
              <span className="article__region">{regionLabels[article.region] || article.region}</span>
            )}
          </div>

          <h1 className="article__title">{article.title}</h1>

          {article.excerpt && (
            <p className="article__excerpt">{article.excerpt}</p>
          )}

          <div className="article__meta-bottom">
            <address className="article__author">
              By <a rel="author" href="/about">{article.author || 'Oliver Hartmann'}</a>
            </address>
            <span className="article__separator" aria-hidden="true">·</span>
            <time className="article__date" dateTime={article.publishDate || article.createdAt}>
              {formatDate(article.publishDate || article.createdAt)}
            </time>
            <span className="article__separator" aria-hidden="true">·</span>
            <span className="article__reading-time">{article.readingTime || 5} min read</span>
          </div>
        </header>

        {/* Share buttons */}
        <div className="article__share">
          <span className="article__share-label">Share</span>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="article__share-btn" aria-label="Share on X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="article__share-btn" aria-label="Share on LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="article__share-btn" aria-label="Share on Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>


        {/* Featured image */}
        {imageUrl && (
          <figure className="article__hero-image">
            <img src={imageUrl} alt={imageAlt} width={1200} height={630} loading="eager" />
          </figure>
        )}

        {/* Article body */}
        <div className="article__body-wrapper">
          <div className="article__body" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          {/* Ad Slot 2: In-content rectangle */}
          <AdSlot id="ad-article-mid" label="Mid-article" size="728x90" />
        </div>

        {/* Ad Slot 3: Post-body rectangle */}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <footer className="article__tags">
            <span className="article__tags-label">Topics:</span>
            <ul className="article__tags-list">
              {article.tags.map((tagObj: any, i: number) => (
                <li key={i}>
                  <a href={`/tag/${encodeURIComponent(tagObj.tag || tagObj)}`} className="article__tag">
                    {tagObj.tag || tagObj}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        )}

        {/* Newsletter CTA placeholder */}
        <section className="article__newsletter" aria-label="Newsletter signup">
          <div className="article__newsletter-inner">
            <h2 className="article__newsletter-title">Stay ahead of the markets</h2>
            <p className="article__newsletter-text">
              Get The Financial Brief delivered to your inbox every morning. Clear insights. No noise. No jargon.
            </p>
            <div className="article__newsletter-form" id="beehiiv-embed">
              <p className="article__newsletter-placeholder">Newsletter signup coming soon.</p>
            </div>
          </div>
        </section>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="article__related" aria-label="Related articles">
            <h2 className="article__related-title">More in {categoryLabels[article.category] || article.category}</h2>
            <div className="article__related-grid">
              {relatedArticles.map((related: any) => {
                const relImg = typeof related.featuredImage === 'object' && related.featuredImage?.url
                  ? related.featuredImage.url : null
                return (
                  <a key={related.slug} href={`/articles/${related.slug}`} className="article__related-card">
                    {relImg && <img src={relImg} alt={related.title} loading="lazy" className="article__related-image" />}
                    <div className="article__related-content">
                      <span className="article__related-category">{categoryLabels[related.category] || related.category}</span>
                      <h3 className="article__related-headline">{related.title}</h3>
                      {related.excerpt && <p className="article__related-excerpt">{related.excerpt}</p>}
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        )}

        {/* Ad Slot 4: Post-article banner */}
        <AdSlot id="ad-article-bottom" label="Bottom of article" size="728x90" />
      </article>
    </>
  )
}
