'use client'

import { useState } from 'react'
import Divider from '@/components/ui/Divider'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section aria-label="Subscribe" className="mt-16">
      <Divider ornamental />
      <div className="flex flex-col gap-3">
        <p className="font-serif text-base text-[var(--color-ink-muted)]">
          New posts, straight to your inbox.
        </p>

        {status === 'success' ? (
          <p className="text-sm text-[var(--color-accent)]">
            You&apos;re in. Check your inbox to confirm.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="flex-1 rounded-none border-b border-[var(--color-border)] bg-transparent py-1.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus:border-[var(--color-accent)] focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="text-sm text-[var(--color-ink-faint)] transition-colors hover:text-[var(--color-accent)] disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-xs text-[var(--color-ink-faint)]">
            Something went wrong. Try again or email me directly.
          </p>
        )}
      </div>
    </section>
  )
}
