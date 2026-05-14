import type { Post } from '@/types/post'
import CategoryPill from '@/components/ui/CategoryPill'
import ReadingTime from '@/components/ui/ReadingTime'
import { formatDate } from '@/lib/utils'

interface PostHeaderProps {
  post: Post
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-12 space-y-5">
      <div className="flex items-center gap-3">
        <CategoryPill category={post.category} linked />
        <ReadingTime minutes={post.computedReadingTime} />
      </div>

      <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
        {post.title}
      </h1>

      <p className="text-xl leading-relaxed text-[var(--color-ink-muted)] font-light">
        {post.excerpt}
      </p>

      <div className="flex items-center gap-2 border-t border-[var(--color-border)] pt-5">
        <time dateTime={post.date} className="text-sm text-[var(--color-ink-faint)]">
          {formatDate(post.date)}
        </time>
        {post.tags && post.tags.length > 0 && (
          <>
            <span className="text-[var(--color-ink-faint)]">&middot;</span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-[var(--color-ink-faint)] after:content-[','] last:after:content-['']"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  )
}
