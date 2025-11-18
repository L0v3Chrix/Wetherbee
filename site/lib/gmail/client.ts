import { google } from 'googleapis'

// Initialize Gmail OAuth2 client
export function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })

  return google.gmail({ version: 'v1', auth: oauth2Client })
}

// Test Gmail API connection
export async function testGmailConnection(): Promise<boolean> {
  try {
    const gmail = getGmailClient()
    const response = await gmail.users.getProfile({ userId: 'me' })
    return !!response.data.emailAddress
  } catch (error) {
    console.error('Gmail connection test failed:', error)
    return false
  }
}
