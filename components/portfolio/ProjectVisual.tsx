import type { ProjectVisual as Visual } from '@/content/portfolio'
import { resonanceFrame } from '@/lib/resonance'

export default function ProjectVisual({ variant }: { variant: Visual }) {
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
      {variant === 'room' && (
        <>
          <span className="visual-note">three agents → one file</span>
          <svg viewBox="0 0 360 160" fill="none">
            {[34, 69, 104].map((y, i) => (
              <g key={y}>
                <rect x="24" y={y} width="84" height="22" rx="2" stroke="currentColor" opacity={i === 1 ? 0.9 : 0.5} />
                <path d={`M 36 ${y + 11} H ${74 + i * 8}`} stroke="currentColor" opacity="0.6" />
                <path d={`M 109 ${y + 11} C 146 ${y + 11}, 150 80, 190 80`} stroke="currentColor" opacity={i === 1 ? 0.7 : 0.35} strokeDasharray={i === 1 ? undefined : '3 4'} />
              </g>
            ))}
            <circle cx="212" cy="80" r="20" stroke="currentColor" />
            <path d="M 206 71 V 89 M 218 71 V 89" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M 236 80 H 250 M 246 76 L 250 80 L 246 84" stroke="currentColor" opacity="0.5" />
            <path d="M 262 35 H 311 L 333 57 V 125 H 262 Z M 311 35 V 57 H 333" stroke="currentColor" />
            <path d="M 274 73 H 320 M 274 84 H 311 M 274 95 H 320" stroke="currentColor" opacity="0.6" />
            <text x="297" y="116" textAnchor="middle" fill="currentColor" fontFamily="monospace" fontSize="8" letterSpacing="1">auth.ts</text>
          </svg>
          <span className="visual-note visual-note-bottom">told before the edit.</span>
        </>
      )}
      {variant === 'map' && (
        <>
          <span className="visual-note">saved places → one map</span>
          <svg viewBox="0 0 360 160" fill="none">
            <rect x="24" y="29" width="120" height="104" rx="2" stroke="currentColor" opacity="0.5" />
            <rect x="25" y="66" width="118" height="29" fill="currentColor" opacity="0.08" />
            <path d="M 25 67 V 94" stroke="currentColor" strokeWidth="2" />
            {[51, 81, 111].map((y, index) => (
              <g key={y} opacity={index === 1 ? 1 : 0.45}>
                <circle cx="39" cy={y} r="3" fill={index === 1 ? 'currentColor' : 'none'} stroke="currentColor" />
                <path d={`M 52 ${y - 3} H ${111 - index * 8} M 52 ${y + 4} H ${92 + index * 5}`} stroke="currentColor" />
              </g>
            ))}
            <path d="M 154 81 H 185 M 181 77 L 185 81 L 181 85" stroke="currentColor" opacity="0.6" />
            <rect x="198" y="29" width="138" height="104" rx="2" stroke="currentColor" opacity="0.5" />
            <path d="M 216 30 L 206 132 M 253 30 L 241 132 M 297 30 L 316 132 M 199 63 L 335 45 M 199 100 L 335 81 M 213 132 L 335 113" stroke="currentColor" opacity="0.2" />
            <path d="M 199 121 C 234 100 274 137 335 99" stroke="currentColor" strokeWidth="6" opacity="0.12" />
            <circle cx="227" cy="51" r="4" stroke="currentColor" opacity="0.65" />
            <circle cx="307" cy="106" r="4" stroke="currentColor" opacity="0.65" />
            <circle cx="268" cy="81" r="15" fill="currentColor" opacity="0.08" />
            <circle cx="268" cy="81" r="10" stroke="currentColor" opacity="0.5" />
            <circle cx="268" cy="81" r="4" fill="currentColor" />
          </svg>
          <span className="visual-note visual-note-bottom">one filter. both views.</span>
        </>
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
