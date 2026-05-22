import { z } from 'zod'

export const profileSchema = z.object({
  username: z
    .string('Username может содержать только буквы, цифры и "_')
    .min(3, 'Username должен содержать минимум 3 символа')
    .max(30, 'Username слишком длинный')
    .regex(
      /^[\p{L}0-9_.\-\s]+$/u,
      'Username может содержать только буквы, цифры, "_", ".", "-" и пробел',
    ),

  phone: z
    .string('Введите корректный номер телефона')
    .min(6, 'Введите корректный номер телефона')
    .optional(),
  avatar: z.string().optional(),
})

export type ProfileForm = z.infer<typeof profileSchema>
