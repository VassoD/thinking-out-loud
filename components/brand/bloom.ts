import { cubicAt, polylinePath, type Point } from '@/lib/drawing'

// Proportions follow the ✻ as the banner renders it: a round hub, narrow necks, round bulbs at the tips.
// Drawn from these numbers, not traced from a font, so the mark is ours.
export const BLOOM_SIZE = 64
export const BLOOM_CENTER: Point = { x: BLOOM_SIZE / 2, y: BLOOM_SIZE / 2 }
export const BLOOM_PETALS = 6
export const HUB_RADIUS = 6.6
const NECK_HALF_WIDTH = 1.9
const BULB_RADIUS_X = 6.3
const BULB_RADIUS_Y = 7.3
const BULB_DISTANCE = 21.5
const NECK_RISE = 4.8
const SIDE_LEAD = 2.9
const ARC_SAMPLES = 28
const SIDE_SAMPLES = 14

const toAngle = (index: number): number => (index * 2 * Math.PI) / BLOOM_PETALS

function placeAt({ x, y }: Point, angle: number): Point {
  return {
    x: BLOOM_CENTER.x + x * Math.cos(angle) - y * Math.sin(angle),
    y: BLOOM_CENTER.y + x * Math.sin(angle) + y * Math.cos(angle),
  }
}

/** One petal pointing up, in local coordinates around the center: neck, a straight flare into the bulb's side, then over the top. */
function petalOutline(): Point[] {
  const bulbY = -BULB_DISTANCE
  const flare = (sign: number): Point[] => {
    const start = { x: sign * NECK_HALF_WIDTH, y: -HUB_RADIUS + 0.5 }
    const end = { x: sign * BULB_RADIUS_X, y: bulbY }
    const lift = { x: start.x, y: start.y - NECK_RISE }
    const lead = { x: end.x, y: end.y + SIDE_LEAD }
    return Array.from({ length: SIDE_SAMPLES + 1 }, (_, step) => cubicAt(start, lift, lead, end, step / SIDE_SAMPLES))
  }
  const arc = Array.from({ length: ARC_SAMPLES - 1 }, (_, step) => {
    const angle = Math.PI + ((step + 1) / ARC_SAMPLES) * Math.PI
    return { x: BULB_RADIUS_X * Math.cos(angle), y: bulbY + BULB_RADIUS_Y * Math.sin(angle) }
  })
  return [...flare(-1), ...arc, ...flare(1).reverse()]
}

export const BLOOM_PETAL = petalOutline()

export function cleanPetalPath(index: number): string {
  return `${polylinePath(BLOOM_PETAL.map((point) => placeAt(point, toAngle(index))))} Z`
}
