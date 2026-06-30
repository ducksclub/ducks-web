import { apiRequest } from '~/shared/api/http-client'
import type { UploadImageResponse } from '../model/upload.types'

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
