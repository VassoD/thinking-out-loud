import type { Post } from '@/types/post'
import PostCard from './PostCard'
import Divider from '@/components/ui/Divider'

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <aside aria-label="Related posts" className="mt-16">
      <Divider ornamental />
      <h2 className="mb-8 font-serif text-2xl font-semibold text-[var(--color-ink)]">
        Continue reading
      </h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </aside>
  )
}
