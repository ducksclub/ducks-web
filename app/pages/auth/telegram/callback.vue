<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: "Duck's | Telegram авторизация",
})

type CallbackStatus = 'loading' | 'success' | 'error'
type QueryValue = string | string[] | null | undefined

const route = useRoute()
const notify = useNotify()
const auth = useAuthProvider()
const { readTelegramOidcSession, clearTelegramOidcSession } = useTelegramOidcAuth()

const status = ref<CallbackStatus>('loading')
const message = ref('Завершаем авторизацию через Telegram...')

function getQueryString(value: QueryValue) {
  return Array.isArray(value) ? value[0] : value
}

function getAuthErrorMessage(error: unknown) {
  const fallback = 'Не удалось авторизоваться через Telegram'

  if (typeof error !== 'object' || !error) return fallback

  const maybeError = error as {
    message?: string
    response?: {
      data?: {
        message?: string
        error?: {
          message?: string
        }
      }
    }
  }

  return (
    maybeError.response?.data?.error?.message ||
    maybeError.response?.data?.message ||
    maybeError.message ||
    fallback
  )
}

function fail(errorMessage: string) {
  status.value = 'error'
  message.value = errorMessage
  notify.error(errorMessage)
}

async function completeTelegramLogin() {
  const error = getQueryString(route.query.error)
  const code = getQueryString(route.query.code)
  const state = getQueryString(route.query.state)

  try {
    if (error) {
      fail('Не удалось авторизоваться через Telegram')
      return
    }

    if (!code) {
      fail('Telegram authorization code отсутствует')
      return
    }

    const session = readTelegramOidcSession()

    if (!session || !state || session.state !== state) {
      fail('Неверный Telegram state')
      return
    }

    await auth.signInWithTelegramOidc({
      code,
      codeVerifier: session.codeVerifier,
      redirectUri: session.redirectUri,
    })

    status.value = 'success'
    message.value = 'Telegram авторизация выполнена'
    notify.success('Вы успешно вошли в аккаунт!')
    await navigateTo('/')
  } catch (error) {
    fail(getAuthErrorMessage(error))
  } finally {
    clearTelegramOidcSession()
  }
}

onMounted(() => {
  void completeTelegramLogin()
})
</script>

<template>
  <div class="min-h-screen bg-(--bg) text-white flex items-center justify-center p-6">
    <div class="w-full max-w-85 text-center">
      <AuthLogo />

      <div class="mt-8 flex flex-col items-center gap-4">
        <span
          v-if="status === 'loading'"
          class="size-9 animate-spin rounded-full border-2 border-white/20 border-t-[#2AABEE]"
        />
        <span
          v-else-if="status === 'success'"
          class="inline-flex size-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white"
        >
          ✓
        </span>
        <span
          v-else
          class="inline-flex size-9 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white"
        >
          !
        </span>

        <p class="text-sm font-semibold text-white">{{ message }}</p>

        <NuxtLink
          v-if="status === 'error'"
          to="/signin"
          class="mt-2 text-sm font-semibold text-(--logo-bg)"
        >
          Вернуться ко входу
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
