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

  const confirmationToken = crypto.randomUUID()

  const { error: dbError } = await supabase
    .from('subscribers')
    .upsert(
      { email, subscribed_at: new Date().toISOString(), confirmed: false, confirmation_token: confirmationToken },
      { onConflict: 'email', ignoreDuplicates: false }
    )

  if (dbError) {
    console.error('Supabase upsert error:', dbError)
    return NextResponse.json({ error: 'Could not save subscription.' }, { status: 500 })
  }

  const confirmUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?token=${confirmationToken}`

  const { error: emailError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: 'Confirm your subscription',
    html: `
      <p style="font-family:serif;font-size:16px;color:#1a1a1a;line-height:1.6;">
        One click to confirm. After that, new posts land here when they're ready.
      </p>
      <p style="margin-top:24px;">
        <a href="${confirmUrl}" style="font-family:serif;font-size:14px;color:#1a1a1a;">Confirm subscription</a>
      </p>
      <p style="font-family:serif;font-size:14px;color:#666;margin-top:24px;">
        - Vasiliki
      </p>
      <p style="font-family:serif;font-size:12px;color:#999;margin-top:40px;">
        If you didn't subscribe, ignore this.
      </p>
    `,
  })

  if (emailError) {
    console.error('Resend error:', emailError)
    return NextResponse.json({ error: 'Could not send confirmation email.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
