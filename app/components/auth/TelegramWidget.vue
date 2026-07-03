<script lang="ts" setup>
type TelegramAuthUser = {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramAuthUser) => void
  }
}

const widgetContainer = ref<HTMLDivElement | null>(null)

async function handleTelegramAuth(user: TelegramAuthUser) {
  console.log('Telegram user:', user)

  alert(
    `Logged in as ${user.first_name} ${user.last_name || ''} (${user.id}${
      user.username ? `, @${user.username}` : ''
    })`,
  )

  // // В production обязательно отправляй данные на backend
  // // и проверяй hash через bot token.
  // await $fetch('/api/auth/telegram', {
  //   method: 'POST',
  //   body: user,
  // })
}

onMounted(() => {
  if (!widgetContainer.value) return

  window.onTelegramAuth = handleTelegramAuth

  const script = document.createElement('script')

  script.src = 'https://telegram.org/js/telegram-widget.js?24'
  script.async = true

  script.setAttribute('data-telegram-login', 'ducks_gameclub_bot')
  script.setAttribute('data-size', 'large')
  script.setAttribute('data-userpic', 'false')
  script.setAttribute('data-request-access', 'write')
  script.setAttribute('data-onauth', 'window.onTelegramAuth(user)')

  widgetContainer.value.appendChild(script)
})

onBeforeUnmount(() => {
  delete window.onTelegramAuth

  if (widgetContainer.value) {
    widgetContainer.value.innerHTML = ''
  }
})
</script>

<template>
  <div ref="widgetContainer" />
</template>
