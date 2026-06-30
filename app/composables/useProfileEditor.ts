import { getApiErrorMessage } from '~/utils/api/api-error'
import { useAuthSession } from '~/composables/useAuthSession'
import { writeStoredSession } from '~/utils/session'
import { profileApi } from '~/utils/api/profile'
import type { UpdateProfilePayload } from '~~/shared/types/profile'
import type { User } from '~~/shared/types/user'

export const useProfileEditor = () => {
  const pending = ref(false)
  const profile = ref<User | null>(null)
  const error = ref('')
  const auth = useAuthSession()

  const getProfile = async (nickname: string) => {
    pending.value = true
    error.value = ''

    try {
      const data = await profileApi.getProfile(nickname)
      profile.value = data

      return data
    } catch (e) {
      error.value = getApiErrorMessage(e, 'Не удалось получить профиль')

      throw e
    } finally {
      pending.value = false
    }
  }

  const updateProfile = async (payload: UpdateProfilePayload) => {
    pending.value = true
    error.value = ''

    try {
      const data = await profileApi.updateProfile(payload)

      profile.value = data
      auth.profile.value = data

      writeStoredSession({
        user: data,
        token: auth.accessToken.value,
      })

      return data
    } catch (e) {
      error.value = getApiErrorMessage(e, 'Не удалось обновить профиль')

      throw e
    } finally {
      pending.value = false
    }
  }

  return {
    pending,
    profile,
    error,
    getProfile,
    updateProfile,
  }
}
