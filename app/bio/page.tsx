import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Bio',
  description: 'Vasiliki Doropoulou. Product engineer, technical co-founder, squad lead. Building AI infrastructure for newsrooms and shipping features in proptech.',
  path: '/bio',
})

const EXPERIENCE = [
  {
    title: 'Technical Co-Founder',
    company: 'Inteply',
    url: 'https://inteply.com',
    period: 'Feb 2025 – Present',
    description: 'Building a production AI research platform for journalists and editorial teams. Orchestrates multi-provider LLMs, RAG pipelines, and external APIs to automate news discovery, source cross-referencing, and editorial content generation.',
    highlights: [
      'Multi-step RAG system across 6 core services: search, scraping, fact extraction, cross-referencing, structured generation',
      'Hallucination-reduction logic using controlled inputs, strict output schemas, and AI-as-judge validation',
      'Completion agent that stops processing when information is sufficient, cutting unnecessary API usage',
      'Full production infrastructure: auth, RBAC, billing, admin dashboard, cron workflows',
    ],
  },
  {
    title: 'Squad Lead / Front-End Engineer',
    company: 'Ublo',
    url: 'https://ublo.immo',
    period: 'Mar 2023 – Present',
    description: 'Promoted to Squad Lead in March 2026. Leading the features squad (frontend, backend, design, PM) at a proptech SaaS covering rentals, tenant workflows, invoicing, and real estate operations.',
    highlights: [
      'Own the frontend of core product features (rental contracts with PandaDoc e-sign and GraphQL SSE, refunds, entity categories, tenant portal..)',
      'Platform-wide migrations: REST to GraphQL, Cypress to Playwright, Typesense search integration',
      'Internal UIKit: Storybook-based component library with design system foundations',
      'Domain logic refactored into reusable providers, hooks, schemas, and GraphQL layers',
      'Leading AI tooling transition: internal survey across 29 team members revealed fragmented adoption and a shared pain point — re-explaining Ublo context in every prompt. Standardizing on Claude and Cursor, and designing an MCP server to expose platform APIs and domain knowledge to AI agents so context travels with the tool (in progress)',
    ],
  },
]

const SKILLS = [
  {
    area: 'Frontend',
    items: 'React, Next.js, TypeScript, Tailwind CSS, GraphQL, Styled Components, Storybook, Figma, Design Systems, localization',
  },
  {
    area: 'Backend',
    items: 'Node.js, Express.js, Python, REST APIs, PostgreSQL, Prisma, Redis, DDD',
  },
  {
    area: 'AI',
    items: 'Multi-provider LLM orchestration, AI workflow orchestration, RAG, prompt engineering, evals, human-in-the-loop design, LLM cost optimization',
  },
  {
    area: 'Product',
    items: 'Multi-step workflow design, human-AI collaboration patterns, UX research, conversational UI, cross-functional delivery',
  },
  {
    area: 'Tooling',
    items: 'Claude Code, Claude Design, v0, Figma',
  },
]

const TRAINING = [
  '42 Paris: left the common core curriculum to take a full-time role at Ublo',
  'Cisco Engineer Incubator 9.0 (CCNA/DevNet track, Python and network automation)',
]

const EDUCATION = [
  {
    degree: 'Master 2, Design d\'Interface Multimedia et Internet',
    school: 'Université Sorbonne Paris Nord',
    period: '2022 – 2023',
    note: 'Thesis: AI applied to UX, NLP measuring emotional reactions in usability testing',
  },
  {
    degree: 'Bachelor\'s, Philosophy, French Language & Literature',
    school: 'National & Kapodistrian University of Athens',
    period: '2016 – 2021',
    note: '',
  },
]

export default function BioPage() {
  return (
    <div className="py-16">
      <Container size="reading">
        <article>
          <header className="mb-12">
            <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-5xl">
              Vasiliki Doropoulou
            </h1>
            <p className="mt-3 text-[var(--color-ink-muted)] text-sm tracking-wide uppercase">
              Product Engineer · Paris, France
            </p>
          </header>

          <div className="space-y-10 text-[1.0625rem] leading-[1.85] text-[var(--color-ink)]">

            <p>
              Full-stack engineer with a strong front-end and UX focus. I build end-to-end product features
              in fast-moving environments, lead a feature squad at{' '}
              <a
                href="https://ublo.immo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                Ublo
              </a>
              , and am building{' '}
              <a
                href="https://inteply.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                Inteply
              </a>{' '}
              as technical co-founder. <em>Particularly interested in reliable AI products that improve real user workflows.</em>
            </p>

            <hr className="border-t border-[var(--color-border)]" />

            <section>
              <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)] mb-8">
                Experience
              </h2>
              <div className="space-y-10">
                {EXPERIENCE.map((role) => (
                  <div key={role.company}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                      <div>
                        <span className="font-semibold text-[var(--color-ink)]">{role.title}</span>
                        {' · '}
                        <a
                          href={role.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
                        >
                          {role.company}
                        </a>
                      </div>
                      <span className="text-sm text-[var(--color-ink-muted)] shrink-0">{role.period}</span>
                    </div>
                    <p className="text-[var(--color-ink-muted)] mb-3 text-[0.9375rem]">{role.description}</p>
                    <ul className="space-y-1.5 pl-0 list-none">
                      {role.highlights.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.9375rem] text-[var(--color-ink-muted)]">
                          <span className="mt-[0.6em] w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-t border-[var(--color-border)]" />

            <section>
              <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)] mb-6">
                Skills
              </h2>
              <ul className="space-y-3 pl-0 list-none">
                {SKILLS.map(({ area, items }) => (
                  <li key={area} className="grid gap-1 sm:grid-cols-[130px_1fr]">
                    <span className="font-medium text-[var(--color-ink)]">{area}</span>
                    <span className="text-[var(--color-ink-muted)]">{items}</span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-t border-[var(--color-border)]" />

            <section>
              <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)] mb-6">
                Education
              </h2>
              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <span className="font-medium text-[var(--color-ink)]">{edu.degree}</span>
                      <span className="text-sm text-[var(--color-ink-muted)] shrink-0">{edu.period}</span>
                    </div>
                    <p className="text-[var(--color-ink-muted)] text-[0.9375rem]">{edu.school}</p>
                    {edu.note && (
                      <p className="text-[var(--color-ink-muted)] text-sm mt-1 italic">{edu.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-t border-[var(--color-border)]" />

            <section>
              <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink)] mb-6">
                Training
              </h2>
              <ul className="space-y-2 pl-0 list-none">
                {TRAINING.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] text-[var(--color-ink-muted)]">
                    <span className="mt-[0.6em] w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-t border-[var(--color-border)]" />

            <section className="flex flex-wrap gap-x-6 gap-y-2 text-[var(--color-ink-muted)] text-sm">
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/in/vasilikidoropoulou' },
                { label: 'GitHub', href: 'https://github.com/VassoD' },
                { label: 'vassidoro@gmail.com', href: 'mailto:vassidoro@gmail.com' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="text-[var(--color-accent)] underline underline-offset-2 decoration-[var(--color-accent-muted)] hover:decoration-[var(--color-accent)] transition-colors"
                >
                  {label}
                </a>
              ))}
            </section>

          </div>
        </article>
      </Container>
    </div>
  )
}
