import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string('Минимум 2 символа').min(2, 'Минимум 2 символа'),
    email: z.string('Некорректный email').email('Некорректный email'),
    password: z.string('Минимум 8 символов').min(8, 'Минимум 8 символов'),
    confirmPassword: z.string(),
    agree: z.boolean().refine((v) => v === true, {
      message: 'Необходимо принять условия',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type RegisterSchema = z.infer<typeof registerSchema>
