export type BrandFormat = 'poster' | 'square' | 'mark'

const palettes = {
  quiet: { paper: '#e9ede3', ink: '#284936', accent: '#718969', label: 'Quiet / sage' },
  warm: { paper: '#f3e6d5', ink: '#603b24', accent: '#b77842', label: 'Warm / ochre' },
  electric: { paper: '#eae6f4', ink: '#403359', accent: '#8a72b2', label: 'Electric / violet' },
}

export function brandPalette(brief: string) {
  if (/warm|sun|earth|amber|ochre|human|soft/i.test(brief)) return palettes.warm
  if (/electric|bold|night|fast|violet|pulse|energy/i.test(brief)) return palettes.electric
  return palettes.quiet
}

export function brandSeed(brief: string, variation: number) {
  let seed = 0
  for (let index = 0; index < brief.length; index++) seed = (Math.imul(seed, 31) + brief.charCodeAt(index)) | 0
  return (seed >>> 0) + variation * 137
}

// The preview and download share this renderer. User text only becomes a
// numeric seed and a palette selection; it is never inserted into SVG markup.
export function renderBrandSvg(brief: string, variation: number, format: BrandFormat) {
  const { paper, ink, accent } = brandPalette(brief)
  const seed = brandSeed(brief, variation)
  const dimensions = { poster: [1200, 630], square: [800, 800], mark: [480, 480] }
  const [width, height] = dimensions[format]
  const mark = format === 'mark'
  const centreX = format === 'poster' ? width * 0.72 : width * 0.5
  const centreY = format === 'poster' || mark ? height * 0.5 : height * 0.39
  const size = Math.min(width, height) * (mark ? 0.65 : 0.52)
  const count = 17
  const phase = (seed % 628) / 100
  const rings = Array.from({ length: count }, (_, i) => {
    const x = centreX + ((i / (count - 1)) - 0.5) * size * 0.75
    const rx = size * (0.09 + (i / count) * 0.12)
    const ry = size * (0.2 + (Math.sin(i * 0.22 + phase) + 1) * 0.12)
    return `<ellipse cx="${x.toFixed(2)}" cy="${centreY}" rx="${rx.toFixed(2)}" ry="${ry.toFixed(2)}" fill="none" stroke="${ink}" stroke-width="${mark ? 1.8 : 2}" />`
  }).join('')
  const textX = format === 'poster' ? 64 : 48
  const textY = format === 'poster' ? 275 : 620
  const text = mark ? '' : `<text x="${textX}" y="${textY}" fill="${ink}" font-family="Georgia, serif" font-size="${format === 'poster' ? 84 : 76}">Common<tspan x="${textX}" dy="0.96em">Form.</tspan></text><text x="${textX}" y="${height - 44}" fill="${ink}" font-family="Arial, sans-serif" font-size="16" letter-spacing="2">A LITTLE MORE RESONANCE.</text><path d="M ${textX} 56 H ${width - textX}" stroke="${accent}" /><text x="${textX}" y="88" fill="${ink}" font-family="Arial, sans-serif" font-size="14" letter-spacing="2">SOUND, GIVEN SHAPE / ${String(variation + 1).padStart(2, '0')}</text>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Common Form ${format}, ${brandPalette(brief).label}"><rect width="${width}" height="${height}" fill="${paper}"/>${rings}${text}</svg>`
}
