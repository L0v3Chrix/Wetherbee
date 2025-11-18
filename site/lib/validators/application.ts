import { z } from 'zod'

// Application form validation schema
export const applicationSchema = z.object({
  // Step 1: Contact Information
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name must be less than 255 characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),

  phone: z
    .string()
    .regex(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Please enter a valid phone number (e.g., 555-123-4567)'
    ),

  oxford_house: z
    .string()
    .min(2, 'Please enter your Oxford House name')
    .max(255, 'Oxford House name must be less than 255 characters'),

  move_in_date: z.coerce
    .date()
    .max(new Date(), 'Move-in date cannot be in the future')
    .refine(
      (date) => {
        const today = new Date()
        const diffTime = Math.abs(today.getTime() - date.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays <= 60
      },
      {
        message:
          'You must apply within 60 days of your move-in date. Please contact us if you have questions.',
      }
    ),

  // Step 2: Your Story
  story: z
    .string()
    .min(50, 'Please share at least 50 characters about your story')
    .max(2000, 'Story must be less than 2000 characters'),

  // Step 3: Why You Deserve This
  why_deserve: z
    .string()
    .min(50, 'Please share at least 50 characters about why this matters to you')
    .max(2000, 'Response must be less than 2000 characters'),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>

// Validation for individual steps (for progressive form validation)
export const step1Schema = applicationSchema.pick({
  name: true,
  email: true,
  phone: true,
  oxford_house: true,
  move_in_date: true,
})

export const step2Schema = applicationSchema.pick({
  story: true,
})

export const step3Schema = applicationSchema.pick({
  why_deserve: true,
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
