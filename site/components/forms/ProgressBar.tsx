'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: { number: number; title: string }[]
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  steps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="mb-6 sm:mb-8">
      {/* Progress Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 sm:h-2">
          <div
            className="h-full bg-primary-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Step ${currentStep} of ${totalSteps}`}
          />
        </div>
        <div className="mt-1.5 text-center text-xs text-neutral-600 sm:mt-2 sm:text-sm">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            {/* Compact circles on mobile (h-8 w-8), larger on desktop (h-10 w-10) */}
            <div
              className={`mb-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all sm:mb-2 sm:h-10 sm:w-10 sm:text-base ${
                step.number < currentStep
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : step.number === currentStep
                    ? 'border-primary-600 bg-white text-primary-600'
                    : 'border-neutral-300 bg-white text-neutral-400'
              }`}
              aria-current={step.number === currentStep ? 'step' : undefined}
            >
              {step.number < currentStep ? (
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                step.number
              )}
            </div>
            {/* Hidden on smallest screens, truncated on mobile, full on desktop */}
            <div
              className={`hidden text-center text-[10px] font-medium leading-tight xs:block xs:max-w-[60px] xs:truncate sm:max-w-none sm:text-xs ${
                step.number <= currentStep
                  ? 'text-neutral-900'
                  : 'text-neutral-400'
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
