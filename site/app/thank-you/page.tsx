import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-20">
        {/* Success Icon */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-neutral-900">
            Application Submitted!
          </h1>
          <p className="text-lg text-neutral-600">
            Thank you for sharing your story with us
          </p>
        </div>

        {/* Main Content */}
        <div className="card mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-neutral-900">
            What Happens Next
          </h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                1
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-neutral-900">
                  Confirmation Email
                </h3>
                <p className="text-sm text-neutral-600">
                  Check your inbox for a confirmation email. If you don&apos;t see
                  it, check your spam folder.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                2
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-neutral-900">
                  Application Review
                </h3>
                <p className="text-sm text-neutral-600">
                  The Wetherbee Foundation team will carefully review your
                  application.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-700">
                3
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-neutral-900">
                  Selection Announcement
                </h3>
                <p className="text-sm text-neutral-600">
                  Winners are announced on the{' '}
                  <strong>first Monday of each month</strong>. You&apos;ll receive
                  an email with the decision.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info Box */}
        <div className="mb-8 rounded-lg border border-accent-200 bg-accent-50 p-6">
          <h3 className="mb-3 font-semibold text-accent-900">
            📅 Important Dates
          </h3>
          <ul className="space-y-2 text-sm text-accent-800">
            <li>
              ✓ <strong>Selection Day:</strong> First Monday of each month
            </li>
            <li>
              ✓ <strong>Notification:</strong> All applicants receive an email
              with results
            </li>
            <li>
              ✓ <strong>Reapply:</strong> If not selected, you can reapply next
              month if still within 60 days
            </li>
          </ul>
        </div>

        {/* Encouragement */}
        <div className="mb-8 rounded-lg border border-primary-200 bg-primary-50 p-6 text-center">
          <p className="text-primary-900">
            Your courage to pursue recovery and build a new life is inspiring.
            Thank you for allowing us to be part of your journey.
          </p>
          <p className="mt-3 font-semibold text-primary-900">
            — The Wetherbee Foundation
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-primary text-center">
            Return to Home
          </Link>
          <Link
            href="/#winners"
            className="btn-secondary text-center"
          >
            See Past Winners
          </Link>
        </div>
      </div>
    </main>
  )
}
