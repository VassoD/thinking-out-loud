const SNAPSHOT_FIELDS = ['branch', 'uncommitted', 'untracked', 'plan']

interface Session {
  worktree: string
  agent: string
  channel: string
}

interface Outcome {
  mechanism: string
  effect: string
}

const SESSIONS: Session[] = [
  { worktree: 'app-auth', agent: 'Claude Code', channel: 'git hooks' },
  { worktree: 'app-billing', agent: 'Codex', channel: 'MCP server' },
]

const OUTCOMES: Outcome[] = [
  { mechanism: 'PreToolUse hook', effect: 'pauses the edit once' },
  { mechanism: 'MCP tool result', effect: 'starts with a heads up' },
]

function Connector({ label }: { label?: string }): React.ReactElement {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <span className="h-5 w-px bg-ink-faint" />
      {label && (
        <span className="my-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">{label}</span>
      )}
      <span className="h-5 w-px bg-ink-faint" />
      <span className="h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-ink-faint" />
    </div>
  )
}

function SessionCard({ worktree, agent }: Session): React.ReactElement {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-3 sm:px-4">
      <p className="font-mono text-[11px] text-ink-faint">{worktree}</p>
      <p className="mt-0.5 font-serif text-base text-ink sm:text-lg">{agent}</p>
      <p className="mt-2 inline-block rounded border border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-1.5 py-0.5 font-mono text-[11px] text-accent">
        src/auth.ts
      </p>
    </div>
  )
}

function OutcomeCard({ mechanism, effect }: Outcome): React.ReactElement {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-3 sm:px-4">
      <p className="font-mono text-[11px] text-ink-faint">{mechanism}</p>
      <p className="mt-0.5 font-serif text-base leading-snug text-ink sm:text-lg">{effect}</p>
    </div>
  )
}

export function TeamroomDiagram(): React.ReactElement {
  return (
    <figure className="not-prose my-10">
      <div className="rounded-xl border border-border bg-surface-elevated p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {SESSIONS.map((session) => (
            <div key={session.worktree} className="flex flex-col">
              <SessionCard {...session} />
              <Connector label={session.channel} />
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] bg-surface px-4 py-4 text-center sm:px-6">
          <p className="font-mono text-sm text-accent">.git/teamroom</p>
          <p className="mt-1 text-xs text-ink-muted">shared by every worktree, one snapshot per session</p>
          <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
            {SNAPSHOT_FIELDS.map((field) => (
              <li
                key={field}
                className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] text-ink-muted"
              >
                {field}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {OUTCOMES.map((outcome) => (
            <div key={outcome.mechanism} className="flex flex-col">
              <Connector />
              <OutcomeCard {...outcome} />
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-ink-faint">
        Both sessions touch src/auth.ts. Each learns it before the edit, not at the merge.
      </figcaption>
    </figure>
  )
}
