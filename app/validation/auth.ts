import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string('Введите email').min(1, 'Введите email').email('Некорректный email'),
  password: z.string('Минимум 8 символов').min(8, 'Минимум 8 символов'),
  remember: z.boolean().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>
