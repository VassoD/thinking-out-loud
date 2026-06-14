import type { SupabaseClient } from '@supabase/supabase-js'

export const ADMIN_ROLE = 'admin' as const

export async function isAdmin(
  client: SupabaseClient,
  userId: string | undefined | null
): Promise<boolean> {
  if (!userId) return false

  const { data } = await client
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', ADMIN_ROLE)
    .maybeSingle()

  return !!data
}
