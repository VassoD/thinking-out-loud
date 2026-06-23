import type { MDXComponents } from 'mdx/types'
import { cn } from '@/lib/utils'
import { StepperDemo } from './StepperDemo'

export const mdxComponents: MDXComponents = {
  StepperDemo,
  img: ({ className, alt = '', ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={cn(
        'block mx-auto my-8 h-auto w-auto max-w-xs rounded-lg border border-[var(--color-border)]',
        className
      )}
      {...props}
    />
  ),
  h1: ({ className, ...props }) => (
    <h1
      className={cn('font-serif text-4xl font-semibold tracking-tight leading-tight mt-0 mb-6', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn('font-serif text-2xl font-semibold tracking-tight leading-snug mt-10 mb-4', className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn('font-serif text-xl font-semibold tracking-tight leading-snug mt-8 mb-3', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn('leading-[1.85] text-[var(--color-ink)] mb-6', className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'font-serif italic text-xl leading-relaxed border-l-2 border-[var(--color-accent)] pl-6 my-8 text-[var(--color-ink)]',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }) => (
    <a
      href={href}
      className={cn(
        'text-[var(--color-accent)] underline decoration-[var(--color-accent-muted)] underline-offset-3 decoration-[1px] transition-colors hover:decoration-[var(--color-accent)]',
        className
      )}
      {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn('my-5 pl-6 space-y-2 list-disc marker:text-[var(--color-ink-faint)]', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-5 pl-6 space-y-2 list-decimal marker:text-[var(--color-ink-faint)]', className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('leading-relaxed', className)} {...props} />
  ),
  hr: () => (
    <hr className="border-none border-t border-[var(--color-border)] my-10" aria-hidden="true" />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        'font-mono text-[0.875em] bg-[var(--color-surface-elevated)] rounded px-1.5 py-0.5',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 my-8 text-sm',
        className
      )}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn('font-semibold text-[var(--color-ink)]', className)} {...props} />
  ),
  em: ({ className, ...props }) => (
    <em className={cn('font-serif italic', className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <div className="overflow-x-auto my-8">
      <table className={cn('w-full text-sm border-collapse', className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn('text-left font-semibold py-2 px-4 border-b border-[var(--color-border)]', className)}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn('py-2 px-4 border-b border-[var(--color-border)]', className)}
      {...props}
    />
  ),
}
