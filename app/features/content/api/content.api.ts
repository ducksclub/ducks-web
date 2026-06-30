import { apiRequest } from '~/shared/api/http-client'
import type {
  GetContentByIdParams,
  GetContentByIdResponse,
  GetContentsParams,
  GetContentsResponse,
  UpdateContentParams,
  UpdateContentPayload,
  UpdateContentResponse,
} from '../model/content'

export const contentApi = {
  getContents(params: GetContentsParams) {
    return apiRequest<GetContentsResponse>({
      url: `/content/by-key/${params.key}`,
      method: 'GET',
    })
  },

  getContentById(params: GetContentByIdParams) {
    return apiRequest<GetContentByIdResponse>({
      url: `/content/${params.id}`,
      method: 'GET',
    })
  },

  updateContent(params: UpdateContentParams, payload: UpdateContentPayload) {
    return apiRequest<UpdateContentResponse, UpdateContentPayload>({
      url: `/content/${params.id}`,
      method: 'PUT',
      body: payload,
    })
  },
}
