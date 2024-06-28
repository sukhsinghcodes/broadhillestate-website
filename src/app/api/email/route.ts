import { EmailForm } from '@/app/types'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message, phone, reason } =
      (await request.json()) as EmailForm

    const { data, error } = await resend.emails.send({
      from: 'Broadhill Website <no-reply@broadhillestate.com>',
      to: ['info@broadhillestate.com'],
      subject: `New enquiry about ${reason}`,
      html: `<div>
      <h1>Enquiry about ${reason}</h1>
      <div>Name: ${name}</div>
      <div>Email: ${email}</div>
      <div>Phone: ${phone}</div>
      <div>Message: ${message}</div>
    </div>`,
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
