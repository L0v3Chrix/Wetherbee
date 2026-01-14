'use client'

import { UseFormRegister, FieldErrors, useWatch, Control } from 'react-hook-form'
import type { ApplicationFormData } from '@/lib/validators/application'

interface StepThreeProps {
  register: UseFormRegister<ApplicationFormData>
  errors: FieldErrors<ApplicationFormData>
  control: Control<ApplicationFormData>
}

export default function StepThree({
  register,
  errors,
  control,
}: StepThreeProps) {
  const whyDeserveValue = useWatch({
    control,
    name: 'why_deserve',
    defaultValue: '',
  })

  const characterCount = whyDeserveValue?.length || 0
  const maxChars = 2000
  const minChars = 50

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">
          Why This Matters
        </h2>
        <p className="text-neutral-600">
          Tell us why this scholarship would make a difference in your life
        </p>
      </div>

      <div>
        <label
          htmlFor="why_deserve"
          className="mb-2 block text-sm font-medium text-neutral-700"
        >
          Why do you deserve this scholarship? <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('why_deserve')}
          id="why_deserve"
          rows={12}
          className="textarea resize-none"
          placeholder="This is your chance to tell us why this scholarship matters to you:

• What would this scholarship help you achieve?
• How would it support your recovery journey?
• What specific needs or goals would it address?
• What does this opportunity mean to you personally?
• How will you use this support to build your future?

Be honest and specific. We want to understand how this scholarship will make a real difference in your life."
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

        {errors.why_deserve && (
          <p className="mt-1 text-sm text-red-600">
            {errors.why_deserve.message}
          </p>
        )}
      </div>

      {/* Final Encouragement */}
      <div className="rounded-lg border border-accent-200 bg-accent-50 p-4">
        <p className="text-sm text-accent-900">
          <strong>🏆 Almost there!</strong> You&apos;re one step away from completing
          your application. Thank you for sharing your story with us.
        </p>
      </div>
    </div>
  )
}
