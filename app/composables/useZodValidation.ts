import { ref } from 'vue'
import type { ZodSchema, ZodError } from 'zod'

type Errors<T> = Partial<Record<keyof T, string>>

export const useZodValidation = <T extends Record<string, any>>(schema: ZodSchema<T>) => {
  const errors = ref<Errors<T>>({})

  const validate = (data: T): boolean => {
    const result = schema.safeParse(data)

    if (!result.success) {
      errors.value = mapErrors(result.error)
      return false
    }

    errors.value = {}
    return true
  }

  const validateField = (field: keyof T, value: any): boolean => {
    const partial = schema.pick({ [field]: true } as any)
    const result = partial.safeParse({ [field]: value })

    if (!result.success) {
      errors.value[field] = result.error.errors[0].message
      return false
    }

    delete errors.value[field]
    return true
  }

  const resetErrors = () => {
    errors.value = {}
  }

  return {
    errors,
    validate,
    validateField,
    resetErrors,
  }
}

function mapErrors<T>(error: ZodError<T>) {
  const fieldErrors: Partial<Record<keyof T, string>> = {}

  error.issues.forEach((err) => {
    const field = err.path[0] as keyof T
    if (field) {
      fieldErrors[field] = err.message
    }
  })

  return fieldErrors
}
