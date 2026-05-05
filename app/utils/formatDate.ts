export type DateInput = string | number | Date

export type FormatOptions = {
  locale?: string
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle']
  custom?: Intl.DateTimeFormatOptions
}

/**
 * Универсальный форматтер даты/времени
 */
export function formatDate(input: DateInput, options: FormatOptions = {}): string {
  const { locale = 'ru-RU', dateStyle = 'medium', timeStyle, custom } = options

  const date = new Date(input)

  if (isNaN(date.getTime())) {
    return ''
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    ...(custom || {
      dateStyle,
      ...(timeStyle && { timeStyle }),
    }),
  })

  return formatter.format(date)
}
