'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ApplicationFormData } from '@/lib/validators/application'

interface StepOneProps {
  register: UseFormRegister<ApplicationFormData>
  errors: FieldErrors<ApplicationFormData>
}

export default function StepOne({ register, errors }: StepOneProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-neutral-900">
          Contact Information
        </h2>
        <p className="text-neutral-600">
          Tell us a bit about yourself and your Oxford House
        </p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-700">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="input"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="input"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-neutral-700">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          {...register('phone')}
          type="tel"
          id="phone"
          className="input"
          placeholder="555-123-4567"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Oxford House */}
      <div>
        <label
          htmlFor="oxford_house"
          className="mb-2 block text-sm font-medium text-neutral-700"
        >
          Oxford House Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('oxford_house')}
          type="text"
          id="oxford_house"
          className="input"
          placeholder="Austin House"
        />
        {errors.oxford_house && (
          <p className="mt-1 text-sm text-red-600">
            {errors.oxford_house.message}
          </p>
        )}
      </div>

      {/* Move-in Date */}
      <div>
        <label
          htmlFor="move_in_date"
          className="mb-2 block text-sm font-medium text-neutral-700"
        >
          Move-in Date <span className="text-red-500">*</span>
        </label>
        <input
          {...register('move_in_date')}
          type="date"
          id="move_in_date"
          className="input"
        />
        <p className="mt-1 text-xs text-neutral-500">
          You must apply within 60 days of your move-in date
        </p>
        {errors.move_in_date && (
          <p className="mt-1 text-sm text-red-600">
            {errors.move_in_date.message}
          </p>
        )}
      </div>
    </div>
  )
}
