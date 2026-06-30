import { apiRequest } from '~/utils/api/http-client'
import type { UploadImageResponse } from '~~/shared/types/upload'

export const uploadApi = {
  uploadImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    return apiRequest<UploadImageResponse, FormData>({
      url: '/upload/image',
      method: 'POST',
      body: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    })
  },
}
