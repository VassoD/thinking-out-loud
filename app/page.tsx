import { getAllPosts } from '@/lib/posts'
import HeroSection from '@/components/home/HeroSection'
import RecentPosts from '@/components/home/RecentPosts'

export const dynamic = 'force-static'
export const revalidate = 3600

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <>
      <HeroSection />
      <RecentPosts posts={posts} />
    </>
  )
}
