<script setup lang="ts">
const emit = defineEmits<{
  success: [user: TelegramLoginWidgetUser]
  error: [message: string]
}>()

const config = useRuntimeConfig()

const widgetRef = ref<HTMLDivElement | null>(null)

const botUsername = computed(() => {
  return 'ducks_gameclub_bot'
})

onMounted(() => {
  if (!botUsername.value) {
    emit('error', 'Не указан username Telegram-бота')
    return
  }

  window.onTelegramAuth = (user: TelegramLoginWidgetUser) => {
    emit('success', user)
  }

  const script = document.createElement('script')

  script.async = true
  script.src = 'https://telegram.org/js/telegram-widget.js?24'

  script.setAttribute('data-telegram-login', botUsername.value)
  script.setAttribute('data-size', 'large')
  script.setAttribute('data-radius', '20')
  script.setAttribute('data-userpic', 'true')
  script.setAttribute('data-request-access', 'write')
  script.setAttribute('data-onauth', 'onTelegramAuth(user)')

  widgetRef.value?.appendChild(script)
})

onBeforeUnmount(() => {
  delete window.onTelegramAuth
})
</script>

<template>
  <div ref="widgetRef" class="telegram-login-widget" />
</template>
