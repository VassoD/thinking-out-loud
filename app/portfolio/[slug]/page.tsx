import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/layout/Container'
import ProjectVisual from '@/components/portfolio/ProjectVisual'
import SignalStudy from '@/components/portfolio/SignalStudy'
import BrandStudy from '@/components/portfolio/BrandStudy'
import { portfolioProjects } from '@/content/portfolio'
import { buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = portfolioProjects.find(({ slug }) => slug === params.slug)
  if (!project) notFound()
  return buildMetadata({ title: project.title, description: project.summary, path: `/portfolio/${project.slug}` })
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const index = portfolioProjects.findIndex(({ slug }) => slug === params.slug)
  const project = portfolioProjects[index]
  if (!project) notFound()
  const nextProject = portfolioProjects[(index + 1) % portfolioProjects.length]

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <Link href="/portfolio" className="portfolio-text-link text-sm"><span aria-hidden="true">← </span>Portfolio</Link>
        <article className="mt-10">
          <header className="mb-8 space-y-4">
            <p className="portfolio-eyebrow">{project.kind} · {project.discipline}</p>
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="max-w-xl text-lg leading-relaxed text-[var(--color-ink-muted)]">{project.intro}</p>
          </header>

          {project.visual === 'signal' ? <SignalStudy /> : project.visual === 'brand' ? <BrandStudy /> : <ProjectVisual variant={project.visual} />}

          <div className="mt-10 max-w-reading space-y-8">
            {project.sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 font-serif text-xl font-semibold">{section.title}</h2>
                <p className="text-[1.0625rem] leading-[1.85] text-[var(--color-ink-muted)]">{section.text}</p>
              </section>
            ))}
            <p className="font-serif text-xl italic leading-relaxed">{project.takeaway}</p>
            <p className="border-t border-[var(--color-border)] pt-6 text-xs leading-relaxed text-[var(--color-ink-muted)]">{project.stack}</p>
            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-6">
                {project.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="portfolio-text-link text-sm">{link.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>)}
              </div>
            )}
          </div>
        </article>
        <nav aria-label="More projects" className="mt-16 flex items-center justify-between gap-6 border-t border-[var(--color-border)] pt-6 text-sm">
          <Link href="/portfolio" className="portfolio-text-link">All projects</Link>
          <Link href={`/portfolio/${nextProject.slug}`} className="portfolio-text-link">{nextProject.title} <span aria-hidden="true">→</span></Link>
        </nav>
      </Container>
    </div>
  )
}
