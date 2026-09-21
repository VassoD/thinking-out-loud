import { resonanceSample } from '@/content/resonance-sample'

export type ResonanceFormat = 'poster' | 'social' | 'docs'
export const resonanceColors = { paper: '#f1ede4', ink: '#293c32', accent: '#ad5237' }
export const defaultResonanceBrief = 'Quiet voices. Clear ideas.'

export function amplitudeAt(time: number) {
  const position = Math.max(0, time) / resonanceSample.frameSeconds
  const index = Math.floor(position)
  const current = resonanceSample.envelope[index] ?? 0
  const next = resonanceSample.envelope[index + 1] ?? current
  return current + (next - current) * (position - index)
}

export function resonanceFrame(time: number, brief = defaultResonanceBrief) {
  const moment = Math.max(0, Math.min(resonanceSample.duration, Number.isFinite(time) ? time : 0))
  const energy = amplitudeAt(moment)
  let seed = 0
  for (const letter of brief.slice(0, 120)) seed = (Math.imul(seed, 31) + letter.charCodeAt(0)) | 0
  const phase = ((seed >>> 0) % 628) / 100 + moment * 0.65
  const count = /bold|vivid|energy|dense/i.test(brief) ? 23 : 17
  const paths = Array.from({ length: count }, (_, i) => {
    const position = i / (count - 1)
    const x = 108 + position * 144
    const bend = Math.sin(position * Math.PI + phase) * (8 + energy * 24)
    const width = 19 + position * 19 + energy * 13
    const height = 32 + Math.sin(position * Math.PI) * (29 + energy * 30)
    return `M ${x.toFixed(2)} ${(120 - height).toFixed(2)} C ${(x + width + bend).toFixed(2)} ${(120 - height).toFixed(2)}, ${(x + width - bend).toFixed(2)} ${(120 + height).toFixed(2)}, ${x.toFixed(2)} ${(120 + height).toFixed(2)} C ${(x - width - bend).toFixed(2)} ${(120 + height).toFixed(2)}, ${(x - width + bend).toFixed(2)} ${(120 - height).toFixed(2)}, ${x.toFixed(2)} ${(120 - height).toFixed(2)}`
  })
  return { paths, energy, moment }
}

// Only numeric geometry and fixed copy enter the SVG. A brief becomes a seed;
// its raw text is never interpolated into downloadable markup.
export function renderResonanceAsset(brief: string, time: number, format: ResonanceFormat) {
  const { paper, ink, accent } = resonanceColors
  const { paths, moment } = resonanceFrame(time, brief)
  const [width, height] = { poster: [800, 1000], social: [1080, 1080], docs: [1200, 630] }[format]
  const landscape = format === 'docs'
  const scale = landscape ? 1.65 : width / 390
  const centreX = landscape ? width * 0.74 : width / 2
  const centreY = landscape ? height * 0.53 : height * 0.45
  const drawing = paths.map((d) => `<path d="${d}" fill="none" stroke="${ink}" stroke-width="0.9"/>`).join('')
  const titleY = landscape ? 320 : height - 168
  const titleSize = landscape ? 70 : width * 0.112
  const description = landscape ? 'Voice, made legible.' : 'A voice becomes a visual language.'
  const label = landscape ? 'DEVELOPER NOTES' : format === 'poster' ? 'AN IDENTITY IN MOTION' : 'SOUND, GIVEN SHAPE'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Resonance ${format}, moment ${moment.toFixed(2)} seconds"><rect width="${width}" height="${height}" fill="${paper}"/><path d="M 48 49 H ${width - 48}" stroke="${accent}"/><text x="48" y="80" font-family="Arial,sans-serif" font-size="13" letter-spacing="2" fill="${ink}">R / ${label}</text><g transform="translate(${(centreX - 180 * scale).toFixed(2)} ${(centreY - 120 * scale).toFixed(2)}) scale(${scale.toFixed(3)})">${drawing}</g><text x="48" y="${titleY}" font-family="Georgia,serif" font-size="${titleSize}" letter-spacing="-3" fill="${ink}">resonance.</text><text x="50" y="${titleY + 44}" font-family="Arial,sans-serif" font-size="${landscape ? 18 : 21}" fill="${ink}">${description}</text><path d="M 48 ${height - 70} H ${width - 48}" stroke="${accent}"/><text x="48" y="${height - 39}" font-family="Arial,sans-serif" font-size="12" letter-spacing="1.5" fill="${ink}">CONCEPT STUDY / MOMENT ${moment.toFixed(2)}s</text></svg>`
}
