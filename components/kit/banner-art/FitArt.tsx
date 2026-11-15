import { cubicAt, polylinePath, seededJitter, type Point } from '@/lib/drawing'

const START: Point = { x: 10, y: 178 }
const PULL_A: Point = { x: 165, y: 238 }
const PULL_B: Point = { x: 300, y: 4 }
const END: Point = { x: 460, y: 70 }

const SKETCH_PASSES = [0, 1, 2]
const SKETCH_SAMPLES = 120
const SKETCH_DRIFT = 9
const SKETCH_JITTER = 1.1
const SKETCH_OVERSHOOT = 0.03
const HANDLE_SIZE = 9

const curveAt = (t: number): Point => cubicAt(START, PULL_A, PULL_B, END, t)

function sketchPass(pass: number): string {
  const jitter = seededJitter(pass * 31 + 5, SKETCH_JITTER)
  const points = Array.from({ length: SKETCH_SAMPLES + 1 }, (_, index) => {
    const t = -SKETCH_OVERSHOOT + (index / SKETCH_SAMPLES) * (1 + 2 * SKETCH_OVERSHOOT)
    const here = curveAt(t)
    const ahead = curveAt(t + 0.001)
    const length = Math.hypot(ahead.x - here.x, ahead.y - here.y) || 1
    const normal = { x: -(ahead.y - here.y) / length, y: (ahead.x - here.x) / length }
    const drift = Math.sin(t * Math.PI * 5 + pass * 1.7) * SKETCH_DRIFT
    return { x: here.x + normal.x * drift + jitter(), y: here.y + normal.y * drift + jitter() }
  })
  return polylinePath(points)
}

/** A rough gesture drawn several times over, and the one clean curve a model fits through it. */
export default function FitArt({ accent }: { accent: string }): JSX.Element {
  return (
    <g fill="none" stroke={accent}>
      {SKETCH_PASSES.map((pass) => (
        <path key={pass} d={sketchPass(pass)} strokeWidth={1.1} strokeLinecap="round" opacity={0.4 + pass * 0.15} />
      ))}
      <path d={`M ${START.x} ${START.y} C ${PULL_A.x} ${PULL_A.y}, ${PULL_B.x} ${PULL_B.y}, ${END.x} ${END.y}`} strokeWidth={1.7} />
      <path d={`M ${START.x} ${START.y} L ${PULL_A.x} ${PULL_A.y} M ${END.x} ${END.y} L ${PULL_B.x} ${PULL_B.y}`} strokeWidth={0.8} strokeDasharray="3 4" opacity={0.7} />
      {[PULL_A, PULL_B].map((handle) => (
        <rect key={handle.x} x={handle.x - HANDLE_SIZE / 2} y={handle.y - HANDLE_SIZE / 2} width={HANDLE_SIZE} height={HANDLE_SIZE} strokeWidth={1.2} />
      ))}
      {[START, END].map((anchor) => (
        <circle key={anchor.x} cx={anchor.x} cy={anchor.y} r={4} fill={accent} stroke="none" />
      ))}
    </g>
  )
}
