'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { CATEGORIES } from '@/types/post'
import type { Category } from '@/types/post'
import { supabaseBrowser } from '@/lib/supabase-browser'
import { useAuth } from '@/lib/use-auth'

type Status = 'idle' | 'saving' | 'saved' | 'error'

export default function CapturePage() {
  const { user, loading } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState<Category>('Notes')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!loading && user) textareaRef.current?.focus()
  }, [loading, user])

  const handleSubmit = useCallback(
    async (e: React.FormEvent | KeyboardEvent) => {
      e.preventDefault()
      if (!content.trim() || status === 'saving' || !user) return

      setStatus('saving')
      setErrorMsg('')

      const { error } = await supabaseBrowser.from('captures').insert({
        title: title.trim() || null,
        content: content.trim(),
        category,
        user_id: user.id,
      })

      if (error) {
        setStatus('error')
        setErrorMsg(error.message)
        return
      }

      setStatus('saved')
      setTitle('')
      setContent('')
      setTimeout(() => {
        setStatus('idle')
        textareaRef.current?.focus()
      }, 2500)
    },
    [title, content, category, status, user]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSubmit(e)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleSubmit])

  if (loading || !user) return null

  return (
    <div className="px-5 py-6 sm:px-8 sm:py-12">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-2xl flex-col gap-4"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title (optional)"
          className="w-full border-b border-[var(--color-border)] bg-transparent py-3 text-[16px] text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] outline-none transition-colors focus:border-[var(--color-accent)] sm:text-lg"
        />

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="what are you thinking..."
          required
          className="min-h-[50vh] resize-none bg-transparent py-2 text-[16px] leading-relaxed text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] outline-none sm:min-h-[40vh]"
        />

        <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="h-11 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 text-[16px] text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)]"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <Link
            href="/drafts"
            className="ml-auto flex h-11 items-center text-sm text-[var(--color-ink-faint)] underline underline-offset-2 hover:text-[var(--color-ink-muted)]"
          >
            all notes
          </Link>

          <button
            type="submit"
            disabled={!content.trim() || status === 'saving'}
            className="flex h-11 items-center rounded-md bg-[var(--color-accent)] px-5 text-sm font-medium text-[var(--color-surface)] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === 'saving' ? 'saving...' : 'save'}
          </button>
        </div>

        {status === 'saved' && (
          <p className="text-sm text-[var(--color-accent)]">saved.</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}

        <p className="text-xs text-[var(--color-ink-faint)]">Cmd+Enter to save.</p>
      </form>
    </div>
  )
}
