import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string('Введите email').min(1, 'Введите email').email('Некорректный email'),
  password: z.string('Введите пароль').min(1, 'Введите пароль').max(128, 'Пароль слишком длинный'),
  remember: z.boolean().optional(),
})

export const signUpSchema = z
  .object({
    nickname: z
      .string('Минимум 3 символа')
      .trim()
      .min(3, 'Минимум 3 символа')
      .max(30, 'Nickname слишком длинный'),
    email: z.string('Некорректный email').email('Некорректный email'),
    password: z.string('Минимум 8 символов').min(8, 'Минимум 8 символов').max(128),
    confirmPassword: z.string(),
    agree: z.boolean().refine((v) => v === true, {
      message: 'Необходимо принять условия',
    }),
    agreeDuck: z.boolean().refine((v) => v === true, {
      message: 'Необходимо принять условия',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string('Введите email').min(1, 'Введите email').email('Некорректный email'),
})

export const resetPasswordSchema = z
  .object({
    password: z.string('Минимум 8 символов').min(8, 'Минимум 8 символов').max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type SignInSchema = z.infer<typeof signInSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
