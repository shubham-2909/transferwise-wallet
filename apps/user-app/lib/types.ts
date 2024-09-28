import { z } from 'zod'

export const userSchema = z.object({
  phone: z
    .string()
    .length(10, { message: 'Phone number must be exactly 10 digits.' })
    .regex(/^\d{10}$/, { message: 'Phone number must contain only digits.' }),

  password: z
    .string()
    .min(5, { message: 'Password must be at least 8 characters long.' })
    .max(100, { message: 'Password must not exceed 100 characters.' }),
})
