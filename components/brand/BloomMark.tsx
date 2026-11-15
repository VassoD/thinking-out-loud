import { BLOOM_CENTER, BLOOM_PETALS, BLOOM_SIZE, HUB_RADIUS, cleanPetalPath } from '@/components/brand/bloom'

// The faintest petal stays at 40% so the mark still reads as a flower at 16px.
const PETAL_FADE = 0.12

interface BloomMarkProps {
  size: number
  /** Any CSS color. Defaults to currentColor so the mark follows the surrounding text color. */
  color?: string
  className?: string
  x?: number
  y?: number
}

/** The site's mark: the banner's ✻, its petals fading around like a spinner caught mid-turn. */
export default function BloomMark({ size, color = 'currentColor', className, x, y }: BloomMarkProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      x={x}
      y={y}
      viewBox={`0 0 ${BLOOM_SIZE} ${BLOOM_SIZE}`}
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color}>
        <circle cx={BLOOM_CENTER.x} cy={BLOOM_CENTER.y} r={HUB_RADIUS} />
        {Array.from({ length: BLOOM_PETALS }, (_, index) => (
          <path key={index} d={cleanPetalPath(index)} opacity={1 - index * PETAL_FADE} />
        ))}
      </g>
    </svg>
  )
}
