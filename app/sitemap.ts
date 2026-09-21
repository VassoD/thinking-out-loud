import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE_CONFIG } from '@/lib/seo'
import { portfolioProjects } from '@/content/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const base = SITE_CONFIG.url

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/writing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/portfolio`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioProjects.map(({ slug }) => ({
    url: `${base}/portfolio/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...portfolioRoutes, ...postRoutes]
}
