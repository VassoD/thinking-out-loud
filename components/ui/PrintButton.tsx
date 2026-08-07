import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PrintButton() {
  return (
    <a
      href="/vasiliki-doropoulou-cv.pdf"
      download
      className={cn(
        'print:hidden inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3.5 py-2 text-sm',
        'text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-elevated)]'
      )}
    >
      <Download size={15} strokeWidth={1.5} />
      Download PDF
    </a>
  )
}
