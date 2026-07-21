export function useUploadApi() {
  const api = useApi()

  const isUploading = ref(false)

  const uploadImage = async (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      throw new Error('Размер изображения не должен превышать 20 МБ')
    }

    const formData = new FormData()
    formData.append('file', file)

    isUploading.value = true

    try {
      const res = await api.request('/upload/image', {
        method: 'POST',
        body: formData,
        timeout: 60000,
      })

      return res as { url: string; hash: string }
    } finally {
      isUploading.value = false
    }
  }

  return {
    uploadImage,
    isUploading,
  }
}
