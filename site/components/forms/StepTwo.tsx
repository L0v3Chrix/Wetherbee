'use client'

import { UseFormRegister, FieldErrors, useWatch, Control } from 'react-hook-form'
import type { ApplicationFormData } from '@/lib/validators/application'

interface StepTwoProps {
  register: UseFormRegister<ApplicationFormData>
  errors: FieldErrors<ApplicationFormData>
  control: Control<ApplicationFormData>
}

export default function StepTwo({ register, errors, control }: StepTwoProps) {
  const storyValue = useWatch({
    control,
    name: 'story',
    defaultValue: '',
  })

  const characterCount = storyValue?.length || 0
  const maxChars = 2000
  const minChars = 50

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="mb-1.5 text-xl font-bold text-neutral-900 sm:mb-2 sm:text-2xl">
          Your Story
        </h2>
        <p className="text-sm text-neutral-600 sm:text-base">
          Share your journey: where you&apos;ve been and where you&apos;re going
        </p>
      </div>

      <div>
        <label htmlFor="story" className="mb-1.5 block text-sm font-medium text-neutral-700 sm:mb-2">
          Tell us your story <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          {...register('story')}
          id="story"
          rows={6}
          className="textarea resize-none sm:min-h-[280px]"
          placeholder="This is your space to share your journey. Tell us about:

• Where you came from and what brought you to Oxford House
• The challenges you've overcome
• What recovery means to you
• Your goals and dreams for the future

There's no right or wrong way to tell your story."
          aria-describedby="story-count story-error"
          aria-invalid={errors.story ? 'true' : 'false'}
        />

        {/* Character Counter */}
        <div id="story-count" className="mt-1.5 flex items-center justify-between text-[11px] sm:mt-2 sm:text-xs">
          <span
            className={
              characterCount < minChars
                ? 'text-amber-600'
                : 'text-green-600'
            }
            aria-live="polite"
          >
            {characterCount < minChars
              ? `${minChars - characterCount} more characters needed`
              : 'Minimum met'}
          </span>
          <span
            className={
              characterCount > maxChars
                ? 'text-red-600'
                : characterCount > maxChars * 0.9
                  ? 'text-amber-600'
                  : 'text-neutral-500'
            }
          >
            {characterCount.toLocaleString()} / {maxChars.toLocaleString()}
          </span>
        </div>

        {errors.story && (
          <p id="story-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.story.message}
          </p>
        )}
      </div>

      {/* Encouragement Box */}
      <div className="rounded-lg border border-primary-200 bg-primary-50 p-3 sm:p-4">
        <p className="text-xs text-primary-800 sm:text-sm">
          <span aria-hidden="true">💙 </span><strong>Remember:</strong> Your story has power. Sharing it with us
          is an act of courage, and we&apos;re honored to read it.
        </p>
      </div>
    </div>
  )
}
