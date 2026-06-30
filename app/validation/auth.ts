import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string('Введите email').min(1, 'Введите email').email('Некорректный email'),
  password: z.string('Минимум 8 символов').min(8, 'Минимум 8 символов'),
  remember: z.boolean().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
  email: z.string('Введите email').trim().min(1, 'Введите email').email('Некорректный email'),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    password: z.string('Минимум 8 символов').min(8, 'Минимум 8 символов'),
    confirmPassword: z.string('Повторите пароль').min(1, 'Повторите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
