import { ref } from 'vue'
import type { ZodError, ZodType } from 'zod'

type Errors<T extends Record<string, unknown>> = Partial<Record<keyof T, string>>

export const useZodValidation = <T extends Record<string, unknown>>(schema: ZodType<T>) => {
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

  const resetErrors = () => {
    errors.value = {}
  }

  return {
    errors,
    validate,
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
