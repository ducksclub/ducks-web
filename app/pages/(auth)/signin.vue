<script setup lang="ts">
import { AtSign, LockKeyhole } from '@lucide/vue'
import { useZodValidation } from '~/composables/useZodValidation'
import { useAuthService } from '~/composables/services/useAuthService'
import { signInSchema } from '~/validation/auth.validation'
import type { AxiosError } from 'axios'
import type { SignInSchema } from '~/validation/auth.validation'
import type { ApiErrorResponse } from '~/services/client.types'

definePageMeta({
  layout: false,
  middleware: 'guest',
})

useHead({
  title: "Duck's | Вход",
})

const notify = useNotify()
const { signIn } = useAuthService()
const { errors, validate } = useZodValidation<SignInSchema>(signInSchema)

const pending = ref<boolean>(false)
const formData = ref<SignInSchema>({
  email: '',
  password: '',
  remember: false,
})

const submit = async () => {
  if (!validate(formData.value)) return

  pending.value = true

  try {
    await signIn({ email: formData.value.email, password: formData.value.password })
    await navigateTo('/')
  } catch (e) {
    const axiosError = e as AxiosError<ApiErrorResponse>
    const errorMessage = axiosError.response?.data?.error.message || 'Неверный email или пароль'
    notify.error(errorMessage)
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-center p-6 relative overflow-hidden"
  >
    <div class="relative z-10 w-full max-w-85">
      <AuthLogo />

      <h2 class="text-center text-lg font-bold uppercase mb-6">Вход</h2>

      <form @submit.prevent="submit">
        <div class="space-y-3">
          <AuthInput
            v-model="formData.email"
            :disabled="pending"
            type="email"
            placeholder="Email"
            :error="!!errors.email"
            :error-message="errors.email"
            :autocomplete="'email'"
          >
            <template #icon>
              <AtSign class="w-5 h-5" />
            </template>
          </AuthInput>

          <AuthInput
            v-model="formData.password"
            :type="'password'"
            :error="!!errors.password"
            :disabled="pending"
            :placeholder="'Пароль'"
            :error-message="errors.password"
            :autocomplete="'current-password'"
          >
            <template #icon>
              <LockKeyhole class="w-5 h-5" />
            </template>
          </AuthInput>
        </div>

        <div class="flex justify-between items-center text-xs text-gray-500 mt-3">
          <CheckboxAgreement v-model="formData.remember">
            <p class="mt-0.75">Запомнить меня</p>
          </CheckboxAgreement>

          <NuxtLink to="/forgot-password" class="text-(--logo-bg)">Забыли пароль?</NuxtLink>
        </div>

        <BaseButton type="submit" :disabled="pending" :loading="pending">Войти</BaseButton>
      </form>

      <p class="text-center text-sm text-gray-500 mt-8">
        Ещё нет аккаунта?
        <NuxtLink to="/signup" class="text-(--logo-bg) font-semibold">Регистрация</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
div {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
