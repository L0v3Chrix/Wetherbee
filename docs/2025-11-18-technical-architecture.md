# Wetherbee Foundation - Technical Architecture
**Date:** November 18, 2025
**Version:** 1.0

---

## System Overview

Full-stack Next.js 14 application with:
- Server-side rendering for public pages (SEO + performance)
- Client-side interactivity for forms and admin dashboard
- API routes for backend logic
- PostgreSQL database for persistent storage
- Gmail API for email notifications
- NextAuth.js for secure admin authentication
- Vercel Blob for image storage

---

## Database Schema

### Applications Table
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Applicant Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  oxford_house VARCHAR(255) NOT NULL,
  move_in_date DATE NOT NULL,

  -- Application Content
  story TEXT NOT NULL,
  why_deserve TEXT NOT NULL,

  -- Admin Management
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'selected', 'declined', 'contacted')),
  admin_notes TEXT,
  reviewed_by VARCHAR(255),
  reviewed_at TIMESTAMP,
  selected_at TIMESTAMP,
  notified_at TIMESTAMP,

  -- Tracking
  ip_address VARCHAR(45),
  user_agent TEXT,
  application_number SERIAL
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX idx_applications_email ON applications(email);
```

### Winners Table
```sql
CREATE TABLE winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),

  -- Winner Information
  name VARCHAR(255) NOT NULL,
  oxford_house VARCHAR(255) NOT NULL,
  month_awarded VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,

  -- Photo
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  photo_uploaded_at TIMESTAMP DEFAULT NOW(),

  -- Optional Content
  story TEXT,
  testimonial TEXT,
  social_media_shared BOOLEAN DEFAULT FALSE,

  -- Admin Management
  uploaded_by VARCHAR(255) NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,

  -- Link to Application
  application_id UUID REFERENCES applications(id)
);

CREATE INDEX idx_winners_year ON winners(year DESC);
CREATE INDEX idx_winners_published ON winners(is_published, display_order);
```

### Admin Users Table
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed initial admin
INSERT INTO admin_users (email, name, role)
VALUES ('wetherbeefoundation@oxfordhouse.us', 'Foundation Admin', 'super_admin');
```

### Email Log Table
```sql
CREATE TABLE email_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sent_at TIMESTAMP DEFAULT NOW(),
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  template VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
  gmail_message_id VARCHAR(255),
  related_application_id UUID REFERENCES applications(id),
  sent_by VARCHAR(255) NOT NULL
);

CREATE INDEX idx_email_log_sent_at ON email_log(sent_at DESC);
CREATE INDEX idx_email_log_related_app ON email_log(related_application_id);
```

---

## API Routes Architecture

### Public API Routes
```
POST /api/apply
  - Validates applicant data
  - Checks 60-day eligibility
  - Inserts application to database
  - Sends confirmation emails (applicant + foundation)
  - Returns success/error response
```

### Admin API Routes (Protected)
```
GET    /api/admin/applications       - List all applications (with filters)
GET    /api/admin/applications/[id]  - Get single application
PATCH  /api/admin/applications/[id]  - Update application (status, notes)
DELETE /api/admin/applications/[id]  - Delete application (soft delete)

GET    /api/admin/winners             - List all winners
POST   /api/admin/winners             - Create new winner
PATCH  /api/admin/winners/[id]        - Update winner
DELETE /api/admin/winners/[id]        - Delete winner

POST   /api/admin/upload              - Upload photo to Vercel Blob

POST   /api/email/send                - Send custom email
POST   /api/email/notify-winner       - Send winner notification workflow
```

---

## Authentication Flow

