import { apiRequest } from '~/shared/api/http-client'
import type {
  GetProfileResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '../model/profile.types'

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
