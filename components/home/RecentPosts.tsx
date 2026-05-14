import type { Post } from '@/types/post'
import PostCard from '@/components/post/PostCard'
import Container from '@/components/layout/Container'

interface RecentPostsProps {
  posts: Post[]
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  if (posts.length === 0) return null

  return (
    <section aria-label="All writing" className="py-12 border-t border-[var(--color-border)]">
      <Container>
        <div className="max-w-2xl">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  )
}
