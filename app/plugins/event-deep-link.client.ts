import { getEventIdFromStartParam } from '~/utils/telegramStartParam'

export default defineNuxtPlugin(async () => {
  const route = useRoute()
  const telegram = useTelegramWebApp()
  const eventId = getEventIdFromStartParam(telegram.getStartParam())

  if (!eventId) return

  const eventPath = `/events/${eventId}`

  if (route.path === eventPath) return

  await navigateTo(eventPath, { replace: true })
})
