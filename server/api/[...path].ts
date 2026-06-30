import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const apiBase = runtimeConfig.apiBase
  const method = event.method

  if (!apiBase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Не указан NUXT_PRIVATE_API_BASE',
      message: 'Не указан NUXT_PRIVATE_API_BASE для проксирования API',
    })
  }

  const path = event.context.params?.path

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Не указан путь API',
      message: 'Не удалось определить путь API-запроса',
    })
  }

  const target = joinURL(apiBase, path)

  try {
    return await proxyRequest(event, target)
  } catch (error) {
    console.error('[api-proxy] Backend request failed', {
      method,
      path,
      target,
      error: error instanceof Error ? error.message : String(error),
    })

    throw createError({
      statusCode: 502,
      statusMessage: 'Ошибка соединения с backend',
      message: 'Nuxt server не смог получить ответ от backend API',
    })
  }
})
