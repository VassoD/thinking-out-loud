import { NextRequest, NextResponse } from 'next/server'
import type { User } from '@supabase/supabase-js'
import { isAdmin } from '@/lib/admin'
import { supabase } from '@/lib/supabase'

export async function requireAdmin(
  req: NextRequest
): Promise<{ user: User } | NextResponse> {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await isAdmin(supabase, user.id))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return { user }
}
