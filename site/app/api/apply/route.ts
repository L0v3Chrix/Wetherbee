import { NextRequest, NextResponse } from 'next/server'
import { applicationSchema } from '@/lib/validators/application'
import { logApplicationToGoogleSheet } from '@/lib/googleSheets'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate data with Zod
    const validatedData = applicationSchema.parse(body)

    // Get client IP and user agent for tracking
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.ip ||
      'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Generate application ID
    const applicationId = crypto.randomUUID()
    const submittedAt = new Date().toISOString()

    // Log env vars status (debug)
    console.info('[Sheets] WEBAPP_URL?', !!process.env.GOOGLE_SHEET_WEBAPP_URL)
    console.info('[Sheets] SECRET?', !!process.env.GOOGLE_SHEET_WEBHOOK_SECRET)
    console.info('[Sheets] Attempting to log application:', applicationId)

    // Log to Google Sheets (primary data store)
    const sheetsResult = await logApplicationToGoogleSheet({
      application_id: applicationId,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      oxford_house: validatedData.oxford_house,
      move_in_date:
        validatedData.move_in_date instanceof Date
          ? validatedData.move_in_date.toISOString().split('T')[0]
          : String(validatedData.move_in_date),
      story: validatedData.story,
      why_deserve: validatedData.why_deserve,
      submitted_at: submittedAt,
      status: 'submitted',
      ip_address: ipAddress,
      user_agent: userAgent,
    })

    if (!sheetsResult.ok) {
      console.error('[Sheets] Failed to log application:', sheetsResult.error)
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to submit application. Please try again.',
          error: sheetsResult.error,
        },
        { status: 500 }
      )
    }

    console.info('[Sheets] Successfully logged application:', applicationId)

    // TODO: Re-enable email sending when Gmail is configured
    // For now, skip email to allow testing without Gmail setup

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        applicationId: applicationId,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Application submission error:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit application. Please try again.',
      },
      { status: 500 }
    )
  }
}
