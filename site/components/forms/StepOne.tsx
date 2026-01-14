'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ApplicationFormData } from '@/lib/validators/application'

interface StepOneProps {
  register: UseFormRegister<ApplicationFormData>
  errors: FieldErrors<ApplicationFormData>
}

export default function StepOne({ register, errors }: StepOneProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="mb-1.5 text-xl font-bold text-neutral-900 sm:mb-2 sm:text-2xl">
          Contact Information
        </h2>
        <p className="text-sm text-neutral-600 sm:text-base">
          Tell us a bit about yourself and your Oxford House
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-700 sm:mb-2">
          Full Name <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          autoComplete="name"
          className="input"
          placeholder="John Doe"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700 sm:mb-2">
          Email Address <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="email"
          inputMode="email"
          className="input"
          placeholder="john@example.com"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-neutral-700 sm:mb-2">
          Phone Number <span className="text-red-500" aria-label="required">*</span>
          <span className="ml-1 text-xs font-normal text-neutral-500">(e.g., 512-555-1234)</span>
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          autoComplete="tel"
          inputMode="tel"
          className="input"
          placeholder="512-555-1234"
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          aria-invalid={errors.phone ? 'true' : 'false'}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Oxford House */}
      <div>
        <label
          htmlFor="oxford_house"
          className="mb-1.5 block text-sm font-medium text-neutral-700 sm:mb-2"
        >
          Oxford House Name <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          {...register('oxford_house')}
          type="text"
          id="oxford_house"
          className="input"
          placeholder="Austin House"
          aria-describedby={errors.oxford_house ? 'oxford-house-error' : undefined}
          aria-invalid={errors.oxford_house ? 'true' : 'false'}
        />
        {errors.oxford_house && (
          <p id="oxford-house-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.oxford_house.message}
          </p>
        )}
      </div>

      {/* Move-in Date */}
      <div>
        <label
          htmlFor="move_in_date"
          className="mb-1.5 block text-sm font-medium text-neutral-700 sm:mb-2"
        >
          Move-in Date <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          {...register('move_in_date')}
          type="date"
          id="move_in_date"
          className="input"
          aria-describedby="move-in-date-hint move-in-date-error"
          aria-invalid={errors.move_in_date ? 'true' : 'false'}
        />
        <p id="move-in-date-hint" className="mt-1 text-xs text-neutral-500">
          You must apply within 60 days of your move-in date
        </p>
        {errors.move_in_date && (
          <p id="move-in-date-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.move_in_date.message}
          </p>
        )}
      </div>
    </div>
  )
}
