import type { Metadata } from 'next'
import { absoluteUrl } from './utils'

export const SITE_CONFIG = {
  name: 'Thinking Out Loud',
  title: 'Thinking Out Loud — by Vasiliki Doropoulou',
  description:
    'A space for thinking about engineering, UX, leadership, AI, philosophy, and the systems that shape how we build and live. By Vasiliki Doropoulou.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vassi-thinking-out-loud.vercel.app',
  author: 'Vasiliki Doropoulou',
  twitterHandle: '@vasiliki',
  locale: 'en_GB',
} as const

export function buildMetadata({
  title,
  description,
  path = '/',
  ogImage,
  publishedTime,
  authors,
  tags,
}: {
  title?: string
  description?: string
  path?: string
  ogImage?: string
  publishedTime?: string
  authors?: string[]
  tags?: string[]
}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_CONFIG.name}` : SITE_CONFIG.title
  const desc = description ?? SITE_CONFIG.description
  const url = absoluteUrl(path)
  const image = ogImage ?? absoluteUrl('/og-default.png')

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: publishedTime ? 'article' : 'website',
      ...(publishedTime && {
        publishedTime,
        authors: authors ?? [SITE_CONFIG.author],
        tags,
      }),
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      creator: SITE_CONFIG.twitterHandle,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  }
}

export function buildArticleJsonLd({
  title,
  description,
  date,
  slug,
  tags,
}: {
  title: string
  description: string
  date: string
  slug: string
  tags?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
    },
    url: absoluteUrl(`/writing/${slug}`),
    keywords: tags?.join(', '),
  }
}
