import { handCircle, polylinePath, seededJitter, type Point } from '@/lib/drawing'

interface Idea extends Point {
  r: number
}

const IDEAS: Record<string, Idea> = {
  a: { x: 34, y: 150, r: 14 },
  b: { x: 118, y: 62, r: 10 },
  c: { x: 196, y: 162, r: 19 },
  d: { x: 284, y: 82, r: 12 },
  e: { x: 268, y: 214, r: 8 },
}

const SUGGESTIONS: Record<string, Idea> = {
  f: { x: 392, y: 46, r: 7 },
  g: { x: 436, y: 152, r: 7 },
  h: { x: 362, y: 222, r: 6 },
}

const HAND_LINKS: [string, string][] = [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd'], ['c', 'e']]
const SUGGESTED_LINKS: [string, string, number][] = [['d', 'f', 0.9], ['d', 'g', 0.7], ['c', 'g', 0.5], ['e', 'h', 0.4]]

const LINK_SAMPLES = 30
const LINK_BEND = 9

const nodeFor = (id: string): Idea => IDEAS[id] ?? SUGGESTIONS[id]

function edgePoints(from: Idea, to: Idea, gap: number): [Point, Point] {
  const length = Math.hypot(to.x - from.x, to.y - from.y)
  const ux = (to.x - from.x) / length
  const uy = (to.y - from.y) / length
  return [
    { x: from.x + ux * (from.r + gap), y: from.y + uy * (from.r + gap) },
    { x: to.x - ux * (to.r + gap), y: to.y - uy * (to.r + gap) },
  ]
}

function handLink(from: Idea, to: Idea, seed: number): string {
  const [start, end] = edgePoints(from, to, 4)
  const jitter = seededJitter(seed, 0.6)
  const bend = (seed % 2 === 0 ? 1 : -1) * LINK_BEND
  const length = Math.hypot(end.x - start.x, end.y - start.y)
  const control = { x: (start.x + end.x) / 2 - ((end.y - start.y) / length) * bend, y: (start.y + end.y) / 2 + ((end.x - start.x) / length) * bend }
  const points = Array.from({ length: LINK_SAMPLES + 1 }, (_, index) => {
    const t = index / LINK_SAMPLES
    const u = 1 - t
    return {
      x: u * u * start.x + 2 * u * t * control.x + t * t * end.x + jitter(),
      y: u * u * start.y + 2 * u * t * control.y + t * t * end.y + jitter(),
    }
  })
  return polylinePath(points)
}

/** Ideas circled and joined by hand; the model proposes the next connections, in dashes. */
export default function ConstellationArt({ accent }: { accent: string }): JSX.Element {
  return (
    <g fill="none" stroke={accent}>
      {HAND_LINKS.map(([from, to], index) => (
        <path key={`${from}${to}`} d={handLink(nodeFor(from), nodeFor(to), index + 2)} strokeWidth={1.3} strokeLinecap="round" opacity={0.75} />
      ))}
      {Object.values(IDEAS).map((idea, index) => (
        <path key={index} d={handCircle(idea, idea.r, index * 7 + 3)} strokeWidth={1.5} strokeLinecap="round" />
      ))}
      <circle cx={IDEAS.c.x} cy={IDEAS.c.y} r={4} fill={accent} stroke="none" />
      {SUGGESTED_LINKS.map(([from, to, weight]) => {
        const [start, end] = edgePoints(nodeFor(from), nodeFor(to), 5)
        return <path key={`${from}${to}`} d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`} strokeWidth={1} strokeDasharray="2 4" opacity={weight} />
      })}
      {Object.values(SUGGESTIONS).map((idea, index) => (
        <g key={index} opacity={0.9 - index * 0.25}>
          <circle cx={idea.x} cy={idea.y} r={idea.r} strokeWidth={1} strokeDasharray="2 2.5" />
          <circle cx={idea.x} cy={idea.y} r={1.6} fill={accent} stroke="none" />
        </g>
      ))}
    </g>
  )
}
