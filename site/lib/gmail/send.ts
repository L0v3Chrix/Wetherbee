import { getGmailClient } from './client'
import { logEmail } from '../db/email-log'

interface SendEmailParams {
  to: string
  subject: string
  html: string
  from?: string
  template: string
  relatedApplicationId?: string
  sentBy?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.GMAIL_FROM_EMAIL,
  template,
  relatedApplicationId,
  sentBy = 'system',
}: SendEmailParams): Promise<{ success: boolean; messageId?: string }> {
  try {
    const gmail = getGmailClient()

    // Construct email message
    const message = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      '',
      html,
    ].join('\n')

    // Encode message in base64url format
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')

    // Send email via Gmail API
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage },
    })

    const messageId = result.data.id

    // Log successful email
    await logEmail({
      to_email: to,
      subject,
      template,
      status: 'sent',
      gmail_message_id: messageId,
      related_application_id: relatedApplicationId,
      sent_by: sentBy,
    })

    return { success: true, messageId }
  } catch (error) {
    console.error('Failed to send email:', error)

    // Log failed email
    await logEmail({
      to_email: to,
      subject,
      template,
      status: 'failed',
      related_application_id: relatedApplicationId,
      sent_by: sentBy,
    })

    return { success: false }
  }
}

// Send email to multiple recipients
export async function sendBulkEmail({
  recipients,
  subject,
  html,
  template,
  sentBy = 'system',
}: {
  recipients: string[]
  subject: string
  html: string
  template: string
  sentBy?: string
}): Promise<{ sent: number; failed: number }> {
  let sent = 0
  let failed = 0

  for (const recipient of recipients) {
    const result = await sendEmail({
      to: recipient,
      subject,
      html,
      template,
      sentBy,
    })

    if (result.success) {
      sent++
    } else {
      failed++
    }

    // Add small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return { sent, failed }
}
