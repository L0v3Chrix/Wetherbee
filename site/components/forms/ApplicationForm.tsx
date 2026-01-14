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
    <div className="mx-auto max-w-3xl">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={3}
        steps={STEPS}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="card">
        {/* Step Content */}
        {currentStep === 1 && <StepOne register={register} errors={errors} />}
        {currentStep === 2 && (
          <StepTwo register={register} errors={errors} control={control} />
        )}
        {currentStep === 3 && (
          <StepThree register={register} errors={errors} control={control} />
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-neutral-200 pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary"
            >
              ← Back
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
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>

        {/* Auto-save Indicator */}
        <div className="mt-4 text-center text-xs text-neutral-500">
          💾 Your progress is automatically saved
        </div>
      </form>
    </div>
  )
}
