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
  nickname: optionalString(
    z
      .string('Введите nickname')
      .trim()
      .min(3, 'Nickname должен содержать минимум 3 символа')
      .max(30, 'Nickname слишком длинный')
      .regex(/^[a-zA-Z0-9_]+$/, 'Nickname может содержать только буквы, цифры и "_"'),
  ),
  phone: optionalString(
    z.string('Введите корректный номер телефона').min(6, 'Введите корректный номер телефона'),
  ),
  avatar: optionalString(z.string()),
})

export type ProfileForm = z.infer<typeof profileSchema>
