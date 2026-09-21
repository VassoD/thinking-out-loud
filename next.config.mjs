/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/portfolio/pitch-roast',
        destination: '/portfolio/pitchmate',
        permanent: true,
      },
      {
        source: '/portfolio/common-form',
        destination: '/portfolio/resonance',
        permanent: true,
      },
    ]
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
