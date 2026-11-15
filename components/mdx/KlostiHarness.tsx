'use client'

import { useState } from 'react'

// Same clash color as KlostiDiagram, so an issue reads the same across the post.
const ISSUE_COLOR = '#c0654d'

type Kind = 'rule' | 'skill' | 'memory' | 'hook' | 'tool'
type LayerId = 'global' | 'plugins' | 'project'
type ProjectId = 'teamroom' | 'inteply'

interface KindInfo {
  label: string
  color: string
  loads: string
}

// Mid-tone hues: used for dots, borders and bars, never for text, so they hold up on both themes.
const KINDS: Record<Kind, KindInfo> = {
  rule: { label: 'Instructions', color: '#5C8A62', loads: 'read before your first message' },
  skill: { label: 'Skills', color: '#5B7FA6', loads: 'only the description, until needed' },
  memory: { label: 'Memory', color: '#9474B5', loads: 'notes Claude wrote itself' },
  hook: { label: 'Hooks', color: '#B9873A', loads: 'scripts that run on events' },
  tool: { label: 'Tools', color: '#3F9294', loads: 'MCP servers it can call' },
}

const KIND_ORDER: Kind[] = ['rule', 'skill', 'memory', 'hook', 'tool']

interface Piece {
  id: string
  label: string
  /** A plugin is a bundle, so it can hold several kinds. */
  kinds: Kind[]
  what: string
  when: string
  where: string
  how: string
  note?: string
}

const LAYERS: Record<LayerId, { title: string; detail: string }> = {
  global: { title: 'Global', detail: 'yours, in every project' },
  plugins: { title: 'Plugins', detail: 'installed once, in every project' },
  project: { title: 'Project', detail: 'only in this repo' },
}

const SHARED: Record<'global' | 'plugins', Piece[]> = {
  global: [
    {
      id: 'global-claude-md',
      label: '~/.claude/CLAUDE.md',
      kinds: ['rule'],
      what: 'Your personal instructions. Plain text Claude reads before you type anything.',
      when: 'Every session, in every project.',
      where: '~/.claude/CLAUDE.md',
      how: 'Edit the file. Keep only what is true everywhere, like your commit style. Project decisions belong in the repo.',
    },
    {
      id: 'global-skills',
      label: '23 skills',
      kinds: ['skill'],
      what: 'Folders of know-how. Claude sees each name and description, and reads the full skill only when a request matches.',
      when: 'The descriptions every session, the rest on demand.',
      where: '~/.claude/skills/<name>/SKILL.md',
      how: 'Create a folder with a SKILL.md. Its description decides when Claude picks it, so make it specific.',
    },
    {
      id: 'global-linear',
      label: 'Linear',
      kinds: ['tool'],
      what: 'An MCP server. It gives Claude tools to read and write Linear tickets.',
      when: 'Available in every session. Claude calls it when a task needs it.',
      where: '~/.claude.json, user scope',
      how: 'claude mcp add --scope user <name> <command or url>',
    },
  ],
  plugins: [
    {
      id: 'plugin-vercel',
      label: 'vercel: 50 skills, 5 hooks, 1 tool',
      kinds: ['skill', 'hook', 'tool'],
      what: 'A plugin is a bundle you install in one go. This one brings skills, hooks that run when a session starts, after tool use and when it ends, and an MCP server.',
      when: 'Each part loads like its own kind: skills on demand, hooks on events, the tool when called.',
      where: '~/.claude/plugins/',
      how: '/plugin to browse, install or disable. Disabling removes all its parts at once.',
    },
    {
      id: 'plugin-figma',
      label: 'figma: 17 skills, 1 tool',
      kinds: ['skill', 'tool'],
      what: 'Another bundle: Figma skills plus an MCP server to read and write design files.',
      when: 'Skills on demand, the tool when called.',
      where: '~/.claude/plugins/',
      how: '/plugin to browse, install or disable.',
    },
    {
      id: 'plugin-small',
      label: '2 more: 1 skill each',
      kinds: ['skill'],
      what: 'Small plugins that add a single skill. Each one still adds a description Claude has to scan.',
      when: 'On demand.',
      where: '~/.claude/plugins/',
      how: '/plugin to remove the ones you never use.',
    },
  ],
}

interface Project {
  name: string
  tagline: string
  pieces: Piece[]
  /** Totals per kind: [from the shared layers, added by this project]. */
  totals: Record<Kind, [number, number]>
  issues: string[]
}

