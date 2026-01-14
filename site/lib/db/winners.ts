import { sql, type Winner } from './index'

// Create new winner
export async function createWinner(data: {
  name: string
  oxford_house: string
  month_awarded: string
  year: number
  photo_url: string
  thumbnail_url?: string
  story?: string
  testimonial?: string
  uploaded_by: string
  application_id?: string
}): Promise<Winner> {
  const result = await sql`
    INSERT INTO winners (
      name,
      oxford_house,
      month_awarded,
      year,
      photo_url,
      thumbnail_url,
      story,
      testimonial,
      uploaded_by,
      application_id
    ) VALUES (
      ${data.name},
      ${data.oxford_house},
      ${data.month_awarded},
      ${data.year},
      ${data.photo_url},
      ${data.thumbnail_url},
      ${data.story},
      ${data.testimonial},
      ${data.uploaded_by},
      ${data.application_id}
    )
    RETURNING *
  `

  return result.rows[0] as Winner
}

// Get all published winners
export async function getPublishedWinners(filters?: {
  year?: number
  limit?: number
  offset?: number
}): Promise<{ winners: Winner[]; total: number }> {
  const { year, limit = 50, offset = 0 } = filters || {}

  if (year) {
    const countResult = await sql`
      SELECT COUNT(*) FROM winners WHERE is_published = true AND year = ${year}
    `
    const total = parseInt(countResult.rows[0].count)

    const result = await sql`
      SELECT * FROM winners WHERE is_published = true AND year = ${year}
      ORDER BY year DESC, display_order ASC LIMIT ${limit} OFFSET ${offset}
    `
    return { winners: result.rows as Winner[], total }
  } else {
    const countResult = await sql`SELECT COUNT(*) FROM winners WHERE is_published = true`
    const total = parseInt(countResult.rows[0].count)

    const result = await sql`
      SELECT * FROM winners WHERE is_published = true
      ORDER BY year DESC, display_order ASC LIMIT ${limit} OFFSET ${offset}
    `
    return { winners: result.rows as Winner[], total }
  }
}

// Get all winners (admin)
export async function getAllWinners(): Promise<Winner[]> {
  const result = await sql`
    SELECT * FROM winners
    ORDER BY year DESC, display_order ASC
  `

  return result.rows as Winner[]
}

// Get single winner by ID
export async function getWinnerById(id: string): Promise<Winner | null> {
  const result = await sql`
    SELECT * FROM winners WHERE id = ${id}
  `

  return (result.rows[0] as Winner) || null
}

// Update winner
export async function updateWinner(
  id: string,
  data: Partial<{
    name: string
    oxford_house: string
    month_awarded: string
    year: number
    photo_url: string
    thumbnail_url: string
    story: string
    testimonial: string
    is_published: boolean
    display_order: number
  }>
): Promise<Winner> {
  const updates: string[] = []
  const values: unknown[] = []

  Object.entries(data).forEach(([key, value]) => {
    updates.push(`${key} = $${values.length + 1}`)
    values.push(value)
  })

  const result = await sql.query(
    `UPDATE winners SET ${updates.join(', ')} WHERE id = $${values.length + 1} RETURNING *`,
    [...values, id]
  )

  return result.rows[0] as Winner
}

// Delete winner
export async function deleteWinner(id: string): Promise<void> {
  await sql`DELETE FROM winners WHERE id = ${id}`
}

// Toggle winner published status
export async function toggleWinnerPublished(id: string): Promise<Winner> {
  const result = await sql`
    UPDATE winners
    SET is_published = NOT is_published
    WHERE id = ${id}
    RETURNING *
  `

  return result.rows[0] as Winner
}

// Get total winners count
export async function getTotalWinnersCount(): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count FROM winners WHERE is_published = true
  `

  return parseInt(result.rows[0].count)
}

// Get winners by year
export async function getWinnersByYear(year: number): Promise<Winner[]> {
  const result = await sql`
    SELECT * FROM winners
    WHERE year = ${year} AND is_published = true
    ORDER BY display_order ASC
  `

  return result.rows as Winner[]
}

// Get unique years with winners
export async function getYearsWithWinners(): Promise<number[]> {
  const result = await sql`
    SELECT DISTINCT year
    FROM winners
    WHERE is_published = true
    ORDER BY year DESC
  `

  return result.rows.map((row) => row.year)
}
