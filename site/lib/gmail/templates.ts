// Email template styles
const emailStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  .header {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: white;
    padding: 30px 20px;
    text-align: center;
    border-radius: 8px 8px 0 0;
  }
  .content {
    background: #fff;
    padding: 30px 20px;
    border: 1px solid #e5e5e5;
  }
  .footer {
    background: #f5f5f5;
    padding: 20px;
    text-align: center;
    font-size: 14px;
    color: #737373;
    border-radius: 0 0 8px 8px;
  }
  .btn {
    display: inline-block;
    padding: 12px 24px;
    background: #f59e0b;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    margin: 20px 0;
  }
  .highlight {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 15px;
    margin: 20px 0;
  }
  h1 { margin: 0; font-size: 28px; }
  h2 { color: #1e40af; margin-top: 0; }
  ul { padding-left: 20px; }
  li { margin-bottom: 10px; }
`

// Applicant confirmation email
export function applicantConfirmationEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="header">
        <h1>Thank You for Applying</h1>
      </div>
      <div class="content">
        <h2>Dear ${name},</h2>

        <p>We've successfully received your New Beginnings Scholarship application. Thank you for sharing your story with us.</p>

        <div class="highlight">
          <strong>What happens next:</strong>
          <ul>
            <li>Winners are announced on the <strong>first Monday of each month</strong></li>
            <li>You'll receive an email with the selection decision</li>
            <li>You can reapply in future months if not selected this time</li>
          </ul>
        </div>

        <p>Your courage to pursue recovery and build a new life is inspiring. The Matt Wetherbee Foundation exists to support people like you who are committed to positive change.</p>

        <p>We wish you continued success in your recovery journey.</p>

        <p>With hope and respect,<br>
        <strong>The Wetherbee Foundation</strong></p>
      </div>
      <div class="footer">
        <p>Matt Wetherbee New Beginnings Scholarship<br>
        Supporting Oxford House residents in Travis County</p>
      </div>
    </body>
    </html>
  `
}

// Foundation alert email (new application received)
export function foundationAlertEmail(application: {
  id: string
  name: string
  email: string
  phone: string
  oxford_house: string
  move_in_date: Date
}): string {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="header">
        <h1>New Scholarship Application</h1>
      </div>
      <div class="content">
        <h2>Application Details</h2>

        <table style="width: 100%; margin: 20px 0;">
          <tr><td><strong>Name:</strong></td><td>${application.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${application.email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${application.phone}</td></tr>
          <tr><td><strong>Oxford House:</strong></td><td>${application.oxford_house}</td></tr>
          <tr><td><strong>Move-in Date:</strong></td><td>${new Date(application.move_in_date).toLocaleDateString()}</td></tr>
        </table>

        <a href="${baseUrl}/admin/applications/${application.id}" class="btn">
          View Full Application in Dashboard
        </a>

        <p style="margin-top: 30px; font-size: 14px; color: #737373;">
          This is an automated notification. Please review the application in the admin dashboard.
        </p>
      </div>
      <div class="footer">
        <p>Wetherbee Foundation Admin System</p>
      </div>
    </body>
    </html>
  `
}

// Winner notification email
export function winnerNotificationEmail(
  name: string,
  month: string,
  year: number
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="header">
        <h1>🏆 Congratulations!</h1>
      </div>
      <div class="content">
        <h2>Dear ${name},</h2>

        <div class="highlight">
          <p style="font-size: 18px; margin: 0;">
            <strong>You've been selected as the ${month} ${year} recipient of the Matt Wetherbee New Beginnings Scholarship!</strong>
          </p>
        </div>

        <p>We were moved by your story and your commitment to recovery. Your journey represents exactly what this scholarship is meant to support – new beginnings and positive change.</p>

        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>A foundation representative will contact you soon to arrange the scholarship presentation</li>
          <li>We'll schedule a time for a celebratory photo with your scholarship check</li>
          <li>Your story (if you're comfortable) will be shared on our website to inspire others</li>
        </ul>

        <p>This scholarship honors the memory of Matt Wetherbee, who believed deeply in supporting people on their recovery journey. We're honored to support you.</p>

        <p>Congratulations again on this achievement and your commitment to building a better future.</p>

        <p>With pride and respect,<br>
        <strong>The Wetherbee Foundation</strong></p>
      </div>
      <div class="footer">
        <p>Matt Wetherbee New Beginnings Scholarship</p>
      </div>
    </body>
    </html>
  `
}

// Not selected email
export function notSelectedEmail(name: string, currentMonth: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="header">
        <h1>Thank You for Applying</h1>
      </div>
      <div class="content">
        <h2>Dear ${name},</h2>

        <p>Thank you for applying for the ${currentMonth} Matt Wetherbee New Beginnings Scholarship. We received many inspiring applications this month, and while we couldn't select everyone, we want you to know that <strong>your story matters</strong>.</p>

        <p>Your courage to pursue recovery and build a new life is something we deeply respect. The work you're doing at Oxford House is making a difference, even if it doesn't always feel that way.</p>

        <div class="highlight">
          <p><strong>You're welcome to reapply next month if you're still within your first 60 days at Oxford House.</strong></p>
          <p>Selection happens on the first Monday of each month.</p>
        </div>

        <p>Please don't let this discourage you. Keep showing up for yourself and your recovery. That's what matters most.</p>

        <p>We're rooting for you.</p>

        <p>With respect and encouragement,<br>
        <strong>The Wetherbee Foundation</strong></p>
      </div>
      <div class="footer">
        <p>Matt Wetherbee New Beginnings Scholarship</p>
      </div>
    </body>
    </html>
  `
}

// Custom email template
export function customEmail(
  recipientName: string,
  subject: string,
  message: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${emailStyles}</style>
    </head>
    <body>
      <div class="header">
        <h1>${subject}</h1>
      </div>
      <div class="content">
        <h2>Dear ${recipientName},</h2>

        ${message}

        <p>Best regards,<br>
        <strong>The Wetherbee Foundation</strong></p>
      </div>
      <div class="footer">
        <p>Matt Wetherbee New Beginnings Scholarship</p>
      </div>
    </body>
    </html>
  `
}
