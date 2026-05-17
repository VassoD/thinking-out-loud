import { getAllPosts } from '@/lib/posts'
import HeroSection from '@/components/home/HeroSection'
import RecentPosts from '@/components/home/RecentPosts'
import SubscribeForm from '@/components/post/SubscribeForm'
import Container from '@/components/layout/Container'

export const dynamic = 'force-static'
export const revalidate = 3600

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <>
      <HeroSection />
      <RecentPosts posts={posts} />
      <Container>
        <div className="max-w-2xl pb-16">
          <SubscribeForm />
        </div>
      </Container>
    </>
  )
}
