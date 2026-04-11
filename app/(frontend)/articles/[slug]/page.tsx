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

        {/* Share buttons — flat icons, no recuadros */}
        <div className="article__share">
          <span className="article__share-label">Share</span>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="article__share-btn" aria-label="Share on X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="article__share-btn" aria-label="Share on LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 5.00C6.94 5.93 6.19 6.68 5.26 6.68C4.33 6.68 3.58 5.93 3.58 5.00C3.58 4.07 4.33 3.32 5.26 3.32C6.19 3.32 6.94 4.07 6.94 5.00ZM7.00 8.48H3.52V20.74H7.00V8.48ZM13.32 8.48H9.86V20.74H13.28V14.34C13.28 10.82 17.84 10.52 17.84 14.34V20.74H21.28V13.06C21.28 7.36 14.86 7.60 13.28 10.38L13.32 8.48Z"/></svg>
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="article__share-btn" aria-label="Share on Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z"/></svg>
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
