export const renderPicture = (url: string) => {
  const config = useRuntimeConfig()

  return config.public.backendBaseUrl.replace('/api', '') + url
}
