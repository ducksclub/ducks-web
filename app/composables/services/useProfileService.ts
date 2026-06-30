import { useAuthService } from './useAuthService'
import { profileService } from '~/services/profile/profile.service'
import type { User } from '~/types/user.types'
import type { UpdateProfilePayload } from '~/services/profile/profile.types'

export const useProfileService = () => {
  const pending = ref<boolean>(false)
  const profile = ref<User | null>(null)
  const error = ref<string>('')
  const auth = useAuthService()
  const session = useSessionStorage()

  const getProfile = async (nickname: string) => {
    pending.value = true
    error.value = ''

    try {
      const data = await profileService.getProfile(nickname)

      profile.value = data

      return data
    } catch (e) {
      error.value = 'Не удалось получить профиль'
      console.log('[PROFILE:getProfile]', e)

      throw e
    } finally {
      pending.value = false
    }
  }

  const updateProfile = async (payload: UpdateProfilePayload) => {
    pending.value = true
    error.value = ''

    try {
      const data = await profileService.updateProfile(payload)

      profile.value = data
      auth.profile.value = data

      session.saveSession({
        user: data,
        token: auth.accessToken.value,
      })

      return data
    } catch (e) {
      error.value = 'Не удалось обновить профиль'
      console.log('[PROFILE:updateProfile]', e)

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
