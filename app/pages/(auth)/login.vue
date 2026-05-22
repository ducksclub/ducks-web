<script setup lang="ts">
import { AtSign, LockKeyhole } from '@lucide/vue'
import Telegram from '~/components/icons/Telegram.vue'

import { loginSchema, type LoginSchema } from '~/validation/auth'
import { useZodValidation } from '~/composables/useZodValidation'

definePageMeta({
  layout: false,
  middleware: 'guest',
})

const notify = useNotify()
const telegram = useTelegramWebApp()
const { errors, validate } = useZodValidation<LoginSchema>(loginSchema)
const { login, loginViaTelegram } = useAuthStore()

const formData = ref<LoginSchema>({
  email: '',
  password: '',
  remember: false,
})

const isLoading = ref(false)
const isTelegramAuthAvailable = ref(false)

const submit = async () => {
  if (!validate(formData.value)) return

  try {
    isLoading.value = true
    await notify.promise(
      login({ email: formData.value.email, password: formData.value.password }),
      {
        loading: 'Входим в аккаунт...',
        success: 'Вы усепешно вошли в аккаунт!',
        error: 'Произошла ошибка при входе в аккаунт',
      },
    )
    await navigateTo('/')
  } finally {
    isLoading.value = false
  }
}

const authByTelegram = async () => {
  if (!isTelegramAuthAvailable.value) {
    notify.error('Вход через Telegram доступен только внутри Telegram Mini App')
    return
  }

  try {
    isLoading.value = true
    await notify.promise(loginViaTelegram(), {
      loading: 'Входим в аккаунт...',
      success: 'Вы усепешно вошли в аккаунт!',
      error: 'Произошла ошибка при входе в аккаунт',
    })
    await navigateTo('/')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  isTelegramAuthAvailable.value = telegram.hasInitData()
})
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
            :disabled="isLoading"
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
            :disabled="isLoading"
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

          <NuxtLink to="#forgot-password" class="text-(--logo-bg)">Забыли пароль?</NuxtLink>
        </div>

        <BaseButton type="submit" :disabled="isLoading" :loading="isLoading">Войти</BaseButton>
      </form>

      <template v-if="isTelegramAuthAvailable">
        <AuthDivider text="или войти через" />

        <div class="flex justify-center gap-4">
          <button
            @click="authByTelegram"
            type="button"
            :disabled="isLoading"
            class="w-14 h-14 bg-(--secondary)/20 border border-white/5 rounded-2xl flex items-center justify-center active:scale-90 transition"
          >
            <Telegram class="w-6 h-6" />
          </button>
        </div>
      </template>

      <p class="text-center text-sm text-gray-500 mt-8">
        Ещё нет аккаунта?
        <NuxtLink to="/register" class="text-(--logo-bg) font-semibold">Регистрация</NuxtLink>
      </p>
    </div>
  </div>
</template>
