interface Stage {
  step: string
  title: string
  detail: string
  chips?: string[]
}

interface Handoff {
  label: string
}

const STAGES: Stage[] = [
  {
    step: 'scan',
    title: '150 files, 4 agents',
    detail: 'Each agent read in its own format.',
    chips: ['CLAUDE.md', 'AGENTS.md', 'memory', 'SKILL.md', 'hooks', 'MCP'],
  },
  { step: 'model', title: 'One thread per folder', detail: 'What loads into the same session, in order.' },
  { step: 'pass 1', title: 'Extract', detail: 'Each skill’s behaviour instructions, quoted exactly.' },
  { step: 'pass 2', title: 'Compare', detail: 'Those quotes against the rules loaded beside them.' },
  { step: 'findings', title: '22 contradictions, 13 overlaps', detail: 'Every finding cites both lines.' },
]

const HANDOFFS: Handoff[] = [
  { label: 'per folder' },
  { label: 'only what changed' },
  { label: 'quotes checked against source' },
  { label: 'JSON schema' },
]

function Connector({ label }: Handoff): React.ReactElement {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <span className="h-3 w-px bg-ink-faint" />
      <span className="my-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">{label}</span>
      <span className="h-3 w-px bg-ink-faint" />
      <span className="h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-ink-faint" />
    </div>
  )
}

function StageCard({ step, title, detail, chips }: Stage): React.ReactElement {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{step}</p>
      <p className="mt-0.5 font-serif text-base text-ink sm:text-lg">{title}</p>
      <p className="mt-0.5 text-xs text-ink-muted">{detail}</p>
      {chips && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <li key={chip} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-ink-muted">
              {chip}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function KlostiPipeline(): React.ReactElement {
  return (
    <figure className="not-prose my-10">
      <div className="mx-auto max-w-md rounded-xl border border-border bg-surface-elevated p-4 sm:p-6">
        {STAGES.map((stage, index) => (
          <div key={stage.step}>
            <StageCard {...stage} />
            {HANDOFFS[index] && <Connector {...HANDOFFS[index]} />}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-ink-faint">
        From files on disk to findings that quote both sides.
      </figcaption>
    </figure>
  )
}
