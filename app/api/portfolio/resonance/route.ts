import { renderResonanceAsset, type ResonanceFormat } from '@/lib/resonance'
import { resonanceSample } from '@/content/resonance-sample'

export function GET(request: Request) {
  const query = new URL(request.url).searchParams
  const format = query.get('format') ?? 'poster'
  const brief = query.get('brief') ?? ''
  const time = Number(query.get('time') ?? '0')
  if (!['poster', 'social', 'docs'].includes(format) || brief.length > 120 || !Number.isFinite(time) || time < 0 || time > resonanceSample.duration) {
    return new Response('Invalid asset options.', { status: 400 })
  }
  return new Response(renderResonanceAsset(brief, time, format as ResonanceFormat), {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Content-Disposition': `attachment; filename="resonance-${format}.svg"`,
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
