'use client'

import { useState } from 'react'
import { brandPalette, renderBrandSvg, type BrandFormat } from '@/lib/portfolio-brand'

const examples = ['Quiet, considered, human.', 'Electric, rhythmic, bold.', 'Calm, precise, open.']

export default function BrandStudy() {
  const [input, setInput] = useState('Calm, precise, open.')
  const [brief, setBrief] = useState(input)
  const [variation, setVariation] = useState(0)
  const [format, setFormat] = useState<BrandFormat>('poster')
  const [message, setMessage] = useState('A shared motif. Three formats.')
  const svg = renderBrandSvg(brief, variation, format)
  const palette = brandPalette(brief)

  function generate(nextBrief: string) {
    const trimmed = nextBrief.trim()
    if (!trimmed) return
    setInput(trimmed)
    setBrief(trimmed)
    setVariation(0)
    setMessage(`Generated. ${brandPalette(trimmed).label}.`)
  }

  function download() {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `common-form-${format}-${variation + 1}.svg`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage('SVG download requested.')
  }

  return (
    <section className="portfolio-study brand-study" aria-label="Interactive brand generator">
      <div className="study-topline"><span>Common Form / brand study</span><span>Local, rule-based generation</span></div>
      <form onSubmit={(event) => { event.preventDefault(); generate(input) }} className="brand-form">
        <label htmlFor="brand-brief">Describe the mood</label>
        <div className="brand-input-row">
          <input id="brand-brief" value={input} onChange={(event) => setInput(event.target.value)} maxLength={120} required aria-describedby="brand-hint" />
          <button className="study-button study-button-primary" disabled={!input.trim()} type="submit">Generate</button>
        </div>
        <p id="brand-hint">Words set the pattern. “Warm” or “electric” changes the palette.</p>
        <div className="brand-examples" aria-label="Example briefs">
          {examples.map((example) => <button type="button" key={example} onClick={() => generate(example)}>{example}</button>)}
        </div>
      </form>
      <div className="brand-toolbar">
        <div role="group" aria-label="Asset format" className="brand-formats">
          {(['poster', 'square', 'mark'] as const).map((option) => <button type="button" key={option} aria-pressed={option === format} onClick={() => { setFormat(option); setMessage(`${option[0].toUpperCase() + option.slice(1)} format selected.`) }}>{option === 'poster' ? 'Poster' : option === 'square' ? 'Social tile' : 'Mark'}</button>)}
        </div>
        <span className="brand-palette-label"><span style={{ backgroundColor: palette.ink }} />{palette.label}</span>
      </div>
      <div className="brand-preview" dangerouslySetInnerHTML={{ __html: svg }} />
      <div className="study-controls">
        <button type="button" className="study-button" onClick={() => { setVariation((current) => current + 1); setMessage(`Variation ${variation + 2}.`) }}>New variation</button>
        <button type="button" className="study-button study-button-primary" onClick={download}>Export SVG <span aria-hidden="true">↓</span></button>
        <span role="status" className="study-status">{message}</span>
      </div>
    </section>
  )
}
