'use client'

import { useState } from 'react'
import WinnerCard from './WinnerCard'

interface Winner {
  id: string
  name: string
  oxfordHouse: string
  monthAwarded: string
  year: number
  photoUrl: string
  story?: string
}

interface WinnerGalleryProps {
  winners: Winner[]
}

export default function WinnerGallery({ winners }: WinnerGalleryProps) {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')

  // Get unique years
  const years = Array.from(new Set(winners.map((w) => w.year))).sort(
    (a, b) => b - a
  )

  // Filter winners by year
  const filteredWinners =
    selectedYear === 'all'
      ? winners
      : winners.filter((w) => w.year === selectedYear)

  // Sort by year (newest first), then by month
  const sortedWinners = [...filteredWinners].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year
    return new Date(`${a.monthAwarded} 1, ${a.year}`).getTime() -
           new Date(`${b.monthAwarded} 1, ${b.year}`).getTime()
  })

  return (
    <div>
      {/* Filter Tabs - Horizontally scrollable on mobile */}
      {years.length > 1 && (
        <div className="-mx-4 mb-6 sm:mx-0 sm:mb-8">
          <div className="flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
            <button
              onClick={() => setSelectedYear('all')}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${
                selectedYear === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All Winners
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${
                  selectedYear === year
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Winners Count */}
      <div className="mb-4 text-center sm:mb-6">
        <p className="text-base text-neutral-600 sm:text-lg">
          <span className="font-bold text-primary-600">
            {filteredWinners.length}
          </span>{' '}
          {filteredWinners.length === 1 ? 'winner' : 'winners'}
          {selectedYear !== 'all' && ` in ${selectedYear}`}
        </p>
      </div>

      {/* Winners Grid */}
      {sortedWinners.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {sortedWinners.map((winner) => (
            <WinnerCard key={winner.id} {...winner} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center sm:p-12">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <svg
              className="h-8 w-8 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <p className="text-base font-medium text-neutral-900">No winners found</p>
          <p className="mt-1 text-sm text-neutral-500">
            Try selecting a different year filter
          </p>
        </div>
      )}
    </div>
  )
}
