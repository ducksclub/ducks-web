export const useTelegramHaptics = () => {
  const tg = process.client ? window.Telegram?.WebApp : null

  const impact = (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    tg?.HapticFeedback.impactOccurred(style)
  }

  const success = () => tg?.HapticFeedback.notificationOccurred('success')
  const error = () => tg?.HapticFeedback.notificationOccurred('error')
  const warning = () => tg?.HapticFeedback.notificationOccurred('warning')

  const select = () => tg?.HapticFeedback.selectionChanged()

  return { impact, success, error, warning, select }
}
