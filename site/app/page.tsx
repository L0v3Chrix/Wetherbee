import Link from 'next/link'
import Image from 'next/image'
import WinnerGallery from '@/components/public/WinnerGallery'
import { sampleWinners } from '@/lib/data/sample-winners'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section - Matt Wetherbee Memorial */}
      <div className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 px-4 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left: Content */}
            <div className="text-white">
              <div className="mb-6 inline-block rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white">
                New Beginnings Scholarship
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Honoring Matt Wetherbee's Legacy
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-primary-100 md:text-xl">
                Supporting Oxford House residents in Travis County during their
                first 60 days of residency. Because every recovery journey
                deserves to be celebrated.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                >
                  Apply for Scholarship
                </Link>
                <Link
                  href="#winners"
                  className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  See Our Winners
                </Link>
              </div>

              <div className="mt-12 rounded-lg border border-primary-600 bg-primary-800/50 p-6 backdrop-blur">
                <p className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className="text-2xl">🏆</span>
                  Winners announced the first Monday of each month
                </p>
              </div>
            </div>

            {/* Right: Matt's Photo */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl">
                <Image
                  src="/matt/matt-wetherbee.jpg"
                  alt="Matt Wetherbee - Founder and Inspiration"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="mt-6 text-center">
                <p className="text-lg font-semibold text-white">
                  In loving memory of Matt Wetherbee
                </p>
                <p className="mt-1 text-sm text-primary-200">
                  A champion of recovery and new beginnings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900/50 to-transparent" />
      </div>

      {/* Mission Section */}
      <div className="bg-white px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-neutral-600">
            The Wetherbee Foundation exists to support individuals in their
            first 60 days at Oxford House in Travis County. This critical
            period sets the foundation for lasting recovery. We honor Matt's
            belief that everyone deserves a chance at a new beginning.
          </p>
        </div>
      </div>

      {/* Winners Preview Section */}
      <div id="winners" className="bg-gradient-to-b from-neutral-50 to-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
              Celebrating Our Winners
            </h2>
            <p className="text-lg text-neutral-600">
              Every month, we celebrate someone's commitment to recovery
            </p>
          </div>

          <WinnerGallery winners={sampleWinners} />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 py-12 text-center">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-4 text-lg font-semibold text-white">
            Wetherbee Foundation
          </p>
          <p className="mb-6 text-sm text-neutral-400">
            Supporting recovery, one new beginning at a time
          </p>
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Wetherbee Foundation. All rights
            reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
