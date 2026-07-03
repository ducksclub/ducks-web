import { env } from 'process'
import { joinURL, withQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  const apiBase = env.NUXT_PRIVATE_API_BASE

  if (!apiBase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Не указан BACKEND_URL',
      message: 'Не указан BACKEND_URL для проксирования API',
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

  const target = withQuery(joinURL(apiBase, path), getQuery(event))

  console.log('[API_PROXY]', {
    from: getRequestURL(event).pathname,
    query: getQuery(event),
    to: target,
  })

  try {
    return await proxyRequest(event, target)
  } catch (error) {
    console.error('[API_PROXY_ERROR]', error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Ошибка соединения с backend',
      message: 'Nuxt server не смог получить ответ от backend API',
    })
  }
})
