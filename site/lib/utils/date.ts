import { format, formatDistanceToNow, differenceInDays } from 'date-fns'

// Check if a date is within 60 days of today
export function isWithin60Days(date: Date): boolean {
  const today = new Date()
  const days = Math.abs(differenceInDays(today, date))
  return days <= 60
}

// Get days remaining in 60-day window
export function getDaysRemaining(moveInDate: Date): number {
  const today = new Date()
  const daysSinceMoveIn = differenceInDays(today, moveInDate)
  return Math.max(0, 60 - daysSinceMoveIn)
}

// Format date for display
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MMMM d, yyyy')
}

// Format date for form inputs (YYYY-MM-DD)
export function formatDateForInput(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'yyyy-MM-dd')
}

// Get relative time (e.g., "2 hours ago")
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

// Get current month and year
export function getCurrentMonth(): string {
  return format(new Date(), 'MMMM')
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

// Get month and year from date
export function getMonthYear(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MMMM yyyy')
}

// Get first Monday of current month
export function getFirstMondayOfMonth(year?: number, month?: number): Date {
  const targetYear = year ?? new Date().getFullYear()
  const targetMonth = month ?? new Date().getMonth()

  const firstDay = new Date(targetYear, targetMonth, 1)
  const dayOfWeek = firstDay.getDay()

  // Calculate days to add to get to Monday (1 = Monday in getDay())
  const daysToAdd = dayOfWeek === 0 ? 1 : dayOfWeek === 1 ? 0 : 8 - dayOfWeek

  return new Date(targetYear, targetMonth, 1 + daysToAdd)
}

// Check if today is the first Monday of the month
export function isFirstMondayOfMonth(): boolean {
  const today = new Date()
  const firstMonday = getFirstMondayOfMonth()

  return (
    today.getDate() === firstMonday.getDate() &&
    today.getMonth() === firstMonday.getMonth() &&
    today.getFullYear() === firstMonday.getFullYear()
  )
}
