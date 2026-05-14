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
              By day I lead the features squad at{' '}
              <a
                href="https://ublo.immo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                Ublo
              </a>
              , a proptech company building software for social housing management in France. I own the frontend,
              lead a squad, and care equally about the code and the team conditions that produce it.
              In parallel, I am building{' '}
              <a
                href="https://inteply.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                Inteply
              </a>
              {' '}as technical co-founder: a new infrastructure for newsrooms, AI-assisted and human-directed.
            </p>

            <p>
              My background is a deliberate mix. I have a Master&apos;s in Digital Creation and Interface Design
              from Université Sorbonne Paris Nord. My thesis explored one question: can NLP measure
              users&apos; emotional reactions during usability testing? Before that,
              I went through the Piscine at 42 Paris, which taught me to think in C and survive on very little sleep.
              Earlier still, I completed a Cisco engineering incubator, interned as an EU project manager in Palma
              on an Erasmus+ program, and tutored Python to teenagers. The thread connecting all of it
              is <em>curiosity</em> about how things work and how people experience them.
            </p>

            <p>
              Over the past two years, the majority of my engineering focus has been on integrating AI
              into real products: building AI-powered features and interfaces that make AI capabilities actually usable. Not just technically impressive.
              The hard part is never the model. It is the product thinking around it.
            </p>

            <p>
              I am a woman in engineering and technical leadership, which is still worth naming.
              I think about what it means to build environments where people who have historically been
              on the outside of these rooms can do their clearest thinking. I try to do that work actively.
            </p>

            <p>
              This site is called <em>Thinking Out Loud</em> because that is precisely what it is.
              Writing is how I figure out what I actually believe. Some of it will be wrong.
              I expect the site to change as I do.
            </p>

            <hr className="border-t border-[var(--color-border)] my-10" />

            <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)] mt-10 mb-4">
              What I write about
            </h2>

            <ul className="space-y-3 pl-0 list-none">
              {[
                ['Engineering', 'Frontend architecture, full-stack thinking, developer experience, and the craft of building software that holds up over time.'],
                ['Leadership', 'Leading squads, building trust, making decisions with incomplete information. What it means to create conditions for good work rather than just doing the work yourself.'],
                ['UX & Product', 'The invisible contract between builder and user. Why technically correct software is not always human software. Product thinking as a form of care.'],
                ['AI', 'What it actually means to build with LLMs inside real products. And, separately, what AI reveals about human creativity, intelligence, and authorship.'],
                ['Philosophy', 'Ideas that have changed how I see. Aristotle features heavily. So does systems thinking. Occasionally Stoicism, occasionally something stranger.'],
                ['Growth', 'What changes and what does not. Personal and professional. The longer game.'],
                ['Mental Models', 'Frameworks for recognising patterns across engineering, organisations, and human behaviour.'],
                ['Notes', 'Shorter, less resolved thoughts. Things I am still working out.'],
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
                href="mailto:vassidoro@gmail.com"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                vassidoro@gmail.com
              </a>
              . I read everything.
            </p>
          </div>
        </article>
      </Container>
    </div>
  )
}
