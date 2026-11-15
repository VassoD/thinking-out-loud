import BloomMark from '@/components/brand/BloomMark'
import ConstellationArt from '@/components/kit/banner-art/ConstellationArt'
import FitArt from '@/components/kit/banner-art/FitArt'
import { KIT_PALETTES, KIT_THEMES, type KitTheme } from '@/components/kit/palette'

export type BannerTheme = KitTheme
export type BannerArt = (props: { accent: string }) => JSX.Element

export interface BannerDesign {
  id: string
  label: string
  Art: BannerArt
}

export const BANNER_WIDTH = 1584
export const BANNER_HEIGHT = 396
export const BANNER_THEMES = KIT_THEMES
export const BANNER_DESIGNS: BannerDesign[] = [
  { id: 'fit', label: 'fit · a rough gesture, and the clean curve a model fits through it', Art: FitArt },
  { id: 'constellation', label: 'constellation · ideas joined by hand, the next links proposed by the model', Art: ConstellationArt },
]

const MONO = 'var(--font-geist-mono), Menlo, monospace'

export default function LinkedInBanner({ theme, Art, className }: { theme: BannerTheme; Art: BannerArt; className?: string }): JSX.Element {
  const palette = KIT_PALETTES[theme]
  return (
    <svg
      viewBox={`0 0 ${BANNER_WIDTH} ${BANNER_HEIGHT}`}
      className={className}
      role="img"
      aria-label="Keep thinking out loud. vassi.fyi"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={BANNER_WIDTH} height={BANNER_HEIGHT} fill={palette.surface} />
      <g style={{ fontFamily: MONO }}>
        <text x={444} y={194} fontSize={40} letterSpacing={-0.4} fill={palette.ink}>Keep thinking out loud…</text>
        <text x={458} y={242} fontSize={19} fill={palette.accent}>vassi.fyi</text>
      </g>
      <BloomMark x={396} y={163} size={34} color={palette.accent} />
      <g transform="translate(1050 80)">
        <Art accent={palette.accent} />
      </g>
    </svg>
  )
}
