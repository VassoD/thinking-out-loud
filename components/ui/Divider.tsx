import { cn } from '@/lib/utils'

interface DividerProps {
  className?: string
  ornamental?: boolean
}

export default function Divider({ className, ornamental = false }: DividerProps) {
  if (ornamental) {
    return (
      <div className={cn('flex items-center gap-3 my-12', className)} aria-hidden="true">
        <div className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-[var(--color-ink-faint)] text-xs tracking-widest">&#8727;</span>
        <div className="h-px flex-1 bg-[var(--color-border)]" />
      </div>
    )
  }

  return (
    <hr
      className={cn('border-none border-t border-[var(--color-border)] my-8', className)}
      aria-hidden="true"
    />
  )
}
