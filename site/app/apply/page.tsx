import ApplicationForm from '@/components/forms/ApplicationForm'

export default function ApplyPage() {
  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white">
      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Introduction */}
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-primary-900 sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            New Beginnings Scholarship
          </h1>
          <p className="text-base text-neutral-600 sm:text-lg">
            Application for Oxford House residents in Travis and Williamson County
          </p>
        </div>

        {/* Eligibility Notice */}
        <div className="mx-auto mb-6 max-w-3xl rounded-lg border border-accent-200 bg-accent-50 p-4 sm:mb-8 sm:p-6">
          <h2 className="mb-2 text-base font-semibold text-accent-900 sm:text-lg">
            <span aria-hidden="true">📋 </span>Eligibility Requirements
          </h2>
          <ul className="space-y-1.5 text-sm text-accent-800 sm:space-y-2">
            <li className="flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">✓</span>
              <span>Current resident of an Oxford House in Travis and Williamson County</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">✓</span>
              <span>Within your <strong>first 60 days</strong> of residency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="shrink-0" aria-hidden="true">✓</span>
              <span>Committed to your recovery journey</span>
            </li>
          </ul>
        </div>

        {/* Important Info */}
        <div className="mx-auto mb-8 max-w-3xl rounded-lg bg-primary-50 p-4 sm:mb-12 sm:p-6">
          <h3 className="mb-2 text-sm font-semibold text-primary-900 sm:mb-3 sm:text-base">
            <span aria-hidden="true">⏰ </span>Selection Timeline
          </h3>
          <p className="text-sm text-primary-800">
            Winners are announced on the{' '}
            <strong>first Monday of each month</strong>. You&apos;ll receive an email
            with the decision. If not selected this month, you&apos;re welcome to
            reapply if you&apos;re still within your 60-day window.
          </p>
        </div>

        {/* Application Form */}
        <ApplicationForm />

        {/* Footer Note */}
        <div className="mx-auto mt-8 max-w-3xl rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center sm:mt-12 sm:p-6">
          <p className="text-sm text-neutral-600">
            This scholarship honors the memory of{' '}
            <strong>Matt Wetherbee</strong>, who believed deeply in supporting
            people on their recovery journey.
          </p>
        </div>
      </div>
    </div>
  )
}
