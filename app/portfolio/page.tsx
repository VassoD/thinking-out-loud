import Link from 'next/link'
import Container from '@/components/layout/Container'
import ProjectVisual from '@/components/portfolio/ProjectVisual'
import { portfolioProjects } from '@/content/portfolio'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Portfolio',
  description: 'Selected projects and working concepts by Vasiliki Doropoulou. Audio, developer tools, and brand systems built in code.',
  path: '/portfolio',
})

export default function PortfolioPage() {
  return (
    <div className="py-16">
      <Container>
        <header className="mb-12 max-w-xl space-y-4">
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">Portfolio</h1>
          <p className="text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Things I build. Audio, interfaces, and small systems that make an abstract idea tangible.
          </p>
          <p className="text-sm text-[var(--color-ink-muted)]">Product work, hackathons, and working concepts.</p>
        </header>

        <div className="portfolio-list">
          {portfolioProjects.map((project, index) => (
            <article key={project.slug} className="portfolio-entry">
              <Link href={`/portfolio/${project.slug}`} className="portfolio-project-link" aria-label={`${project.title}: read the project`}>
                <div className="portfolio-entry-copy">
                  <p className="portfolio-eyebrow"><span className="font-mono">0{index + 1}</span><span>{project.discipline}</span></p>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">{project.title}</h2>
                  <p className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">{project.summary}</p>
                  <p className="mt-5 text-xs text-[var(--color-ink-muted)]">{project.kind}</p>
                  <span className="portfolio-read">{project.visual === 'signal' || project.visual === 'brand' ? 'Try the study' : 'Read the project'} <span aria-hidden="true">↗</span></span>
                </div>
                <ProjectVisual variant={project.visual} />
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-12 text-sm leading-relaxed text-[var(--color-ink-muted)]">
          Vasiliki Doropoulou. Product engineer, based in Paris.{' '}
          <Link href="/about" className="portfolio-text-link">A little more about me.</Link>
        </p>
      </Container>
    </div>
  )
}
