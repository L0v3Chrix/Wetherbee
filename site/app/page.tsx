import Link from 'next/link'
import Image from 'next/image'
import WinnerGallery from '@/components/public/WinnerGallery'
import { sampleWinners } from '@/lib/data/sample-winners'

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Matt Wetherbee Memorial */}
      <section className="relative bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700 px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
            {/* Content */}
            <div className="text-white">
              <div className="mb-4 inline-block rounded-full bg-accent-500 px-3 py-1.5 text-xs font-semibold text-white sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                New Beginnings Scholarship
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
                Honoring Matt Wetherbee&apos;s Legacy
              </h1>
              <p className="mb-6 text-base leading-relaxed text-primary-100 sm:mb-8 sm:text-lg md:text-xl">
                Supporting Oxford House residents in Travis County during their
                first 60 days of residency. Because every recovery journey
                deserves to be celebrated.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/apply"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-800"
                >
                  Apply for Scholarship
                </Link>
                <Link
                  href="#winners"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-md border-2 border-white px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-800"
                >
                  See Our Winners
                </Link>
              </div>

              <div className="mt-8 rounded-lg border border-primary-600 bg-primary-800/50 p-4 backdrop-blur sm:mt-12 sm:p-6">
                <p className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className="text-xl sm:text-2xl" aria-hidden="true">🏆</span>
                  Winners announced the first Monday of each month
                </p>
              </div>
            </div>

            {/* Matt&apos;s Photo */}
            <div className="relative order-first md:order-last">
              <div className="mx-auto aspect-square max-w-sm overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl md:max-w-none">
                <Image
                  src="/matt/matt-wetherbee.jpg"
                  alt="Matt Wetherbee - Founder and Inspiration"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 600px"
                />
              </div>
              <div className="mt-4 text-center sm:mt-6">
                <p className="text-base font-semibold text-white sm:text-lg">
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
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-900/50 to-transparent" aria-hidden="true" />
      </section>

      {/* Mission Section */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-neutral-900 sm:mb-6 sm:text-3xl md:text-4xl">
            Our Mission
          </h2>
          <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
            The Wetherbee Foundation exists to support individuals in their
            first 60 days at Oxford House in Travis County. This critical
            period sets the foundation for lasting recovery. We honor Matt&apos;s
            belief that everyone deserves a chance at a new beginning.
          </p>
        </div>
      </section>

      {/* Winners Preview Section */}
      <section id="winners" className="scroll-mt-16 bg-gradient-to-b from-neutral-50 to-white px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-2xl font-bold text-neutral-900 sm:mb-4 sm:text-3xl md:text-4xl">
              Celebrating Our Winners
            </h2>
            <p className="text-base text-neutral-600 sm:text-lg">
              Every month, we celebrate someone&apos;s commitment to recovery
            </p>
          </div>

          <WinnerGallery winners={sampleWinners} />
        </div>
      </section>
    </>
  )
}
