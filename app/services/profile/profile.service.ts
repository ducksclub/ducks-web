import { apiRequest } from '../client'
import type {
  GetProfileResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from './profile.types'

class ProfileService {
  getProfile = async (nickname: string) => {
    return apiRequest<GetProfileResponse>({
      method: 'GET',
      url: `/users/by-nickname`,
      params: {
        nickname,
      },
    })
  }

  updateProfile = async (payload: UpdateProfilePayload) => {
    return apiRequest<UpdateProfileResponse>({
      method: 'PATCH',
      url: `/users/me`,
      body: payload,
    })
  }
}

export const profileService = new ProfileService()
