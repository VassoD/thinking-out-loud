import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/types/post'
import type { Category } from '@/types/post'
import { getPostsByCategory } from '@/lib/posts'
import { buildMetadata } from '@/lib/seo'
import PostCard from '@/components/post/PostCard'
import Container from '@/components/layout/Container'
import CategoryPill from '@/components/ui/CategoryPill'

const SLUG_TO_CATEGORY: Record<string, Category> = {
  engineering: 'Engineering',
  leadership: 'Leadership',
  'ux-product': 'UX & Product',
  ai: 'AI',
  philosophy: 'Philosophy',
  growth: 'Growth',
  'mental-models': 'Mental Models',
  notes: 'Notes',
}

const VALID_SLUGS = Object.keys(SLUG_TO_CATEGORY)

interface CategoryPageProps {
  params: { category: string }
}

export function generateStaticParams(): { category: string }[] {
  return VALID_SLUGS.map((category) => ({ category }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = SLUG_TO_CATEGORY[params.category]
  if (!category) return {}

  return buildMetadata({
    title: category,
    description: `Writing about ${category.toLowerCase()}: engineering, humans, and ideas.`,
    path: `/${params.category}`,
  })
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = SLUG_TO_CATEGORY[params.category]
  if (!category) notFound()

  const posts = getPostsByCategory(category)

  return (
    <div className="py-16">
      <Container>
        <header className="mb-12 space-y-4">
          <CategoryPill category={category} />
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
            {category}
          </h1>
          <p className="text-[var(--color-ink-muted)]">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-[var(--color-ink-muted)]">Nothing here yet. Check back soon.</p>
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
