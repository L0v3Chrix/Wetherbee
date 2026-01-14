import Link from 'next/link'
import ApplicationForm from '@/components/forms/ApplicationForm'

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-900">
              Wetherbee Foundation
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-primary-600"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Introduction */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-900 md:text-5xl">
            New Beginnings Scholarship
          </h1>
          <p className="text-lg text-neutral-600">
            Application for Oxford House residents in Travis County
          </p>
        </div>

        {/* Eligibility Notice */}
        <div className="mx-auto mb-8 max-w-3xl rounded-lg border border-accent-200 bg-accent-50 p-6">
          <h2 className="mb-2 text-lg font-semibold text-accent-900">
            📋 Eligibility Requirements
          </h2>
          <ul className="space-y-2 text-sm text-accent-800">
            <li>✓ Current resident of an Oxford House in Travis County</li>
            <li>
              ✓ Within your <strong>first 60 days</strong> of residency
            </li>
            <li>✓ Committed to your recovery journey</li>
          </ul>
        </div>

        {/* Important Info */}
        <div className="mx-auto mb-12 max-w-3xl rounded-lg bg-primary-50 p-6">
          <h3 className="mb-3 font-semibold text-primary-900">
            ⏰ Selection Timeline
          </h3>
          <p className="text-sm text-primary-800">
            Winners are announced on the{' '}
            <strong>first Monday of each month</strong>. You'll receive an email
            with the decision. If not selected this month, you're welcome to
            reapply if you're still within your 60-day window.
          </p>
        </div>

        {/* Application Form */}
        <ApplicationForm />

        {/* Footer Note */}
        <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center">
          <p className="text-sm text-neutral-600">
            This scholarship honors the memory of{' '}
            <strong>Matt Wetherbee</strong>, who believed deeply in supporting
            people on their recovery journey.
          </p>
        </div>
      </div>
    </main>
  )
}
