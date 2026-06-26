import type { ProfileResponse, UpdateProfilePayload } from './profile.types'

export function useProfileApi() {
  const api = useApi()

  const getMe = () => {
    return api.request<ProfileResponse>('/users/me', {
      method: 'GET',
    })
  }

  const updateMe = (payload: UpdateProfilePayload) => {
    return api.request<ProfileResponse, UpdateProfilePayload>('/users/me', {
      method: 'PATCH',
      body: payload,
    })
  }

  return {
    getMe,
    updateMe,
  }
}
