<script setup lang="ts">
import { getApiErrorMessage } from '~/utils/api/api-error'
import { LockKeyhole } from '@lucide/vue'
import { authApi as authService } from '~/utils/api/auth'
import { resetPasswordSchema, type ResetPasswordSchema } from '~/validation/auth.validation'

definePageMeta({
  layout: false,
  middleware: 'guest',
})

useHead({
  title: "Duck's | Новый пароль",
})

const route = useRoute()
const notify = useNotify()
const { errors, validate } = useZodValidation<ResetPasswordSchema>(resetPasswordSchema)

const form = ref<ResetPasswordSchema>({
  password: '',
  confirmPassword: '',
})
const isLoading = ref(false)

const token = computed(() => {
  const value = route.query.token
  return typeof value === 'string' ? value : ''
})

const submit = async () => {
  if (!token.value) {
    notify.error('Ссылка восстановления некорректна')
    return
  }

  if (!validate(form.value)) return

  try {
    isLoading.value = true
    const response = await authService.resetPassword({
      token: token.value,
      password: form.value.password,
    })

    notify.success(response.message)
    await navigateTo('/signin')
  } catch (error) {
    notify.error(getApiErrorMessage(error, 'Не удалось изменить пароль'))
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-85">
      <AuthBrandLogo />

      <h2 class="text-center text-lg font-bold uppercase mb-6">Новый пароль</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <AuthInput
          v-model="form.password"
          type="password"
          placeholder="Новый пароль"
          :disabled="isLoading"
          :error="!!errors.password"
          :error-message="errors.password"
          autocomplete="new-password"
        >
          <template #icon>
            <LockKeyhole class="w-5 h-5" />
          </template>
        </AuthInput>

        <AuthInput
          v-model="form.confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          :disabled="isLoading"
          :error="!!errors.confirmPassword"
          :error-message="errors.confirmPassword"
          autocomplete="new-password"
        >
          <template #icon>
            <LockKeyhole class="w-5 h-5" />
          </template>
        </AuthInput>

        <BaseButton type="submit" :disabled="isLoading || !token" :loading="isLoading">
          Сохранить пароль
        </BaseButton>
      </form>
    </div>
  </div>
</template>
