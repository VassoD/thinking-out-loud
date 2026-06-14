import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'
import { requireAdmin } from '@/lib/require-admin'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const posts = getAllPosts().map(({ slug, title, date, excerpt }) => ({ slug, title, date, excerpt }))
  return NextResponse.json({ posts })
}
