import Image from 'next/image'

interface WinnerCardProps {
  name: string
  oxfordHouse: string
  monthAwarded: string
  year: number
  photoUrl: string
  story?: string
}

export default function WinnerCard({
  name,
  oxfordHouse,
  monthAwarded,
  year,
  photoUrl,
  story,
}: WinnerCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <Image
          src={photoUrl}
          alt={`${name} - ${monthAwarded} ${year} Scholarship Winner`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Award Badge */}
        <div className="absolute right-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-sm font-semibold text-white shadow-lg">
          🏆 Winner
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-neutral-900">{name}</h3>
        <p className="mb-1 text-sm text-neutral-600">{oxfordHouse}</p>
        <p className="mb-4 text-sm font-medium text-primary-600">
          {monthAwarded} {year}
        </p>

        {story && (
          <p className="line-clamp-3 text-sm text-neutral-600">{story}</p>
        )}
      </div>
    </div>
  )
}
