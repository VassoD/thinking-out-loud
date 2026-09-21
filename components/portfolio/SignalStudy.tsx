'use client'

import { useEffect, useState } from 'react'

const phrases = [
  { speaker: '01', time: '00:00', text: 'Let’s make the voice visible.' },
  { speaker: '02', time: '00:04', text: 'And keep the uncertain words quiet.' },
  { speaker: '01', time: '00:08', text: 'So the interface can listen, too.' },
]

const frames = [
  { phrase: 0, confirmed: '', interim: 'Let’s make', final: false },
  { phrase: 0, confirmed: 'Let’s make', interim: 'the voice visible.', final: false },
  { phrase: 0, confirmed: phrases[0].text, interim: '', final: true },
  { phrase: 1, confirmed: '', interim: 'And keep every word.', final: false },
  { phrase: 1, confirmed: 'And keep', interim: 'the uncertain words quiet.', final: false },
  { phrase: 1, confirmed: phrases[1].text, interim: '', final: true },
  { phrase: 2, confirmed: '', interim: 'So the interface', final: false },
  { phrase: 2, confirmed: 'So the interface', interim: 'can listen, too.', final: false },
  { phrase: 2, confirmed: phrases[2].text, interim: '', final: true },
]

export default function SignalStudy() {
  const [step, setStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const frame = frames[step]
  const complete = step === frames.length - 1

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => {
      if (step >= frames.length - 2) {
        setStep(frames.length - 1)
        setPlaying(false)
      } else {
        setStep((current) => current + 1)
      }
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [playing, step])

  function togglePlayback() {
    if (step === -1 || complete) {
      setStep(0)
      setPlaying(true)
    } else {
      setPlaying((current) => !current)
    }
  }

  return (
    <section className="portfolio-study" aria-label="Interactive transcript study">
      <div className="study-topline"><span>Signal / transcript study</span><span>Simulated stream · no audio</span></div>
      <div className="signal-transcript" aria-label="Sample transcript">
        {!frame ? <p className="signal-placeholder">The words arrive.<br /><span>Then they settle.</span></p> : phrases.map((phrase, index) => (
          index <= frame.phrase && <div className="signal-utterance" key={index}>
            <span className="signal-speaker">{phrase.time}<br />speaker {phrase.speaker}</span>
            <p>{index < frame.phrase ? phrase.text : <>{frame.confirmed}{frame.confirmed && frame.interim ? ' ' : ''}<span className="signal-interim">{frame.interim}</span></>}</p>
          </div>
        ))}
      </div>
      <div className="signal-legend"><span className="signal-confirmed-key">Confirmed</span><span className="signal-interim">Provisional</span></div>
      <div className="signal-progress" role="progressbar" aria-label="Sample progress" aria-valuemin={0} aria-valuemax={frames.length} aria-valuenow={step + 1}><span style={{ width: `${((step + 1) / frames.length) * 100}%` }} /></div>
      <div className="study-controls">
        <button type="button" onClick={togglePlayback} className="study-button study-button-primary">{playing ? 'Pause' : complete ? 'Replay sample' : step < 0 ? 'Play sample' : 'Resume'}</button>
        <button type="button" disabled={step === -1} onClick={() => { setStep(-1); setPlaying(false) }} className="study-button">Reset</button>
        <p role="status" className="study-status">{complete ? 'All words confirmed.' : playing ? frame?.final ? 'Phrase confirmed.' : 'Receiving words…' : step === -1 ? 'Ready when you are.' : 'Paused.'}</p>
      </div>
      <details className="signal-full-text">
        <summary>Read the full sample</summary>
        <p>{phrases.map(({ text }) => text).join(' ')}</p>
      </details>
    </section>
  )
}
