'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase-browser'
import { isAdmin } from '@/lib/admin'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabaseBrowser.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.replace('/login')
      } else if (!(await isAdmin(supabaseBrowser, data.user.id))) {
        router.replace('/')
      } else {
        setUser(data.user)
        setLoading(false)
      }
    })
  }, [router])

  return { user, loading }
}
