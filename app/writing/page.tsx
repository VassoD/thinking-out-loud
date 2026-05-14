import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { CATEGORIES } from '@/types/post'
import type { Category } from '@/types/post'
import PostCard from '@/components/post/PostCard'
import CategoryPill from '@/components/ui/CategoryPill'
import Container from '@/components/layout/Container'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Writing',
  description: 'Essays, notes, and reflections on engineering, leadership, UX, AI, philosophy, and the systems shaping modern life.',
  path: '/writing',
})

export const dynamic = 'force-static'

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <div className="py-16">
      <Container>
        <header className="mb-12 space-y-4">
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
            Writing
          </h1>
          <p className="text-lg text-[var(--color-ink-muted)] max-w-xl">
            Essays, notes, and reflections. Technical and philosophical, personal and practical.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <CategoryPill key={category} category={category as Category} linked />
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="text-[var(--color-ink-muted)]">No posts yet. Check back soon.</p>
        ) : (
          <div className="max-w-2xl">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
