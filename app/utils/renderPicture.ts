export const renderPicture = (url: string) => {
  const config = useRuntimeConfig()

  return config.public.apiUrl.replace(/\/api\/?$/, '') + url
}
