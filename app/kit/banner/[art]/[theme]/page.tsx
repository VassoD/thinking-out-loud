import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LinkedInBanner, {
  BANNER_DESIGNS,
  BANNER_HEIGHT,
  BANNER_THEMES,
  BANNER_WIDTH,
  type BannerTheme,
} from '@/components/kit/LinkedInBanner'

export const metadata: Metadata = {
  title: 'Banner export',
  robots: { index: false, follow: false },
}

export function generateStaticParams(): { art: string; theme: BannerTheme }[] {
  return BANNER_DESIGNS.flatMap(({ id }) => BANNER_THEMES.map((theme) => ({ art: id, theme })))
}

const isBannerTheme = (value: string): value is BannerTheme => (BANNER_THEMES as string[]).includes(value)

/** Pinned to the top-left at exact size, above the site header, so a headless screenshot of the viewport is the banner. */
export default function BannerExportPage({ params }: { params: { art: string; theme: string } }): JSX.Element {
  const design = BANNER_DESIGNS.find(({ id }) => id === params.art)
  if (!design || !isBannerTheme(params.theme)) notFound()
  return (
    <div className="fixed left-0 top-0 z-[100]" style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT }}>
      <LinkedInBanner Art={design.Art} theme={params.theme} className="block h-full w-full" />
    </div>
  )
}
