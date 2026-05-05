<template>
  <div
    class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-center p-6 relative overflow-hidden"
  >
    <div class="relative z-10 w-full max-w-85">
      <AuthLogo />

      <h2 class="text-center text-lg font-bold uppercase mb-6">Вход в клуб</h2>

      <div class="space-y-3">
        <AuthInput v-model="loginData.identifier" type="text" placeholder="Email или телефон">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </template>
        </AuthInput>

        <AuthInput v-model="loginData.password" type="password" placeholder="Пароль">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </template>
        </AuthInput>
      </div>

      <div class="flex justify-between items-center text-xs text-gray-500 mt-3">
        <CheckboxAgreement v-model="loginData.remember">
          <p class="mt-0.75">Запомнить меня</p>
        </CheckboxAgreement>

        <NuxtLink to="#forgot-password" class="text-(--logo-bg)">Забыли пароль?</NuxtLink>
      </div>

      <BaseButton>Войти</BaseButton>

      <AuthDivider text="или войти через" />

      <div class="flex justify-center gap-4">
        <button
          class="w-14 h-14 bg-(--secondary)/20 border border-white/5 rounded-2xl flex items-center justify-center active:scale-90 transition"
        >
          <Telegram class="w-6 h-6" />
        </button>

        <button
          class="w-14 h-14 bg-(--secondary)/20 border border-white/5 rounded-2xl flex items-center justify-center active:scale-90 transition"
        >
          <Google class="w-6 h-6" />
        </button>

        <button
          class="w-14 h-14 bg-(--secondary)/20 border border-white/5 rounded-2xl flex items-center justify-center active:scale-90 transition"
        >
          <Apple class="w-6 h-6" />
        </button>
      </div>

      <p class="text-center text-sm text-gray-500 mt-8">
        Ещё нет аккаунта?
        <NuxtLink to="/register" class="text-(--logo-bg) font-semibold">Регистрация</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import Apple from '~/components/icons/Apple.vue'
import Google from '~/components/icons/Google.vue'
import Telegram from '~/components/icons/Telegram.vue'

definePageMeta({ layout: false })

const loginData = ref({
  identifier: '',
  password: '',
  remember: false,
})

const handleLogin = () => {
  console.log(loginData.value)
  navigateTo('/events')
}
</script>
