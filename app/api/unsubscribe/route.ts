import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function decodeEmail(encoded: string): string | null {
  try {
    return Buffer.from(encoded, 'base64url').toString('utf-8')
  } catch {
    return null
  }
}

async function removeSubscriber(email: string): Promise<boolean> {
  const { error } = await supabase.from('subscribers').delete().eq('email', email)
  return !error
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const encoded = new URL(req.url).searchParams.get('e')
  const email = encoded ? decodeEmail(encoded) : null
  if (!email) return NextResponse.json({ error: 'Invalid token.' }, { status: 400 })

  const ok = await removeSubscriber(email)
  if (!ok) return NextResponse.json({ error: 'Could not unsubscribe.' }, { status: 500 })

  return NextResponse.json({ ok: true })
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const encoded = new URL(req.url).searchParams.get('e')
  const email = encoded ? decodeEmail(encoded) : null
  if (!email) {
    return new NextResponse('Invalid unsubscribe link.', { status: 400, headers: { 'Content-Type': 'text/plain' } })
  }

  await removeSubscriber(email)

  return new NextResponse('You have been unsubscribed.', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  })
}
