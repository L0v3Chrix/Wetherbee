import { sql, type Application } from './index'

// Create new application
export async function createApplication(data: {
  name: string
  email: string
  phone: string
  oxford_house: string
  move_in_date: Date
  story: string
  why_deserve: string
  ip_address?: string
  user_agent?: string
}): Promise<Application> {
  const result = await sql`
    INSERT INTO applications (
      name,
      email,
      phone,
      oxford_house,
      move_in_date,
      story,
      why_deserve,
      ip_address,
      user_agent
    ) VALUES (
      ${data.name},
      ${data.email},
      ${data.phone},
      ${data.oxford_house},
      ${data.move_in_date.toISOString()},
      ${data.story},
      ${data.why_deserve},
      ${data.ip_address},
      ${data.user_agent}
    )
    RETURNING *
  `

  return result.rows[0] as Application
}

// Get all applications with optional filters
export async function getApplications(filters?: {
  status?: string
  search?: string
  limit?: number
  offset?: number
}): Promise<{ applications: Application[]; total: number }> {
  const { status, search, limit = 50, offset = 0 } = filters || {}

  // Build conditions based on filters
  if (status && search) {
    const searchPattern = `%${search}%`
    const countResult = await sql`
      SELECT COUNT(*) FROM applications
      WHERE status = ${status}
      AND (name ILIKE ${searchPattern} OR email ILIKE ${searchPattern} OR oxford_house ILIKE ${searchPattern})
    `
    const total = parseInt(countResult.rows[0].count)

    const result = await sql`
      SELECT * FROM applications
      WHERE status = ${status}
      AND (name ILIKE ${searchPattern} OR email ILIKE ${searchPattern} OR oxford_house ILIKE ${searchPattern})
      ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
    `
    return { applications: result.rows as Application[], total }
  } else if (status) {
    const countResult = await sql`SELECT COUNT(*) FROM applications WHERE status = ${status}`
    const total = parseInt(countResult.rows[0].count)

    const result = await sql`
      SELECT * FROM applications WHERE status = ${status}
      ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
    `
    return { applications: result.rows as Application[], total }
  } else if (search) {
    const searchPattern = `%${search}%`
    const countResult = await sql`
      SELECT COUNT(*) FROM applications
      WHERE name ILIKE ${searchPattern} OR email ILIKE ${searchPattern} OR oxford_house ILIKE ${searchPattern}
    `
    const total = parseInt(countResult.rows[0].count)

    const result = await sql`
      SELECT * FROM applications
      WHERE name ILIKE ${searchPattern} OR email ILIKE ${searchPattern} OR oxford_house ILIKE ${searchPattern}
      ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
    `
    return { applications: result.rows as Application[], total }
  } else {
    const countResult = await sql`SELECT COUNT(*) FROM applications`
    const total = parseInt(countResult.rows[0].count)

    const result = await sql`
      SELECT * FROM applications
      ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
    `
    return { applications: result.rows as Application[], total }
  }
}

// Get single application by ID
export async function getApplicationById(
  id: string
): Promise<Application | null> {
  const result = await sql`
    SELECT * FROM applications WHERE id = ${id}
  `

  return (result.rows[0] as Application) || null
}

// Update application status
export async function updateApplicationStatus(
  id: string,
  status: 'pending' | 'selected' | 'declined' | 'contacted',
  reviewedBy?: string
): Promise<Application> {
  const result = await sql`
    UPDATE applications
    SET
      status = ${status},
      reviewed_by = ${reviewedBy},
      reviewed_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return result.rows[0] as Application
}

// Update application admin notes
export async function updateApplicationNotes(
  id: string,
  notes: string
): Promise<Application> {
  const result = await sql`
    UPDATE applications
    SET admin_notes = ${notes}
    WHERE id = ${id}
    RETURNING *
  `

  return result.rows[0] as Application
}

// Mark application as selected
export async function selectApplication(
  id: string,
  reviewedBy: string
): Promise<Application> {
  const result = await sql`
    UPDATE applications
    SET
      status = 'selected',
      selected_at = NOW(),
      reviewed_by = ${reviewedBy},
      reviewed_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return result.rows[0] as Application
}

// Get applications pending review
export async function getPendingApplications(): Promise<Application[]> {
  const result = await sql`
    SELECT * FROM applications
    WHERE status = 'pending'
    ORDER BY created_at ASC
  `

  return result.rows as Application[]
}

// Check if applicant is within 60-day eligibility window
export function isWithin60Days(moveInDate: Date): boolean {
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - moveInDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays <= 60
}

// Get applications count by status
export async function getApplicationsCountByStatus(): Promise<{
  pending: number
  selected: number
  declined: number
  contacted: number
}> {
  const result = await sql`
    SELECT
      status,
      COUNT(*) as count
    FROM applications
    GROUP BY status
  `

  const counts = {
    pending: 0,
    selected: 0,
    declined: 0,
    contacted: 0,
  }

  result.rows.forEach((row) => {
    counts[row.status as keyof typeof counts] = parseInt(row.count)
  })

  return counts
}

// Soft delete application
export async function deleteApplication(id: string): Promise<void> {
  await sql`
    UPDATE applications
    SET status = 'declined'
    WHERE id = ${id}
  `
}
