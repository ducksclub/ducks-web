import { z } from 'zod'

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === 'string' && value.trim() === '') {
    return undefined
  }

  return value
}

const optionalString = <T extends z.ZodTypeAny>(schema: T) => {
  return z.preprocess(emptyStringToUndefined, schema.optional())
}

export const profileSchema = z.object({
  email: optionalString(z.string('Введите email').email('Некорректный email')),
  username: optionalString(
    z
      .string('Введите username')
      .min(3, 'Username должен содержать минимум 3 символа')
      .max(30, 'Username слишком длинный')
      .regex(
        /^[\p{L}0-9_.\-\s]+$/u,
        'Username может содержать только буквы, цифры, "_", ".", "-" и пробел',
      ),
  ),
  phone: optionalString(
    z.string('Введите корректный номер телефона').min(6, 'Введите корректный номер телефона'),
  ),
  avatar: optionalString(z.string()),
})

export type ProfileForm = z.infer<typeof profileSchema>
