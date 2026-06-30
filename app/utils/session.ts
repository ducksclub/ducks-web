import type { User } from '~~/shared/types/user'

export type SessionData = {
  user: User | null
  token: string | null
}

export type StoredSessionData = {
  profile: User | null
  token: string | null
}

export const ACCESS_TOKEN_KEY = 'access_token'
export const PROFILE_KEY = 'profile'

export const readStoredSession = (): StoredSessionData => {
  if (!import.meta.client) {
    return {
      profile: null,
      token: null,
    }
  }

  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  const rawUser = localStorage.getItem(PROFILE_KEY)

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

export const writeStoredSession = (data: SessionData) => {
  if (!import.meta.client) return

  if (data.token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.token)
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  if (data.user) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data.user))
  } else {
    localStorage.removeItem(PROFILE_KEY)
  }
}

export const clearStoredSession = () => {
  if (!import.meta.client) return

  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(PROFILE_KEY)
}
