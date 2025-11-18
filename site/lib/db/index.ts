import { sql } from '@vercel/postgres'

// Database connection using Vercel Postgres
// Connection pooling is handled automatically

export { sql }

// Helper function to handle database errors
export function handleDbError(error: unknown): never {
  console.error('Database error:', error)
  throw new Error('Database operation failed')
}

// Type definitions for database tables
export interface Application {
  id: string
  created_at: Date
  updated_at: Date
  name: string
  email: string
  phone: string
  oxford_house: string
  move_in_date: Date
  story: string
  why_deserve: string
  status: 'pending' | 'selected' | 'declined' | 'contacted'
  admin_notes?: string
  reviewed_by?: string
  reviewed_at?: Date
  selected_at?: Date
  notified_at?: Date
  ip_address?: string
  user_agent?: string
  application_number: number
}

export interface Winner {
  id: string
  created_at: Date
  name: string
  oxford_house: string
  month_awarded: string
  year: number
  photo_url: string
  thumbnail_url?: string
  photo_uploaded_at: Date
  story?: string
  testimonial?: string
  social_media_shared: boolean
  uploaded_by: string
  is_published: boolean
  display_order: number
  application_id?: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'super_admin'
  last_login?: Date
  created_at: Date
}

export interface EmailLog {
  id: string
  sent_at: Date
  to_email: string
  subject: string
  template: string
  status: 'sent' | 'failed' | 'bounced'
  gmail_message_id?: string
  related_application_id?: string
  sent_by: string
}
