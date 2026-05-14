import Link from 'next/link'
import type { Post } from '@/types/post'
import CategoryPill from '@/components/ui/CategoryPill'
import ReadingTime from '@/components/ui/ReadingTime'
import { formatDate } from '@/lib/utils'
import Container from '@/components/layout/Container'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section aria-label="Featured article" className="py-10 border-t border-[var(--color-border)]">
      <Container>
        <p className="mb-6 text-xs font-medium tracking-widest uppercase text-[var(--color-ink-faint)]">
          Featured
        </p>

        <article>
          <Link
            href={`/writing/${post.slug}`}
            className="group block"
            aria-label={`Read featured article: ${post.title}`}
          >
            <div className="grid gap-6 sm:grid-cols-[1fr_2fr] sm:gap-12 items-start">
              <div className="space-y-3">
                <CategoryPill category={post.category} />
                <div className="flex items-center gap-2">
                  <time dateTime={post.date} className="text-sm text-[var(--color-ink-faint)]">
                    {formatDate(post.date)}
                  </time>
                  <span className="text-[var(--color-ink-faint)]">&middot;</span>
                  <ReadingTime minutes={post.computedReadingTime} />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)] sm:text-4xl">
                  {post.title}
                </h2>
                <p className="text-lg leading-relaxed text-[var(--color-ink-muted)]">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] transition-gap group-hover:gap-2.5">
                  Read article
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </article>
      </Container>
    </section>
  )
}
