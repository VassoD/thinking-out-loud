'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-ink-faint)]"
        disabled
      >
        <span className="h-4 w-4" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-md',
        'text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]',
        'hover:bg-[var(--color-surface-elevated)]'
      )}
    >
      {isDark ? (
        <Sun size={16} strokeWidth={1.5} />
      ) : (
        <Moon size={16} strokeWidth={1.5} />
      )}
    </button>
  )
}
