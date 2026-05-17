'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Container from './Container'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
] as const

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-sm">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="font-serif text-lg font-semibold tracking-tight text-[var(--color-ink)] transition-opacity hover:opacity-70"
            aria-label="Thinking Out Loud, home"
          >
            thinking out loud
          </Link>

          <nav aria-label="Main navigation" className="flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm transition-colors',
                  pathname.startsWith(href)
                    ? 'text-[var(--color-ink)]'
                    : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]'
                )}
              >
                {label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  )
}
