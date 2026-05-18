'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { supabaseBrowser } from '@/lib/supabase-browser'
import { useAuth } from '@/lib/use-auth'
import type { Capture } from '@/lib/supabase'

export default function DraftsPage() {
  const { user, loading } = useAuth()
  const [captures, setCaptures] = useState<Capture[]>([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  const fetchCaptures = async () => {
    setFetching(true)
    setError('')
    const { data, error } = await supabaseBrowser
      .from('captures')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setCaptures(data ?? [])
    }
    setFetching(false)
  }

  useEffect(() => {
    if (!loading && user) fetchCaptures()
  }, [loading, user])

  const handleSignOut = async () => {
    await supabaseBrowser.auth.signOut()
    window.location.href = '/login'
  }

  if (loading || !user) return null

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8">
      <div className="mb-8 flex items-baseline justify-between">
        <h1 className="font-serif text-2xl text-[var(--color-ink)]">captures</h1>
        <span className="text-sm text-[var(--color-ink-faint)]">{captures.length}</span>
      </div>

      {fetching ? (
        <p className="text-sm text-[var(--color-ink-faint)]">loading...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : captures.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-faint)]">nothing yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-[var(--color-border)]">
          {captures.map((capture) => (
            <li key={capture.id} className="py-6">
              <div className="mb-2 flex items-center gap-3">
                <span className="text-xs text-[var(--color-ink-faint)]">
                  {format(new Date(capture.created_at), 'd MMM yyyy, HH:mm')}
                </span>
                <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-ink-muted)]">
                  {capture.category}
                </span>
              </div>
              {capture.title && (
                <p className="mb-1 font-serif text-lg text-[var(--color-ink)]">{capture.title}</p>
              )}
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-ink-muted)]">
                {capture.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex items-center gap-1 border-t border-[var(--color-border)] pt-4">
        <Link
          href="/capture"
          className="flex h-11 items-center pr-3 text-sm text-[var(--color-ink-faint)] underline underline-offset-2 hover:text-[var(--color-ink-muted)]"
        >
          new capture
        </Link>
        <button
          onClick={handleSignOut}
          className="flex h-11 items-center px-3 text-sm text-[var(--color-ink-faint)] underline underline-offset-2 hover:text-[var(--color-ink-muted)]"
        >
          sign out
        </button>
        <span className="ml-auto text-xs text-[var(--color-ink-faint)]">{user.email}</span>
      </div>
    </div>
  )
}
