import Link from 'next/link'
import Container from './Container'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] py-10">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-xl text-[var(--color-ink-muted)]" style={{letterSpacing: '-0.08em'}}>
              VD๏r
            </span>
            <p className="text-xs text-[var(--color-ink-faint)]">
              &copy; {year} Vasiliki Doropoulou
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex items-center gap-5">
            <Link
              href="/writing"
              className="text-sm text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-ink)]"
            >
              Writing
            </Link>
            <Link
              href="/about"
              className="text-sm text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-ink)]"
            >
              About
            </Link>
            <Link
              href="/rss.xml"
              className="text-sm text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-accent)]"
              aria-label="RSS feed"
            >
              RSS
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