const PROJECTS: Record<ProjectId, Project> = {
  teamroom: {
    name: 'teamroom',
    tagline: 'Shared rules, hooks and its own tool',
    pieces: [
      {
        id: 'teamroom-agents-md',
        label: 'AGENTS.md',
        kinds: ['rule'],
        what: 'Instructions for this repo, in the file Codex and most other agents read.',
        when: 'Every session in this repo.',
        where: 'teamroom/AGENTS.md',
        how: 'Write it at the repo root and commit it. To be sure Claude gets the same rules, add a CLAUDE.md with one line: @AGENTS.md',
      },
      {
        id: 'teamroom-memory',
        label: 'MEMORY.md + 2 notes',
        kinds: ['memory'],
        what: 'Notes Claude saved after I said "remember". The index lists each note with a one-line description.',
        when: 'The index every session in this repo. A note when it seems relevant.',
        where: '~/.claude/projects/<repo>/memory/',
        how: 'Say "remember ..." and Claude writes one. /memory to read or edit. Move a note into AGENTS.md once it is a real rule.',
      },
      {
        id: 'teamroom-hooks',
        label: '3 hooks',
        kinds: ['hook'],
        what: 'Scripts that run on SessionStart, before a tool runs (PreToolUse) and after (PostToolUse). The model does not decide.',
        when: 'On those events, every time.',
        where: 'teamroom/.claude/settings.local.json',
        how: 'Add a "hooks" entry to .claude/settings.json to share it with the repo, or settings.local.json to keep it to yourself.',
      },
      {
        id: 'teamroom-mcp',
        label: 'teamroom',
        kinds: ['tool'],
        what: 'The project’s own MCP server, so agents working in parallel can see each other.',
        when: 'Available in every session in this repo.',
        where: 'teamroom/.mcp.json, project scope',
        how: 'A .mcp.json at the repo root, or claude mcp add --scope project <name> <command>',
        note: 'Define a server in one place. It was also in ~/.claude.json, and that copy silently won.',
      },
    ],
    totals: { rule: [1, 2], skill: [92, 0], memory: [0, 2], hook: [5, 3], tool: [3, 1] },
    issues: ['92 skill descriptions: Claude may not see them all'],
  },
  inteply: {
    name: 'inteply',
    tagline: 'Rules per folder, shared skills and commands',
    pieces: [
      {
        id: 'inteply-agents-md',
        label: 'AGENTS.md',
        kinds: ['rule'],
        what: 'Instructions for the whole repo, in the file Codex and most other agents read.',
        when: 'Every session in this repo.',
        where: 'inteply/AGENTS.md',
        how: 'Write it at the repo root and commit it. To be sure Claude gets the same rules, add a CLAUDE.md with one line: @AGENTS.md',
      },
      {
        id: 'inteply-backend-claude-md',
        label: 'backend/CLAUDE.md',
        kinds: ['rule'],
        what: 'Instructions for one folder only: backend conventions for routes, validation, logging and tests.',
        when: 'Only when Claude works inside backend/. Outside it, this file does not exist for Claude.',
        where: 'inteply/backend/CLAUDE.md',
        how: 'Put a CLAUDE.md in any subfolder. Use it for rules that are true there and nowhere else.',
        note: 'It says mock at the service boundary, not the database. My global file says mock databases. Inside backend/, Claude gets both.',
      },
      {
        id: 'inteply-frontend-claude-md',
        label: 'frontend/CLAUDE.md',
        kinds: ['rule'],
        what: 'The same idea for the frontend: design system rules, tokens and components, in their own folder.',
        when: 'Only when Claude works inside frontend/.',
        where: 'inteply/frontend/CLAUDE.md',
        how: 'Put a CLAUDE.md in any subfolder. Use it for rules that are true there and nowhere else.',
      },
      {
        id: 'inteply-memory',
        label: 'MEMORY.md + 4 notes',
        kinds: ['memory'],
        what: 'Notes Claude saved after I said "remember", like how I want PRs opened and merged.',
        when: 'The index every session in this repo. A note when it seems relevant.',
        where: '~/.claude/projects/<repo>/memory/',
        how: 'Say "remember ..." and Claude writes one. /memory to read or edit. Move a note into AGENTS.md once it is a real rule.',
      },
      {
        id: 'inteply-skills',
        label: '14 skills',
        kinds: ['skill'],
        what: 'A shared set of workflow skills: planning, code review, debugging, git worktrees.',
        when: 'The descriptions every session in this repo, the rest on demand.',
        where: 'inteply/.agents/skills/<name>/SKILL.md',
        how: 'Installed from obra/superpowers on GitHub and pinned in skills-lock.json, so everyone on the repo gets the same set.',
        note: 'Six pairs have similar descriptions, like writing-plans and writing-skills, so Claude can pick the wrong one.',
      },
      {
        id: 'inteply-commands',
        label: '6 commands',
        kinds: ['skill'],
        what: 'Prompts I run myself by typing /tdd or /debug. They count with skills: one more description each.',
        when: 'When I type the name.',
        where: 'inteply/.claude/commands/<name>.md',
        how: 'A markdown file per command. The file name becomes the slash command.',
      },
      {
        id: 'inteply-hook',
        label: '1 hook',
        kinds: ['hook'],
        what: 'A script that runs every time Claude writes a file. The model does not decide.',
        when: 'After every Write (PostToolUse).',
        where: 'inteply/.claude/settings.local.json',
        how: 'Add a "hooks" entry to .claude/settings.json to share it with the repo, or settings.local.json to keep it to yourself.',
      },
    ],
    totals: { rule: [1, 4], skill: [92, 20], memory: [0, 4], hook: [5, 1], tool: [3, 0] },
    issues: ['112 skill and command descriptions: Claude may not see them all', '6 pairs of skills may overlap'],
  },
}

