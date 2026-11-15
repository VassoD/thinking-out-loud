import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import ProjectVisual from '@/components/portfolio/ProjectVisual'
import LinkedInBanner, { BANNER_DESIGNS, BANNER_THEMES } from '@/components/kit/LinkedInBanner'
import BloomMark from '@/components/brand/BloomMark'
import { KIT_PALETTES, KIT_THEMES } from '@/components/kit/palette'
import { portfolioProjects } from '@/content/portfolio'

export const metadata: Metadata = {
  title: 'Kit',
  robots: { index: false, follow: false },
}

const SECTION_TITLE = 'mb-4 text-xs font-medium uppercase tracking-wider text-[var(--color-ink-faint)]'
const MARK_SIZES = [64, 32, 16]
const HEADER_MARK_SIZE = 20
const COLOR_TOKENS =['surface', 'surface-elevated', 'ink', 'ink-muted', 'ink-faint', 'border', 'accent', 'accent-muted']

export default function KitPage(): JSX.Element {
  const visuals = Array.from(new Set(portfolioProjects.map((project) => project.visual)))

  return (
    <div className="py-16">
      <Container size="wide" className="space-y-16">
        <header className="max-w-xl space-y-3">
          <h1 className="font-serif text-4xl font-semibold tracking-tight">Kit</h1>
          <p className="text-[var(--color-ink-muted)]">Every visual made for this site and around it, in one place.</p>
        </header>

        <section>
          <h2 className={SECTION_TITLE}>Mark · favicon and header</h2>
          <div className="space-y-3">
            <p className="font-mono text-xs text-[var(--color-ink-muted)]">bloom · the banner ✻, petals fading around like a spinner caught mid-turn</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {KIT_THEMES.map((theme) => {
                const palette = KIT_PALETTES[theme]
                return (
                  <div
                    key={theme}
                    className="flex flex-wrap items-center gap-6 border border-[var(--color-border)] px-6 py-5"
                    style={{ background: palette.surface, color: palette.ink }}
                  >
                    {MARK_SIZES.map((size) => <BloomMark key={size} color={palette.accent} size={size} />)}
                    <span className="flex items-center gap-2">
                      <BloomMark color={palette.accent} size={HEADER_MARK_SIZE} />
                      <span className="font-serif text-lg font-semibold tracking-tight">thinking out loud</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section>
          <h2 className={SECTION_TITLE}>Banners</h2>
          <div className="space-y-12">
            {BANNER_DESIGNS.map((art) => (
              <div key={art.id} className="space-y-4">
                <p className="font-mono text-xs text-[var(--color-ink-muted)]">{art.label}</p>
                {BANNER_THEMES.map((theme) => (
                  <figure key={theme} className="space-y-2">
                    <LinkedInBanner Art={art.Art} theme={theme} className="block w-full border border-[var(--color-border)]" />
                    <figcaption className="flex justify-between font-mono text-xs text-[var(--color-ink-muted)]">
                      <span>{theme}</span>
                      <Link href={`/kit/banner/${art.id}/${theme}`} className="portfolio-text-link">export view</Link>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={SECTION_TITLE}>Portfolio visuals</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {visuals.map((visual) => (
              <figure key={visual} className="space-y-2">
                <ProjectVisual variant={visual} />
                <figcaption className="font-mono text-xs text-[var(--color-ink-muted)]">{visual}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section>
          <h2 className={SECTION_TITLE}>Colors</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {COLOR_TOKENS.map((token) => (
              <div key={token} className="space-y-2">
                <div className="h-16 border border-[var(--color-border)]" style={{ background: `var(--color-${token})` }} />
                <p className="font-mono text-xs text-[var(--color-ink-muted)]">--color-{token}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}
