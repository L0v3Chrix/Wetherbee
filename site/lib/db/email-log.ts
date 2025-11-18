import { sql, type EmailLog } from './index'

// Create email log entry
export async function logEmail(data: {
  to_email: string
  subject: string
  template: string
  status: 'sent' | 'failed' | 'bounced'
  gmail_message_id?: string
  related_application_id?: string
  sent_by: string
}): Promise<EmailLog> {
  const result = await sql`
    INSERT INTO email_log (
      to_email,
      subject,
      template,
      status,
      gmail_message_id,
      related_application_id,
      sent_by
    ) VALUES (
      ${data.to_email},
      ${data.subject},
      ${data.template},
      ${data.status},
      ${data.gmail_message_id},
      ${data.related_application_id},
      ${data.sent_by}
    )
    RETURNING *
  `

  return result.rows[0] as EmailLog
}

// Get all email logs with pagination
export async function getEmailLogs(filters?: {
  limit?: number
  offset?: number
  status?: string
  template?: string
}): Promise<{ logs: EmailLog[]; total: number }> {
  const { limit = 50, offset = 0, status, template } = filters || {}

  let query = sql`SELECT * FROM email_log WHERE 1=1`

  if (status) {
    query = sql`${query} AND status = ${status}`
  }

  if (template) {
    query = sql`${query} AND template = ${template}`
  }

  // Get total count
  const countResult = await sql`SELECT COUNT(*) FROM (${query}) AS filtered`
  const total = parseInt(countResult.rows[0].count)

  // Get paginated results
  query = sql`${query} ORDER BY sent_at DESC LIMIT ${limit} OFFSET ${offset}`

  const result = await query
  const logs = result.rows as EmailLog[]

  return { logs, total }
}

// Get email logs for specific application
export async function getEmailLogsByApplication(
  applicationId: string
): Promise<EmailLog[]> {
  const result = await sql`
    SELECT * FROM email_log
    WHERE related_application_id = ${applicationId}
    ORDER BY sent_at DESC
  `

  return result.rows as EmailLog[]
}

// Get recent email activity
export async function getRecentEmailActivity(limit: number = 10): Promise<EmailLog[]> {
  const result = await sql`
    SELECT * FROM email_log
    ORDER BY sent_at DESC
    LIMIT ${limit}
  `

  return result.rows as EmailLog[]
}

// Get email stats
export async function getEmailStats(): Promise<{
  total: number
  sent: number
  failed: number
  bounced: number
}> {
  const result = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'sent') as sent,
      COUNT(*) FILTER (WHERE status = 'failed') as failed,
      COUNT(*) FILTER (WHERE status = 'bounced') as bounced
    FROM email_log
  `

  const row = result.rows[0]

  return {
    total: parseInt(row.total),
    sent: parseInt(row.sent),
    failed: parseInt(row.failed),
    bounced: parseInt(row.bounced),
  }
}
