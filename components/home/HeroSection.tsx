import Container from '@/components/layout/Container'

export default function HeroSection() {
  return (
    <section className="pt-16 pb-12 sm:pt-20 sm:pb-16" aria-label="Introduction">
      <Container>
        <div className="max-w-2xl space-y-5 stagger-children">
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] sm:text-5xl">
            Writing so I remember. Building so people can steer.
          </h1>

          <p className="text-lg leading-relaxed text-[var(--color-ink-muted)] max-w-xl">
            Notes on engineering, UX, AI and philosophy. Kept before they disappear. Shared because thinking out loud is an act of taking up space.
          </p>
        </div>
      </Container>
    </section>
  )
}
