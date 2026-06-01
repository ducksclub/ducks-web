import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ru'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ru')

type DateInput = string | number | Date

type FormatOptions = {
  locale?: string
  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  timeStyle?: 'full' | 'long' | 'medium' | 'short'
  format?: string
  timezone?: string
}

/**
 * Универсальный форматтер даты/времени через dayjs
 * По умолчанию отображает время в МСК
 */
export function formatDate(input: DateInput, options: FormatOptions = {}): string {
  const { format, timezone = 'Europe/Moscow', dateStyle, timeStyle } = options

  const date = dayjs(input)

  if (!date.isValid()) {
    return ''
  }

  const mskDate = date.tz(timezone)

  if (format) {
    return mskDate.format(format)
  }

  if (dateStyle === 'short' && timeStyle) {
    return mskDate.format('DD.MM.YYYY HH:mm')
  }

  if (dateStyle === 'short') {
    return mskDate.format('DD.MM.YYYY')
  }

  if (dateStyle === 'long' && timeStyle) {
    return mskDate.format('D MMMM YYYY, HH:mm')
  }

  if (dateStyle === 'long') {
    return mskDate.format('D MMMM YYYY')
  }

  if (dateStyle === 'full' && timeStyle) {
    return mskDate.format('dddd, D MMMM YYYY, HH:mm')
  }

  if (dateStyle === 'full') {
    return mskDate.format('dddd, D MMMM YYYY')
  }

  if (timeStyle) {
    return mskDate.format('DD.MM.YYYY HH:mm')
  }

  return mskDate.format('D MMM YYYY')
}
