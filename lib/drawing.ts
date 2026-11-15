export interface Point {
  x: number
  y: number
}

/** Seeded so the server and client draw the same hand. Returns values in [-amount, amount]. */
export function seededJitter(seed: number, amount: number): () => number {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return (state / 4294967296 - 0.5) * 2 * amount
  }
}

export function polylinePath(points: Point[]): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ')
}

export function cubicAt(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  }
}

/** A circle as a person draws it: slightly uneven, overshooting where it closes. */
export function handCircle(center: Point, radius: number, seed: number): string {
  const tremor = seededJitter(seed, 0.2)
  const steps = 64
  const overshoot = 0.14
  const start = (seed % 10) / 10
  const points = Array.from({ length: steps + 1 }, (_, index) => {
    const progress = index / steps
    const angle = 2 * Math.PI * (start + progress * (1 + overshoot))
    // Low-frequency lean plus a slight outward drift reads as a hand; per-point noise alone reads as fuzz.
    const r = radius * (1 + 0.07 * Math.sin(2 * angle + seed) + 0.08 * progress) + tremor()
    return { x: center.x + r * Math.cos(angle), y: center.y + r * Math.sin(angle) }
  })
  return polylinePath(points)
}
