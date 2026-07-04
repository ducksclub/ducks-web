const telegramOidcStorageKey = 'telegram:oidc'
const telegramOauthUrl = 'https://oauth.telegram.org/auth'

type TelegramOidcSession = {
  state: string
  nonce: string
  codeVerifier: string
  redirectUri: string
}

function base64UrlEncode(bytes: Uint8Array) {
  let binary = ''

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function getSessionStorage() {
  if (!import.meta.client) return null

  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

function createCodeVerifier() {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)

  return base64UrlEncode(bytes)
}

async function createCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier)
  const hash = await crypto.subtle.digest('SHA-256', data)

  return base64UrlEncode(new Uint8Array(hash))
}

function saveTelegramOidcSession(session: TelegramOidcSession) {
  const storage = getSessionStorage()

  if (!storage) {
    throw new Error('Не удалось сохранить Telegram state')
  }

  storage.setItem(telegramOidcStorageKey, JSON.stringify(session))
}

function readTelegramOidcSession() {
  const storage = getSessionStorage()
  const rawSession = storage?.getItem(telegramOidcStorageKey)

  if (!rawSession) return null

  try {
    return JSON.parse(rawSession) as TelegramOidcSession
  } catch {
    storage?.removeItem(telegramOidcStorageKey)
    return null
  }
}

function clearTelegramOidcSession() {
  getSessionStorage()?.removeItem(telegramOidcStorageKey)
}

export function useTelegramOidcAuth() {
  const config = useRuntimeConfig()

  async function startTelegramOidcLogin() {
    if (!import.meta.client) return

    const clientId = String(config.public.telegramLoginClientId || '').trim()

    if (!clientId) {
      throw new Error('Не указан Telegram Client ID')
    }

    const state = crypto.randomUUID()
    const nonce = crypto.randomUUID()
    const codeVerifier = createCodeVerifier()
    const codeChallenge = await createCodeChallenge(codeVerifier)
    const redirectUri = `${window.location.origin}/auth/telegram/callback`

    saveTelegramOidcSession({
      state,
      nonce,
      codeVerifier,
      redirectUri,
    })

    const url = new URL(telegramOauthUrl)
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('redirect_uri', redirectUri)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', 'openid profile')
    url.searchParams.set('state', state)
    url.searchParams.set('nonce', nonce)
    url.searchParams.set('code_challenge', codeChallenge)
    url.searchParams.set('code_challenge_method', 'S256')

    window.location.assign(url.toString())
  }

  return {
    startTelegramOidcLogin,
    readTelegramOidcSession,
    clearTelegramOidcSession,
  }
}
