'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {
  applicationSchema,
  type ApplicationFormData,
} from '@/lib/validators/application'
import ProgressBar from './ProgressBar'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

const STEPS = [
  { number: 1, title: 'Contact' },
  { number: 2, title: 'Story' },
  { number: 3, title: 'Why' },
]

const AUTOSAVE_KEY = 'wetherbee-application-draft'

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    control,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
  })

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = watch((value) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(value))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // Load saved data on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(AUTOSAVE_KEY)
      if (saved) {
        try {
          const data = JSON.parse(saved)
          Object.keys(data).forEach((key) => {
            setValue(key as keyof ApplicationFormData, data[key])
          })
        } catch (error) {
          console.error('Failed to load saved data:', error)
        }
      }
    }
  }, [setValue])

  const handleNext = async () => {
    let fieldsToValidate: (keyof ApplicationFormData)[] = []

    if (currentStep === 1) {
      fieldsToValidate = ['name', 'email', 'phone', 'oxford_house', 'move_in_date']
    } else if (currentStep === 2) {
      fieldsToValidate = ['story']
    }

    const isValid = await trigger(fieldsToValidate)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to submit application')
      }

      await response.json()

      // Clear saved data
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTOSAVE_KEY)
      }

      // Redirect to thank you page
      router.push('/thank-you')
    } catch (error) {
      console.error('Submission error:', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to submit application. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl pb-24 sm:pb-0">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={3}
        steps={STEPS}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="card">
        {/* Step Content */}
        <div className="min-h-[300px]">
          {currentStep === 1 && <StepOne register={register} errors={errors} />}
          {currentStep === 2 && (
            <StepTwo register={register} errors={errors} control={control} />
          )}
          {currentStep === 3 && (
            <StepThree register={register} errors={errors} control={control} />
          )}
        </div>

        {/* Desktop Navigation Buttons (hidden on mobile) */}
        <div className="mt-6 hidden items-center justify-between border-t border-neutral-200 pt-6 sm:flex">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary"
            >
              <svg
                className="mr-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary"
            >
              Continue
              <svg
                className="ml-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          )}
        </div>

        {/* Auto-save Indicator */}
        <div className="mt-4 text-center text-xs text-neutral-500">
          <span aria-hidden="true">💾 </span>Your progress is automatically saved
        </div>
      </form>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white/95 px-4 py-3 pb-safe backdrop-blur-sm sm:hidden">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary flex-1"
            >
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div className="flex-1" />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-primary flex-1"
            >
              Continue
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
