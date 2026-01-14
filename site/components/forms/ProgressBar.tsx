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
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full bg-primary-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-center text-sm text-neutral-600">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all ${
                step.number < currentStep
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : step.number === currentStep
                    ? 'border-primary-600 bg-white text-primary-600'
                    : 'border-neutral-300 bg-white text-neutral-400'
              }`}
            >
              {step.number < currentStep ? '✓' : step.number}
            </div>
            <div
              className={`text-xs font-medium ${
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
