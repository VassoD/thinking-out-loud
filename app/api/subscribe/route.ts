import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email } = await req.json().catch(() => ({}))

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
  }

  const { error: dbError } = await supabase
    .from('subscribers')
    .upsert({ email, subscribed_at: new Date().toISOString() }, { onConflict: 'email', ignoreDuplicates: true })

  if (dbError) {
    console.error('Supabase upsert error:', dbError)
    return NextResponse.json({ error: 'Could not save subscription.' }, { status: 500 })
  }

  const { error: emailError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: "You're in.",
    html: `
      <p style="font-family:serif;font-size:16px;color:#1a1a1a;">
        You're in. I write when I have something to say, not on a schedule. New posts will land here when they're ready.
      </p>
      <p style="font-family:serif;font-size:14px;color:#666;">
        - Vasiliki
      </p>
    `,
  })

  if (emailError) {
    console.error('Resend error:', emailError)
  }

  return NextResponse.json({ ok: true })
}
