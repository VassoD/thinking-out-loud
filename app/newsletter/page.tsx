'use client'

import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { supabaseBrowser } from '@/lib/supabase-browser'
import { useAuth } from '@/lib/use-auth'

interface PostSummary {
  slug: string
  title: string
  date: string
  excerpt: string
}

type SendState = 'idle' | 'loading' | 'sent' | 'error'
type SendMode = 'all' | 'test'

export default function NewsletterPage() {
  const { user, loading } = useAuth()
  const [posts, setPosts] = useState<PostSummary[]>([])
  const [fetching, setFetching] = useState(true)
  const [sendStates, setSendStates] = useState<Record<string, SendState>>({})
  const [testSendStates, setTestSendStates] = useState<Record<string, SendState>>({})
  const [sentCounts, setSentCounts] = useState<Record<string, number>>({})

  const fetchPosts = useCallback(async () => {
    const { data: { session } } = await supabaseBrowser.auth.getSession()
    if (!session) return

    const res = await fetch('/api/newsletter/posts', {
      headers: { authorization: `Bearer ${session.access_token}` },
    })
    const json = await res.json()
    if (res.ok) setPosts(json.posts ?? [])
    setFetching(false)
  }, [])

  useEffect(() => {
    if (!loading && user) fetchPosts()
  }, [loading, user, fetchPosts])

  const handleSend = async (post: PostSummary, mode: SendMode) => {
    const setState = mode === 'test' ? setTestSendStates : setSendStates
    setState((s) => ({ ...s, [post.slug]: 'loading' }))

    const { data: { session } } = await supabaseBrowser.auth.getSession()
    if (!session) {
      setState((s) => ({ ...s, [post.slug]: 'error' }))
      return
    }

    const res = await fetch('/api/newsletter/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        ...(mode === 'test' ? { test: true } : {}),
      }),
    })
    const json = await res.json()

    if (res.ok) {
      setState((s) => ({ ...s, [post.slug]: 'sent' }))
      if (mode === 'all') setSentCounts((s) => ({ ...s, [post.slug]: json.sent }))
    } else {
      setState((s) => ({ ...s, [post.slug]: 'error' }))
    }
  }

  if (loading || !user) return null

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-8">
      <div className="mb-8 flex items-baseline justify-between">
        <h1 className="font-serif text-2xl text-[var(--color-ink)]">newsletter</h1>
        <span className="text-sm text-[var(--color-ink-faint)]">{posts.length} posts</span>
      </div>

      {fetching ? (
        <p className="text-sm text-[var(--color-ink-faint)]">loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-faint)]">no published posts.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-[var(--color-border)]">
          {posts.map((post) => {
            const state = sendStates[post.slug] ?? 'idle'
            const testState = testSendStates[post.slug] ?? 'idle'
            return (
              <li key={post.slug} className="flex items-start justify-between gap-4 py-5">
                <div className="min-w-0">
                  <p className="font-serif text-base text-[var(--color-ink)]">{post.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-ink-faint)]">
                    {format(new Date(post.date), 'd MMM yyyy')}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  {state === 'sent' ? (
                    <span className="text-xs text-[var(--color-accent)]">
                      sent to {sentCounts[post.slug]}
                    </span>
                  ) : state === 'error' ? (
                    <span className="text-xs text-red-500">send failed</span>
                  ) : (
                    <button
                      onClick={() => handleSend(post, 'all')}
                      disabled={state === 'loading'}
                      className="text-sm text-[var(--color-ink-faint)] underline underline-offset-2 hover:text-[var(--color-accent)] disabled:opacity-40"
                    >
                      {state === 'loading' ? 'sending...' : 'send all'}
                    </button>
                  )}
                  {testState === 'sent' ? (
                    <span className="text-xs text-[var(--color-accent)]">test sent</span>
                  ) : testState === 'error' ? (
                    <span className="text-xs text-red-500">test failed</span>
                  ) : (
                    <button
                      onClick={() => handleSend(post, 'test')}
                      disabled={testState === 'loading'}
                      className="text-xs text-[var(--color-ink-faint)] underline underline-offset-2 hover:text-[var(--color-accent)] disabled:opacity-40"
                    >
                      {testState === 'loading' ? 'sending...' : `test`}
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
