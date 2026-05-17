'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { supabaseBrowser } from '@/lib/supabase-browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setStatus('loading')

    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password })

    if (error) {
      setStatus('error')
      setErrorMsg(error.message)
      return
    }

    router.replace('/capture')
  }

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center px-5">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            required
            autoFocus
            autoComplete="email"
            className="h-11 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 text-[16px] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              autoComplete="current-password"
              className="h-11 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 pr-9 text-[16px] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-faint)] hover:text-[var(--color-ink-muted)]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-1 flex h-11 w-full items-center justify-center rounded-md bg-[var(--color-accent)] px-4 text-sm font-medium text-[var(--color-surface)] hover:opacity-80 disabled:opacity-40"
          >
            {status === 'loading' ? '...' : 'sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
