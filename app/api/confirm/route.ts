import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vassi.fyi'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(`${SITE_URL}/?confirmed=invalid`)
  }

  try {
    const { data: subscriber, error: fetchError } = await supabase
      .from('subscribers')
      .select('email, confirmed')
      .eq('confirmation_token', token)
      .single()

    if (fetchError || !subscriber) {
      console.error('Confirm fetch error:', fetchError)
      return NextResponse.redirect(`${SITE_URL}/?confirmed=invalid`)
    }

    if (!subscriber.confirmed) {
      const { error: updateError } = await supabase
        .from('subscribers')
        .update({ confirmed: true, confirmation_token: null })
        .eq('confirmation_token', token)

      if (updateError) {
        console.error('Supabase update error:', updateError)
        return NextResponse.redirect(`${SITE_URL}/?confirmed=error`)
      }

      const unsubToken = Buffer.from(subscriber.email).toString('base64url')
      const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?e=${unsubToken}`

      const { error: emailError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: subscriber.email,
        subject: "You're in.",
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
        html: `
          <p style="font-family:serif;font-size:16px;color:#1a1a1a;line-height:1.6;">
            You're in. I write when I have something to say, not on a schedule. New posts will land here when they're ready.
          </p>
          <p style="font-family:serif;font-size:14px;color:#666;margin-top:24px;">
            - Vasiliki
          </p>
          <p style="font-family:serif;font-size:12px;color:#999;margin-top:40px;">
            <a href="${unsubscribeUrl}" style="color:#999;">unsubscribe</a>
          </p>
        `,
      })

      if (emailError) {
        console.error('Resend welcome email error:', emailError)
      }
    }

    return NextResponse.redirect(`${SITE_URL}/?confirmed=true`)
  } catch (err) {
    console.error('Confirm route error:', err)
    return NextResponse.redirect(`${SITE_URL}/?confirmed=error`)
  }
}