const PROJECT_ORDER: ProjectId[] = ['teamroom', 'inteply']
const BAR_MAX: Record<Kind, number> = KIND_ORDER.reduce(
  (max, kind) => ({ ...max, [kind]: Math.max(...PROJECT_ORDER.map((id) => PROJECTS[id].totals[kind][0] + PROJECTS[id].totals[kind][1])) }),
  {} as Record<Kind, number>,
)

function KindDots({ kinds }: { kinds: Kind[] }): React.ReactElement {
  return (
    <span className="flex shrink-0 gap-0.5" aria-hidden="true">
      {kinds.map((kind) => (
        <span key={kind} className="h-2 w-2 rounded-full" style={{ backgroundColor: KINDS[kind].color }} />
      ))}
    </span>
  )
}

interface PieceButtonProps {
  piece: Piece
  selected: boolean
  dimmed: boolean
  onSelect: (piece: Piece) => void
}

function PieceButton({ piece, selected, dimmed, onSelect }: PieceButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={() => onSelect(piece)}
      aria-pressed={selected}
      className={`flex items-center gap-1.5 rounded-2xl border px-2.5 py-1 text-left font-mono text-[11px] transition-all duration-200 sm:text-xs ${
        selected ? 'border-ink bg-surface text-ink' : 'border-border bg-surface text-ink-muted hover:border-ink-faint hover:text-ink'
      } ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <KindDots kinds={piece.kinds} />
      {piece.label}
    </button>
  )
}

export function KlostiHarness(): React.ReactElement {
  const [projectId, setProjectId] = useState<ProjectId>('teamroom')
  const [focusKind, setFocusKind] = useState<Kind | null>(null)
  const [selected, setSelected] = useState<Piece>(PROJECTS.teamroom.pieces[0])
  const project = PROJECTS[projectId]

  const switchProject = (id: ProjectId): void => {
    setProjectId(id)
    // Keep a shared piece selected, since it is still there. A project piece belongs to the old project.
    const sharedIds = [...SHARED.global, ...SHARED.plugins].map((piece) => piece.id)
    if (!sharedIds.includes(selected.id)) setSelected(PROJECTS[id].pieces[0])
  }

  const layerPieces: [LayerId, Piece[]][] = [
    ['global', SHARED.global],
    ['plugins', SHARED.plugins],
    ['project', project.pieces],
  ]
  const isDimmed = (piece: Piece): boolean => focusKind !== null && !piece.kinds.includes(focusKind)

  return (
    <figure className="not-prose my-10">
      <div className="rounded-xl border border-border bg-surface-elevated p-4 sm:p-6">
        <p className="font-serif text-base leading-snug text-ink sm:text-lg">
          A harness is everything Claude is given before you type. It is stacked from three layers.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Project">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Project</span>
          {PROJECT_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => switchProject(id)}
              aria-pressed={projectId === id}
              className={`rounded-md border px-3 py-1 font-mono text-xs transition-colors ${
                projectId === id ? 'border-accent bg-accent text-surface' : 'border-border bg-surface text-ink-muted hover:text-ink'
              }`}
            >
              {PROJECTS[id].name}/
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5" role="group" aria-label="Highlight one kind">
          {KIND_ORDER.map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => setFocusKind(focusKind === kind ? null : kind)}
              aria-pressed={focusKind === kind}
              title={KINDS[kind].loads}
              className={`flex items-center gap-1.5 rounded text-[11px] transition-opacity sm:text-xs ${
                focusKind && focusKind !== kind ? 'opacity-40' : 'opacity-100'
              } ${focusKind === kind ? 'font-semibold text-ink' : 'text-ink-muted'}`}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: KINDS[kind].color }} aria-hidden="true" />
              {KINDS[kind].label}
            </button>
          ))}
        </div>

        <ol className="mt-4 space-y-2">
          {layerPieces.map(([layerId, pieces], index) => {
            const isProject = layerId === 'project'
            return (
              <li
                key={isProject ? `project-${projectId}` : layerId}
                className={`rounded-lg px-3 py-2.5 ${
                  isProject ? 'motion-safe:animate-fade-in border border-border border-l-2 border-l-accent bg-surface' : 'border border-dashed border-border'
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.14em]">
                  <span className={isProject ? 'text-accent' : 'text-ink-faint'}>
                    {index + 1}. {LAYERS[layerId].title}
                  </span>
                  <span className="text-ink-faint"> / {isProject ? `${project.name}, ${LAYERS.project.detail}` : LAYERS[layerId].detail}</span>
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {pieces.map((piece) => (
                    <PieceButton key={piece.id} piece={piece} selected={selected.id === piece.id} dimmed={isDimmed(piece)} onSelect={setSelected} />
                  ))}
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-3 rounded-lg border border-border bg-surface px-3 py-3 sm:px-4" aria-live="polite">
          <div className="flex items-center gap-2">
            <KindDots kinds={selected.kinds} />
            <p className="font-mono text-xs text-ink">{selected.label}</p>
          </div>
          <p className="mt-1.5 text-sm leading-snug text-ink">{selected.what}</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs leading-snug">
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">Loads</dt>
            <dd className="text-ink-muted">{selected.when}</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">Lives in</dt>
            <dd className="break-all font-mono text-ink-muted">{selected.where}</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">Change it</dt>
            <dd className="text-ink-muted">{selected.how}</dd>
          </dl>
          {selected.note && (
            <p className="mt-2 text-xs leading-snug" style={{ color: ISSUE_COLOR }}>
              {selected.note}
            </p>
          )}
        </div>

        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
            What Claude gets in {project.name}
          </p>
          <ul className="mt-2 space-y-1.5">
            {KIND_ORDER.map((kind) => {
              const [shared, own] = project.totals[kind]
              const max = BAR_MAX[kind] || 1
              return (
                <li key={kind} className={`grid grid-cols-[6.5rem_1fr_auto] items-center gap-2 transition-opacity ${focusKind && focusKind !== kind ? 'opacity-30' : ''}`}>
                  <span className="text-xs text-ink-muted">{KINDS[kind].label}</span>
                  <span className="flex h-2 overflow-hidden rounded-full bg-border" aria-hidden="true">
                    <span className="h-full opacity-40 transition-all duration-300" style={{ width: `${(shared / max) * 100}%`, backgroundColor: KINDS[kind].color }} />
                    <span className="h-full transition-all duration-300" style={{ width: `${(own / max) * 100}%`, backgroundColor: KINDS[kind].color }} />
                  </span>
                  <span className="font-mono text-xs tabular-nums text-ink">
                    {shared + own}
                    {own > 0 && <span className="text-ink-faint"> ({own} here)</span>}
                  </span>
                </li>
              )
            })}
          </ul>
          <ul className="mt-3 space-y-1">
            {project.issues.map((issue) => (
              <li key={issue} className="flex items-start gap-1.5 text-xs leading-snug" style={{ color: ISSUE_COLOR }}>
                <span className="mt-[5px] inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ISSUE_COLOR }} aria-hidden="true" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-ink-faint">
        Click any piece to see where it lives and how to change it. Faded bars are shared, solid is added by the project.
      </figcaption>
    </figure>
  )
}
