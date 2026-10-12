// Warm enough to read as a clash against the green accent, and above 3:1 on both themes.
const KNOT_COLOR = '#c0654d'

const THREAD_X = 70
const THREAD_TOP = 18
const THREAD_BOTTOM = 212

interface Layer {
  label: string
  y: number
}

interface Bead {
  file: string
  y: number
  order?: number
}

interface Clash {
  file: string
  rule: string
}

const LAYERS: Layer[] = [
  { label: 'global', y: 30 },
  { label: 'plugins', y: 86 },
  { label: 'project', y: 142 },
]

const BEADS: Bead[] = [
  { file: '~/.claude/CLAUDE.md', y: 52, order: 1 },
  { file: 'skills, loaded on demand', y: 108 },
  { file: 'inteply/AGENTS.md', y: 164, order: 2 },
  { file: 'inteply/backend/CLAUDE.md', y: 196, order: 3 },
]

const KNOT_FROM = BEADS[0].y
const KNOT_TO = BEADS[3].y
const KNOT_START_X = THREAD_X - 8
const KNOT_CONTROL_X = THREAD_X - 52
// Midpoint of the cubic curve, where Klosti puts the dot.
const KNOT_BEND = { x: (KNOT_START_X + 3 * KNOT_CONTROL_X) / 4, y: (KNOT_FROM + KNOT_TO) / 2 }

const CLASHES: Clash[] = [
  { file: '~/.claude/CLAUDE.md', rule: 'Mock external dependencies (APIs, databases).' },
  { file: 'inteply/backend/CLAUDE.md', rule: 'Mock at the service boundary, not at the database level.' },
]

function BeadMark({ y, order }: Bead): React.ReactElement {
  if (order === undefined) {
    return <circle cx={THREAD_X} cy={y} r="6" fill="var(--color-surface-elevated)" stroke="var(--color-accent)" />
  }
  return (
    <g>
      <circle cx={THREAD_X} cy={y} r="8" fill="var(--color-accent)" />
      <text x={THREAD_X} y={y + 3} textAnchor="middle" fontFamily="monospace" fontSize="9" fill="var(--color-surface)">
        {order}
      </text>
    </g>
  )
}

export function KlostiDiagram(): React.ReactElement {
  return (
    <figure className="not-prose my-10">
      <div className="rounded-xl border border-border bg-surface-elevated p-4 sm:p-6">
        <svg viewBox="0 0 360 224" className="mx-auto block w-full max-w-md" role="img" aria-labelledby="klosti-diagram-title">
          <title id="klosti-diagram-title">
            Rule files in load order on a thread. A knot ties the global CLAUDE.md to the Inteply backend CLAUDE.md.
          </title>
          <path d={`M ${THREAD_X} ${THREAD_TOP} V ${THREAD_BOTTOM}`} stroke="var(--color-accent)" strokeWidth="1.5" />
          <path
            d={`M ${KNOT_START_X} ${KNOT_FROM} C ${KNOT_CONTROL_X} ${KNOT_FROM}, ${KNOT_CONTROL_X} ${KNOT_TO}, ${KNOT_START_X} ${KNOT_TO}`}
            stroke={KNOT_COLOR}
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx={KNOT_BEND.x} cy={KNOT_BEND.y} r="3.5" fill={KNOT_COLOR} />
          {LAYERS.map((layer) => (
            <text key={layer.label} x={THREAD_X + 20} y={layer.y} fontFamily="monospace" fontSize="8" letterSpacing="1.5" fill="var(--color-ink-faint)">
              {layer.label.toUpperCase()}
            </text>
          ))}
          {BEADS.map((bead) => (
            <g key={bead.file}>
              <BeadMark {...bead} />
              <text
                x={THREAD_X + 20}
                y={bead.y + 4}
                fontFamily="monospace"
                fontSize="11"
                fill={bead.order === undefined ? 'var(--color-ink-faint)' : 'var(--color-ink)'}
              >
                {bead.file}
              </text>
            </g>
          ))}
        </svg>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {CLASHES.map((clash) => (
            <div key={clash.file} className="rounded-lg border border-border bg-surface px-3 py-3 sm:px-4">
              <p className="font-mono text-[11px] text-ink-faint">{clash.file}</p>
              <p className="mt-1 font-serif text-base leading-snug text-ink">{clash.rule}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-ink-faint">
        Load order runs down the thread. The knot ties the two rules that disagree.
      </figcaption>
    </figure>
  )
}
