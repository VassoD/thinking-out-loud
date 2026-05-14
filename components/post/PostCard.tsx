import Link from 'next/link'
import type { Post } from '@/types/post'
import CategoryPill from '@/components/ui/CategoryPill'
import { formatDateShort } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group border-t border-[var(--color-border)] py-6">
      <Link
        href={`/writing/${post.slug}`}
        className="grid grid-cols-[100px_1fr] gap-6 sm:grid-cols-[140px_1fr]"
        aria-label={`Read: ${post.title}`}
      >
        <div className="pt-0.5 space-y-2">
          <time
            dateTime={post.date}
            className="block text-sm text-[var(--color-ink-faint)]"
          >
            {formatDateShort(post.date)}
          </time>
          <CategoryPill category={post.category} />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-xl leading-snug tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
            {post.title}
          </h2>
          <p className="text-[var(--color-ink-muted)] text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  )
}
