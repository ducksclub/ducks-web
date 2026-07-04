<script setup lang="ts">
const notify = useNotify()
const { startTelegramOidcLogin } = useTelegramOidcAuth()

const isLoading = ref(false)

async function handleTelegramLogin() {
  try {
    isLoading.value = true
    await startTelegramOidcLogin()
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Не удалось авторизоваться через Telegram'

    notify.error(message)
    isLoading.value = false
  }
}
</script>

<template>
  <button
    type="button"
    :disabled="isLoading"
    aria-label="Войти через Telegram"
    title="Войти через Telegram"
    class="inline-flex size-10 items-center justify-center rounded-xl bg-linear-to-r from-[#2AABEE] to-[#229ED9] text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
    @click="handleTelegramLogin"
  >
    <svg v-if="!isLoading" class="size-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M21.944 4.765 18.67 20.22c-.247 1.092-.89 1.363-1.804.849l-5-3.686-2.413 2.322c-.267.267-.49.49-1.004.49l.358-5.09 9.267-8.374c.403-.358-.088-.557-.625-.199L5.995 13.746 1.06 12.203C-.014 11.868-.033 11.13 1.284 10.615L20.588 3.18c.894-.334 1.676.2 1.356 1.585Z"
      />
    </svg>

    <span v-else class="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  </button>
</template>
