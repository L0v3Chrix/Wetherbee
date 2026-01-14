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
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">
          Your Story
        </h2>
        <p className="text-neutral-600">
          Share your journey: where you&apos;ve been and where you&apos;re going
        </p>
      </div>

      <div>
        <label htmlFor="story" className="mb-2 block text-sm font-medium text-neutral-700">
          Tell us your story <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('story')}
          id="story"
          rows={12}
          className="textarea resize-none"
          placeholder="This is your space to share your journey. Tell us about:

• Where you came from and what brought you to Oxford House
• The challenges you've overcome
• What recovery means to you
• Your goals and dreams for the future
• How you're building your new life

There's no right or wrong way to tell your story. We want to hear from YOU."
        />

        {/* Character Counter */}
        <div className="mt-2 flex items-center justify-between text-xs">
          <span
            className={
              characterCount < minChars
                ? 'text-amber-600'
                : 'text-neutral-500'
            }
          >
            {characterCount < minChars
              ? `${minChars - characterCount} more characters needed`
              : 'Minimum met ✓'}
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
            {characterCount} / {maxChars}
          </span>
        </div>

        {errors.story && (
          <p className="mt-1 text-sm text-red-600">{errors.story.message}</p>
        )}
      </div>

      {/* Encouragement Box */}
      <div className="rounded-lg border border-primary-200 bg-primary-50 p-4">
        <p className="text-sm text-primary-800">
          <strong>💙 Remember:</strong> Your story has power. Sharing it with us
          is an act of courage, and we&apos;re honored to read it.
        </p>
      </div>
    </div>
  )
}
