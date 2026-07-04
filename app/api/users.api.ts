import type { PublicUserProfile } from '~/types/user'

export function useUsersApi() {
  const api = useApi()

  const getUser = (id: string) => {
    return api.request<PublicUserProfile>(`/users/${id}`, {
      method: 'GET',
    })
  }

  return {
    getUser,
  }
}
