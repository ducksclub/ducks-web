import { apiRequest } from '~/utils/api/http-client'
import type {
  GetProfileResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '~~/shared/types/profile'

export const profileApi = {
  getProfile(nickname: string) {
    return apiRequest<GetProfileResponse>({
      method: 'GET',
      url: '/users/by-nickname',
      params: {
        nickname,
      },
    })
  },

  updateProfile(payload: UpdateProfilePayload) {
    return apiRequest<UpdateProfileResponse, UpdateProfilePayload>({
      method: 'PATCH',
      url: '/users/me',
      body: payload,
    })
  },
}
