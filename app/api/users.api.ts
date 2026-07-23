import type { EventGameType } from '~/types/event'
import type {
  GetUsersResponse,
  PublicUserProfile,
  UpdateUserGameStatsPayload,
  UpdateUserGameStatsResponse,
} from '~/types/user'

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

  const updateUserGameStats = (
    userId: string,
    gameType: EventGameType,
    payload: UpdateUserGameStatsPayload,
  ) => {
    return api.request<UpdateUserGameStatsResponse, UpdateUserGameStatsPayload>(
      `/users/${encodeURIComponent(userId)}/stats/${encodeURIComponent(gameType)}`,
      {
        method: 'PATCH',
        body: payload,
      },
    )
  }

  return {
    getUser,
    getUsers,
    updateUserGameStats,
  }
}