### NextAuth.js v5 Configuration
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || []

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow whitelisted emails
      return ADMIN_EMAILS.includes(user.email!)
    },
    async session({ session, token }) {
      // Add user info to session
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/error',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

### Middleware Protection
```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Protect all /admin routes except /admin/login
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return !!token
      }
      return true
    },
  },
})

export const config = {
  matcher: ['/admin/:path*']
}
```

---

## Gmail API Integration

### OAuth2 Setup
```typescript
// lib/gmail/client.ts
import { google } from 'googleapis'

export function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  })

  return google.gmail({ version: 'v1', auth: oauth2Client })
}
```

### Send Email Function
```typescript
// lib/gmail/send.ts
import { getGmailClient } from './client'

export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.GMAIL_FROM_EMAIL
}: {
  to: string
  subject: string
  html: string
  from?: string
}) {
  const gmail = getGmailClient()

  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    html
  ].join('\n')

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  const result = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: encodedMessage }
  })

  return result.data
}
```

### Email Templates
```typescript
// lib/gmail/templates.ts

export function applicantConfirmationEmail(name: string): string {
  return `
    <html>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Thank You for Applying</h1>
        <p>Dear ${name},</p>
        <p>We've received your New Beginnings Scholarship application...</p>
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>Winners are announced on the first Monday of each month</li>
          <li>You'll receive an email with the decision</li>
          <li>You can reapply if not selected this month</li>
        </ul>
        <p>Thank you for your courage and commitment to your recovery.</p>
        <p>- The Wetherbee Foundation</p>
      </body>
    </html>
  `
}

export function foundationAlertEmail(application: any): string {
  return `
    <html>
      <body style="font-family: sans-serif;">
        <h2>New Scholarship Application Received</h2>
        <p><strong>Applicant:</strong> ${application.name}</p>
        <p><strong>Oxford House:</strong> ${application.oxford_house}</p>
        <p><strong>Move-in Date:</strong> ${application.move_in_date}</p>
        <p><a href="${process.env.NEXTAUTH_URL}/admin/applications/${application.id}">
          View Application in Admin Dashboard
        </a></p>
      </body>
    </html>
  `
}

export function winnerNotificationEmail(name: string, month: string): string {
  return `
    <html>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Congratulations!</h1>
        <p>Dear ${name},</p>
        <p>We're thrilled to inform you that you've been selected as the ${month}
        recipient of the Matt Wetherbee New Beginnings Scholarship!</p>
        <p>We'll be in touch soon to arrange the scholarship presentation and photo.</p>
        <p>Congratulations on this achievement and your commitment to recovery.</p>
        <p>- The Wetherbee Foundation</p>
      </body>
    </html>
  `
}

export function notSelectedEmail(name: string): string {
  return `
    <html>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Thank You for Applying</h1>
        <p>Dear ${name},</p>
        <p>Thank you for applying for this month's scholarship. While we couldn't
        select everyone, we want you to know that your story matters...</p>
        <p>You're welcome to reapply next month if you're still within your first 60 days.</p>
        <p>Keep up the great work in your recovery journey.</p>
        <p>- The Wetherbee Foundation</p>
      </body>
    </html>
  `
}
```

---

## File Upload Strategy

### Vercel Blob Integration
```typescript
// lib/utils/blob.ts
import { put } from '@vercel/blob'

export async function uploadWinnerPhoto(file: File): Promise<string> {
  const blob = await put(`winners/${Date.now()}-${file.name}`, file, {
    access: 'public',
  })

  return blob.url
}

export function getOptimizedImageUrl(url: string, width: number): string {
  // Vercel automatically optimizes images via next/image
  return url
}
```

---

## Environment Variables

```bash
# Database
DATABASE_URL="postgres://user:pass@host:5432/wetherbee"

# Gmail API
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"
GMAIL_REFRESH_TOKEN="your-refresh-token"
GMAIL_FROM_EMAIL="wetherbeefoundation@oxfordhouse.us"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_OAUTH_CLIENT_ID="same-as-gmail-or-different"
GOOGLE_OAUTH_CLIENT_SECRET="same-as-gmail-or-different"

# Admin Access
ADMIN_EMAILS="wetherbeefoundation@oxfordhouse.us,admin@example.com"

# Vercel Blob
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# Optional
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## Security Considerations

1. **Authentication:**
   - Email whitelist for admin access
   - Session-based auth with NextAuth.js
   - Protected API routes with middleware

2. **Data Protection:**
   - PII stored in secure PostgreSQL
   - HTTPS only in production
   - No sensitive data in client-side code

3. **Input Validation:**
   - Zod schemas for all form inputs
   - SQL injection prevention via parameterized queries
   - XSS prevention via React's built-in escaping

4. **Rate Limiting:**
   - Consider adding rate limiting to /api/apply (Vercel Edge Config)
   - Prevent spam applications

5. **Email Security:**
   - OAuth2 tokens stored as environment variables
   - Never expose refresh tokens client-side

---

## Performance Optimization

1. **Image Optimization:**
   - Next.js Image component for all photos
   - Vercel Blob automatic optimization
   - Lazy loading for winner gallery

2. **Code Splitting:**
   - Dynamic imports for admin dashboard
   - Route-based code splitting (App Router)

3. **Database Optimization:**
   - Indexed columns for common queries
   - Pagination for large result sets
   - Connection pooling via Vercel Postgres

4. **Caching Strategy:**
   - Static generation for landing page
   - Incremental Static Regeneration for winner gallery
   - API route caching where appropriate

---

## Deployment Strategy

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Environment Setup
1. Production: Vercel environment variables
2. Preview: Separate test database
3. Development: `.env.local` (gitignored)

### Database Migrations
- Use Vercel Postgres migration tools
- Version control SQL migration files
- Test migrations in preview environments first

---

**Document Created:** November 18, 2025
**Last Updated:** November 18, 2025
**Status:** Active Reference
