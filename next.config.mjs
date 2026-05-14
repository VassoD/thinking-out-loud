/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/rss.xml',
        headers: [{ key: 'Content-Type', value: 'application/rss+xml; charset=utf-8' }],
      },
    ]
  },
}

export default nextConfig
