<script setup lang="ts">
import { getApiErrorMessage } from '~/utils/api/api-error'
import { AtSign } from '@lucide/vue'
import { authApi as authService } from '~/utils/api/auth'
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from '~/validation/auth.validation'

definePageMeta({
  layout: false,
  middleware: 'guest',
})

useHead({
  title: "Duck's | Восстановление пароля",
})

const notify = useNotify()
const { errors, validate } = useZodValidation<ForgotPasswordSchema>(forgotPasswordSchema)

const form = ref<ForgotPasswordSchema>({
  email: '',
})
const isLoading = ref(false)
const isSent = ref(false)

const submit = async () => {
  if (!validate(form.value)) return

  try {
    isLoading.value = true
    const response = await authService.forgotPassword({ email: form.value.email })
    isSent.value = true
    notify.success(response.message)
  } catch (error) {
    notify.error(getApiErrorMessage(error, 'Не удалось отправить письмо'))
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-center p-6">
    <div class="w-full max-w-85">
      <AuthLogo />

      <h2 class="text-center text-lg font-bold uppercase mb-6">Восстановление пароля</h2>

      <form @submit.prevent="submit" class="space-y-4">
        <AuthInput
          v-model="form.email"
          type="email"
          placeholder="Email"
          :disabled="isLoading || isSent"
          :error="!!errors.email"
          :error-message="errors.email"
          autocomplete="email"
        >
          <template #icon>
            <AtSign class="w-5 h-5" />
          </template>
        </AuthInput>

        <BaseButton type="submit" :disabled="isLoading || isSent" :loading="isLoading">
          Отправить письмо
        </BaseButton>
      </form>

      <p class="text-center text-sm text-gray-500 mt-8">
        Вспомнили пароль?
        <NuxtLink to="/signin" class="text-(--logo-bg) font-semibold">Войти</NuxtLink>
      </p>
    </div>
  </div>
</template>
