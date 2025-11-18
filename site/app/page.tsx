import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Temporary landing page - will be replaced with full design */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white px-4 py-16">
        <div className="max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-primary-900 md:text-6xl">
            Wetherbee Foundation
          </h1>
          <h2 className="mb-8 text-2xl font-light text-neutral-700 md:text-3xl">
            New Beginnings Scholarship
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-neutral-600">
            Supporting Oxford House residents in Travis County during their
            first 60 days of residency. Honoring Matt Wetherbee's legacy by
            investing in stories of hope and transformation.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/apply" className="btn-primary">
              Apply for Scholarship
            </Link>
            <Link href="#winners" className="btn-secondary">
              See Our Winners
            </Link>
          </div>

          <div className="mt-16 rounded-lg border border-primary-100 bg-primary-50 p-6">
            <p className="text-sm font-medium text-primary-900">
              🏆 Winners announced the first Monday of each month
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-neutral-900 py-8 text-center text-neutral-400">
        <p>&copy; {new Date().getFullYear()} Wetherbee Foundation</p>
      </footer>
    </main>
  )
}
