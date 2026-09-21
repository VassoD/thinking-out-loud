'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { resonanceSample } from '@/content/resonance-sample'
import { defaultResonanceBrief, renderResonanceAsset, resonanceColors, resonanceFrame, type ResonanceFormat } from '@/lib/resonance'

const views = ['Sound', 'Words', 'Data'] as const
type View = typeof views[number]

export default function ResonanceStudy() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [motion, setMotion] = useState(false)
  const [view, setView] = useState<View>('Sound')
  const [input, setInput] = useState(defaultResonanceBrief)
  const [brief, setBrief] = useState(defaultResonanceBrief)
  const [assetTime, setAssetTime] = useState(1.2)
  const [format, setFormat] = useState<ResonanceFormat>('poster')
  const [message, setMessage] = useState('Choose a moment. Make it yours.')
  const [error, setError] = useState('')
  const frame = resonanceFrame(motion ? time : assetTime, brief)
  const activeSegment = resonanceSample.segments.findIndex((segment) => time >= segment.start && time < segment.end)
  const ended = time >= resonanceSample.duration - 0.04
  const svg = renderResonanceAsset(brief, assetTime, format)
  const downloadUrl = `/api/portfolio/resonance?${new URLSearchParams({ brief, time: assetTime.toFixed(3), format })}`

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotion(!preference.matches)
    update()
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!playing) return
    let frameId = 0
    let previous = 0
    const tick = (now: number) => {
      if (now - previous > 50) {
        setTime(audioRef.current?.currentTime ?? 0)
        previous = now
      }
      frameId = window.requestAnimationFrame(tick)
    }
    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [playing])

  async function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      return
    }
    if (audio.ended || ended) audio.currentTime = 0
    setError('')
    try {
      await audio.play()
    } catch {
      setError('Playback could not start. Try again, or open the audio sample below.')
    }
  }

  function seek(nextTime: number) {
    const bounded = Math.min(resonanceSample.duration, Math.max(0, nextTime))
    if (audioRef.current) audioRef.current.currentTime = bounded
    setTime(bounded)
  }

  function captureMoment() {
    setAssetTime(Number(time.toFixed(3)))
    setMessage(`Moment ${time.toFixed(2)}s selected. All formats share this shape.`)
  }

  return (
    <section className="resonance-experience" aria-label="Resonance interactive brand concept" style={{ '--res-paper': resonanceColors.paper, '--res-ink': resonanceColors.ink, '--res-accent': resonanceColors.accent } as CSSProperties}>
      <audio ref={audioRef} src={resonanceSample.src} preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setTime(resonanceSample.duration) }} onTimeUpdate={() => setTime(audioRef.current?.currentTime ?? 0)} onError={() => { setPlaying(false); setError('The sample could not load. Please try reloading the page.') }} />
      <div className="resonance-masthead"><span>r / resonance</span><span>A playable identity</span></div>
      <div className="resonance-hero">
        <div className="resonance-hero-copy">
          <p className="resonance-kicker">A little closer.</p>
          <h2>More than<br /><em>words.</em></h2>
          <p>A voice has rhythm, pauses, texture.<br />Let it leave a shape.</p>
        </div>
        <div className="resonance-mark">
          <svg viewBox="0 0 360 240" fill="none" aria-hidden="true">
            {frame.paths.map((path, index) => <path key={index} d={path} stroke="currentColor" strokeWidth="1" />)}
          </svg>
          <span>{playing && motion ? 'Following the voice' : 'A moment, held still'}</span>
        </div>
      </div>

      <div className="resonance-player">
        <button type="button" className="resonance-play" onClick={togglePlayback}><span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>{playing ? 'Pause' : ended ? 'Replay sample' : time > 0 ? 'Resume' : 'Play sample'}</button>
        <div className="resonance-scrubber">
          <label htmlFor="resonance-position" className="sr-only">Sample position</label>
          <input id="resonance-position" type="range" min="0" max={resonanceSample.duration} step="0.01" value={time} onChange={(event) => seek(Number(event.target.value))} aria-valuetext={`${time.toFixed(1)} of ${resonanceSample.duration.toFixed(1)} seconds`} />
          <span aria-hidden="true">{time.toFixed(1)} / {resonanceSample.duration.toFixed(1)}s</span>
        </div>
        <button type="button" className="resonance-text-button" onClick={() => setMotion((current) => !current)} aria-pressed={motion}>Motion {motion ? 'on' : 'off'}</button>
      </div>
      {error && <p className="resonance-error" role="alert">{error} <a href={resonanceSample.src}>Open audio sample</a></p>}

      <div className="resonance-inspector">
        <div className="resonance-inspector-header">
          <div role="group" aria-label="Explore the voice" className="resonance-views">
            {views.map((option) => <button key={option} type="button" aria-pressed={view === option} onClick={() => setView(option)}>{option}</button>)}
          </div>
          <span>01 / One voice, three readings</span>
        </div>
        <div className="resonance-reading">
          {view === 'Sound' && <div className="resonance-sound">
            <svg viewBox="0 0 640 96" preserveAspectRatio="none" aria-hidden="true">
              {resonanceSample.envelope.map((level, index) => <line key={index} x1={(index / resonanceSample.envelope.length) * 640} x2={(index / resonanceSample.envelope.length) * 640} y1={48 - Math.max(2, level * 44)} y2={48 + Math.max(2, level * 44)} stroke="currentColor" strokeWidth="2" opacity={index * resonanceSample.frameSeconds <= time ? 1 : 0.25} />)}
            </svg>
            <p>The pauses are part of the pattern.</p>
          </div>}
          {view === 'Words' && <div className="resonance-transcript">
            {resonanceSample.segments.map((segment, index) => <button type="button" key={segment.start} className={activeSegment === index ? 'is-current' : ''} aria-label={`Seek to ${segment.start.toFixed(1)} seconds: ${segment.text}`} onClick={() => seek(segment.start)}><span>{segment.start.toFixed(1)}s</span>{segment.text}</button>)}
          </div>}
          {view === 'Data' && <pre className="resonance-data" aria-label="Sample data">{JSON.stringify({ source: 'synthetic voice / authored captions', duration_seconds: resonanceSample.duration, sample_rate_hz: resonanceSample.sampleRate, segments: resonanceSample.segments }, null, 2)}</pre>}
        </div>
        <p className="resonance-sample-note">Synthetic voice. Measured amplitude. Authored captions, not live transcription.</p>
      </div>

      <div className="resonance-studio">
        <div className="resonance-studio-heading"><span>02 / Carry it further</span><h3>One voice.<br /><em>Many forms.</em></h3><p>The same shape travels from a poster to a feed to the first page of the docs.</p></div>
        <div className="resonance-studio-controls">
          <button type="button" className="resonance-outline-button" onClick={captureMoment}>Use the current moment <span aria-hidden="true">↙</span></button>
          <form onSubmit={(event) => { event.preventDefault(); const value = input.trim(); if (value) { setBrief(value); setMessage('Brief applied. The same rules run across every format.') } }}>
            <label htmlFor="resonance-brief">Set the mood</label>
            <div className="resonance-brief-row"><input id="resonance-brief" value={input} onChange={(event) => setInput(event.target.value)} maxLength={120} required /><button type="submit" disabled={!input.trim()}>Apply</button></div>
            <p>A brief sets the pattern. Try “bold” for a denser rhythm.</p>
          </form>
        </div>
      </div>
      <div className="resonance-asset-header"><div role="group" aria-label="Asset format" className="resonance-views">{(['poster', 'social', 'docs'] as const).map((option) => <button type="button" key={option} aria-pressed={format === option} onClick={() => setFormat(option)}>{option === 'poster' ? 'Poster' : option === 'social' ? 'Social tile' : 'Docs cover'}</button>)}</div><span>Moment {assetTime.toFixed(2)}s</span></div>
      <div className="resonance-asset" dangerouslySetInnerHTML={{ __html: svg }} />
      <div className="resonance-export"><a href={downloadUrl} download={`resonance-${format}.svg`} className="resonance-play">Export SVG <span aria-hidden="true">↓</span></a><p role="status">{message}</p></div>
      <div className="resonance-colophon"><span>One palette. One type system. A living mark.</span><span>Self-initiated / 2026</span></div>
    </section>
  )
}
