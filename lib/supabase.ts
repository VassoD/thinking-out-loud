import { createClient } from '@supabase/supabase-js'

export interface Capture {
  id: string
  title: string | null
  content: string
  category: string
  created_at: string
  published: boolean
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
