import { getAllPosts } from '@/lib/posts'
import HeroSection from '@/components/home/HeroSection'
import RecentPosts from '@/components/home/RecentPosts'
import SubscribeForm from '@/components/post/SubscribeForm'
import Container from '@/components/layout/Container'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 3600

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <>
      <HeroSection />
      <Container>
        <div className="mb-12 flex max-w-2xl flex-wrap items-baseline justify-between gap-3 border-y border-[var(--color-border)] py-5">
          <p className="text-sm text-[var(--color-ink-muted)]">Some ideas become essays. Others become tools.</p>
          <Link href="/portfolio" className="portfolio-text-link text-sm">Selected work <span aria-hidden="true">↗</span></Link>
        </div>
      </Container>
      <RecentPosts posts={posts} />
      <Container>
        <div className="max-w-2xl pb-16">
          <SubscribeForm />
        </div>
      </Container>
    </>
  )
}
