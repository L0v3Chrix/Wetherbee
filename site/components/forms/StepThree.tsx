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
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="mb-1.5 text-xl font-bold text-neutral-900 sm:mb-2 sm:text-2xl">
          Why This Matters
        </h2>
        <p className="text-sm text-neutral-600 sm:text-base">
          Tell us why this scholarship would make a difference in your life
        </p>
      </div>

      <div>
        <label
          htmlFor="why_deserve"
          className="mb-1.5 block text-sm font-medium text-neutral-700 sm:mb-2"
        >
          Why do you deserve this scholarship? <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          {...register('why_deserve')}
          id="why_deserve"
          rows={6}
          className="textarea resize-none sm:min-h-[280px]"
          placeholder="This is your chance to tell us why this scholarship matters to you:

• What would this scholarship help you achieve?
• How would it support your recovery journey?
• What specific needs or goals would it address?

Be honest and specific. We want to understand how this scholarship will make a real difference."
          aria-describedby="why-deserve-count why-deserve-error"
          aria-invalid={errors.why_deserve ? 'true' : 'false'}
        />

        {/* Character Counter */}
        <div id="why-deserve-count" className="mt-1.5 flex items-center justify-between text-[11px] sm:mt-2 sm:text-xs">
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

        {errors.why_deserve && (
          <p id="why-deserve-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.why_deserve.message}
          </p>
        )}
      </div>

      {/* Final Encouragement */}
      <div className="rounded-lg border border-accent-200 bg-accent-50 p-3 sm:p-4">
        <p className="text-xs text-accent-900 sm:text-sm">
          <span aria-hidden="true">🏆 </span><strong>Almost there!</strong> You&apos;re one step away from completing
          your application. Thank you for sharing your story with us.
        </p>
      </div>
    </div>
  )
}
