<script setup lang="ts">
import TelegramIcon from '~/components/icons/TelegramIcon.vue'
import { useSignIn } from '~/composables/auth/useSignIn'
import { AtSign, LockKeyhole } from '@lucide/vue'

definePageMeta({
  layout: false,
  middleware: 'guest',
})

useHead({
  title: "Duck's | Вход",
})

const signin = useSignIn()
</script>

<template>
  <div
    class="min-h-screen bg-(--bg) text-white flex flex-col items-center justify-center p-6 relative overflow-hidden"
  >
    <div class="relative z-10 w-full max-w-85">
      <AuthBrandLogo />

      <h2 class="text-center text-lg font-bold uppercase mb-6">Вход</h2>

      <form @submit.prevent="signin.submit">
        <div class="space-y-3">
          <AuthField
            v-model="signin.formData.value.email"
            :disabled="signin.pending.value"
            type="email"
            placeholder="Email"
            :error="!!signin.errors.value.email"
            :error-message="signin.errors.value.email"
            :autocomplete="'email'"
            :icon="AtSign"
          />

          <AuthField
            v-model="signin.formData.value.password"
            :type="'password'"
            :error="!!signin.errors.value.password"
            :disabled="signin.pending.value"
            :placeholder="'Пароль'"
            :error-message="signin.errors.value.password"
            :autocomplete="'current-password'"
            :icon="LockKeyhole"
          />
        </div>

        <div class="flex justify-between items-center text-xs text-gray-500 mt-3">
          <CheckboxAgreement v-model="signin.formData.value.remember">
            <p class="mt-0.75">Запомнить меня</p>
          </CheckboxAgreement>

          <NuxtLink to="/forgot-password" class="text-(--logo-bg)">Забыли пароль?</NuxtLink>
        </div>

        <BaseButton type="submit" :disabled="signin.pending.value" :loading="signin.pending.value">
          Войти
        </BaseButton>
      </form>

      <div class="mt-6">
        <div class="flex items-center gap-3 text-[10px] font-bold uppercase text-gray-600">
          <span class="h-px flex-1 bg-white/10" />
          <span>или</span>
          <span class="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          :disabled="signin.pending.value"
          class="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-(--secondary)/20 text-(--accent) transition active:scale-90 disabled:opacity-50"
          aria-label="Войти через Telegram"
          @click="signin.submitTelegram"
        >
          <TelegramIcon class="h-7 w-7" />
        </button>
      </div>

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
