import type { ProjectVisual as Visual } from '@/content/portfolio'
import { resonanceFrame } from '@/lib/resonance'
import SpotsPreview from './SpotsPreview'

export default function ProjectVisual({ variant }: { variant: Visual }) {
  if (variant === 'map') return <SpotsPreview compact />

  return (
    <div className={`project-visual project-visual-${variant}`} aria-hidden="true">
      {variant === 'news' && (
        <>
          <span className="visual-note">sources → story</span>
          <svg viewBox="0 0 360 160" fill="none">
            {[40, 70, 100].map((y, i) => (
              <g key={y}>
                <rect x="24" y={y} width="90" height="22" rx="2" stroke="currentColor" opacity={0.4 + i * 0.2} />
                <path d={`M 36 ${y + 11} H ${82 + i * 7}`} stroke="currentColor" opacity="0.6" />
                <path d={`M 114 ${y + 11} C 156 ${y + 11}, 150 81, 194 81`} stroke="currentColor" opacity="0.4" />
              </g>
            ))}
            <circle cx="194" cy="81" r="3" fill="currentColor" />
            <rect x="212" y="29" width="122" height="104" rx="2" stroke="currentColor" />
            <path d="M 226 49 H 293 M 226 65 H 320 M 226 76 H 310 M 226 87 H 320 M 226 98 H 302" stroke="currentColor" opacity="0.65" />
            <path d="M 226 116 H 257" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="visual-note visual-note-bottom">the journalist decides.</span>
        </>
      )}
      {variant === 'pitch' && (
        <>
          <span className="visual-note">a pitch, heard back</span>
          <svg viewBox="0 0 360 160" fill="none">
            {[43, 54, 66].map((radius, i) => <circle key={radius} cx="180" cy="80" r={radius} stroke="currentColor" strokeWidth={i === 0 ? 1.5 : 1} opacity={0.7 - i * 0.25} />)}
            <text x="180" y="85" textAnchor="middle" fill="currentColor" fontFamily="Georgia, serif" fontSize="32">30</text>
            <text x="180" y="102" textAnchor="middle" fill="currentColor" fontFamily="monospace" fontSize="8" letterSpacing="2">SECONDS</text>
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} opacity="0.6">
                <path d={`M ${62 + i * 7} ${74 - (i % 3) * 5} V ${86 + (i % 3) * 5}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d={`M ${270 + i * 7} ${74 - ((i + 1) % 3) * 5} V ${86 + ((i + 1) % 3) * 5}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </g>
            ))}
          </svg>
          <span className="visual-note visual-note-bottom">listen → confirm → respond</span>
        </>
      )}
      {variant === 'light' && (
        <>
          <span className="visual-note">light → sound</span>
          <svg viewBox="0 0 360 160" fill="none">
            {Array.from({ length: 48 }, (_, i) => {
              const height = 14 + Math.abs(Math.sin(i * 0.43) * Math.cos(i * 0.12)) * 105
              return <rect key={i} x={13 + i * 7} y={80 - height / 2} width="3" height={height} rx="1.5" fill="currentColor" opacity={0.3 + i / 70} />
            })}
          </svg>
          <span className="visual-note visual-note-bottom">a moment, translated.</span>
        </>
      )}
      {variant === 'brief' && (
        <div className="brief-specimen">
          <span className="visual-note">requirements → decisions</span>
          <div className="brief-line">“No new dependencies.”</div>
          <div className="brief-line">“Install a new library.”</div>
          <div className="brief-status"><span /> blocked <span className="brief-question">one question to resolve</span></div>
        </div>
      )}
      {variant === 'signal' && (
        <div className="signal-specimen">
          <span className="visual-note">00:04 / speaker 01</span>
          <p>The words arrive.<br /><span>The meaning follows.</span></p>
          <span className="visual-note visual-note-bottom">confirmed <span className="signal-dot" /> still listening</span>
        </div>
      )}
      {variant === 'resonance' && (
        <>
          <span className="visual-note">sound, given shape</span>
          <svg viewBox="0 0 360 240" fill="none">
            {resonanceFrame(1.2).paths.map((path, index) => <path key={index} d={path} stroke="currentColor" strokeWidth="1.2" />)}
          </svg>
          <span className="visual-note visual-note-bottom">resonance.</span>
        </>
      )}
    </div>
  )
}
