'use client'

export default function PrintButton(): JSX.Element {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors border border-[var(--color-border)] rounded px-3 py-1.5"
    >
      Download PDF
    </button>
  )
}
