const EVENT_START_PARAM_PREFIX = 'event_'
const EVENT_ID_PATTERN = /^[a-zA-Z0-9_-]{1,128}$/

export function isEventStartParam(startParam: unknown): startParam is string {
  return typeof startParam === 'string' && startParam.startsWith(EVENT_START_PARAM_PREFIX)
}

export function getEventIdFromStartParam(startParam: unknown): string | null {
  if (!isEventStartParam(startParam)) return null

  const eventId = startParam.slice(EVENT_START_PARAM_PREFIX.length)

  return EVENT_ID_PATTERN.test(eventId) ? eventId : null
}
