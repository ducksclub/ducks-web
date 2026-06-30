import type { User } from '~/types/user.types'
import type { SessionData } from './services/useAuthService'

export type StoredSessionData = {
  profile: User | null
  token: string | null
}

export const ACCESS_TOKEN_KEY = 'access_token'
export const PROFILE_KEY = 'profile'

export const useSessionStorage = () => {
  const saveSession = (data: SessionData) => {
    if (!import.meta.client) return

    if (data.token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, data.token)
    }

    if (data.user) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(data.user))
    }
  }

  const getSession = (): StoredSessionData => {
    if (!import.meta.client) {
      return {
        profile: null,
        token: null,
      }
    }

    const token = localStorage.getItem(ACCESS_TOKEN_KEY)
    const rawUser = localStorage.getItem(PROFILE_KEY)

    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token)
    }

    if (rawUser) {
      localStorage.setItem(PROFILE_KEY, rawUser)
    }

    if (!rawUser) {
      return {
        profile: null,
        token,
      }
    }

    try {
      return {
        profile: JSON.parse(rawUser) as User,
        token,
      }
    } catch {
      localStorage.removeItem(PROFILE_KEY)

      return {
        profile: null,
        token,
      }
    }
  }

  const clearSession = () => {
    if (!import.meta.client) return

    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(PROFILE_KEY)
  }

  return {
    saveSession,
    getSession,
    clearSession,
  }
}
