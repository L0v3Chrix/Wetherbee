/**
 * Google Sheets logging utility for scholarship applications
 * Uses Google Apps Script Web App endpoint to append rows
 */

interface SheetPayload {
  application_id: string
  name: string
  email: string
  phone: string
  oxford_house: string
  move_in_date: string // ISO string
  story: string
  why_deserve: string
  submitted_at: string // ISO string
  status: string
  ip_address: string
  user_agent: string
}

interface SheetResponse {
  ok: boolean
  error?: string
}

const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1000

/**
 * Logs an application to Google Sheets via Apps Script Web App
 * Handles the 302/303 redirect that Apps Script returns on POST
 * Returns success/failure - does not throw (caller handles logging)
 */
export async function logApplicationToGoogleSheet(
  payload: SheetPayload
): Promise<SheetResponse> {
  const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL
  const webhookSecret = process.env.GOOGLE_SHEET_WEBHOOK_SECRET

  if (!webAppUrl || !webhookSecret) {
    console.error('[Sheets] Missing GOOGLE_SHEET_WEBAPP_URL or GOOGLE_SHEET_WEBHOOK_SECRET')
    return { ok: false, error: 'Missing configuration' }
  }

  const url = `${webAppUrl}?key=${encodeURIComponent(webhookSecret)}`

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // POST to Apps Script with manual redirect handling
      const postResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        redirect: 'manual', // Handle 302/303 ourselves
      })

      // Apps Script returns 302/303 on POST - follow with GET
      if ([301, 302, 303, 307, 308].includes(postResponse.status)) {
        const redirectUrl = postResponse.headers.get('Location')
        if (!redirectUrl) {
          throw new Error('Redirect response missing Location header')
        }

        const getResponse = await fetch(redirectUrl, {
          method: 'GET',
          redirect: 'follow',
        })

        if (!getResponse.ok) {
          throw new Error(`GET after redirect failed: ${getResponse.status}`)
        }

        const result = await getResponse.json()

        if (result.status === 'success' || result.ok) {
          console.info(`[Sheets] Logged application ${payload.application_id}`)
          return { ok: true }
        } else {
          throw new Error(result.message || result.error || 'Unknown error from Apps Script')
        }
      }

      // Non-redirect response (shouldn't happen with Apps Script, but handle it)
      if (!postResponse.ok) {
        // 4xx errors - don't retry
        if (postResponse.status >= 400 && postResponse.status < 500) {
          const errorText = await postResponse.text()
          console.error(`[Sheets] Client error ${postResponse.status}: ${errorText}`)
          return { ok: false, error: `Client error: ${postResponse.status}` }
        }
        // 5xx errors - retry
        throw new Error(`Server error: ${postResponse.status}`)
      }

      // Direct success response
      const result = await postResponse.json()
      if (result.status === 'success' || result.ok) {
        console.info(`[Sheets] Logged application ${payload.application_id}`)
        return { ok: true }
      } else {
        throw new Error(result.message || result.error || 'Unknown error')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'

      if (attempt < MAX_RETRIES) {
        console.warn(`[Sheets] Attempt ${attempt} failed, retrying: ${errorMessage}`)
        await sleep(RETRY_DELAY_MS)
      } else {
        console.error(`[Sheets] All ${MAX_RETRIES} attempts failed: ${errorMessage}`)
        return { ok: false, error: errorMessage }
      }
    }
  }

  return { ok: false, error: 'Max retries exceeded' }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
