<script setup lang="ts">
type TelegramLoginUser = {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  photo_url?: string
}

type TelegramLoginSuccessPayload = {
  id_token: string
  user: TelegramLoginUser
}

type TelegramLoginErrorPayload = {
  error: string
}

type TelegramLoginPayload = TelegramLoginSuccessPayload | TelegramLoginErrorPayload

declare global {
  interface Window {
    Telegram?: {
      Login?: {
        auth: (
          options: {
            client_id: number
            scope?: string[]
            lang?: string
            nonce?: string
          },
          callback: (data: TelegramLoginPayload) => void,
        ) => void
      }
    }
  }
}

const config = useRuntimeConfig()

const result = ref<string>('Пользователь ещё не авторизован')
const isLoading = ref(false)
const isScriptLoaded = ref(false)

const clientId = computed(() => {
  return Number(config.public.telegramLoginClientId)
})

function loadTelegramLoginScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.Telegram?.Login) {
      isScriptLoaded.value = true
      resolve()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://oauth.telegram.org/js/telegram-login.js?5"]',
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        isScriptLoaded.value = true
        resolve()
      })

      existingScript.addEventListener('error', () => {
        reject(new Error('Не удалось загрузить Telegram Login library'))
      })

      return
    }

    const script = document.createElement('script')

    script.src = 'https://oauth.telegram.org/js/telegram-login.js?5'
    script.async = true

    script.onload = () => {
      isScriptLoaded.value = true
      resolve()
    }

    script.onerror = () => {
      reject(new Error('Не удалось загрузить Telegram Login library'))
    }

    document.head.appendChild(script)
  })
}

async function handleTelegramLogin() {
  try {
    isLoading.value = true

    if (!clientId.value) {
      result.value = 'Не указан Telegram Client ID'
      return
    }

    await loadTelegramLoginScript()

    if (!window.Telegram?.Login) {
      result.value = 'Telegram Login library не загрузилась'
      return
    }

    window.Telegram.Login.auth(
      {
        client_id: clientId.value,
        scope: ['profile'],
        lang: 'ru',
        nonce: crypto.randomUUID(),
      },
      onTelegramAuth,
    )
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'Неизвестная ошибка Telegram авторизации')
  } finally {
    isLoading.value = false
  }
}

async function onTelegramAuth(data: TelegramLoginPayload) {
  if ('error' in data) {
    console.log(`Ошибка авторизации: ${data.error}`)
    return
  }

  console.log('Telegram auth data:', data)
  console.log(
    'JSON: ',
    JSON.stringify(
      {
        user: data.user,
        id_token: data.id_token,
      },
      null,
      2,
    ),
  )

  /*
    Для реальной авторизации отправь id_token на backend:

    const response = await $fetch('/api/auth/telegram', {
      method: 'POST',
      body: {
        id_token: data.id_token,
      },
    })

    После этого backend должен:
    1. проверить id_token;
    2. найти или создать пользователя;
    3. вернуть accessToken твоего приложения.
  */
}

onMounted(async () => {
  try {
    await loadTelegramLoginScript()
  } catch {
    result.value = 'Telegram Login library не загрузилась'
    console.error('Не удалось загрузить Telegram Login library')
  }
})
</script>

<template>
  <button
    type="button"
    :disabled="isLoading"
    class="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#2AABEE] to-[#229ED9] size-10 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
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
