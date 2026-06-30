import { uploadApi } from '../api/upload.api'

export const useUploadImage = () => {
  const isUploading = ref(false)

  const uploadImage = async (file: File) => {
    isUploading.value = true

    try {
      return await uploadApi.uploadImage(file)
    } finally {
      isUploading.value = false
    }
  }

  return {
    uploadImage,
    isUploading,
  }
}
