import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'
import { requireAdmin } from '@/lib/require-admin'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  const { slug, title, excerpt, test } = await req.json().catch(() => ({}))
  if (!slug || !title) return NextResponse.json({ error: 'Missing slug or title.' }, { status: 400 })

  let recipients: { email: string }[]
  const isTest = test === true

  if (isTest) {
    const testEmail = process.env.NEWSLETTER_TEST_EMAIL
    if (!testEmail) {
      return NextResponse.json({ error: 'Test email not configured.' }, { status: 500 })
    }
    recipients = [{ email: testEmail }]
  } else {
    const { data: subscribers, error: dbError } = await supabase
      .from('subscribers')
      .select('email')
      .eq('confirmed', true)

    if (dbError) return NextResponse.json({ error: 'Could not fetch subscribers.' }, { status: 500 })
    if (!subscribers?.length) return NextResponse.json({ ok: true, sent: 0 })
    recipients = subscribers
  }

  const postUrl = `https://vassi.fyi/writing/${slug}`

  if (isTest && recipients.length !== 1) {
    return NextResponse.json({ error: 'Test send blocked.' }, { status: 400 })
  }

  const subject = isTest ? `[TEST] ${title}` : title

  const { error: sendError } = await resend.batch.send(
    recipients.map(({ email }) => {
      const token = Buffer.from(email).toString('base64url')
      const unsubscribeUrl = `https://vassi.fyi/api/unsubscribe?e=${token}`
      return {
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject,
        headers: {
          'List-Unsubscribe': `<${unsubscribeUrl}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
        html: `
          <p style="font-family:serif;font-size:16px;color:#1a1a1a;line-height:1.6;">
            ${excerpt ?? ''}
          </p>
          <p style="margin-top:24px;">
            <a href="${postUrl}" style="font-family:serif;font-size:14px;color:#1a1a1a;">Read: ${title}</a>
          </p>
          <p style="font-family:serif;font-size:12px;color:#999;margin-top:40px;">
            - Vasiliki &nbsp;·&nbsp;
            <a href="https://vassi.fyi" style="color:#999;">vassi.fyi</a>
            &nbsp;·&nbsp;
            <a href="${unsubscribeUrl}" style="color:#999;">unsubscribe</a>
          </p>
        `,
      }
    })
  )

  if (sendError) {
    console.error('Resend batch error:', sendError)
    return NextResponse.json({ error: 'Could not send emails.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, sent: recipients.length, test: isTest })
}
