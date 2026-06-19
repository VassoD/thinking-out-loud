import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Category } from '@/types/post'

interface CategoryPillProps {
  category: Category
  linked?: boolean
  className?: string
}

const CATEGORY_SLUG_MAP: Record<Category, string> = {
  Engineering: 'engineering',
  Leadership: 'leadership',
  'UX & Product': 'ux-product',
  AI: 'ai',
  Philosophy: 'philosophy',
  Growth: 'growth',
}

const pillClass =
  'inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium tracking-wide uppercase transition-colors'

const baseStyle =
  'bg-[var(--color-surface-elevated)] text-[var(--color-accent)] border border-[var(--color-border)]'

export default function CategoryPill({ category, linked = false, className }: CategoryPillProps) {
  const slug = CATEGORY_SLUG_MAP[category]

  if (linked) {
    return (
      <Link
        href={`/${slug}`}
        className={cn(pillClass, baseStyle, 'hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-surface)]', className)}
      >
        {category}
      </Link>
    )
  }

  return (
    <span className={cn(pillClass, baseStyle, className)}>
      {category}
    </span>
  )
}
