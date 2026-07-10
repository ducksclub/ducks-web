import type { GetUsersResponse, PublicUserProfile } from '~/types/user'

export function useUsersApi() {
  const api = useApi()

  const getUser = (id: string) => {
    return api.request<PublicUserProfile>(`/users/${id}`, {
      method: 'GET',
    })
  }

  const getUsers = () => {
    return api.request<GetUsersResponse>('/users', {
      method: 'GET',
    })
  }

  return {
    getUser,
    getUsers,
  }
}
