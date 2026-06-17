import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Vasiliki Doropoulou. Product engineer, technical co-founder, and UX thinker based in Paris.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="py-16">
      <Container size="reading">
        <article>
          <header className="mb-12">
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              About
            </h1>
          </header>

          <div className="space-y-6 text-[1.0625rem] leading-[1.85] text-[var(--color-ink)]">
            <p>
              I am Vasiliki Doropoulou. Product engineer and technical co-founder, based in Paris.
              I am Greek, which probably explains the Aristotle references.
            </p>

            <p>
              I lead the features squad at{' '}
              <a
                href="https://ublo.immo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                Ublo
              </a>
              , proptech for social housing in France. Frontend, team, and the conditions that make both work.
              I am also building{' '}
              <a
                href="https://inteply.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                Inteply
              </a>
              {' '}as technical co-founder: AI infrastructure for newsrooms, AI-assisted and human-directed.
            </p>

            <p>
              I started as a French Literature student in Athens. Wanted to build a game to teach children French.
              Had no idea how. So I taught myself: Python, design, front-end. That chain led to a Master&apos;s
              in Digital Creation at Sorbonne Paris Nord and at 42 Paris.{' '}
              <em>The non-technical background is not a detour. It is why I build differently.</em>
            </p>

            <p>
              I am a woman in engineering and technical leadership. I have imposter syndrome: from the
              non-linear path, from the culture I grew up in, from being one of few women in these rooms.
              Writing is how I push back against that.{' '}
              <em>Thinking out loud is an act of taking up space.</em>
            </p>

            <hr className="border-t border-[var(--color-border)] my-10" />

            <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)] mt-10 mb-4">
              What I write about
            </h2>

            <ul className="space-y-3 pl-0 list-none">
              {[
                ['Engineering', 'Frontend architecture, developer experience, software that holds up.'],
                ['Leadership', 'Decisions with incomplete information. Conditions for good work, not just the work.'],
                ['UX & Product', 'The contract between builder and user. Correct software is not always human software.'],
                ['Philosophy', 'Ideas that changed how I see. Aristotle features heavily. Occasionally Stoicism, occasionally something stranger.'],
                ['Growth', 'What changes and what does not. The longer game.'],
                ['Mental Models', 'Patterns across engineering, organisations, and behaviour.'],
                ['AI', 'Building with LLMs in real products. What AI reveals about creativity and authorship.'],
                ['Notes', 'Less resolved thoughts. Still working them out.'],
              ].map(([title, desc]) => (
                <li key={title} className="grid gap-1 sm:grid-cols-[160px_1fr]">
                  <span className="font-medium text-[var(--color-ink)]">{title}</span>
                  <span className="text-[var(--color-ink-muted)]">{desc}</span>
                </li>
              ))}
            </ul>

            <hr className="border-t border-[var(--color-border)] my-10" />

            <p className="text-[var(--color-ink-muted)]">
              You can reach me at{' '}
              <a
                href="https://www.linkedin.com/in/vasilikidoropoulou"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                LinkedIn
              </a>
              . I read everything.
            </p>
          </div>
        </article>
      </Container>
    </div>
  )
}
