import type { ProjectVisual as Visual } from '@/content/portfolio'

export default function ProjectVisual({ variant }: { variant: Visual }) {
  return (
    <div className={`project-visual project-visual-${variant}`} aria-hidden="true">
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
      {variant === 'brand' && (
        <>
          <span className="visual-note">one rule. many forms.</span>
          <svg viewBox="0 0 360 160" fill="none">
            {Array.from({ length: 13 }, (_, i) => <ellipse key={i} cx={108 + i * 12} cy="80" rx={16 + i * 1.5} ry={24 + Math.sin(i * 0.3) * 38} stroke="currentColor" strokeWidth="1.2" />)}
          </svg>
          <span className="visual-note visual-note-bottom">common form</span>
        </>
      )}
    </div>
  )
}
