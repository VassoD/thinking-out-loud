import { getAllPosts } from '@/lib/posts'
import { SITE_CONFIG } from '@/lib/seo'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-static'

export function GET(): Response {
  const posts = getAllPosts()
  const base = SITE_CONFIG.url

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${base}/writing/${post.slug}</link>
      <guid isPermaLink="true">${base}/writing/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_CONFIG.title}</title>
    <link>${base}</link>
    <description>${SITE_CONFIG.description}</description>
    <language>en-gb</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
