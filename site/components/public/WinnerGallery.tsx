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
      {/* Filter Tabs */}
      {years.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedYear('all')}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
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
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                selectedYear === year
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {/* Winners Count */}
      <div className="mb-6 text-center">
        <p className="text-lg text-neutral-600">
          <span className="font-bold text-primary-600">
            {filteredWinners.length}
          </span>{' '}
          {filteredWinners.length === 1 ? 'winner' : 'winners'}
          {selectedYear !== 'all' && ` in ${selectedYear}`}
        </p>
      </div>

      {/* Winners Grid */}
      {sortedWinners.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWinners.map((winner) => (
            <WinnerCard key={winner.id} {...winner} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
          <p className="text-neutral-500">No winners found for this filter.</p>
        </div>
      )}
    </div>
  )
}
