import Container from '@/components/layout/Container'

export default function HeroSection() {
  return (
    <section className="pt-16 pb-12 sm:pt-20 sm:pb-16" aria-label="Introduction">
      <Container>
        <div className="max-w-2xl space-y-5 stagger-children">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Engineering ideas, human systems, and the space between.
          </h1>

          <p className="text-lg leading-relaxed text-[var(--color-ink-muted)] max-w-xl">
            A place to document what I am learning, what I am building, and what I am still figuring out.
            Engineering, UX, leadership, philosophy and the occasional realisation I want to remember before it disappears.
          </p>
        </div>
      </Container>
    </section>
  )
}
