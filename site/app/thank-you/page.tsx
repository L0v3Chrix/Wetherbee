import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 lg:py-20">
        {/* Success Icon */}
        <div className="mb-6 text-center sm:mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 sm:mb-6 sm:h-24 sm:w-24">
            <svg
              className="h-8 w-8 text-green-600 sm:h-12 sm:w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-neutral-900 sm:mb-4 sm:text-3xl md:text-4xl">
            Application Submitted!
          </h1>
          <p className="text-sm text-neutral-600 sm:text-base md:text-lg">
            Thank you for sharing your story with us
          </p>
        </div>

        {/* Main Content */}
        <div className="card mb-6 sm:mb-8">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900 sm:mb-4 sm:text-xl md:text-2xl">
            What Happens Next
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {/* Step 1 */}
            <div className="flex gap-3 sm:gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 sm:h-10 sm:w-10 sm:text-lg">
                1
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 text-sm font-semibold text-neutral-900 sm:mb-1 sm:text-base">
                  Confirmation Email
                </h3>
                <p className="text-xs text-neutral-600 sm:text-sm">
                  Check your inbox for a confirmation email. If you don&apos;t see
                  it, check your spam folder.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3 sm:gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 sm:h-10 sm:w-10 sm:text-lg">
                2
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 text-sm font-semibold text-neutral-900 sm:mb-1 sm:text-base">
                  Application Review
                </h3>
                <p className="text-xs text-neutral-600 sm:text-sm">
                  The Wetherbee Foundation team will carefully review your
                  application.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-3 sm:gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 sm:h-10 sm:w-10 sm:text-lg">
                3
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 text-sm font-semibold text-neutral-900 sm:mb-1 sm:text-base">
                  Selection Announcement
                </h3>
                <p className="text-xs text-neutral-600 sm:text-sm">
                  Winners are announced on the{' '}
                  <strong>first Monday of each month</strong>. You&apos;ll receive
                  an email with the decision.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info Box */}
        <div className="mb-6 rounded-lg border border-accent-200 bg-accent-50 p-4 sm:mb-8 sm:p-6">
          <h3 className="mb-2 text-sm font-semibold text-accent-900 sm:mb-3 sm:text-base">
            <span aria-hidden="true">📅 </span>Important Dates
          </h3>
          <ul className="space-y-1.5 text-xs text-accent-800 sm:space-y-2 sm:text-sm">
            <li className="flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">✓</span>
              <span><strong>Selection Day:</strong> First Monday of each month</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">✓</span>
              <span><strong>Notification:</strong> All applicants receive an email with results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">✓</span>
              <span><strong>Reapply:</strong> If not selected, you can reapply next month if still within 60 days</span>
            </li>
          </ul>
        </div>

        {/* Encouragement */}
        <div className="mb-6 rounded-lg border border-primary-200 bg-primary-50 p-4 text-center sm:mb-8 sm:p-6">
          <p className="text-sm text-primary-900 sm:text-base">
            Your courage to pursue recovery and build a new life is inspiring.
            Thank you for allowing us to be part of your journey.
          </p>
          <p className="mt-2 text-sm font-semibold text-primary-900 sm:mt-3 sm:text-base">
            — The Wetherbee Foundation
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
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
    </div>
  )
}
