import { getEventIdFromStartParam } from '~/utils/telegramStartParam'

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const telegram = useTelegramWebApp()
  let handledStartParam = ''

  const openEventFromStartParam = async () => {
    const startParam = telegram.getStartParam()

    if (!startParam || startParam === handledStartParam) return

    handledStartParam = startParam

    const eventId = getEventIdFromStartParam(startParam)

    if (!eventId) return

    const eventPath = `/events/${eventId}`

    if (router.currentRoute.value.path === eventPath) return

    await router.replace(eventPath)
  }

  nuxtApp.hook('app:mounted', openEventFromStartParam)
})
