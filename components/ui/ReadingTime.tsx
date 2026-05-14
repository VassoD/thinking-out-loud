import { cn } from '@/lib/utils'

interface ReadingTimeProps {
  minutes: number
  className?: string
}

export default function ReadingTime({ minutes, className }: ReadingTimeProps) {
  return (
    <span className={cn('text-sm text-[var(--color-ink-faint)]', className)}>
      {minutes} min read
    </span>
  )
}
